/**
 * Builds the launch video's scenes from the site's own puzzle generator, so the clip
 * shows the puzzles people will actually get. Run from this folder: node tools/build.mjs
 */
import { createServer } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(HERE, '..');
const SITE = path.resolve(PROJECT, '../..');

const vite = await createServer({ root: SITE, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const req = createRequire(path.join(SITE, 'package.json'));
const React = req('react');
const { renderToStaticMarkup } = req('react-dom/server');
const { Glyph } = await vite.ssrLoadModule('/src/iq/Glyph.tsx');
const { FigView } = await vite.ssrLoadModule('/src/iq/FigView.tsx');
const { Mascot } = await vite.ssrLoadModule('/src/components/common/Mascot.tsx');
const { genMirror, genRotation, genCount, genShapeSeries } = await vite.ssrLoadModule('/src/iq/spatial.ts');
const { mulberry32 } = await vite.ssrLoadModule('/src/iq/rng.ts');

const h = React.createElement;
const glyph = (cell) => renderToStaticMarkup(h(Glyph, { cell }));
const fig = (f) => renderToStaticMarkup(h(FigView, { fig: f }));
const wiz = (mood, color, size) => renderToStaticMarkup(h(Mascot, { mood, color, size }));
const optMarkup = (o) => (o.kind === 'fig' ? fig(o.fig) : glyph(o.cell));

// ---------------------------------------------------------------- pick puzzles
function find(make, ok, from = 11) {
  for (let seed = from; seed < from + 400; seed++) {
    const p = make(mulberry32(seed));
    if (ok(p)) return p;
  }
  throw new Error('no puzzle found');
}
const mirror = find(r => genMirror(r, 1, 'v-mirror'), p => p.stem.figs[0].on.length === 5);
const rotate = find(r => genRotation(r, 1, 'v-rotate'), () => true);
const count = find(
  r => genCount(r, 1, 'v-count'),
  p => p.explanation && Number(p.options[p.answer].text) === 3 && p.prompt.includes('triangles')
);
const series = find(r => genShapeSeries(r, 2, 'v-series'), p => p.stem.cells.length === 5, 31);
console.log('puzzles:', mirror.prompt, '|', rotate.prompt, '|', count.prompt, '|', series.prompt);

// --------------------------------------------------------------------- shared
const C = { orangeText: '#E8501C', indigo: '#3F2FD0', orange: '#FF6A2B', lilac: '#F7F5FF', ink: '#1B1740', white: '#FFFFFF' };

const BASE_CSS = `
  #root { position: absolute; inset: 0; overflow: hidden; font-family: 'Inter', sans-serif; color: ${C.ink};
    --color-primary: ${C.orange}; --color-text-primary: ${C.ink}; --color-border: #CFC8F0; --color-bg: ${C.lilac}; }
  .bg { position: absolute; inset: 0; }
  .head { position: absolute; left: 72px; margin: 0; font-weight: 900; letter-spacing: -0.03em; line-height: 0.95; text-transform: uppercase; }
  .card { position: absolute; background: ${C.white}; border: 8px solid ${C.ink}; border-radius: 56px; box-shadow: 18px 18px 0 ${C.ink}; box-sizing: border-box; }
  .iq-glyph { width: 100%; height: 100%; display: block; }
  .iq-fig { width: 100%; height: auto; display: block; }
  .tag { position: absolute; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; }
`;

const page = (id, body, css, script) => `<template>
  <style>${BASE_CSS}${css}</style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920">
${body}
  </div>
  <script>
    const tl = gsap.timeline({ paused: true });
${script}
    window.__timelines["${id}"] = tl;
  </script>
</template>
`;

const write = (name, html) => fs.writeFileSync(path.join(PROJECT, 'compositions', name), html);
fs.mkdirSync(path.join(PROJECT, 'compositions'), { recursive: true });

// ------------------------------------------------ shot 1 + 2: the mirror puzzle
const origFig = fig(mirror.stem.figs[0]);
const optionCells = mirror.options.map((o, i) => `<div class="opt" id="OPT-${i}">${optMarkup(o)}</div>`).join('');
const mirrorCard = (p) => `
    <div id="${p}-card" class="card" style="left:72px; top:500px; width:840px; height:820px;">
      <div class="lbl" style="left:0; right:0; top:26px; text-align:center;">ORIGINAL</div>
      <div class="orig">${origFig}</div>
      <div class="lbl" style="left:0; right:0; top:276px; text-align:center;">WHICH IS ITS MIRROR IMAGE?</div>
      <div class="grid">${optionCells.replace(/OPT-/g, `${p}-opt-`)}</div>
    </div>`;
const mirrorCss = (p) => `
  #${p}-card .lbl { position: absolute; font-weight: 900; font-size: 34px; letter-spacing: 0.02em; color: ${C.ink}; }
  #${p}-card .orig { position: absolute; left: 325px; top: 70px; width: 190px; }
  #${p}-card .grid { position: absolute; left: 60px; right: 60px; top: 322px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  #${p}-card .opt { aspect-ratio: 1; background: #F3F0FF; border: 5px solid #CFC8F0; border-radius: 32px; padding: 26px; box-sizing: border-box; display: grid; place-items: center; }
  #${p}-card .opt .iq-fig { width: 100%; }
`;

const ringSvg = `<svg viewBox="0 0 220 220" width="220" height="220" style="position:absolute; inset:0;">
  <circle cx="110" cy="110" r="96" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="20"/>
  <circle id="s1-arc" cx="110" cy="110" r="96" fill="none" stroke="${C.white}" stroke-width="20" stroke-linecap="round" stroke-dasharray="603" stroke-dashoffset="0" transform="rotate(-90 110 110)"/>
</svg>`;
const nums = [5, 4, 3, 2, 1].map(n => `<div class="num" id="s1-n${n}">${n}</div>`).join('');

write(
  's1-hook.html',
  page(
    's1-hook',
    `    <div class="bg" style="background:${C.indigo}"></div>
    <h1 class="head" id="s1-head" style="top:190px; font-size:96px; color:${C.white}; width:640px;">Solve<br>it in<br>5 seconds</h1>
    <div id="s1-ringwrap" style="position:absolute; left:700px; top:215px; width:220px; height:220px;">${ringSvg}${nums}</div>
${mirrorCard('s1')}`,
    `${mirrorCss('s1')}
  #s1-ringwrap .num { position: absolute; inset: 0; display: grid; place-items: center; font-weight: 900; font-size: 128px; color: ${C.white}; opacity: 0; }`,
    `    [5, 4, 3, 2, 1].forEach((n, i) => {
      tl.set('#s1-n' + n, { opacity: 1 }, i);
      if (i > 0) tl.set('#s1-n' + (n + 1), { opacity: 0 }, i);
      tl.fromTo('#s1-n' + n, { scale: 1.4 }, { scale: 1, duration: 0.2, ease: 'back.out(2.2)' }, i);
    });
    tl.fromTo('#s1-arc', { strokeDashoffset: 0 }, { strokeDashoffset: 603, duration: 5, ease: 'none' }, 0);
    tl.fromTo('#s1-arc', { stroke: '${C.white}' }, { stroke: '${C.orange}', duration: 0.1, ease: 'none' }, 4.7);
    tl.fromTo('#s1-ringwrap', { scale: 1 }, { scale: 1.12, duration: 0.15, ease: 'power2.out', yoyo: true, repeat: 1 }, 4.7);`
  )
);

const ans = mirror.answer;
write(
  's2-reveal.html',
  page(
    's2-reveal',
    `    <div class="bg" style="background:${C.indigo}"></div>
    <h1 class="head" id="s2-head" style="top:190px; font-size:96px; color:${C.white}; width:640px;">Mirror it<br>left to<br>right</h1>
    <div id="s2-wiz" style="position:absolute; left:700px; top:190px; width:240px; height:240px;">${wiz('cheer', C.orange, 240)}</div>
${mirrorCard('s2')}`,
    `${mirrorCss('s2')}
  #s2-card #s2-opt-${ans} { border-color: ${C.ink}; background: ${C.orange}; }
  #s2-card #s2-opt-${ans} .iq-fig rect[fill="var(--color-primary)"] { fill: ${C.white}; }`,
    `    for (let i = 0; i < 6; i++) { if (i !== ${ans}) tl.fromTo('#s2-opt-' + i, { opacity: 1 }, { opacity: 0.22, duration: 0.25, ease: 'power2.out' }, 0.05); }
    tl.fromTo('#s2-opt-${ans}', { scale: 1 }, { scale: 1.14, duration: 0.5, ease: 'elastic.out(1, 0.45)' }, 0.05);
    tl.fromTo('#s2-wiz', { y: 60, scale: 0.6 }, { y: 0, scale: 1, duration: 0.5, ease: 'back.out(2.4)' }, 0.15);
    tl.fromTo('#s2-card', { scale: 1 }, { scale: 1.04, duration: 0.6, ease: 'power2.out' }, 0.05);`
  )
);

// ------------------------------------------------------- shot 3: speed round
const rotFigs = rotate.stem.figs.map((f, i) => (f ? `<div class="sbox">${fig(f)}</div>` : `<div class="sbox q">?</div>`)).join('');
const rotOpts = rotate.options.map((o, i) => `<div class="opt" id="r-opt-${i}">${optMarkup(o)}</div>`).join('');
const scatter = count.stem.cells
  .map((c, i) => `<div class="dot" id="c-dot-${i}">${c ? glyph(c) : ''}</div>`)
  .join('');
const targetCells = count.stem.cells.map((c, i) => (c && c.shape === 2 && c.fill === 1 ? i : -1)).filter(i => i >= 0);
if (targetCells.length !== 3) throw new Error('expected 3 target shapes, got ' + targetCells.length);
const serCells = series.stem.cells.map(c => (c ? `<div class="sbox">${glyph(c)}</div>` : `<div class="sbox q" id="x-q">?</div>`)).join('');
const serAnswer = glyph(series.options[series.answer].cell);

write(
  's3-speed.html',
  page(
    's3-speed',
    `    <div id="s3-bg" class="bg" style="background:${C.orange}"></div>

    <div id="a-wrap">
      <div class="tag" style="left:72px; top:190px; font-size:110px; color:${C.ink};">Spatial</div>
      <div class="card" style="left:72px; top:350px; width:840px; height:790px;">
        <div class="srow" style="left:36px; right:36px; top:36px;">${rotFigs}</div>
        <div class="grid" style="top:290px;">${rotOpts}</div>
      </div>
    </div>

    <div id="b-wrap">
      <div class="tag" style="left:72px; top:190px; font-size:110px; color:${C.ink};">Pattern</div>
      <div class="tag" style="left:72px; top:330px; font-size:64px; color:${C.ink}; width:800px; line-height:1;">${count.prompt.replace(' are there?', '?')}</div>
      <div class="card" style="left:72px; top:520px; width:840px; height:610px;">
        <div class="scatter">${scatter}</div>
      </div>
      <div id="b-answer" class="tag" style="left:72px; top:1170px; width:840px; text-align:center; font-size:140px; color:${C.orange}; line-height:1;">3</div>
    </div>

    <div id="c-wrap">
      <div class="tag" style="left:72px; top:190px; font-size:110px; color:${C.white};">Pattern</div>
      <div class="tag" style="left:72px; top:330px; font-size:64px; color:${C.white}; width:800px; line-height:1;">What comes next?</div>
      <div id="c-card" class="card" style="left:72px; top:520px; width:840px; height:330px;">
        <div class="srow" style="left:34px; right:34px; top:36px; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px;">${serCells}</div>
      </div>
      <div id="c-ans" class="card" style="left:360px; top:900px; width:360px; height:360px; background:${C.orange};">
        <div style="position:absolute; inset:46px;">${serAnswer}</div>
      </div>
    </div>

    <div id="d-wrap">
      <h1 class="head" style="top:520px; left:72px; width:900px; font-size:150px; color:${C.white};">21 puzzles.<br><span style="color:${C.orange}">New every<br>time.</span></h1>
    </div>`,
    `  #a-wrap .srow, #c-wrap .srow { position: absolute; display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  #a-wrap .sbox, #c-wrap .sbox { aspect-ratio: 1; background: #F3F0FF; border: 5px solid #CFC8F0; border-radius: 28px; padding: 12px; box-sizing: border-box; display: grid; place-items: center; min-width: 0; font-weight: 900; font-size: 84px; color: ${C.orange}; }
  #a-wrap .sbox.q, #c-wrap .sbox.q { border-style: dashed; border-color: ${C.indigo}; color: ${C.indigo}; }
  #a-wrap .grid { position: absolute; left: 36px; right: 36px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  #a-wrap .opt { aspect-ratio: 1.15; background: #F3F0FF; border: 5px solid #CFC8F0; border-radius: 28px; padding: 18px; box-sizing: border-box; display: grid; place-items: center; }
  #a-wrap .opt .iq-fig { width: 78%; }
  #b-wrap .scatter { position: absolute; inset: 28px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
  #b-wrap .dot { aspect-ratio: 1; padding: 6px; border-radius: 50%; }
  #b-wrap, #c-wrap, #d-wrap { opacity: 0; }`,
    `    // A: 0 - 1.5 s rotation series (orange ground, visible by default)
    tl.fromTo('#a-wrap .card', { y: 70, scale: 0.92 }, { y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.9)' }, 0.001);
    tl.fromTo('#r-opt-${rotate.answer}', { scale: 1 }, { scale: 1.1, duration: 0.45, ease: 'elastic.out(1, 0.45)' }, 0.8);
    tl.fromTo('#r-opt-${rotate.answer}', { backgroundColor: '#F3F0FF' }, { backgroundColor: '${C.orange}', duration: 0.1 }, 0.8);
    // B: 1.2 - 3.2 s counting
    tl.set('#a-wrap', { opacity: 0 }, 1.2);
    tl.set('#s3-bg', { backgroundColor: '${C.lilac}' }, 1.2);
    tl.set('#b-wrap', { opacity: 1 }, 1.2);
    tl.fromTo('#b-wrap .card', { y: 70, scale: 0.92 }, { y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.9)' }, 1.2);
    ${JSON.stringify(targetCells)}.forEach((i, k) => {
      tl.fromTo('#c-dot-' + i, { scale: 1, backgroundColor: 'rgba(255,106,43,0)' }, { scale: 1.2, backgroundColor: 'rgba(255,106,43,0.35)', duration: 0.3, ease: 'back.out(2)' }, 1.9 + k * 0.12);
    });
    tl.fromTo('#b-answer', { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2.4)' }, 2.3);
    // C: 3.2 - 4.8 s shape series
    tl.set('#b-wrap', { opacity: 0 }, 3.2);
    tl.set('#s3-bg', { backgroundColor: '${C.indigo}' }, 3.2);
    tl.set('#c-wrap', { opacity: 1 }, 3.2);
    tl.fromTo('#c-card', { y: 70, scale: 0.92 }, { y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.9)' }, 3.2);
    tl.fromTo('#c-ans', { y: 120, scale: 0.4, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' }, 3.9);
    // D: 4.8 - 7 s text beat
    tl.set('#c-wrap', { opacity: 0 }, 4.8);
    tl.set('#s3-bg', { backgroundColor: '${C.ink}' }, 4.8);
    tl.set('#d-wrap', { opacity: 1 }, 4.8);
    tl.fromTo('#d-wrap .head', { scale: 0.7 }, { scale: 1, duration: 0.45, ease: 'back.out(2)' }, 4.8);`
  )
);

// ---------------------------------------------------------------- shot 4: result
const bars = [
  ['Pattern', 88],
  ['Spatial', 92],
  ['Numbers', 76],
  ['Words', 84],
  ['Logic', 70],
  ['Memory', 100]
]
  .map(([n, v], i) => `<div class="bar"><span>${n}</span><div class="trk"><i id="s4-bar-${i}" style="width:${v}%"></i></div></div>`)
  .join('');
write(
  's4-result.html',
  page(
    's4-result',
    `    <div class="bg" style="background:${C.lilac}"></div>
    <div id="s4-card" class="card" style="left:72px; top:190px; width:840px; height:1010px;">
      <div class="tag" style="left:44px; top:34px; font-size:36px; color:${C.ink}; opacity:0.7;">IQ-style estimate</div>
      <div class="tag" style="left:0; right:0; top:940px; text-align:center; font-size:34px; color:${C.indigo};">Example result</div>
      <div id="s4-score" class="tag" style="left:0; right:0; top:80px; text-align:center; font-size:300px; line-height:1; color:${C.orangeText};">0</div>
      <div class="tag" style="left:0; right:0; top:400px; text-align:center; font-size:88px; color:${C.ink}; line-height:1;">Sharp Thinker</div>
      <div class="bars">${bars}</div>
    </div>
    <div id="s4-stamp" style="position:absolute; left:790px; top:180px; width:220px; height:220px; border-radius:50%; background:${C.orange}; border:8px solid ${C.ink}; box-shadow:12px 12px 0 ${C.ink}; display:grid; place-items:center; font-weight:900; font-size:54px; line-height:0.95; text-align:center; color:${C.ink}; text-transform:uppercase;">100%<br>free</div>
    <h1 id="s4-cap" class="head" style="top:1236px; font-size:64px; color:${C.ink}; width:940px; white-space:nowrap;">Instant results. Free.</h1>`,
    `  #s4-card .bars { position: absolute; left: 44px; right: 44px; top: 530px; display: grid; gap: 16px; }
  #s4-card .bar { display: grid; grid-template-columns: 190px 1fr; align-items: center; gap: 16px; font-weight: 900; font-size: 38px; }
  #s4-card .trk { height: 36px; border-radius: 18px; background: #E7E2FA; overflow: hidden; border: 4px solid ${C.ink}; box-sizing: border-box; }
  #s4-card .trk i { display: block; height: 100%; background: ${C.orange}; transform-origin: left center; }`,
    `    tl.fromTo('#s4-card', { scale: 1.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.6)' }, 0);
    const counter = { v: 0 };
    tl.to(counter, { v: 124, duration: 1.2, ease: 'power4.out', onUpdate: () => { document.getElementById('s4-score').textContent = String(Math.round(counter.v)); } }, 0.25);
    for (let i = 0; i < 6; i++) tl.fromTo('#s4-bar-' + i, { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power3.out' }, 1.0 + i * 0.2);
    tl.fromTo('#s4-cap', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' }, 1.9);
    tl.fromTo('#s4-stamp', { scale: 2.2, rotation: -40, opacity: 0 }, { scale: 1, rotation: -12, opacity: 1, duration: 0.5, ease: 'back.out(1.8)' }, 2.6);
    tl.fromTo('#s4-score', { scale: 1 }, { scale: 1.08, duration: 0.3, ease: 'power2.out', yoyo: true, repeat: 1 }, 3.6);
    tl.fromTo('#s4-cap', { scale: 1 }, { scale: 1.05, duration: 0.3, ease: 'power2.out', yoyo: true, repeat: 1 }, 4.2);`
  )
);

// ------------------------------------------------------------ shot 5: challenge
write(
  's5-challenge.html',
  page(
    's5-challenge',
    `    <div class="bg" style="background:${C.ink}"></div>
    <h1 id="s5-head" class="head" style="top:190px; font-size:100px; color:${C.white}; width:900px;">Send a friend<br>the same<br><span style="color:${C.orange}">puzzles</span></h1>
    <div id="s5-a" class="card" style="left:72px; top:570px; width:620px; height:350px; background:${C.white};">
      <div class="tag" style="left:40px; top:30px; font-size:56px; color:${C.ink};">Sam</div>
      <div class="tag" style="left:0; right:0; top:90px; text-align:center; font-size:230px; line-height:1; color:${C.orangeText};">121</div>
    </div>
    <div id="s5-b" class="card" style="left:300px; top:980px; width:620px; height:350px; background:${C.orange};">
      <div class="tag" style="left:40px; top:30px; font-size:56px; color:${C.ink};">You</div>
      <div class="tag" style="left:0; right:0; top:90px; text-align:center; font-size:230px; line-height:1; color:${C.ink};">?</div>
    </div>`,
    ``,
    `    tl.fromTo('#s5-head', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' }, 0);
    tl.fromTo('#s5-a', { x: -900, rotation: -14 }, { x: 0, rotation: -5, duration: 0.45, ease: 'back.out(1.5)' }, 0.5);
    tl.fromTo('#s5-b', { x: 900, rotation: 14 }, { x: 0, rotation: 5, duration: 0.45, ease: 'back.out(1.5)' }, 1.1);
    tl.fromTo('#s5-b', { scale: 1 }, { scale: 1.06, duration: 0.4, ease: 'elastic.out(1, 0.4)' }, 1.7);`
  )
);

// --------------------------------------------------------------------- shot 6: CTA
write(
  's6-cta.html',
  page(
    's6-cta',
    `    <div class="bg" style="background:${C.orange}"></div>
    <h1 id="s6-url" class="head" style="top:230px; left:0; right:0; text-align:center; font-size:132px; color:${C.ink}; line-height:0.9;">wkquiz.com<br><span style="font-size:340px; color:${C.ink};">/iq</span></h1>
    <div id="s6-sub" class="tag" style="left:0; right:0; top:900px; text-align:center; font-size:76px; color:${C.ink}; line-height:1;">Free. No sign-up.</div>
    <div id="s6-wiz" style="position:absolute; left:360px; top:1010px; width:360px; height:360px;">${wiz('cheer', C.indigo, 360)}</div>`,
    ``,
    `    tl.fromTo('#s6-url', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2.2)' }, 0);
    tl.fromTo('#s6-sub', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' }, 0.5);
    tl.fromTo('#s6-wiz', { y: 120, scale: 0.5 }, { y: 0, scale: 1, duration: 0.5, ease: 'back.out(2.4)' }, 0.8);`
  )
);

// ---------------------------------------------------------------------- root
const hosts = [
  ['s1-hook', 0, 5],
  ['s2-reveal', 5, 3],
  ['s3-speed', 8, 7],
  ['s4-result', 15, 5],
  ['s5-challenge', 20, 5],
  ['s6-cta', 25, 5]
]
  .map(
    ([id, start, dur], i) =>
      `      <div id="${id}" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${start}" data-duration="${dur}" data-track-index="${i + 1}" data-track-kind="graphics" data-width="1080" data-height="1920"></div>`
  )
  .join('\n');

const audioPath = path.join(PROJECT, 'audio-tags.html.txt');
const audioTags = fs.existsSync(audioPath) ? fs.readFileSync(audioPath, 'utf8') : '';

fs.writeFileSync(
  path.join(PROJECT, 'index.html'),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { margin: 0; width: 1080px; height: 1920px; overflow: hidden; background: ${C.ink}; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="30" data-width="1080" data-height="1920">
${hosts}
${audioTags}
    </div>
    <script>
      const tl = gsap.timeline({ paused: true });
      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
`
);

await vite.close();
console.log('built 6 scenes + index.html');

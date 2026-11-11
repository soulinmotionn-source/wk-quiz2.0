import { pick, randInt, shuffle, type Rng } from './rng';
import type { Cell, Fig, Level, Puzzle } from './puzzles';

/* ------------------------------------------------------------------ figures
 * A figure is a small grid of filled squares (a polyomino). Mirror, rotation and
 * symmetry puzzles all work by transforming these grids, so the answer is always
 * exact and every option can be checked for uniqueness.
 */

const xy = (f: Fig) => f.on.map(i => [i % f.w, Math.floor(i / f.w)] as const);
const fromXY = (w: number, h: number, pts: readonly (readonly [number, number])[]): Fig => ({
  w,
  h,
  on: pts.map(([x, y]) => y * w + x).sort((a, b) => a - b)
});

export const flipH = (f: Fig): Fig => fromXY(f.w, f.h, xy(f).map(([x, y]) => [f.w - 1 - x, y]));
export const flipV = (f: Fig): Fig => fromXY(f.w, f.h, xy(f).map(([x, y]) => [x, f.h - 1 - y]));
/** Rotate 90 degrees clockwise (width and height swap). */
export const rot90 = (f: Fig): Fig => fromXY(f.h, f.w, xy(f).map(([x, y]) => [f.h - 1 - y, x]));
export const rot180 = (f: Fig): Fig => rot90(rot90(f));
export const rot270 = (f: Fig): Fig => rot90(rot180(f));

export const canon = (f: Fig) => `${f.w}x${f.h}:${[...f.on].sort((a, b) => a - b).join(',')}`;

/** Random connected shape of `n` cells inside a w×h box. */
function randomFigure(rng: Rng, w: number, h: number, n: number): Fig {
  const set = new Set<number>([randInt(rng, 0, w * h - 1)]);
  let guard = 0;
  while (set.size < n && guard++ < 400) {
    const base = [...set][randInt(rng, 0, set.size - 1)];
    const x = base % w;
    const y = Math.floor(base / w);
    const [dx, dy] = pick(rng, [[1, 0], [-1, 0], [0, 1], [0, -1]] as const);
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < w && ny >= 0 && ny < h) set.add(ny * w + nx);
  }
  return { w, h, on: [...set].sort((a, b) => a - b) };
}

/** A figure that no mirror or rotation can turn into another one (so every option is unambiguous). */
function chiralFigure(rng: Rng, size: number, n: number): Fig {
  for (let i = 0; i < 300; i++) {
    const f = randomFigure(rng, size, size, n);
    // use the full box so rotations keep the same dimensions
    const forms = [f, rot90(f), rot180(f), rot270(f)].map(canon);
    const mirrors = [flipH(f), flipV(f), rot90(flipH(f)), rot270(flipH(f))].map(canon);
    if (new Set(forms).size === 4 && mirrors.every(m => !forms.includes(m)) && new Set(mirrors).size === 4) return f;
  }
  return { w: size, h: size, on: [0, 1, size, size + 1, size * 2 + 1] };
}

/** Move one lit cell to a free neighbouring square: a "nearly right" distractor. */
function nudge(rng: Rng, f: Fig, avoid: Set<string>): Fig | null {
  for (let i = 0; i < 60; i++) {
    const on = [...f.on];
    const drop = on.splice(randInt(rng, 0, on.length - 1), 1)[0];
    const add = randInt(rng, 0, f.w * f.h - 1);
    if (add === drop || on.includes(add)) continue;
    const g: Fig = { w: f.w, h: f.h, on: [...on, add].sort((a, b) => a - b) };
    if (!avoid.has(canon(g))) return g;
  }
  return null;
}

function figOptions(rng: Rng, correct: Fig, pool: Fig[], count = 6) {
  const seen = new Set<string>([canon(correct)]);
  const picked: Fig[] = [];
  for (const f of shuffle(rng, pool)) {
    if (!seen.has(canon(f))) {
      seen.add(canon(f));
      picked.push(f);
    }
    if (picked.length === count - 1) break;
  }
  let guard = 0;
  while (picked.length < count - 1 && guard++ < 20) {
    const g = nudge(rng, correct, seen);
    if (g) {
      seen.add(canon(g));
      picked.push(g);
    }
  }
  const options = shuffle(rng, [correct, ...picked]);
  return { options, answer: options.findIndex(o => canon(o) === canon(correct)) };
}

// -------------------------------------------------------------- mirror image

export function genMirror(rng: Rng, level: Level, id: string): Puzzle {
  const size = level === 1 ? 3 : 4;
  const cells = level === 1 ? 5 : level === 2 ? 6 : 8;
  const f = chiralFigure(rng, size, cells);
  const correct = flipH(f);
  const { options, answer } = figOptions(rng, correct, [f, flipV(f), rot90(f), rot270(f), rot180(f), rot90(flipH(f))]);
  return {
    id,
    domain: 'spatial',
    level,
    prompt: 'Which one is the mirror image of this figure, flipped left to right?',
    stem: { kind: 'figs', figs: [f], caption: 'Original' },
    options: options.map(fig => ({ kind: 'fig', fig })),
    answer,
    explanation:
      'A left-to-right mirror keeps every row the same height but reverses it, like looking at the figure in a mirror held at its side. Turning the figure (rotation) is not the same thing as mirroring it.'
  };
}

// ----------------------------------------------------------- rotation series

export function genRotation(rng: Rng, level: Level, id: string): Puzzle {
  const size = level === 1 ? 3 : 4;
  const f = chiralFigure(rng, size, level === 1 ? 5 : level === 2 ? 6 : 7);
  // level 1: turn clockwise; level 2: turn counter-clockwise; level 3: turn then flip, repeatedly
  const step: (g: Fig) => Fig = level === 1 ? rot90 : level === 2 ? rot270 : g => flipH(rot90(g));
  const seq: Fig[] = [f];
  for (let i = 0; i < 4; i++) seq.push(step(seq[i]));
  const shown = seq.slice(0, 3);
  const correct = seq[3];
  const pool = [...seq.slice(0, 3), seq[4], flipH(correct), flipV(correct), rot180(correct), flipH(f), rot90(correct)];
  const { options, answer } = figOptions(rng, correct, pool);
  const rule =
    level === 1 ? 'turns a quarter-turn clockwise each step' : level === 2 ? 'turns a quarter-turn anticlockwise each step' : 'turns a quarter-turn clockwise and is then mirrored each step';
  return {
    id,
    domain: 'spatial',
    level,
    prompt: 'The figure changes in the same way each step. Which figure comes next?',
    stem: { kind: 'figs', figs: [...shown, null] },
    options: options.map(fig => ({ kind: 'fig', fig })),
    answer,
    explanation: `Each figure ${rule}. Apply the same move once more to the third figure to get the next one.`
  };
}

// ------------------------------------------------------- symmetry completion

export function genSymmetry(rng: Rng, level: Level, id: string): Puzzle {
  const h = level === 1 ? 3 : 4;
  const half = randomHalf(rng, 2, h, level === 1 ? 4 : level === 2 ? 5 : 6);
  const correct = flipH(half);
  const { options, answer } = figOptions(rng, correct, [half, flipV(correct), rot180(correct), flipV(half), rot180(half)]);
  return {
    id,
    domain: 'spatial',
    level,
    prompt: 'The whole picture is symmetrical left to right. Which piece completes the right side?',
    stem: { kind: 'figs', figs: [half, null], caption: 'Mirror line between the two halves', joined: true },
    options: options.map(fig => ({ kind: 'fig', fig })),
    answer,
    explanation:
      'In a left-right symmetrical picture the right half is the left half reflected in a mirror: the column next to the mirror line copies across first.'
  };
}

/** Half-picture with enough structure that no option is symmetrical by accident. */
function randomHalf(rng: Rng, w: number, h: number, n: number): Fig {
  for (let i = 0; i < 200; i++) {
    const f = randomFigure(rng, w, h, n);
    const forms = [canon(f), canon(flipV(f)), canon(rot180(f))];
    if (new Set(forms).size === 3) return f;
  }
  return { w, h, on: [0, 3, 4].filter(i => i < w * h) };
}

// ------------------------------------------------------------ counting shapes

export function genCount(rng: Rng, level: Level, id: string): Puzzle {
  const cols = 5;
  const rows = 3;
  const total = rows * cols;
  const filled = level === 1 ? 9 : level === 2 ? 11 : 13;
  const slots = shuffle(rng, Array.from({ length: total }, (_, i) => i)).slice(0, filled);

  const target: Cell = {
    shape: pick(rng, [0, 1, 2] as const),
    count: 1,
    fill: level === 1 ? 1 : pick(rng, [0, 1, 2] as const),
    size: 1,
    rot: 0
  };
  const cells: (Cell | null)[] = Array(total).fill(null);
  const wantTargets = randInt(rng, 2, level === 1 ? 4 : 5);
  slots.forEach((slot, i) => {
    if (i < wantTargets) {
      cells[slot] = { ...target };
      return;
    }
    // everything else must differ from the target in shape or fill
    let c: Cell;
    do {
      c = {
        shape: pick(rng, [0, 1, 2] as const),
        count: 1,
        fill: pick(rng, [0, 1, 2] as const),
        size: 1,
        rot: 0
      };
    } while (c.shape === target.shape && c.fill === target.fill);
    cells[slot] = c;
  });

  const shapeName = ['circles', 'squares', 'triangles'][target.shape];
  const fillName = ['outlined', 'solid', 'striped'][target.fill];
  const nums = shuffle(rng, [wantTargets, wantTargets + 1, wantTargets - 1, wantTargets + 2, wantTargets - 2].filter(n => n >= 0));
  return {
    id,
    domain: 'pattern',
    level,
    prompt: `How many ${fillName} ${shapeName} are there?`,
    stem: { kind: 'scatter', cells, cols },
    options: nums.map(n => ({ kind: 'text', text: String(n) })),
    answer: nums.indexOf(wantTargets),
    explanation: `Only shapes matching both the shape (${shapeName}) and the fill (${fillName}) count. Scanning one row at a time makes it easier to keep track.`
  };
}

// ------------------------------------------------------------- shape series

type SeriesRule = 'const' | 'up' | 'down' | 'alt';

export function genShapeSeries(rng: Rng, level: Level, id: string): Puzzle {
  const keys = ['shape', 'count', 'fill', 'size'] as const;
  const varyN = level === 1 ? 1 : level === 2 ? 2 : 3;
  const varying = shuffle(rng, keys).slice(0, varyN);
  const rules: Record<string, { rule: SeriesRule; v0: number; v1: number }> = {};
  for (const k of keys) {
    const v0 = randInt(rng, 0, 2);
    rules[k] = {
      rule: varying.includes(k) ? pick(rng, level === 1 ? (['up', 'down'] as const) : (['up', 'down', 'alt'] as const)) : 'const',
      v0,
      v1: (v0 + randInt(rng, 1, 2)) % 3
    };
  }
  const value = (k: string, i: number) => {
    const r = rules[k];
    if (r.rule === 'const') return r.v0;
    if (r.rule === 'up') return (r.v0 + i) % 3;
    if (r.rule === 'down') return (r.v0 - (i % 3) + 3) % 3;
    return i % 2 === 0 ? r.v0 : r.v1;
  };
  const cellAt = (i: number): Cell => ({
    shape: value('shape', i) as Cell['shape'],
    count: (value('count', i) + 1) as Cell['count'],
    fill: value('fill', i) as Cell['fill'],
    size: value('size', i) as Cell['size'],
    rot: 0
  });
  const row = Array.from({ length: 5 }, (_, i) => cellAt(i));
  const correct = row[4];
  const key = (c: Cell) => `${c.shape}${c.count}${c.fill}${c.size}`;
  const seen = new Set([key(correct)]);
  const wrong: Cell[] = [];
  let guard = 0;
  while (wrong.length < 5 && guard++ < 200) {
    const d: Cell = { ...correct };
    for (const k of shuffle(rng, keys).slice(0, guard % 3 === 0 ? 2 : 1)) {
      if (k === 'count') d.count = (((d.count - 1 + randInt(rng, 1, 2)) % 3) + 1) as Cell['count'];
      else d[k] = ((d[k] + randInt(rng, 1, 2)) % 3) as never;
    }
    if (!seen.has(key(d))) {
      seen.add(key(d));
      wrong.push(d);
    }
  }
  const options = shuffle(rng, [correct, ...wrong]);
  const label: Record<string, string> = { shape: 'shape', count: 'number of shapes', fill: 'fill', size: 'size' };
  const how: Record<SeriesRule, string> = {
    const: '',
    up: 'moves one step forward through its three options each time',
    down: 'moves one step backward through its three options each time',
    alt: 'switches back and forth between two options'
  };
  return {
    id,
    domain: 'pattern',
    level,
    prompt: 'What comes next in the series?',
    stem: { kind: 'series', cells: [...row.slice(0, 4), null] },
    options: options.map(cell => ({ kind: 'cell', cell })),
    answer: options.findIndex(o => key(o) === key(correct)),
    explanation: varying.map(k => `The ${label[k]} ${how[rules[k].rule]}.`).join(' ')
  };
}

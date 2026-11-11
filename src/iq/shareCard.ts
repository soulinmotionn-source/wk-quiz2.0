import { DOMAIN_LABEL } from './scoring';
import type { Domain } from './puzzles';

export interface ShareCardData {
  name: string;
  score: number;
  title: string;
  percent: number;
  seconds: string;
  domains: { domain: Domain; pct: number }[];
  mode: 'full' | 'daily';
  correct: number;
  total: number;
}

/** Draws a 1080×1080 result image on a canvas (no server needed) and returns it as a PNG blob. */
export function renderShareCard(d: ShareCardData): Promise<Blob> {
  const size = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, size, size);
  bg.addColorStop(0, '#1b1030');
  bg.addColorStop(1, '#0b1226');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);

  const glow = ctx.createRadialGradient(240, 180, 20, 240, 180, 620);
  glow.addColorStop(0, 'rgba(255,107,53,0.55)');
  glow.addColorStop(1, 'rgba(255,107,53,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 54px Inter, system-ui, sans-serif';
  ctx.fillText('WKQuiz  Brain Test', size / 2, 120);

  ctx.fillStyle = '#c3cbdb';
  ctx.font = '600 40px Inter, system-ui, sans-serif';
  ctx.fillText(d.name ? `${d.name}'s result` : 'My result', size / 2, 190);

  if (d.mode === 'full') {
    ctx.fillStyle = '#ffb347';
    ctx.font = '800 300px Inter, system-ui, sans-serif';
    ctx.fillText(String(d.score), size / 2, 520);
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 64px Inter, system-ui, sans-serif';
    ctx.fillText(d.title, size / 2, 610);
    ctx.fillStyle = '#c3cbdb';
    ctx.font = '600 38px Inter, system-ui, sans-serif';
    ctx.fillText(`IQ-style estimate · above ~${d.percent}% of people`, size / 2, 668);
  } else {
    ctx.fillStyle = '#ffb347';
    ctx.font = '800 280px Inter, system-ui, sans-serif';
    ctx.fillText(`${d.correct}/${d.total}`, size / 2, 520);
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 64px Inter, system-ui, sans-serif';
    ctx.fillText('Daily brain teaser', size / 2, 610);
    ctx.fillStyle = '#c3cbdb';
    ctx.font = '600 38px Inter, system-ui, sans-serif';
    ctx.fillText(`Solved in ${d.seconds}`, size / 2, 668);
  }

  // Ability bars
  const bars = d.domains.slice(0, 6);
  const barW = 700;
  const x0 = (size - barW) / 2;
  bars.forEach((b, i) => {
    const y = 722 + i * 41;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#c3cbdb';
    ctx.font = '700 26px Inter, system-ui, sans-serif';
    ctx.fillText(DOMAIN_LABEL[b.domain], x0 - 150, y + 22);
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillRect(x0 + 20, y, barW - 20, 24);
    const g = ctx.createLinearGradient(x0, 0, x0 + barW, 0);
    g.addColorStop(0, '#ff6b35');
    g.addColorStop(1, '#ffb347');
    ctx.fillStyle = g;
    ctx.fillRect(x0 + 20, y, ((barW - 20) * b.pct) / 100, 24);
  });

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 44px Inter, system-ui, sans-serif';
  ctx.fillText('Can you beat it?  wkquiz.com/iq-test', size / 2, 1030);

  return new Promise((resolve, reject) => {
    canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Could not create image'))), 'image/png');
  });
}

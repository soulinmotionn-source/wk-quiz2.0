import type { Domain, Puzzle } from './puzzles';

export interface Answered {
  puzzle: Puzzle;
  chosen: number | null;
  correct: boolean;
  seconds: number;
}

export const DOMAIN_LABEL: Record<Domain, string> = {
  pattern: 'Pattern',
  spatial: 'Spatial',
  number: 'Numbers',
  verbal: 'Words',
  logic: 'Logic',
  memory: 'Memory'
};

const WEIGHT = { 1: 1, 2: 1.5, 3: 2 } as const;

/** Difficulty-weighted share of correct answers, 0..1. */
export function weightedScore(answers: Answered[]): number {
  const total = answers.reduce((s, a) => s + WEIGHT[a.puzzle.level], 0);
  const got = answers.reduce((s, a) => s + (a.correct ? WEIGHT[a.puzzle.level] : 0), 0);
  return total === 0 ? 0 : got / total;
}

/**
 * Turns a weighted score into an "IQ-style" number on the usual scale
 * (average 100, spread 15). This mapping is our own calibration, NOT a clinical
 * norm, which is why the UI always shows it as an entertainment estimate with a range.
 */
export function iqEstimate(p: number): { score: number; low: number; high: number } {
  const z = (p - 0.5) / 0.2;
  const score = Math.max(70, Math.min(145, Math.round(100 + 15 * z)));
  return { score, low: Math.max(65, score - 7), high: Math.min(150, score + 7) };
}

/** Share of a normal population (mean 100, sd 15) below this score, as a percentage. */
export function percentBelow(score: number): number {
  const z = (score - 100) / 15;
  // Abramowitz–Stegun approximation of the normal CDF
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  const cdf = z > 0 ? 1 - p : p;
  return Math.min(99, Math.max(1, Math.round(cdf * 100)));
}

export function domainScores(answers: Answered[]): { domain: Domain; pct: number; n: number }[] {
  const domains: Domain[] = ['pattern', 'spatial', 'number', 'verbal', 'logic', 'memory'];
  return domains
    .map(domain => {
      const sub = answers.filter(a => a.puzzle.domain === domain);
      return { domain, n: sub.length, pct: sub.length ? Math.round((weightedScore(sub)) * 100) : 0 };
    })
    .filter(d => d.n > 0);
}

export function brainTitle(score: number): { title: string; blurb: string } {
  if (score >= 130) return { title: 'Grand Strategist', blurb: 'Spotting patterns that most people never notice.' };
  if (score >= 118) return { title: 'Sharp Thinker', blurb: 'Quick, accurate and comfortable with hard puzzles.' };
  if (score >= 106) return { title: 'Pattern Spotter', blurb: 'Above-average reasoning with a good eye for structure.' };
  if (score >= 94) return { title: 'Steady Solver', blurb: 'Reliable all-round reasoning. A little practice goes a long way.' };
  if (score >= 82) return { title: 'Curious Mind', blurb: 'Good foundations. Patterns get easier with practice.' };
  return { title: 'Rising Brain', blurb: 'Every puzzle you solve builds the skill. Try again for a better run.' };
}

export function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export interface IqRecord {
  date: string;
  score: number;
  seed: number;
  seconds: number;
}

const KEY = 'wkquiz_iq_history';

export function loadHistory(): IqRecord[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function saveRecord(rec: IqRecord): IqRecord[] {
  const next = [rec, ...loadHistory()].slice(0, 20);
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // storage unavailable
  }
  return next;
}

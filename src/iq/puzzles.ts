import { mulberry32, pick, randInt, shuffle, type Rng } from './rng';
import { genCount, genMirror, genRotation, genShapeSeries, genSymmetry } from './spatial';

export type Domain = 'pattern' | 'spatial' | 'number' | 'verbal' | 'logic' | 'memory';
export type Level = 1 | 2 | 3;

/** One drawable shape group: what the SVG renderer needs. */
export interface Cell {
  shape: 0 | 1 | 2; // circle, square, triangle
  count: 1 | 2 | 3;
  fill: 0 | 1 | 2; // outline, solid, striped
  size: 0 | 1 | 2; // small, medium, large
  rot: number; // degrees (only visible on non-circles)
}

/** A small grid of lit squares (polyomino). w×h cells; `on` holds y*w+x indices. */
export interface Fig {
  w: number;
  h: number;
  on: number[];
}

export type Option = { kind: 'text'; text: string } | { kind: 'cell'; cell: Cell } | { kind: 'fig'; fig: Fig };

/** The picture a question is about. null entries are the missing piece. */
export type Stem =
  | { kind: 'matrix'; cells: (Cell | null)[] }
  | { kind: 'series'; cells: (Cell | null)[] }
  | { kind: 'figs'; figs: (Fig | null)[]; caption?: string; joined?: boolean }
  | { kind: 'scatter'; cells: (Cell | null)[]; cols: number };

export interface Puzzle {
  id: string;
  domain: Domain;
  level: Level;
  prompt: string;
  stem?: Stem;
  options: Option[];
  answer: number;
  explanation: string;
}

const key = (c: Cell) => `${c.shape}${c.count}${c.fill}${c.size}`;

// ---------------------------------------------------------------- matrices

type Rule = 'rowConst' | 'colConst' | 'latin' | 'latinB';
const ATTRS = ['shape', 'count', 'fill', 'size'] as const;
type Attr = (typeof ATTRS)[number];

const ATTR_LABEL: Record<Attr, string> = { shape: 'shape', count: 'number of shapes', fill: 'fill style', size: 'size' };
const RULE_TEXT: Record<Rule, string> = {
  rowConst: 'stays the same along each row and changes from row to row',
  colConst: 'stays the same down each column and changes from column to column',
  latin: 'uses each of the three values exactly once in every row and column',
  latinB: 'uses each of the three values exactly once in every row and column, in the opposite order'
};

const ruleIndex = (rule: Rule, r: number, c: number) =>
  rule === 'rowConst' ? r : rule === 'colConst' ? c : rule === 'latin' ? (r + c) % 3 : (r + 2 * c) % 3;

export function genMatrix(rng: Rng, level: Level, id: string): Puzzle {
  const varyCount = level === 1 ? 2 : level === 2 ? 3 : 4;
  const varying = shuffle(rng, ATTRS).slice(0, varyCount);
  const rules: Record<string, { rule: Rule; perm: number[] }> = {};
  const constant: Record<string, number> = {};
  const rulePool: Rule[] = level === 1 ? ['rowConst', 'colConst', 'latin'] : ['rowConst', 'colConst', 'latin', 'latinB', 'latin', 'latinB'];

  for (const a of ATTRS) {
    if (varying.includes(a)) rules[a] = { rule: pick(rng, rulePool), perm: shuffle(rng, [0, 1, 2]) };
    else constant[a] = randInt(rng, 0, 2);
  }
  // Make sure at least one attribute actually changes along each axis direction that matters
  const cellAt = (r: number, c: number): Cell => {
    const v = (a: Attr) => (rules[a] ? rules[a].perm[ruleIndex(rules[a].rule, r, c)] : constant[a]);
    return {
      shape: v('shape') as Cell['shape'],
      count: (v('count') + 1) as Cell['count'],
      fill: v('fill') as Cell['fill'],
      size: v('size') as Cell['size'],
      rot: 0
    };
  };

  const grid: Cell[] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) grid.push(cellAt(r, c));
  const correct = grid[8];

  // Distractors: change one or two attributes of the right answer
  const seen = new Set([key(correct)]);
  const distractors: Cell[] = [];
  let guard = 0;
  while (distractors.length < 5 && guard++ < 200) {
    const d: Cell = { ...correct };
    const changes = guard % 3 === 0 ? 2 : 1;
    for (const a of shuffle(rng, ATTRS).slice(0, changes)) {
      if (a === 'count') d.count = (((d.count - 1 + randInt(rng, 1, 2)) % 3) + 1) as Cell['count'];
      else d[a] = ((d[a] + randInt(rng, 1, 2)) % 3) as never;
    }
    if (!seen.has(key(d))) {
      seen.add(key(d));
      distractors.push(d);
    }
  }

  const options = shuffle(rng, [correct, ...distractors]);
  const explain = varying.map(a => `The ${ATTR_LABEL[a]} ${RULE_TEXT[rules[a].rule]}.`).join(' ');

  return {
    id,
    domain: 'pattern',
    level,
    prompt: 'Which shape completes the pattern?',
    stem: { kind: 'matrix', cells: [...grid.slice(0, 8), null] },
    options: options.map(cell => ({ kind: 'cell', cell })),
    answer: options.findIndex(o => key(o) === key(correct)),
    explanation: explain
  };
}

// ------------------------------------------------------------ odd one out

export function genOddOneOut(rng: Rng, level: Level, id: string): Puzzle {
  const base: Cell = {
    shape: pick(rng, [1, 2] as const),
    count: randInt(rng, 1, 3) as Cell['count'],
    fill: randInt(rng, 0, 2) as Cell['fill'],
    size: randInt(rng, 1, 2) as Cell['size'],
    rot: 0
  };
  const odd: Cell = { ...base };
  const differs: Attr = level === 1 ? 'shape' : pick(rng, ['fill', 'count', 'size', 'shape'] as const);
  if (differs === 'shape') odd.shape = base.shape === 1 ? 2 : 1;
  else if (differs === 'count') odd.count = ((base.count % 3) + 1) as Cell['count'];
  else if (differs === 'fill') odd.fill = ((base.fill + 1) % 3) as Cell['fill'];
  else odd.size = base.size === 1 ? 2 : 0;

  const cells: Cell[] = [];
  const oddPos = randInt(rng, 0, 5);
  for (let i = 0; i < 6; i++) {
    const c = i === oddPos ? odd : base;
    // Random rotation is a distraction on purpose: rotation never carries meaning.
    cells.push({ ...c, rot: pick(rng, [0, 45, 90, 135, 180, 225, 270, 315]) });
  }

  return {
    id,
    domain: 'pattern',
    level,
    prompt: 'One of these shapes does not belong. Which one?',
    options: cells.map(cell => ({ kind: 'cell', cell })),
    answer: oddPos,
    explanation: `Five shapes share the same ${ATTR_LABEL[differs]}; one differs. Rotation is ignored: only the ${ATTR_LABEL[differs]} sets the odd one apart.`
  };
}

// ----------------------------------------------------------- number series

const uniqueNumbers = (correct: number, extras: number[]): number[] => {
  const out = [correct];
  for (const e of extras) if (!out.includes(e) && e >= 0) out.push(e);
  let n = 1;
  while (out.length < 5) {
    const c = correct + n * (n % 2 ? 1 : -1) * 2;
    if (c >= 0 && !out.includes(c)) out.push(c);
    n++;
  }
  return out.slice(0, 5);
};

export function genSeries(rng: Rng, level: Level, id: string): Puzzle {
  let terms: number[] = [];
  let next = 0;
  let why = '';

  if (level === 1) {
    if (rng() < 0.65) {
      const start = randInt(rng, 2, 20);
      const step = randInt(rng, 2, 9);
      terms = Array.from({ length: 5 }, (_, i) => start + i * step);
      next = start + 5 * step;
      why = `Each number is ${step} more than the one before it.`;
    } else {
      const start = randInt(rng, 1, 4);
      const k = pick(rng, [2, 3] as const);
      terms = Array.from({ length: 5 }, (_, i) => start * k ** i);
      next = start * k ** 5;
      why = `Each number is ${k} times the one before it.`;
    }
  } else if (level === 2) {
    const t = randInt(rng, 0, 2);
    if (t === 0) {
      const a = randInt(rng, 2, 6);
      const b = randInt(rng, 7, 12);
      const start = randInt(rng, 1, 10);
      terms = [start];
      for (let i = 1; i < 6; i++) terms.push(terms[i - 1] + (i % 2 ? a : b));
      next = terms[5] + b;
      why = `The step alternates between +${a} and +${b}.`;
      terms = terms.slice(0, 6);
    } else if (t === 1) {
      const start = randInt(rng, 1, 5);
      const first = randInt(rng, 1, 3);
      terms = [start];
      for (let i = 0; i < 5; i++) terms.push(terms[i] + first + i);
      next = terms[5] + first + 5;
      why = `The gaps grow by 1 each time: +${first}, +${first + 1}, +${first + 2}, …`;
    } else {
      const k = randInt(rng, 0, 9);
      terms = Array.from({ length: 6 }, (_, i) => (i + 2) ** 2 + k);
      next = 8 ** 2 + k;
      why = `These are the squares 4, 9, 16, 25, … plus ${k}.`;
    }
  } else {
    const t = randInt(rng, 0, 2);
    if (t === 0) {
      const a = randInt(rng, 1, 4);
      const b = randInt(rng, 2, 6);
      terms = [a, b];
      for (let i = 2; i < 7; i++) terms.push(terms[i - 1] + terms[i - 2]);
      next = terms[5] + terms[6];
      terms = terms.slice(0, 7);
      why = 'Each number is the sum of the two numbers before it.';
    } else if (t === 1) {
      const add = randInt(rng, 1, 5);
      const start = randInt(rng, 1, 5);
      terms = [start];
      for (let i = 1; i < 7; i++) terms.push(i % 2 ? terms[i - 1] * 2 : terms[i - 1] + add);
      next = terms[6] * 2;
      why = `The rule alternates: double, then add ${add}.`;
    } else {
      // two interleaved sequences
      const a = randInt(rng, 2, 8);
      const sa = randInt(rng, 3, 9);
      const b = randInt(rng, 20, 40);
      const sb = randInt(rng, 2, 6);
      terms = [];
      for (let i = 0; i < 4; i++) {
        terms.push(a + i * sa);
        terms.push(b - i * sb);
      }
      terms = terms.slice(0, 7);
      next = b - 3 * sb;
      why = `Two patterns are interleaved: the odd positions go up by ${sa}, the even positions go down by ${sb}.`;
    }
  }

  const step = Math.abs(terms[terms.length - 1] - terms[terms.length - 2]) || 1;
  const nums = uniqueNumbers(next, [next + 1, next - 1, next + step, next - step]);
  const options = shuffle(rng, nums);
  return {
    id,
    domain: 'number',
    level,
    prompt: `What number comes next?  ${terms.join(', ')}, ?`,
    options: options.map(n => ({ kind: 'text', text: String(n) })),
    answer: options.indexOf(next),
    explanation: why
  };
}

// ------------------------------------------------- handwritten item banks

type Item = [question: string, correct: string, wrong: [string, string, string], explanation: string, level: Level];

const ANALOGIES: Item[] = [
  ['Bird is to nest as bee is to …', 'hive', ['honey', 'flower', 'sting'], 'A nest is where a bird lives; a hive is where a bee lives.', 1],
  ['Pen is to write as knife is to …', 'cut', ['sharp', 'kitchen', 'fork'], 'The first word is a tool and the second is its main action.', 1],
  ['Doctor is to hospital as teacher is to …', 'school', ['student', 'book', 'lesson'], 'Each person works in the named place.', 1],
  ['Finger is to hand as toe is to …', 'foot', ['shoe', 'nail', 'leg'], 'A finger is part of a hand; a toe is part of a foot.', 1],
  ['Fish is to swim as bird is to …', 'fly', ['nest', 'feather', 'sing'], 'Each animal moves in its typical way.', 1],
  ['Quiet is to loud as slow is to …', 'fast', ['late', 'heavy', 'soft'], 'Each pair is opposite in meaning.', 1],
  ['Glove is to hand as sock is to …', 'foot', ['shoe', 'leg', 'wool'], 'A glove covers a hand; a sock covers a foot.', 1],
  ['Cub is to bear as calf is to …', 'cow', ['bull', 'milk', 'farm'], 'The young animal and its adult.', 1],
  ['Apple is to fruit as carrot is to …', 'vegetable', ['orange', 'garden', 'soup'], 'Each item is an example of the category.', 1],
  ['Second is to minute as hour is to …', 'day', ['clock', 'week', 'night'], 'Each unit fits into the next larger unit of time.', 2],
  ['Thermometer is to temperature as ruler is to …', 'length', ['wood', 'inch', 'measure'], 'Each instrument measures the named quantity.', 2],
  ['Lion is to pride as wolf is to …', 'pack', ['den', 'howl', 'forest'], 'The name for a group of that animal.', 2],
  ['Chapter is to book as verse is to …', 'poem', ['rhyme', 'paper', 'song'], 'A chapter is a section of a book; a verse is a section of a poem.', 2],
  ['Sculptor is to statue as architect is to …', 'building', ['brick', 'blueprint', 'city'], 'Each person creates the named finished work.', 2],
  ['Brave is to cowardly as generous is to …', 'selfish', ['kind', 'rich', 'careful'], 'Each pair is opposite in meaning.', 2],
  ['Whisper is to shout as stroll is to …', 'sprint', ['walk', 'rest', 'hike'], 'A gentle form and its extreme counterpart.', 2],
  ['Drought is to water as famine is to …', 'food', ['hunger', 'farm', 'harvest'], 'Each event is a severe shortage of the named thing.', 3],
  ['Telescope is to stars as microscope is to …', 'cells', ['glass', 'lab', 'light'], 'Each instrument lets you see very distant or very small things up close.', 3],
  ['Key is to lock as password is to …', 'account', ['computer', 'letter', 'secret'], 'Each opens or grants access to what it protects.', 3],
  ['Author is to novel as composer is to …', 'symphony', ['orchestra', 'piano', 'concert'], 'Each person creates the named work.', 3]
];

const LOGIC: Item[] = [
  ['Sam is taller than Joe. Joe is taller than Lee. Who is the shortest?', 'Lee', ['Sam', 'Joe', 'Cannot be told'], 'Sam > Joe > Lee, so Lee is shortest.', 1],
  ['In a race you overtake the runner in second place. What is your position now?', 'Second', ['First', 'Third', 'Fourth'], 'You take the second place; you have not passed the leader.', 1],
  ['Today is Wednesday. What day was it ten days ago?', 'Sunday', ['Friday', 'Monday', 'Saturday'], 'Seven days ago was Wednesday; three days before that is Sunday.', 1],
  ['Two books cost 30 together and all books cost the same. What do four books cost?', '60', ['45', '120', '30'], 'Each book costs 15, so four cost 60.', 1],
  ['All bloops are razzies. All razzies are lazzies. Which statement must be true?', 'All bloops are lazzies', ['All lazzies are bloops', 'Some lazzies are not razzies', 'No bloops are lazzies'], 'Bloops fit inside razzies, which fit inside lazzies.', 2],
  ['If it rains, the match is cancelled. The match was not cancelled. What can we conclude?', 'It did not rain', ['It rained', 'The match was indoors', 'Nothing at all'], 'If rain always cancels the match, no cancellation means no rain.', 2],
  ['Pens come in packs of 6. Ana needs exactly 40 pens or more. What is the fewest packs she must buy?', '7', ['6', '8', '40'], '6 packs give 36, which is not enough; 7 packs give 42.', 2],
  ['Which word does not belong: triangle, square, circle, cube?', 'cube', ['triangle', 'square', 'circle'], 'The other three are flat shapes; a cube is three-dimensional.', 1],
  ['Pointing to a photo, Mia says: "He is my mother’s only brother’s son." How is he related to Mia?', 'Cousin', ['Brother', 'Uncle', 'Nephew'], 'Her mother’s brother is her uncle, so his son is her cousin.', 2],
  ['Some doctors are writers. All writers are readers. Which statement must be true?', 'Some doctors are readers', ['All doctors are readers', 'No doctors are readers', 'All readers are writers'], 'The doctors who are writers are also readers.', 3],
  ['If 5 machines make 5 widgets in 5 minutes, how long do 100 machines take to make 100 widgets?', '5 minutes', ['100 minutes', '20 minutes', '1 minute'], 'Each machine makes one widget in 5 minutes, so 100 machines make 100 in 5.', 3],
  ['A is north of B. B is north of C. D is east of A. Which statement must be true?', 'C is south of A', ['D is west of C', 'A is south of C', 'B is east of D'], 'A is above B and B is above C, so C is south of A.', 3],
  ['A clock shows 3:15. What is the angle between the two hands?', '7.5°', ['0°', '15°', '90°'], 'At 3:15 the minute hand is on 3 and the hour hand has moved a quarter of the way to 4, which is 7.5°.', 3]
];

function fromItem(rng: Rng, item: Item, id: string, domain: Domain): Puzzle {
  const [question, correct, wrong, explanation, level] = item;
  const options = shuffle(rng, [correct, ...wrong]);
  return {
    id,
    domain,
    level,
    prompt: question,
    options: options.map(text => ({ kind: 'text', text })),
    answer: options.indexOf(correct),
    explanation
  };
}

const takeItems = (rng: Rng, bank: Item[], level: Level, n: number, used: Set<string>) =>
  shuffle(rng, bank.filter(i => i[4] === level && !used.has(i[0]))).slice(0, n);

// ---------------------------------------------------------------- memory

export const MEMORY_SYMBOLS = ['🍎', '🚀', '🌙', '⭐', '🎈', '🐢', '🔔', '🍋', '🦊', '🎲', '🌵', '🧩'];

export function genMemory(rng: Rng): { code: string[]; puzzle: Puzzle } {
  const code = shuffle(rng, MEMORY_SYMBOLS).slice(0, 4);
  const options: string[][] = [code];
  while (options.length < 4) {
    const d = [...code];
    const i = randInt(rng, 0, 3);
    if (rng() < 0.5) {
      const j = (i + randInt(rng, 1, 3)) % 4;
      [d[i], d[j]] = [d[j], d[i]];
    } else {
      d[i] = pick(rng, MEMORY_SYMBOLS.filter(s => !code.includes(s)));
    }
    if (!options.some(o => o.join('') === d.join(''))) options.push(d);
  }
  const shuffled = shuffle(rng, options);
  return {
    code,
    puzzle: {
      id: 'memory',
      domain: 'memory',
      level: 2,
      prompt: 'At the start you memorised a four-symbol code. Which one was it?',
      options: shuffled.map(o => ({ kind: 'text', text: o.join('  ') })),
      answer: shuffled.findIndex(o => o.join('') === code.join('')),
      explanation: `The code was ${code.join('  ')}. Order matters as well as the symbols.`
    }
  };
}

// ------------------------------------------------------------ whole test

export type TestMode = 'full' | 'daily';

export interface TestSet {
  seed: number;
  mode: TestMode;
  memoryCode: string[] | null;
  puzzles: Puzzle[];
}

export function buildTest(seed: number, mode: TestMode): TestSet {
  const rng = mulberry32(seed);
  const used = new Set<string>();
  let n = 0;
  const nid = (p: string) => `${p}-${++n}`;
  const bank = (items: Item[], domain: Domain, level: Level): Puzzle => {
    const it = takeItems(rng, items, level, 1, used)[0];
    used.add(it[0]);
    return fromItem(rng, it, nid(domain), domain);
  };

  // Every kind of puzzle, keyed so each tier can mix them without two similar ones in a row.
  const make: Record<string, (level: Level) => Puzzle> = {
    matrix: l => genMatrix(rng, l, nid('m')),
    odd: l => genOddOneOut(rng, l, nid('o')),
    series: l => genShapeSeries(rng, l, nid('s')),
    count: l => genCount(rng, l, nid('c')),
    mirror: l => genMirror(rng, l, nid('mi')),
    rotate: l => genRotation(rng, l, nid('r')),
    symmetry: l => genSymmetry(rng, l, nid('sy')),
    number: l => genSeries(rng, l, nid('n')),
    word: l => bank(ANALOGIES, 'verbal', l),
    logic: l => bank(LOGIC, 'logic', l)
  };

  if (mode === 'daily') {
    const order: [string, Level][] = [
      ['number', 1],
      ['mirror', 1],
      ['matrix', 2],
      ['word', 2],
      ['rotate', 2],
      ['logic', 2]
    ];
    return { seed, mode, memoryCode: null, puzzles: order.map(([k, l]) => make[k](l)) };
  }

  const { code, puzzle: memory } = genMemory(rng);
  const tiers: [Level, string[]][] = [
    [1, ['number', 'matrix', 'word', 'mirror', 'logic', 'count', 'series']],
    [2, ['matrix', 'rotate', 'number', 'word', 'symmetry', 'odd', 'logic']],
    [3, ['mirror', 'matrix', 'number', 'symmetry', 'word', 'rotate']]
  ];
  const puzzles = tiers.flatMap(([level, kinds]) => kinds.map(k => make[k](level)));
  return { seed, mode, memoryCode: code, puzzles: [...puzzles, memory] };
}

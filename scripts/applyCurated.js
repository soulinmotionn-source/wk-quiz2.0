/**
 * Merge scripts/curated/questions.mjs into src/data/questions/*.json.
 *
 *  1. Deactivates bulk questions whose correct answer is much longer than every
 *     distractor (a test-taking giveaway that makes quizzes trivially easy).
 *  2. Appends the hand-written curated questions (idempotent: re-running
 *     replaces earlier curated entries instead of duplicating them).
 *
 *   node scripts/applyCurated.js
 */
import fs from 'node:fs';
import path from 'node:path';
import { CURATED } from './curated/questions.mjs';

const DIR = path.resolve('src/data/questions');
const SUB_MAP = { 'Alcohol and Drugs': 'Safe Driving Practices', 'Anatomy & Pathology': 'Clinical Assessment' };
const GIVEAWAY_RATIO = 1.25;

for (const [slug, entries] of Object.entries(CURATED)) {
  const file = path.join(DIR, `${slug}.json`);
  const all = JSON.parse(fs.readFileSync(file, 'utf8'));
  const category = all[0].category;

  const bulk = all.filter(q => !q.id.includes('-curated-'));
  let deactivated = 0;
  for (const q of bulk) {
    const correct = q.options[q.correctAnswer].length;
    const longestOther = Math.max(...q.options.filter((_, i) => i !== q.correctAnswer).map(o => o.length));
    const giveaway = correct >= GIVEAWAY_RATIO * longestOther;
    if (giveaway && q.active !== false) {
      q.active = false;
      deactivated++;
    } else if (!giveaway && q.active === false && q.__why !== 'manual') {
      // restore anything a previous run deactivated that no longer qualifies
      q.active = true;
    }
  }

  const curated = entries.map(([sub, difficulty, question, correct, distractors, explanation, tags], i) => {
    const pos = i % 4; // spread the stored position; the player reshuffles anyway
    const options = [...distractors];
    options.splice(pos, 0, correct);
    return {
      id: `${slug}-curated-${String(i + 1).padStart(3, '0')}`,
      category,
      subcategory: SUB_MAP[sub] ?? sub,
      difficulty,
      question,
      options,
      correctAnswer: pos,
      explanation,
      tags,
      active: true
    };
  });

  fs.writeFileSync(file, JSON.stringify([...bulk, ...curated], null, 2) + '\n');
  const active = bulk.filter(q => q.active !== false).length + curated.length;
  console.log(`${slug}: deactivated ${deactivated} giveaway questions, added ${curated.length} curated → ${active} active`);
}

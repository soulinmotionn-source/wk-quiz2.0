/**
 * Question-bank quality audit. Flags patterns that make a bank look
 * auto-generated or unreliable, so they can be fixed or deactivated.
 *
 *   node scripts/auditQuestions.js [category-slug ...]
 */
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.resolve('src/data/questions');
const only = process.argv.slice(2);
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json') && (only.length === 0 || only.includes(f.replace('.json', ''))));

const norm = s => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const stem = s => norm(s).split(' ').slice(0, 6).join(' ');

for (const f of files) {
  const qs = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  const issues = { shortExplanation: [], stemRepeats: {}, allAbove: [], answerPos: [0, 0, 0, 0, 0, 0], dupOptions: [], longestIsAnswer: 0, stateDependent: [] };
  const stems = {};
  for (const q of qs) {
    if (q.explanation.length < 70) issues.shortExplanation.push(q.id);
    stems[stem(q.question)] = (stems[stem(q.question)] || 0) + 1;
    if (q.options.some(o => /all of the above|none of the above/i.test(o))) issues.allAbove.push(q.id);
    issues.answerPos[q.correctAnswer]++;
    if (new Set(q.options.map(norm)).size !== q.options.length) issues.dupOptions.push(q.id);
    const longest = q.options.reduce((a, b) => (b.length > a.length ? b : a));
    if (longest === q.options[q.correctAnswer]) issues.longestIsAnswer++;
    if (/unless otherwise posted|statutory|in most states|some states/i.test(q.question + q.explanation + q.options.join(' '))) issues.stateDependent.push(q.id);
  }
  const repeats = Object.entries(stems).filter(([, n]) => n >= 4).sort((a, b) => b[1] - a[1]);
  console.log(`\n=== ${f.replace('.json', '')} (${qs.length})`);
  console.log(`  short explanations (<70 chars): ${issues.shortExplanation.length}`);
  console.log(`  correct = longest option: ${issues.longestIsAnswer} (${Math.round((issues.longestIsAnswer / qs.length) * 100)}%)`);
  console.log(`  answer position A/B/C/D: ${issues.answerPos.slice(0, 4).join('/')}`);
  console.log(`  all/none of the above: ${issues.allAbove.length}, duplicate options: ${issues.dupOptions.length}`);
  console.log(`  state/jurisdiction-dependent wording: ${issues.stateDependent.length}`);
  console.log(`  repeated question openings (>=4x): ${repeats.slice(0, 5).map(([s, n]) => `"${s}" x${n}`).join('; ') || 'none'}`);
}

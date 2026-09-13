import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const questionsDir = path.resolve(__dirname, '../src/data/questions');

const ALLOWED_DIFFICULTIES = ['easy', 'medium', 'hard', 'expert'];

console.log('🔍 WKQuiz Question Bank Validator running...');

if (!fs.existsSync(questionsDir)) {
  console.error(`❌ Question directory not found: ${questionsDir}`);
  process.exit(1);
}

const files = fs.readdirSync(questionsDir).filter(file => file.endsWith('.json'));

let totalQuestions = 0;
let errors = [];
const seenIds = new Set();

for (const file of files) {
  const filePath = path.join(questionsDir, file);
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const questions = JSON.parse(rawData);

    if (!Array.isArray(questions)) {
      errors.push(`${file}: Root element is not an Array.`);
      continue;
    }

    questions.forEach((q, index) => {
      totalQuestions++;
      const prefix = `[${file} #${index + 1} ID: "${q.id || 'MISSING'}"]`;

      // 1. Check ID
      if (!q.id || typeof q.id !== 'string' || q.id.trim() === '') {
        errors.push(`${prefix}: Missing or empty 'id'.`);
      } else if (seenIds.has(q.id)) {
        errors.push(`${prefix}: Duplicate question ID detected: "${q.id}".`);
      } else {
        seenIds.add(q.id);
      }

      // 2. Check Question Text
      if (!q.question || typeof q.question !== 'string' || q.question.trim() === '') {
        errors.push(`${prefix}: Question text is missing or empty.`);
      }

      // 3. Check Category
      if (!q.category || typeof q.category !== 'string' || q.category.trim() === '') {
        errors.push(`${prefix}: Category is missing.`);
      }

      // 4. Check Difficulty
      if (!q.difficulty || !ALLOWED_DIFFICULTIES.includes(q.difficulty)) {
        errors.push(`${prefix}: Invalid difficulty "${q.difficulty}". Allowed: ${ALLOWED_DIFFICULTIES.join(', ')}.`);
      }

      // 5. Check Options
      if (!Array.isArray(q.options) || q.options.length < 2) {
        errors.push(`${prefix}: Must have at least 2 options.`);
      } else {
        const optionTexts = new Set();
        q.options.forEach((opt, optIdx) => {
          if (typeof opt !== 'string' || opt.trim() === '') {
            errors.push(`${prefix}: Option ${optIdx} is blank or not a string.`);
          }
          if (optionTexts.has(opt.trim().toLowerCase())) {
            errors.push(`${prefix}: Duplicate option text: "${opt}".`);
          }
          optionTexts.add(opt.trim().toLowerCase());
        });

        // 6. Check Correct Answer
        if (typeof q.correctAnswer !== 'number' || !Number.isInteger(q.correctAnswer)) {
          errors.push(`${prefix}: correctAnswer must be an integer index.`);
        } else if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
          errors.push(`${prefix}: correctAnswer index ${q.correctAnswer} is out of bounds for ${q.options.length} options.`);
        }
      }
    });

  } catch (err) {
    errors.push(`${file}: Failed to parse JSON: ${err.message}`);
  }
}

console.log(`\n📊 Validated ${totalQuestions} questions across ${files.length} question files.`);

if (errors.length > 0) {
  console.error(`\n❌ Found ${errors.length} validation errors:`);
  errors.forEach(err => console.error(` - ${err}`));
  process.exit(1);
} else {
  console.log('✅ ALL QUESTIONS PASSED VALIDATION! Ready for production.\n');
}

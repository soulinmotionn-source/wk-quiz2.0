import fs from 'node:fs';
import path from 'node:path';

const QUESTIONS_DIR = path.resolve('src/data/questions');
const GENERATED_DIR = path.resolve('src/generated');
const OUTPUT_FILE = path.join(GENERATED_DIR, 'question-stats.json');

if (!fs.existsSync(GENERATED_DIR)) {
  fs.mkdirSync(GENERATED_DIR, { recursive: true });
}

function generateStats() {
  const files = fs.readdirSync(QUESTIONS_DIR).filter(f => f.endsWith('.json'));

  let totalQuestions = 0;
  let activeQuestions = 0;
  let inactiveQuestions = 0;

  const questionsByCategory = {};
  const questionsBySubcategory = {};
  const questionsByDifficulty = { easy: 0, medium: 0, hard: 0 };
  const categories = {};

  for (const file of files) {
    const filePath = path.join(QUESTIONS_DIR, file);
    const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const q of questions) {
      totalQuestions++;
      if (q.active !== false) {
        activeQuestions++;

        // Category count
        questionsByCategory[q.category] = (questionsByCategory[q.category] || 0) + 1;

        // Subcategory count
        const subKey = `${q.category} > ${q.subcategory}`;
        questionsBySubcategory[subKey] = (questionsBySubcategory[subKey] || 0) + 1;

        // Difficulty count
        if (questionsByDifficulty[q.difficulty] !== undefined) {
          questionsByDifficulty[q.difficulty]++;
        }

        // Detailed category stats
        const catSlug = file.replace('.json', '');
        if (!categories[catSlug]) {
          categories[catSlug] = {
            name: q.category,
            total: 0,
            easy: 0,
            medium: 0,
            hard: 0,
            subcategories: {}
          };
        }
        categories[catSlug].total++;
        if (categories[catSlug][q.difficulty] !== undefined) {
          categories[catSlug][q.difficulty]++;
        }
        categories[catSlug].subcategories[q.subcategory] = (categories[catSlug].subcategories[q.subcategory] || 0) + 1;
      } else {
        inactiveQuestions++;
      }
    }
  }

  const statsPayload = {
    generatedAt: new Date().toISOString(),
    totalQuestions,
    activeQuestions,
    inactiveQuestions,
    questionsByCategory,
    questionsBySubcategory,
    questionsByDifficulty,
    categories
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(statsPayload, null, 2), 'utf8');
  console.log(`📊 Generated question-stats.json -> ${OUTPUT_FILE}`);
  console.log(`   Total Active Questions: ${activeQuestions.toLocaleString()} across ${Object.keys(categories).length} categories.`);
}

generateStats();

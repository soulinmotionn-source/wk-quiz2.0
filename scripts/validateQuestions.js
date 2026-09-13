import fs from 'node:fs';
import path from 'node:path';

const QUESTIONS_DIR = path.resolve('src/data/questions');

// 33 Approved categories and their allowed subcategories
const APPROVED_CATEGORY_SUBCATS = {
  'Nursing': ['Fundamentals', 'Patient Safety', 'Clinical Judgment', 'Infection Control'],
  'NCLEX': ['Priority & Delegation', 'Safe & Effective Care', 'Health Promotion', 'Pharmacological Therapies'],
  'Medical': ['Medical Terminology', 'Clinical Assessment', 'Cardiology', 'Pathophysiology'],
  'Anatomy & Physiology': ['Skeletal System', 'Organ Systems', 'Cardiovascular System', 'Nervous System'],
  'Pharmacology': ['Cardiovascular Pharmacology', 'Antibiotics & Antivirals', 'Antidotes & Toxicity', 'Endocrine Pharmacology'],
  'Diseases & Disorders': ['Chronic Illness', 'Infectious Diseases', 'Autoimmune Disorders', 'Emergency Conditions'],
  'General Knowledge': ['World Trivia', 'Nature & Geography', 'Culture & Arts', 'Curiosities'],
  'History': ['US History', 'World History', 'Ancient Civilizations', 'Modern Milestones'],
  'Geography': ['US State Capitals', 'World Capitals', 'Physical Geography', 'Nations & Territories'],
  'Science': ['Cell Biology', 'Chemistry', 'Physics', 'Earth & Astronomy'],
  'Engineering': ['Mechanical Engineering', 'Civil Structures', 'Materials Science', 'Fluid Dynamics'],
  'Electrical': ['Basic Circuits', 'Power Calculations', 'Wiring & Codes', 'Electrical Safety'],
  'Electrical Symbols': ['Schematic Symbols', 'Passive Components', 'Semiconductor Symbols', 'Switch & Relay Symbols'],
  'Electronics': ['Semiconductors', 'Digital Logic', 'Microcontrollers', 'Amplifiers & Filters'],
  'HVAC': ['Refrigeration Cycle', 'Airflow & Ventilation', 'Heating Principles', 'EPA & Safety'],
  'Technology': ['Web & Software', 'Networking & Security', 'Operating Systems', 'Data & Cloud'],
  'Computers': ['Hardware Architecture', 'Memory & Storage', 'Motherboards & Buses', 'Peripherals & Ports'],
  'Automotive': ['Engine Mechanics', 'Brakes & Suspension', 'Electrical & Diagnostics', 'Transmissions'],
  'IQ & Logic': ['Pattern Sequences', 'Spatial Reasoning', 'Logical Deductions', 'Lateral Thinking'],
  'Mathematics': ['Mental Math & Arithmetic', 'Algebra & Equations', 'Geometry & Angles', 'Percentages & Ratios'],
  'English & Grammar': ['Parts of Speech', 'Punctuation & Syntax', 'Vocabulary & Etymology', 'Common Errors'],
  'USA Tests': ['US Civics', 'US Constitution', 'American Government', 'Rights & Symbols'],
  'DMV Test': ['Rules of the Road', 'Traffic Signs', 'Right of Way', 'Safe Driving Practices'],
  'License Plate Quiz': ['State Slogans', 'Plate Motifs', 'Regional Nicknames', 'Historical Plates'],
  'Entertainment': ['Pop Culture', 'Franchises & Fandoms', 'Streaming Hits', 'Trivia Milestones'],
  'Movies': ['Classic Cinema', 'Oscar Winners', 'Famous Quotes', 'Blockbusters'],
  'TV Shows': ['Sitcoms', 'Drama Series', 'TV History', 'Iconic Episodes'],
  'Drama': ['Shakespeare', 'Modern Theater', 'Dramatic Arts', 'Stage Trivia'],
  'Celebrity': ['Hollywood Icons', 'Music Icons', 'Biographical Facts', 'Award Records'],
  'Music': ['Rock & Pop', 'Music Theory', 'Classical Masters', 'Musical Instruments'],
  'Cartoon Characters': ['Classic Cartoons', 'Disney & Pixar', 'Modern Animation', 'Superhero Cartoons'],
  'Relationships': ['Communication', 'Conflict Resolution', 'Emotional Intelligence', 'Friendship & Trust'],
  'Wisdom': ['Proverbs & Sayings', 'Ethics & Philosophy', 'Life Lessons', 'Mindfulness']
};

const ALLOWED_DIFFICULTIES = new Set(['easy', 'medium', 'hard']);

function validateQuestionBank() {
  console.log('🔍 WKQuiz 5,000-Question Bank Build Validator running...\n');

  if (!fs.existsSync(QUESTIONS_DIR)) {
    console.error(`❌ Missing directory: ${QUESTIONS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(QUESTIONS_DIR).filter(f => f.endsWith('.json'));
  if (files.length === 0) {
    console.error(`❌ No JSON question files found in ${QUESTIONS_DIR}`);
    process.exit(1);
  }

  let totalQuestions = 0;
  let activeQuestions = 0;
  let inactiveQuestions = 0;

  const questionsByCategory = {};
  const questionsBySubcategory = {};
  const questionsByDifficulty = { easy: 0, medium: 0, hard: 0 };
  const categoryDifficultyCounts = {};

  const seenIds = new Set();
  const seenQuestionTexts = new Set();
  const errors = [];
  const warnings = [];

  for (const file of files) {
    const filePath = path.join(QUESTIONS_DIR, file);
    let items;
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      items = JSON.parse(raw);
    } catch (err) {
      errors.push(`[${file}] Invalid JSON syntax: ${err.message}`);
      continue;
    }

    if (!Array.isArray(items)) {
      errors.push(`[${file}] File content must be a JSON array of questions.`);
      continue;
    }

    for (let idx = 0; idx < items.length; idx++) {
      const q = items[idx];
      const qLocation = `${file} (index #${idx})`;
      totalQuestions++;

      // 1. Validate ID
      if (!q.id || typeof q.id !== 'string') {
        errors.push(`[${qLocation}] Missing or invalid 'id'.`);
      } else {
        if (!/^[a-z0-9-]+$/.test(q.id)) {
          errors.push(`[${qLocation}] ID '${q.id}' must be lowercase alphanumeric with hyphens.`);
        }
        if (seenIds.has(q.id)) {
          errors.push(`[${qLocation}] Duplicate ID detected: '${q.id}'. IDs must be universally unique.`);
        }
        seenIds.add(q.id);
      }

      // 2. Validate Category
      if (!q.category || !APPROVED_CATEGORY_SUBCATS[q.category]) {
        errors.push(`[${qLocation}] Invalid category: '${q.category}'. Must match approved registry.`);
      }

      // 3. Validate Subcategory
      if (q.category && APPROVED_CATEGORY_SUBCATS[q.category]) {
        const allowedSubs = APPROVED_CATEGORY_SUBCATS[q.category];
        if (!q.subcategory || !allowedSubs.includes(q.subcategory)) {
          errors.push(`[${qLocation}] Subcategory '${q.subcategory}' is not valid for category '${q.category}'. Allowed: ${allowedSubs.join(', ')}`);
        }
      }

      // 4. Validate Difficulty
      if (!q.difficulty || !ALLOWED_DIFFICULTIES.has(q.difficulty)) {
        errors.push(`[${qLocation}] Invalid difficulty '${q.difficulty}'. Allowed: easy, medium, hard.`);
      }

      // 5. Validate Question text
      if (!q.question || typeof q.question !== 'string' || q.question.trim().length === 0) {
        errors.push(`[${qLocation}] Question text cannot be empty.`);
      } else {
        const normalizedText = q.question.toLowerCase().trim();
        if (seenQuestionTexts.has(normalizedText)) {
          errors.push(`[${qLocation}] Exact duplicate question text found: "${q.question}"`);
        }
        seenQuestionTexts.add(normalizedText);
      }

      // 6. Validate Options
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        errors.push(`[${qLocation}] Question must have exactly 4 options. Found: ${Array.isArray(q.options) ? q.options.length : 'non-array'}`);
      } else {
        const optionSet = new Set();
        for (let optIdx = 0; optIdx < q.options.length; optIdx++) {
          const opt = q.options[optIdx];
          if (typeof opt !== 'string' || opt.trim().length === 0) {
            errors.push(`[${qLocation}] Option #${optIdx} is empty.`);
          } else {
            const cleanOpt = opt.toLowerCase().trim();
            if (optionSet.has(cleanOpt)) {
              errors.push(`[${qLocation}] Duplicate option text found: "${opt}"`);
            }
            optionSet.add(cleanOpt);
          }
        }
      }

      // 7. Validate Correct Answer index
      if (typeof q.correctAnswer !== 'number' || !Number.isInteger(q.correctAnswer) || q.correctAnswer < 0 || q.correctAnswer > 3) {
        errors.push(`[${qLocation}] 'correctAnswer' must be a 0-based integer index between 0 and 3. Found: ${q.correctAnswer}`);
      }

      // 8. Validate Explanation
      if (!q.explanation || typeof q.explanation !== 'string' || q.explanation.trim().length === 0) {
        errors.push(`[${qLocation}] Missing or empty 'explanation'.`);
      }

      // 9. Validate Tags
      if (!Array.isArray(q.tags) || q.tags.length === 0) {
        errors.push(`[${qLocation}] 'tags' must be a non-empty array of strings.`);
      }

      // 10. Active flag & Counters
      const isActive = q.active !== false;
      if (isActive) {
        activeQuestions++;
        questionsByCategory[q.category] = (questionsByCategory[q.category] || 0) + 1;
        
        const subKey = `${q.category} > ${q.subcategory}`;
        questionsBySubcategory[subKey] = (questionsBySubcategory[subKey] || 0) + 1;

        if (ALLOWED_DIFFICULTIES.has(q.difficulty)) {
          questionsByDifficulty[q.difficulty]++;
          if (!categoryDifficultyCounts[q.category]) {
            categoryDifficultyCounts[q.category] = { easy: 0, medium: 0, hard: 0 };
          }
          categoryDifficultyCounts[q.category][q.difficulty]++;
        }
      } else {
        inactiveQuestions++;
      }
    }
  }

  // 11. Consistency Checks (Section 16)
  let consistencyErrors = 0;

  // A. Category Total = Sum of its Active Subcategories
  for (const category of Object.keys(questionsByCategory)) {
    const catTotal = questionsByCategory[category];
    const subSum = Object.entries(questionsBySubcategory)
      .filter(([key]) => key.startsWith(`${category} > `))
      .reduce((sum, [, count]) => sum + count, 0);

    if (catTotal !== subSum) {
      errors.push(`[Consistency Error] Category '${category}' total (${catTotal}) does not equal sum of its subcategories (${subSum}).`);
      consistencyErrors++;
    }

    // B. Category Total = Sum of its Difficulty Counts
    const diffCounts = categoryDifficultyCounts[category] || { easy: 0, medium: 0, hard: 0 };
    const diffSum = diffCounts.easy + diffCounts.medium + diffCounts.hard;
    if (catTotal !== diffSum) {
      errors.push(`[Consistency Error] Category '${category}' total (${catTotal}) does not equal sum of its difficulty counts (${diffSum}).`);
      consistencyErrors++;
    }
  }

  // C. Global Total = Sum of all Active Category Questions
  const globalCategorySum = Object.values(questionsByCategory).reduce((a, b) => a + b, 0);
  if (activeQuestions !== globalCategorySum) {
    errors.push(`[Consistency Error] Global active questions (${activeQuestions}) does not equal sum of category questions (${globalCategorySum}).`);
    consistencyErrors++;
  }

  // Global Total = Sum of all Difficulties
  const globalDiffSum = questionsByDifficulty.easy + questionsByDifficulty.medium + questionsByDifficulty.hard;
  if (activeQuestions !== globalDiffSum) {
    errors.push(`[Consistency Error] Global active questions (${activeQuestions}) does not equal sum of difficulty questions (${globalDiffSum}).`);
    consistencyErrors++;
  }

  // Print Validation Report
  console.log('========================================================');
  console.log('             WKQUIZ QUESTION BANK REPORT');
  console.log('========================================================');
  console.log(`Total Files Validated : ${files.length}`);
  console.log(`Total Questions Stored: ${totalQuestions.toLocaleString()}`);
  console.log(`Active Questions      : ${activeQuestions.toLocaleString()}`);
  console.log(`Inactive Questions    : ${inactiveQuestions.toLocaleString()}`);
  console.log('--------------------------------------------------------');
  console.log('DIFFICULTY BREAKDOWN (Active):');
  console.log(`  Easy   : ${questionsByDifficulty.easy.toLocaleString()}`);
  console.log(`  Medium : ${questionsByDifficulty.medium.toLocaleString()}`);
  console.log(`  Hard   : ${questionsByDifficulty.hard.toLocaleString()}`);
  console.log(`  Total  : ${globalDiffSum.toLocaleString()}`);
  console.log('--------------------------------------------------------');
  console.log(`ACTIVE CATEGORIES (${Object.keys(questionsByCategory).length}):`);
  for (const [cat, cnt] of Object.entries(questionsByCategory).sort((a, b) => b[1] - a[1])) {
    console.log(`  - ${cat.padEnd(24)}: ${cnt} Questions`);
  }
  console.log('========================================================\n');

  if (errors.length > 0) {
    console.error(`❌ VALIDATION FAILED WITH ${errors.length} ERROR(S):\n`);
    errors.forEach(e => console.error(`  • ${e}`));
    process.exit(1);
  }

  console.log(`✅ ALL ${totalQuestions.toLocaleString()} QUESTIONS PASSED VALIDATION!`);
  console.log('   Data consistency verified: 100% compliant with WKQuiz canonical rules.\n');
  return {
    totalQuestions,
    activeQuestions,
    inactiveQuestions,
    questionsByCategory,
    questionsBySubcategory,
    questionsByDifficulty,
    categoryDifficultyCounts
  };
}

validateQuestionBank();

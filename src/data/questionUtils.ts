import type { Question, ShuffledQuestion, Difficulty } from '../types/quiz';

export function normalizeKey(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Fisher-Yates array shuffle (in-place clone)
 */
export function shuffleArray<T>(array: T[], seed?: number): T[] {
  const result = [...array];
  let currentSeed = seed;

  const getRandom = () => {
    if (typeof currentSeed === 'number') {
      currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
      return currentSeed / 4294967296;
    }
    return Math.random();
  };

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(getRandom() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function cleanQuestionText(raw: string): string {
  if (!raw) return '';
  let cleaned = raw.trim();

  // Strip trailing reference tags like (Ref #12), (Scenario #3), (Item #5), [Ref #...], etc.
  cleaned = cleaned.replace(/\s*[\(\[]\s*(?:Ref|Scenario|Item|Q|Question)?\s*#?\s*\d+\s*[\)\]]\s*$/i, '');
  cleaned = cleaned.replace(/\s*\(Ref #[0-9]+\)/gi, '');
  cleaned = cleaned.replace(/\s*\(Scenario #[0-9]+\)/gi, '');
  cleaned = cleaned.replace(/\s*\(Item #[0-9]+\)/gi, '');

  // Strip leading category phrases like:
  // "In clinical medicine, "
  // "In clinical nursing practice, "
  // "Regarding cinema and movie history: "
  // "In world and American history: "
  // "In electrical systems and engineering, "
  cleaned = cleaned.replace(/^(?:In\s+[a-zA-Z\s&,-]+(?:,|:)\s*)/i, '');
  cleaned = cleaned.replace(/^(?:Regarding\s+[a-zA-Z\s&,-]+(?:,|:)\s*)/i, '');
  cleaned = cleaned.replace(/^(?:When\s+considering\s+[a-zA-Z\s&,-]+(?:,|:)\s*)/i, '');

  // Capitalize the first character of the cleaned question
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  return cleaned;
}

export function prepareShuffledQuestion(q: Question, seed?: number): ShuffledQuestion {
  const correctOptionText = q.options[q.correctAnswer];
  const shuffledOptions = shuffleArray(q.options, seed);
  const newCorrectIndex = shuffledOptions.indexOf(correctOptionText);

  return {
    originalId: q.id,
    category: q.category,
    subcategory: q.subcategory,
    difficulty: q.difficulty,
    question: cleanQuestionText(q.question),
    options: shuffledOptions,
    correctAnswer: newCorrectIndex,
    explanation: q.explanation,
    tags: q.tags || []
  };
}

export interface QuizFilterOptions {
  category?: string;
  subcategory?: string;
  difficulty?: Difficulty;
  count?: number;
  seed?: number;
}

/**
 * Pure quiz-generation logic. Takes an already-loaded question pool
 * (no data fetching here) so it can run on any subset of the bank.
 */
export function buildQuizQuestions(pool: Question[], options: QuizFilterOptions = {}): ShuffledQuestion[] {
  let workingPool: Question[] = pool;

  // Prioritize subcategory if provided, but never truncate below count if more questions exist in same category
  if (options.subcategory && workingPool.length > 0) {
    const subKey = normalizeKey(options.subcategory);
    const subFiltered = workingPool.filter(q => normalizeKey(q.subcategory).includes(subKey));
    if (subFiltered.length > 0) {
      if (options.count && subFiltered.length < options.count) {
        const remaining = workingPool.filter(q => !normalizeKey(q.subcategory).includes(subKey));
        workingPool = [...subFiltered, ...remaining];
      } else {
        workingPool = subFiltered;
      }
    }
  }

  // Prioritize difficulty if provided, but never truncate below count if more questions exist in same category
  if (options.difficulty && options.difficulty !== 'mixed' && workingPool.length > 0) {
    const diffFiltered = workingPool.filter(q => q.difficulty === options.difficulty);
    if (diffFiltered.length > 0) {
      if (options.count && diffFiltered.length < options.count) {
        const remaining = workingPool.filter(q => q.difficulty !== options.difficulty);
        workingPool = [...diffFiltered, ...remaining];
      } else {
        workingPool = diffFiltered;
      }
    }
  }

  if (workingPool.length === 0) {
    return [];
  }

  // Strictly de-duplicate pool by cleaned question text so no quiz session ever has duplicate questions
  const uniquePool: Question[] = [];
  const seenTexts = new Set<string>();
  for (const q of workingPool) {
    const norm = cleanQuestionText(q.question).toLowerCase();
    if (!seenTexts.has(norm)) {
      seenTexts.add(norm);
      uniquePool.push(q);
    }
  }

  const shuffledPool = shuffleArray(uniquePool, options.seed);
  const limit = options.count && options.count > 0 ? Math.min(options.count, shuffledPool.length) : Math.min(10, shuffledPool.length);
  const selected = shuffledPool.slice(0, limit);

  return selected.map(q => prepareShuffledQuestion(q, options.seed));
}

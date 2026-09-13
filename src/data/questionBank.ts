import type { Question, ShuffledQuestion, Difficulty } from '../types/quiz';

import nursingQuestions from './questions/nursing.json';
import medicalQuestions from './questions/medical.json';
import pharmacologyQuestions from './questions/pharmacology.json';
import anatomyQuestions from './questions/anatomy.json';
import geographyQuestions from './questions/geography.json';
import scienceQuestions from './questions/science.json';
import technologyQuestions from './questions/technology.json';
import electricalQuestions from './questions/electrical.json';
import historyQuestions from './questions/history.json';
import entertainmentQuestions from './questions/entertainment.json';
import usaTestsQuestions from './questions/usa-tests.json';
import mathematicsQuestions from './questions/mathematics.json';
import generalKnowledgeQuestions from './questions/general-knowledge.json';

// Aggregate all verified question banks
const ALL_QUESTIONS: Question[] = [
  ...(nursingQuestions as Question[]),
  ...(medicalQuestions as Question[]),
  ...(pharmacologyQuestions as Question[]),
  ...(anatomyQuestions as Question[]),
  ...(geographyQuestions as Question[]),
  ...(scienceQuestions as Question[]),
  ...(technologyQuestions as Question[]),
  ...(electricalQuestions as Question[]),
  ...(historyQuestions as Question[]),
  ...(entertainmentQuestions as Question[]),
  ...(usaTestsQuestions as Question[]),
  ...(mathematicsQuestions as Question[]),
  ...(generalKnowledgeQuestions as Question[])
].filter(q => q.active !== false);

/**
 * Normalizes text for strict, resilient key matching
 */
function normalizeKey(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Explicit mapping of subcategories, aliases, and slugs to their target category/subcategory
 */
const CATEGORY_MAP: Record<string, { category: string; subcategory?: string }> = {
  // Nursing & NCLEX
  'nursing': { category: 'Nursing' },
  'nclex': { category: 'Nursing' },
  'nursingnclex': { category: 'Nursing' },

  // Medical & Healthcare
  'medical': { category: 'Medical' },
  'medicalterminology': { category: 'Medical' },
  'pharmacology': { category: 'Pharmacology' },
  'anatomy': { category: 'Anatomy & Physiology' },
  'anatomyphysiology': { category: 'Anatomy & Physiology' },
  'skeletalsystem': { category: 'Anatomy & Physiology', subcategory: 'Skeletal System' },

  // Geography
  'geography': { category: 'Geography' },
  'usstatecapitals': { category: 'Geography', subcategory: 'US State Capitals' },
  'worldgeography': { category: 'Geography' },

  // Science & Tech
  'science': { category: 'Science' },
  'generalscience': { category: 'Science' },
  'technology': { category: 'Technology' },
  'computers': { category: 'Technology' },
  'electrical': { category: 'Electrical' },
  'electricalsymbols': { category: 'Electrical', subcategory: 'Electrical Symbols' },
  'electronics': { category: 'Electrical' },

  // History & Civics
  'history': { category: 'History' },
  'ushistory': { category: 'History' },
  'worldhistory': { category: 'History' },
  'usatests': { category: 'USA Tests' },
  'dmv': { category: 'USA Tests', subcategory: 'DMV Test' },
  'dmvtest': { category: 'USA Tests', subcategory: 'DMV Test' },
  'civics': { category: 'USA Tests' },

  // Mathematics & Logic
  'mathematics': { category: 'Mathematics' },
  'math': { category: 'Mathematics' },
  'speedmath': { category: 'Mathematics' },
  'iqlogic': { category: 'Mathematics' },

  // Entertainment
  'entertainment': { category: 'Entertainment' },
  'cartooncharacters': { category: 'Entertainment', subcategory: 'Cartoon Characters' },
  'movies': { category: 'Entertainment', subcategory: 'Movies' },

  // General
  'generalknowledge': { category: 'General Knowledge' },
  'general': { category: 'General Knowledge' }
};

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

/**
 * Shuffle answer options while maintaining reference to the correct option text.
 */
export function prepareShuffledQuestion(q: Question, seed?: number): ShuffledQuestion {
  const correctOptionText = q.options[q.correctAnswer];
  const shuffledOptions = shuffleArray(q.options, seed);
  const newCorrectIndex = shuffledOptions.indexOf(correctOptionText);

  return {
    originalId: q.id,
    category: q.category,
    subcategory: q.subcategory,
    difficulty: q.difficulty,
    question: q.question,
    options: shuffledOptions,
    correctAnswer: newCorrectIndex,
    explanation: q.explanation,
    tags: q.tags || []
  };
}

export function getAllQuestions(): Question[] {
  return ALL_QUESTIONS;
}

/**
 * Robust category filtering:
 * 1. Checks explicit alias mapping (e.g. 'nclex' -> Nursing, 'dmv-test' -> USA Tests).
 * 2. Matches normalized category name strictly.
 * 3. Never returns mixed questions from other categories when a specific category is requested.
 */
export function getQuestionsByCategory(categoryNameOrSlug: string): Question[] {
  const cleanTarget = categoryNameOrSlug.trim();
  const normalized = normalizeKey(cleanTarget);

  // Mixed or All request
  if (normalized === 'mixedquiz' || normalized === 'all' || normalized === 'sampler') {
    return ALL_QUESTIONS;
  }

  // Check alias mapping
  const mapped = CATEGORY_MAP[normalized];
  if (mapped) {
    let matches = ALL_QUESTIONS.filter(q => normalizeKey(q.category) === normalizeKey(mapped.category));
    if (mapped.subcategory) {
      const subMatches = matches.filter(q => normalizeKey(q.subcategory) === normalizeKey(mapped.subcategory!));
      if (subMatches.length > 0) return subMatches;
    }
    return matches;
  }

  // Strict normalized match against category name
  const strictMatches = ALL_QUESTIONS.filter(q => normalizeKey(q.category) === normalized);
  if (strictMatches.length > 0) return strictMatches;

  // Strict match against subcategory
  const subMatches = ALL_QUESTIONS.filter(q => normalizeKey(q.subcategory) === normalized);
  if (subMatches.length > 0) return subMatches;

  return [];
}

/**
 * Returns the exact verified question count for a category or slug
 */
export function getCategoryQuestionCount(categoryNameOrSlug: string): number {
  return getQuestionsByCategory(categoryNameOrSlug).length;
}

export interface QuizFilterOptions {
  category?: string;
  subcategory?: string;
  difficulty?: Difficulty;
  count?: number;
  seed?: number;
}

/**
 * Select and prepare randomized questions for any quiz configuration.
 * Strictly guarantees that non-mixed quizzes NEVER pull questions from other categories.
 */
export function generateQuizQuestions(options: QuizFilterOptions = {}): ShuffledQuestion[] {
  let pool: Question[];

  if (options.category && normalizeKey(options.category) !== 'mixedquiz' && normalizeKey(options.category) !== 'all') {
    // Strictly filter by category - NEVER fall back to ALL_QUESTIONS
    pool = getQuestionsByCategory(options.category);
  } else {
    pool = [...ALL_QUESTIONS];
  }

  if (options.subcategory && pool.length > 0) {
    const subKey = normalizeKey(options.subcategory);
    const subFiltered = pool.filter(q => normalizeKey(q.subcategory).includes(subKey));
    if (subFiltered.length > 0) {
      if (options.count && subFiltered.length < options.count) {
        const remaining = pool.filter(q => !normalizeKey(q.subcategory).includes(subKey));
        pool = [...subFiltered, ...remaining];
      } else {
        pool = subFiltered;
      }
    }
  }

  if (options.difficulty && options.difficulty !== 'mixed' && pool.length > 0) {
    const diffFiltered = pool.filter(q => q.difficulty === options.difficulty);
    if (diffFiltered.length > 0) {
      if (options.count && diffFiltered.length < options.count) {
        const remaining = pool.filter(q => q.difficulty !== options.difficulty);
        pool = [...diffFiltered, ...remaining];
      } else {
        pool = diffFiltered;
      }
    }
  }

  // If pool is empty, return empty array immediately (no bleed from other categories)
  if (pool.length === 0) {
    return [];
  }

  // Shuffle pool
  const shuffledPool = shuffleArray(pool, options.seed);
  const limit = options.count && options.count > 0 ? Math.min(options.count, shuffledPool.length) : Math.min(10, shuffledPool.length);
  const selected = shuffledPool.slice(0, limit);

  return selected.map(q => prepareShuffledQuestion(q, options.seed));
}

/**
 * Deterministic Daily Quiz Generator based on Calendar Date (YYYY-MM-DD)
 */
export function getDailyQuizQuestions(dateString?: string): ShuffledQuestion[] {
  const targetDate = dateString || new Date().toISOString().slice(0, 10);
  
  const numericSeed = targetDate.split('-').reduce((acc, part) => acc * 100 + parseInt(part, 10), 0);

  // Blend easy, medium, and hard across categories
  return generateQuizQuestions({
    count: 10,
    seed: numericSeed
  });
}

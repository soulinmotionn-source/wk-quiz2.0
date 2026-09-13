import type { Question, ShuffledQuestion, Difficulty } from '../types/quiz';
import statsData from '../generated/question-stats.json';
import { CATEGORY_REGISTRY } from './categoryRegistry';

// Import all 33 canonical category question banks
import nursingQuestions from './questions/nursing.json';
import nclexQuestions from './questions/nclex.json';
import medicalQuestions from './questions/medical.json';
import anatomyQuestions from './questions/anatomy-physiology.json';
import pharmacologyQuestions from './questions/pharmacology.json';
import diseasesQuestions from './questions/diseases-disorders.json';
import generalQuestions from './questions/general-knowledge.json';
import historyQuestions from './questions/history.json';
import geographyQuestions from './questions/geography.json';
import scienceQuestions from './questions/science.json';
import engineeringQuestions from './questions/engineering.json';
import electricalQuestions from './questions/electrical.json';
import electricalSymbolsQuestions from './questions/electrical-symbols.json';
import electronicsQuestions from './questions/electronics.json';
import hvacQuestions from './questions/hvac.json';
import technologyQuestions from './questions/technology.json';
import computersQuestions from './questions/computers.json';
import automotiveQuestions from './questions/automotive.json';
import iqLogicQuestions from './questions/iq-logic.json';
import mathematicsQuestions from './questions/mathematics.json';
import grammarQuestions from './questions/english-grammar.json';
import usaTestsQuestions from './questions/usa-tests.json';
import dmvQuestions from './questions/dmv-test.json';
import licensePlateQuestions from './questions/license-plate-quiz.json';
import entertainmentQuestions from './questions/entertainment.json';
import moviesQuestions from './questions/movies.json';
import tvShowsQuestions from './questions/tv-shows.json';
import dramaQuestions from './questions/drama.json';
import celebrityQuestions from './questions/celebrity.json';
import musicQuestions from './questions/music.json';
import cartoonQuestions from './questions/cartoon-characters.json';
import relationshipsQuestions from './questions/relationships.json';
import wisdomQuestions from './questions/wisdom.json';

// Single source of truth for all 5,000 questions
const ALL_STORED_QUESTIONS: Question[] = [
  ...(nursingQuestions as Question[]),
  ...(nclexQuestions as Question[]),
  ...(medicalQuestions as Question[]),
  ...(anatomyQuestions as Question[]),
  ...(pharmacologyQuestions as Question[]),
  ...(diseasesQuestions as Question[]),
  ...(generalQuestions as Question[]),
  ...(historyQuestions as Question[]),
  ...(geographyQuestions as Question[]),
  ...(scienceQuestions as Question[]),
  ...(engineeringQuestions as Question[]),
  ...(electricalQuestions as Question[]),
  ...(electricalSymbolsQuestions as Question[]),
  ...(electronicsQuestions as Question[]),
  ...(hvacQuestions as Question[]),
  ...(technologyQuestions as Question[]),
  ...(computersQuestions as Question[]),
  ...(automotiveQuestions as Question[]),
  ...(iqLogicQuestions as Question[]),
  ...(mathematicsQuestions as Question[]),
  ...(grammarQuestions as Question[]),
  ...(usaTestsQuestions as Question[]),
  ...(dmvQuestions as Question[]),
  ...(licensePlateQuestions as Question[]),
  ...(entertainmentQuestions as Question[]),
  ...(moviesQuestions as Question[]),
  ...(tvShowsQuestions as Question[]),
  ...(dramaQuestions as Question[]),
  ...(celebrityQuestions as Question[]),
  ...(musicQuestions as Question[]),
  ...(cartoonQuestions as Question[]),
  ...(relationshipsQuestions as Question[]),
  ...(wisdomQuestions as Question[])
];

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

// --------------------------------------------------------
// DATA ACCESS LAYER (Section 42)
// --------------------------------------------------------

export function getAllQuestions(): Question[] {
  return ALL_STORED_QUESTIONS;
}

export function getActiveQuestions(): Question[] {
  return ALL_STORED_QUESTIONS.filter(q => q.active !== false);
}

export function getQuestionsByCategory(categoryNameOrSlug: string): Question[] {
  const normalized = normalizeKey(categoryNameOrSlug);

  // Virtual Mixed Quiz pulls dynamically across all active categories without duplication (Section 7 & 48)
  if (normalized === 'mixedquiz' || normalized === 'all' || normalized === 'sampler') {
    return getActiveQuestions();
  }

  // Registry lookup
  const registryItem = CATEGORY_REGISTRY.find(
    c => normalizeKey(c.name) === normalized || normalizeKey(c.slug) === normalized || normalizeKey(c.id) === normalized
  );

  const targetCategoryName = registryItem ? registryItem.name : categoryNameOrSlug;

  return getActiveQuestions().filter(
    q => normalizeKey(q.category) === normalizeKey(targetCategoryName)
  );
}

export function getQuestionsBySubcategory(category: string, subcategory: string): Question[] {
  const catPool = getQuestionsByCategory(category);
  const targetSub = normalizeKey(subcategory);
  return catPool.filter(q => normalizeKey(q.subcategory) === targetSub);
}

export function getQuestionsByDifficulty(difficulty: string): Question[] {
  return getActiveQuestions().filter(q => q.difficulty === difficulty);
}

export function getCategoryQuestionCount(categoryNameOrSlug: string): number {
  const normalized = normalizeKey(categoryNameOrSlug);
  if (normalized === 'mixedquiz' || normalized === 'all') {
    return getActiveQuestions().length;
  }
  return getQuestionsByCategory(categoryNameOrSlug).length;
}

export interface CategoryStatItem {
  name: string;
  slug?: string;
  total: number;
  easy: number;
  medium: number;
  hard: number;
  subcategories: Record<string, number>;
}

export function getQuestionStats() {
  return statsData;
}

export function getCategoryStats(categoryNameOrSlug: string): CategoryStatItem | null {
  const normalized = normalizeKey(categoryNameOrSlug);
  const item = CATEGORY_REGISTRY.find(
    c => normalizeKey(c.name) === normalized || normalizeKey(c.slug) === normalized
  );
  if (!item) return null;
  return ((statsData.categories as unknown as Record<string, CategoryStatItem>)[item.slug]) || null;
}

export function searchQuestions(query: string): Question[] {
  const qClean = query.toLowerCase().trim();
  if (!qClean) return [];

  return getActiveQuestions().filter(q => {
    return (
      q.question.toLowerCase().includes(qClean) ||
      q.category.toLowerCase().includes(qClean) ||
      q.subcategory.toLowerCase().includes(qClean) ||
      q.tags.some(t => t.toLowerCase().includes(qClean))
    );
  });
}

export interface QuizFilterOptions {
  category?: string;
  subcategory?: string;
  difficulty?: Difficulty;
  count?: number;
  seed?: number;
}

export function generateQuizQuestions(options: QuizFilterOptions = {}): ShuffledQuestion[] {
  let pool: Question[];

  if (options.category && normalizeKey(options.category) !== 'mixedquiz' && normalizeKey(options.category) !== 'all') {
    pool = getQuestionsByCategory(options.category);
  } else {
    pool = getActiveQuestions();
  }

  // Prioritize subcategory if provided, but never truncate below count if more questions exist in same category
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

  // Prioritize difficulty if provided, but never truncate below count if more questions exist in same category
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

  if (pool.length === 0) {
    return [];
  }

  const shuffledPool = shuffleArray(pool, options.seed);
  const limit = options.count && options.count > 0 ? Math.min(options.count, shuffledPool.length) : Math.min(10, shuffledPool.length);
  const selected = shuffledPool.slice(0, limit);

  return selected.map(q => prepareShuffledQuestion(q, options.seed));
}

export function getDailyQuizQuestions(dateString?: string): ShuffledQuestion[] {
  const targetDate = dateString || new Date().toISOString().slice(0, 10);
  const numericSeed = targetDate.split('-').reduce((acc, part) => acc * 100 + parseInt(part, 10), 0);

  return generateQuizQuestions({
    count: 10,
    seed: numericSeed
  });
}

import type { Question, ShuffledQuestion } from '../types/quiz';
import statsData from '../generated/question-stats.json';
import { CATEGORY_REGISTRY } from './categoryRegistry';
import { loadAllQuestions, loadCategoryQuestions, resolveCategorySlug } from './questionLoader';
import {
  normalizeKey,
  shuffleArray,
  cleanQuestionText,
  prepareShuffledQuestion,
  buildQuizQuestions,
  type QuizFilterOptions
} from './questionUtils';

// Re-export pure helpers so existing imports keep working without
// pulling the question data into the bundle.
export { normalizeKey, shuffleArray, cleanQuestionText, prepareShuffledQuestion };
export type { QuizFilterOptions };

// --------------------------------------------------------
// STATS (synchronous — backed by the tiny generated stats JSON, no question data)
// --------------------------------------------------------

export function getQuestionStats() {
  return statsData;
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

export function getCategoryStats(categoryNameOrSlug: string): CategoryStatItem | null {
  const normalized = normalizeKey(categoryNameOrSlug);
  const item = CATEGORY_REGISTRY.find(
    c => normalizeKey(c.name) === normalized || normalizeKey(c.slug) === normalized
  );
  if (!item) return null;
  return ((statsData.categories as unknown as Record<string, CategoryStatItem>)[item.slug]) || null;
}

/**
 * Question counts come from the generated stats file, so listing pages
 * (home, categories, search) never need to download question data.
 */
export function getCategoryQuestionCount(categoryNameOrSlug: string): number {
  const normalized = normalizeKey(categoryNameOrSlug);
  if (normalized === 'mixedquiz' || normalized === 'all') {
    return statsData.activeQuestions;
  }
  const item = CATEGORY_REGISTRY.find(
    c => normalizeKey(c.name) === normalized || normalizeKey(c.slug) === normalized || normalizeKey(c.id) === normalized
  );
  if (!item) return 0;
  const stat = (statsData.categories as unknown as Record<string, CategoryStatItem>)[item.slug];
  return stat ? stat.total : 0;
}

// --------------------------------------------------------
// DATA ACCESS LAYER (async — question files load on demand)
// --------------------------------------------------------

function isVirtualMixedQuiz(normalized: string): boolean {
  return normalized === 'mixedquiz' || normalized === 'all' || normalized === 'sampler';
}

export async function getAllQuestionsAsync(): Promise<Question[]> {
  return loadAllQuestions();
}

export async function getActiveQuestionsAsync(): Promise<Question[]> {
  const all = await loadAllQuestions();
  return all.filter(q => q.active !== false);
}

export async function getQuestionsByCategoryAsync(categoryNameOrSlug: string): Promise<Question[]> {
  const normalized = normalizeKey(categoryNameOrSlug);

  // Virtual Mixed Quiz pulls dynamically across all active categories without duplication
  if (isVirtualMixedQuiz(normalized)) {
    return getActiveQuestionsAsync();
  }

  const slug = resolveCategorySlug(categoryNameOrSlug);
  if (!slug) {
    // Unknown category: filter the full bank by name (previous behavior)
    const all = await getActiveQuestionsAsync();
    return all.filter(q => normalizeKey(q.category) === normalized);
  }

  const questions = await loadCategoryQuestions(categoryNameOrSlug);
  return questions.filter(q => q.active !== false);
}

export async function getQuestionsBySubcategoryAsync(category: string, subcategory: string): Promise<Question[]> {
  const catPool = await getQuestionsByCategoryAsync(category);
  const targetSub = normalizeKey(subcategory);
  return catPool.filter(q => normalizeKey(q.subcategory) === targetSub);
}

export async function getQuestionsByDifficultyAsync(difficulty: string): Promise<Question[]> {
  const all = await getActiveQuestionsAsync();
  return all.filter(q => q.difficulty === difficulty);
}

export async function searchQuestionsAsync(query: string): Promise<Question[]> {
  const qClean = query.toLowerCase().trim();
  if (!qClean) return [];

  const all = await getActiveQuestionsAsync();
  return all.filter(q => {
    return (
      q.question.toLowerCase().includes(qClean) ||
      q.category.toLowerCase().includes(qClean) ||
      q.subcategory.toLowerCase().includes(qClean) ||
      q.tags.some(t => t.toLowerCase().includes(qClean))
    );
  });
}

export async function generateQuizQuestionsAsync(options: QuizFilterOptions = {}): Promise<ShuffledQuestion[]> {
  let pool: Question[];

  if (options.category && !isVirtualMixedQuiz(normalizeKey(options.category))) {
    pool = await getQuestionsByCategoryAsync(options.category);
  } else {
    pool = await getActiveQuestionsAsync();
  }

  return buildQuizQuestions(pool, options);
}

export async function getDailyQuizQuestionsAsync(dateString?: string): Promise<ShuffledQuestion[]> {
  const targetDate = dateString || new Date().toISOString().slice(0, 10);
  const numericSeed = targetDate.split('-').reduce((acc, part) => acc * 100 + parseInt(part, 10), 0);

  return generateQuizQuestionsAsync({
    count: 10,
    seed: numericSeed
  });
}

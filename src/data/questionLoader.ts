import type { Question } from '../types/quiz';
import { normalizeKey } from './questionUtils';
import { CATEGORY_REGISTRY, type CategoryRegistryItem } from './categoryRegistry';

type JsonModule = { default: unknown };

/**
 * Lazy loaders for each category question file.
 *
 * Each JSON file becomes its own separate chunk that is only downloaded
 * when a quiz from that category is actually played — instead of bundling
 * all ~5,000 questions (~3.5 MB) into the homepage JavaScript.
 *
 * Keys are registry slugs.
 */
const CATEGORY_LOADERS: Record<string, () => Promise<JsonModule>> = {
  'nursing': () => import('./questions/nursing.json'),
  'nclex': () => import('./questions/nclex.json'),
  'medical': () => import('./questions/medical.json'),
  'anatomy-physiology': () => import('./questions/anatomy-physiology.json'),
  'pharmacology': () => import('./questions/pharmacology.json'),
  'diseases-disorders': () => import('./questions/diseases-disorders.json'),
  'general-knowledge': () => import('./questions/general-knowledge.json'),
  'history': () => import('./questions/history.json'),
  'geography': () => import('./questions/geography.json'),
  'science': () => import('./questions/science.json'),
  'engineering': () => import('./questions/engineering.json'),
  'electrical': () => import('./questions/electrical.json'),
  'electrical-symbols': () => import('./questions/electrical-symbols.json'),
  'electronics': () => import('./questions/electronics.json'),
  'hvac': () => import('./questions/hvac.json'),
  'technology': () => import('./questions/technology.json'),
  'computers': () => import('./questions/computers.json'),
  'automotive': () => import('./questions/automotive.json'),
  'iq-logic': () => import('./questions/iq-logic.json'),
  'mathematics': () => import('./questions/mathematics.json'),
  'english-grammar': () => import('./questions/english-grammar.json'),
  'usa-tests': () => import('./questions/usa-tests.json'),
  'dmv-test': () => import('./questions/dmv-test.json'),
  'license-plate-quiz': () => import('./questions/license-plate-quiz.json'),
  'entertainment': () => import('./questions/entertainment.json'),
  'movies': () => import('./questions/movies.json'),
  'tv-shows': () => import('./questions/tv-shows.json'),
  'drama': () => import('./questions/drama.json'),
  'celebrity': () => import('./questions/celebrity.json'),
  'music': () => import('./questions/music.json'),
  'cartoon-characters': () => import('./questions/cartoon-characters.json'),
  'relationships': () => import('./questions/relationships.json'),
  'wisdom': () => import('./questions/wisdom.json'),
};

// Normalized id/name/slug -> registry item, for resolving quiz categories to loaders
const registryByNormalized = new Map<string, CategoryRegistryItem>();
for (const item of CATEGORY_REGISTRY) {
  registryByNormalized.set(normalizeKey(item.id), item);
  registryByNormalized.set(normalizeKey(item.name), item);
  registryByNormalized.set(normalizeKey(item.slug), item);
}

/**
 * Resolve a category name/slug/id to its canonical registry slug,
 * or null when the category is not in the registry.
 */
export function resolveCategorySlug(categoryNameOrSlug: string): string | null {
  const item = registryByNormalized.get(normalizeKey(categoryNameOrSlug));
  return item ? item.slug : null;
}

// Per-category cache so a replayed quiz never re-downloads its file
const categoryCache = new Map<string, Question[]>();
let allQuestionsCache: Question[] | null = null;
let allQuestionsPromise: Promise<Question[]> | null = null;

/**
 * Load the question file for one category (cached). Falls back to the full
 * bank when the category has no dedicated file, preserving previous behavior.
 */
export async function loadCategoryQuestions(categoryNameOrSlug: string): Promise<Question[]> {
  const slug = resolveCategorySlug(categoryNameOrSlug);
  const key = slug ?? normalizeKey(categoryNameOrSlug);

  const cached = categoryCache.get(key);
  if (cached) return cached;

  const loader = slug ? CATEGORY_LOADERS[slug] : undefined;
  if (!loader) {
    // Unknown category: load everything and let the caller filter by name
    return loadAllQuestions();
  }

  const mod = await loader();
  const questions = mod.default as Question[];
  categoryCache.set(key, questions);
  return questions;
}

/**
 * Load the entire question bank (all categories in parallel, cached).
 * Only used for mixed/all-category quizzes and global search.
 */
export async function loadAllQuestions(): Promise<Question[]> {
  if (allQuestionsCache) return allQuestionsCache;
  if (!allQuestionsPromise) {
    allQuestionsPromise = (async () => {
      const entries = Object.entries(CATEGORY_LOADERS);
      const modules = await Promise.all(entries.map(([, load]) => load()));
      modules.forEach((mod, i) => {
        categoryCache.set(entries[i][0], mod.default as Question[]);
      });
      allQuestionsCache = modules.flatMap(mod => mod.default as Question[]);
      return allQuestionsCache;
    })();
  }
  return allQuestionsPromise;
}

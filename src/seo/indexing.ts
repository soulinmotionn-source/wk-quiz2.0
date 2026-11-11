import { HUB_SLUGS } from '../content/hubs';
import type { QuizMetadata } from '../types/quiz';

/**
 * Only pages backed by substantial original written content are indexable.
 * Everything else stays reachable for visitors (and links are still followed)
 * but is marked noindex and left out of the sitemap until it is enriched.
 * To index another category, add a hub for it in src/content/hubs.ts.
 */
export function isCategoryIndexable(slug: string): boolean {
  return HUB_SLUGS.has(slug);
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** The hub a curated quiz belongs to, if any (matches its subcategory first, then its category). */
export function quizHubSlug(quiz: Pick<QuizMetadata, 'category' | 'subcategory'>): string | null {
  const candidates = [quiz.subcategory, quiz.category].filter(Boolean).map(s => slugify(s as string));
  return candidates.find(c => HUB_SLUGS.has(c)) ?? null;
}

export function isQuizIndexable(quiz: Pick<QuizMetadata, 'category' | 'subcategory'>): boolean {
  return quizHubSlug(quiz) !== null;
}

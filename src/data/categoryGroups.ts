import { CATEGORIES } from './categories';
import type { CategoryInfo } from '../types/quiz';

/** Topic clusters used to suggest genuinely related categories (interlinking). */
const GROUPS: string[][] = [
  ['nursing', 'nclex', 'medical', 'anatomy-physiology', 'pharmacology', 'diseases-disorders'],
  ['general-knowledge', 'history', 'geography', 'science', 'mathematics', 'english-grammar', 'iq-logic'],
  ['engineering', 'electrical', 'electrical-symbols', 'electronics', 'hvac', 'technology', 'computers', 'automotive'],
  ['usa-tests', 'dmv-test', 'license-plate-quiz', 'automotive', 'geography'],
  ['entertainment', 'movies', 'tv-shows', 'drama', 'celebrity', 'music', 'cartoon-characters'],
  ['relationships', 'wisdom', 'iq-logic', 'general-knowledge']
];

/** Same-cluster categories first (in cluster order), then popular ones to fill the list. */
export function getRelatedCategories(slug: string, limit = 6): CategoryInfo[] {
  const related: CategoryInfo[] = [];
  const seen = new Set<string>([slug]);
  const add = (s: string) => {
    if (seen.has(s)) return;
    const cat = CATEGORIES.find(c => c.slug === s);
    if (cat) {
      seen.add(s);
      related.push(cat);
    }
  };
  for (const group of GROUPS.filter(g => g.includes(slug))) group.forEach(add);
  CATEGORIES.filter(c => c.popular).forEach(c => add(c.slug));
  return related.slice(0, limit);
}

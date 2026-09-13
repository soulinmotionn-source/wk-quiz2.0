import type { CategoryInfo } from '../types/quiz';
import { CATEGORY_REGISTRY } from './categoryRegistry';
import { getCategoryQuestionCount } from './questionBank';

/**
 * Dynamic Category Integration (Section 5, 11, 12)
 * The question bank is the SINGLE SOURCE OF TRUTH.
 * NEVER manually hardcode category question counts.
 * All question counts are derived directly from the active question bank data.
 */
export const CATEGORIES: CategoryInfo[] = CATEGORY_REGISTRY.map(cat => ({
  id: cat.id,
  slug: cat.slug,
  name: cat.name,
  description: cat.description,
  iconName: cat.iconName,
  color: cat.color,
  popular: cat.popular,
  questionCount: getCategoryQuestionCount(cat.slug || cat.name)
}));

import type { Question, ShuffledQuestion, Difficulty } from '../types/quiz';

import nursingQuestions from './questions/nursing.json';
import medicalQuestions from './questions/medical.json';
import anatomyQuestions from './questions/anatomy.json';
import geographyQuestions from './questions/geography.json';
import scienceQuestions from './questions/science.json';
import technologyQuestions from './questions/technology.json';
import electricalQuestions from './questions/electrical.json';
import historyQuestions from './questions/history.json';
import entertainmentQuestions from './questions/entertainment.json';
import usaTestsQuestions from './questions/usa-tests.json';
import mathematicsQuestions from './questions/mathematics.json';

// Aggregate all question banks
const ALL_QUESTIONS: Question[] = [
  ...(nursingQuestions as Question[]),
  ...(medicalQuestions as Question[]),
  ...(anatomyQuestions as Question[]),
  ...(geographyQuestions as Question[]),
  ...(scienceQuestions as Question[]),
  ...(technologyQuestions as Question[]),
  ...(electricalQuestions as Question[]),
  ...(historyQuestions as Question[]),
  ...(entertainmentQuestions as Question[]),
  ...(usaTestsQuestions as Question[]),
  ...(mathematicsQuestions as Question[])
].filter(q => q.active !== false);

/**
 * Fisher-Yates array shuffle (in-place clone)
 */
export function shuffleArray<T>(array: T[], seed?: number): T[] {
  const result = [...array];
  let currentSeed = seed;

  const getRandom = () => {
    if (typeof currentSeed === 'number') {
      // Deterministic Linear Congruential Generator (LCG)
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

export function getQuestionsByCategory(categoryName: string): Question[] {
  const target = categoryName.trim().toLowerCase();
  return ALL_QUESTIONS.filter(q => {
    const cat = q.category.toLowerCase();
    const sub = q.subcategory.toLowerCase();
    return cat === target || sub.includes(target) || target.includes(cat);
  });
}

export interface QuizFilterOptions {
  category?: string;
  subcategory?: string;
  difficulty?: Difficulty;
  count?: number;
  seed?: number;
}

/**
 * Select and prepare randomized questions for any quiz configuration
 */
export function generateQuizQuestions(options: QuizFilterOptions = {}): ShuffledQuestion[] {
  let pool = [...ALL_QUESTIONS];

  if (options.category && options.category.toLowerCase() !== 'mixed quiz') {
    const catFiltered = getQuestionsByCategory(options.category);
    if (catFiltered.length > 0) {
      pool = catFiltered;
    }
  }

  if (options.subcategory) {
    const subFiltered = pool.filter(q => q.subcategory.toLowerCase().includes(options.subcategory!.toLowerCase()));
    if (subFiltered.length > 0) {
      pool = subFiltered;
    }
  }

  if (options.difficulty && options.difficulty !== 'mixed') {
    const diffFiltered = pool.filter(q => q.difficulty === options.difficulty);
    if (diffFiltered.length > 0) {
      pool = diffFiltered;
    }
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
  
  // Calculate numeric seed from date string e.g. "2026-09-13" -> 20260913
  const numericSeed = targetDate.split('-').reduce((acc, part) => acc * 100 + parseInt(part, 10), 0);

  // Blend easy, medium, and hard across categories
  return generateQuizQuestions({
    count: 10,
    seed: numericSeed
  });
}

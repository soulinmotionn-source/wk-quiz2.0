import { useSyncExternalStore } from 'react';
import type { UserProgress, QuizResult } from '../types/quiz';
import { localDateString } from '../data/questionUtils';

const STORAGE_KEY = 'wkquiz_user_progress';

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  streak: 0,
  lastPlayedDate: '',
  completedQuizzes: 0,
  bestScores: {},
  history: [],
  achievements: []
};

/**
 * Progress lives in one module-level store so every component (quiz player,
 * daily page, results, header…) sees the same numbers immediately, instead of
 * each hook instance keeping its own stale copy.
 */
function load(): UserProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
  } catch {
    // storage unavailable or corrupt — start fresh
  }
  return DEFAULT_PROGRESS;
}

let state: UserProgress = load();
const listeners = new Set<() => void>();

function setState(next: UserProgress) {
  state = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore (private mode / quota)
  }
  listeners.forEach(l => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      state = load();
      listener();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

const getSnapshot = () => state;

function daysBetween(fromDate: string, toDate: string): number {
  const [fy, fm, fd] = fromDate.split('-').map(Number);
  const [ty, tm, td] = toDate.split('-').map(Number);
  return Math.round((Date.UTC(ty, tm - 1, td) - Date.UTC(fy, fm - 1, fd)) / 86400000);
}

function recordQuizResult(result: QuizResult) {
  const prev = state;
  const today = localDateString();

  let newStreak = prev.streak;
  if (!prev.lastPlayedDate) {
    newStreak = 1;
  } else {
    const diff = daysBetween(prev.lastPlayedDate, today);
    if (diff === 1) newStreak += 1;
    else if (diff > 1 || newStreak < 1) newStreak = 1;
  }

  const earnedXP =
    result.score * 10 + (result.percentage === 100 && result.totalQuestions >= 3 ? 30 : 0) + (result.mode === 'daily' ? 25 : 0);

  const achievements = [...prev.achievements];
  const grant = (id: string, condition: boolean) => {
    if (condition && !achievements.includes(id)) achievements.push(id);
  };
  grant('first_quiz', true);
  grant('perfect_score', result.percentage === 100 && result.totalQuestions >= 3);
  grant('daily_master', result.mode === 'daily');
  grant('streak_3', newStreak >= 3);

  setState({
    ...prev,
    xp: prev.xp + earnedXP,
    streak: newStreak,
    lastPlayedDate: today,
    completedQuizzes: prev.completedQuizzes + 1,
    bestScores: {
      ...prev.bestScores,
      [result.quizId]: Math.max(prev.bestScores[result.quizId] || 0, result.score)
    },
    history: [
      {
        id: `${result.quizId}-${Date.now()}`,
        quizId: result.quizId,
        quizTitle: result.quizTitle,
        score: result.score,
        total: result.totalQuestions,
        date: today
      },
      ...prev.history.slice(0, 29)
    ],
    achievements
  });
}

export function useQuizStorage() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_PROGRESS);
  return { progress, recordQuizResult };
}

import { useState, useEffect } from 'react';
import type { UserProgress, QuizResult } from '../types/quiz';

const STORAGE_KEY = 'wkquiz_user_progress';

const DEFAULT_PROGRESS: UserProgress = {
  xp: 150,
  streak: 1,
  lastPlayedDate: '',
  completedQuizzes: 0,
  bestScores: {},
  history: [],
  achievements: ['welcome_learner']
};

export function useQuizStorage() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  const recordQuizResult = (result: QuizResult) => {
    setProgress(prev => {
      const today = new Date().toISOString().slice(0, 10);
      let newStreak = prev.streak;

      if (prev.lastPlayedDate) {
        const lastDate = new Date(prev.lastPlayedDate);
        const currentDate = new Date(today);
        const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      // Calculate XP
      const earnedXP = (result.score * 10) + (result.percentage === 100 ? 30 : 0) + (result.mode === 'daily' ? 25 : 0);

      // Best score
      const currentBest = prev.bestScores[result.quizId] || 0;
      const updatedBest = Math.max(currentBest, result.score);

      // Check achievements
      const newAchievements = [...prev.achievements];
      if (!newAchievements.includes('first_quiz') && prev.completedQuizzes === 0) {
        newAchievements.push('first_quiz');
      }
      if (!newAchievements.includes('perfect_score') && result.percentage === 100) {
        newAchievements.push('perfect_score');
      }
      if (!newAchievements.includes('daily_master') && result.mode === 'daily') {
        newAchievements.push('daily_master');
      }
      if (!newAchievements.includes('streak_3') && newStreak >= 3) {
        newAchievements.push('streak_3');
      }

      const newHistoryItem = {
        id: `${result.quizId}-${Date.now()}`,
        quizId: result.quizId,
        quizTitle: result.quizTitle,
        score: result.score,
        total: result.totalQuestions,
        date: today
      };

      return {
        ...prev,
        xp: prev.xp + earnedXP,
        streak: newStreak,
        lastPlayedDate: today,
        completedQuizzes: prev.completedQuizzes + 1,
        bestScores: {
          ...prev.bestScores,
          [result.quizId]: updatedBest
        },
        history: [newHistoryItem, ...prev.history.slice(0, 29)], // Keep last 30 quizzes
        achievements: newAchievements
      };
    });
  };

  return {
    progress,
    recordQuizResult
  };
}

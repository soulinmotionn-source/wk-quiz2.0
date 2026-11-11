import { useState, useEffect, useCallback, useRef } from 'react';
import type { ShuffledQuestion, QuizMode, Difficulty, QuizResult, QuestionReviewItem } from '../types/quiz';
import { generateQuizQuestionsAsync, getDailyQuizQuestionsAsync } from '../data/questionBank';

export interface UseQuizEngineProps {
  quizId: string;
  quizTitle: string;
  category?: string;
  subcategory?: string;
  difficulty?: Difficulty;
  mode?: QuizMode;
  count?: number;
  initialQuestions?: ShuffledQuestion[];
  timeLimitSeconds?: number; // per-question countdown in timed mode (default 20s)
  onComplete?: (result: QuizResult) => void;
}

/** Endless mode draws from the whole pool; this is just a generous upper bound. */
const ENDLESS_POOL_SIZE = 500;

export function useQuizEngine({
  quizId,
  quizTitle,
  category = 'General Knowledge',
  subcategory,
  difficulty = 'mixed',
  mode = 'classic',
  count,
  initialQuestions,
  timeLimitSeconds = 20,
  onComplete
}: UseQuizEngineProps) {
  const hasInitial = Boolean(initialQuestions && initialQuestions.length > 0);

  const [questions, setQuestions] = useState<ShuffledQuestion[]>(hasInitial ? initialQuestions! : []);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(!hasInitial);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [reviews, setReviews] = useState<QuestionReviewItem[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(timeLimitSeconds);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);

  // Latest values for callbacks / timers that must never read stale state.
  const elapsedRef = useRef(0);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  const score = reviews.reduce((n, r) => n + (r.isCorrect ? 1 : 0), 0);
  const currentQuestion: ShuffledQuestion | undefined = questions[currentIndex];

  const targetCount = useCallback(() => {
    if (mode === 'endless') return ENDLESS_POOL_SIZE;
    if (count && count > 0) return count;
    return mode === 'quick' ? 5 : 10;
  }, [mode, count]);

  const fetchQuestions = useCallback((): Promise<ShuffledQuestion[]> => {
    if (mode === 'daily') return getDailyQuizQuestionsAsync();
    return generateQuizQuestionsAsync({ category, subcategory, difficulty, count: targetCount() });
  }, [mode, category, subcategory, difficulty, targetCount]);

  const resetProgress = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setReviews([]);
    setIsCompleted(false);
    setSecondsRemaining(timeLimitSeconds);
    setTotalTimeElapsed(0);
    elapsedRef.current = 0;
    completedRef.current = false;
  }, [timeLimitSeconds]);

  // Load questions whenever the quiz configuration changes. The question bank is
  // only downloaded when a quiz is actually played.
  useEffect(() => {
    let cancelled = false;
    const apply = (qs: ShuffledQuestion[]) => {
      if (cancelled) return;
      setQuestions(qs);
      resetProgress();
      setIsLoadingQuestions(false);
    };

    if (hasInitial) {
      apply(initialQuestions!);
      return;
    }
    setIsLoadingQuestions(true);
    fetchQuestions().then(apply).catch(() => apply([]));
    return () => {
      cancelled = true;
    };
  }, [fetchQuestions, resetProgress, hasInitial, initialQuestions]);

  const isPlaying = !isLoadingQuestions && !isCompleted && questions.length > 0;

  // Total elapsed timer (only while a quiz is actually in progress)
  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      elapsedRef.current += 1;
      setTotalTimeElapsed(elapsedRef.current);
    }, 1000);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  const recordAnswer = useCallback(
    (index: number | null) => {
      const q = questions[currentIndex];
      if (!q || isAnswerSubmitted || completedRef.current) return;

      const isCorrect = index !== null && index === q.correctAnswer;
      setSelectedOption(index);
      setIsAnswerSubmitted(true);
      setReviews(prev => [
        ...prev,
        {
          questionId: q.originalId,
          question: q.question,
          options: q.options,
          userAnswerIndex: index,
          correctAnswerIndex: q.correctAnswer,
          isCorrect,
          explanation: q.explanation
        }
      ]);
    },
    [questions, currentIndex, isAnswerSubmitted]
  );

  // Timed mode: reset the countdown on every new question, tick while unanswered.
  useEffect(() => {
    if (mode !== 'timed' || !isPlaying || isAnswerSubmitted) return;
    setSecondsRemaining(timeLimitSeconds);
    const id = window.setInterval(() => {
      setSecondsRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [mode, isPlaying, isAnswerSubmitted, currentIndex, timeLimitSeconds]);

  // Time ran out: count it as a miss (side effect lives here, never in a state updater).
  useEffect(() => {
    if (mode === 'timed' && isPlaying && !isAnswerSubmitted && secondsRemaining === 0) {
      recordAnswer(null);
    }
  }, [mode, isPlaying, isAnswerSubmitted, secondsRemaining, recordAnswer]);

  const selectAnswer = (index: number) => {
    if (!currentQuestion) return;
    recordAnswer(index);
  };

  const finishQuiz = useCallback(
    (finalReviews: QuestionReviewItem[]) => {
      if (completedRef.current) return;
      completedRef.current = true;
      setIsCompleted(true);

      const total = finalReviews.length;
      const finalScore = finalReviews.filter(r => r.isCorrect).length;
      const result: QuizResult = {
        quizId,
        quizTitle,
        category,
        score: finalScore,
        totalQuestions: total,
        percentage: total > 0 ? Math.round((finalScore / total) * 100) : 0,
        timeTakenSeconds: elapsedRef.current,
        difficulty,
        mode,
        date: new Date().toISOString(),
        reviews: finalReviews
      };
      onCompleteRef.current?.(result);
    },
    [quizId, quizTitle, category, difficulty, mode]
  );

  // Endless mode stops at the first miss; every other mode stops after the last question.
  const lastReview = reviews[reviews.length - 1];
  const endlessFailed = mode === 'endless' && isAnswerSubmitted && lastReview && !lastReview.isCorrect;
  const isLastQuestion = currentIndex + 1 >= questions.length || Boolean(endlessFailed);

  const nextQuestion = () => {
    if (!isAnswerSubmitted) return;
    if (isLastQuestion) {
      finishQuiz(reviews);
      return;
    }
    setCurrentIndex(c => c + 1);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setSecondsRemaining(timeLimitSeconds);
  };

  /** End an endless / in-progress quiz early and see the results for what was answered. */
  const endQuizEarly = () => {
    if (reviews.length > 0) finishQuiz(reviews);
  };

  // Start over with a fresh draw of questions (same configuration, same length)
  const restartQuiz = useCallback(async () => {
    setIsLoadingQuestions(true);
    try {
      const fresh = await fetchQuestions();
      setQuestions(fresh);
    } catch {
      setQuestions([]);
    } finally {
      resetProgress();
      setIsLoadingQuestions(false);
    }
  }, [fetchQuestions, resetProgress]);

  // Retry ONLY the questions answered incorrectly in the current attempt
  const retryIncorrect = () => {
    const incorrectIds = new Set(reviews.filter(r => !r.isCorrect).map(r => r.questionId));
    const incorrectQuestions = questions.filter(q => incorrectIds.has(q.originalId));
    if (incorrectQuestions.length === 0) {
      void restartQuiz();
      return;
    }
    setQuestions(incorrectQuestions);
    resetProgress();
  };

  // Current run of consecutive correct answers
  let streak = 0;
  for (let i = reviews.length - 1; i >= 0 && reviews[i].isCorrect; i--) streak++;

  return {
    questions,
    isLoadingQuestions,
    currentQuestion,
    currentIndex,
    totalQuestions: mode === 'endless' ? Math.max(questions.length, reviews.length) : questions.length,
    selectedOption,
    isAnswerSubmitted,
    isLastQuestion,
    score,
    streak,
    isCompleted,
    secondsRemaining,
    totalTimeElapsed,
    reviews,
    selectAnswer,
    nextQuestion,
    endQuizEarly,
    restartQuiz,
    retryIncorrect
  };
}

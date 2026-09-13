import { useState, useEffect, useCallback, useRef } from 'react';
import type { ShuffledQuestion, QuizMode, Difficulty, QuizResult, QuestionReviewItem } from '../types/quiz';
import { generateQuizQuestions, getDailyQuizQuestions } from '../data/questionBank';

export interface UseQuizEngineProps {
  quizId: string;
  quizTitle: string;
  category?: string;
  subcategory?: string;
  difficulty?: Difficulty;
  mode?: QuizMode;
  count?: number;
  initialQuestions?: ShuffledQuestion[];
  timeLimitSeconds?: number; // for timed challenge per question (default 20s)
  onComplete?: (result: QuizResult) => void;
}

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
  // Questions list
  const [questions, setQuestions] = useState<ShuffledQuestion[]>(() => {
    if (initialQuestions && initialQuestions.length > 0) {
      return initialQuestions;
    }
    if (mode === 'daily') {
      return getDailyQuizQuestions();
    }
    const targetCount = count && count > 0 ? count : (mode === 'quick' ? 5 : 10);
    return generateQuizQuestions({ category, subcategory, difficulty, count: targetCount });
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [reviews, setReviews] = useState<QuestionReviewItem[]>([]);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Timer states
  const [secondsRemaining, setSecondsRemaining] = useState(timeLimitSeconds);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);

  const currentQuestion: ShuffledQuestion | undefined = questions[currentIndex];
  const timerRef = useRef<number | null>(null);
  const totalTimerRef = useRef<number | null>(null);

  // Total elapsed timer
  useEffect(() => {
    if (isCompleted) return;
    totalTimerRef.current = window.setInterval(() => {
      setTotalTimeElapsed(t => t + 1);
    }, 1000);

    return () => {
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    };
  }, [isCompleted]);

  // Timed mode per question countdown
  useEffect(() => {
    if (mode !== 'timed' || isCompleted || isAnswerSubmitted) return;

    setSecondsRemaining(timeLimitSeconds);

    timerRef.current = window.setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          // Time expired! Auto-submit with no answer
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, mode, isCompleted, isAnswerSubmitted, timeLimitSeconds]);

  const handleTimeout = () => {
    if (!currentQuestion || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    setSelectedOption(null);

    const review: QuestionReviewItem = {
      questionId: currentQuestion.originalId,
      question: currentQuestion.question,
      options: currentQuestion.options,
      userAnswerIndex: null,
      correctAnswerIndex: currentQuestion.correctAnswer,
      isCorrect: false,
      explanation: currentQuestion.explanation
    };

    setReviews(prev => [...prev, review]);
  };

  const selectAnswer = (index: number) => {
    if (isAnswerSubmitted || isCompleted) return;
    setSelectedOption(index);
    setIsAnswerSubmitted(true);

    if (timerRef.current) clearInterval(timerRef.current);

    const isCorrect = index === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(s => s + 1);
    }

    const review: QuestionReviewItem = {
      questionId: currentQuestion.originalId,
      question: currentQuestion.question,
      options: currentQuestion.options,
      userAnswerIndex: index,
      correctAnswerIndex: currentQuestion.correctAnswer,
      isCorrect,
      explanation: currentQuestion.explanation
    };

    setReviews(prev => [...prev, review]);

    // Endless mode check: If wrong in endless mode, end quiz
    if (mode === 'endless' && !isCorrect) {
      setTimeout(() => {
        finishQuiz([...reviews, review], score);
      }, 1200);
    }
  };

  const finishQuiz = useCallback((finalReviews: QuestionReviewItem[], finalScore: number) => {
    setIsCompleted(true);
    if (timerRef.current) clearInterval(timerRef.current);
    if (totalTimerRef.current) clearInterval(totalTimerRef.current);

    const total = finalReviews.length;
    const percentage = total > 0 ? Math.round((finalScore / total) * 100) : 0;

    const result: QuizResult = {
      quizId,
      quizTitle,
      category,
      score: finalScore,
      totalQuestions: total,
      percentage,
      timeTakenSeconds: totalTimeElapsed,
      difficulty,
      mode,
      date: new Date().toISOString(),
      reviews: finalReviews
    };

    if (onComplete) {
      onComplete(result);
    }
  }, [quizId, quizTitle, category, difficulty, mode, totalTimeElapsed, onComplete]);

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setSecondsRemaining(timeLimitSeconds);
    } else {
      finishQuiz(reviews, score);
    }
  };

  // Restart quiz with fresh questions
  const restartQuiz = () => {
    let freshQuestions: ShuffledQuestion[];
    if (mode === 'daily') {
      freshQuestions = getDailyQuizQuestions();
    } else {
      const count = mode === 'quick' ? 5 : 10;
      freshQuestions = generateQuizQuestions({ category, subcategory, difficulty, count });
    }
    setQuestions(freshQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setReviews([]);
    setScore(0);
    setIsCompleted(false);
    setTotalTimeElapsed(0);
    setSecondsRemaining(timeLimitSeconds);
  };

  // Retry ONLY incorrect questions from the current attempt
  const retryIncorrect = () => {
    const incorrectIds = reviews.filter(r => !r.isCorrect).map(r => r.questionId);
    const incorrectQuestions = questions.filter(q => incorrectIds.includes(q.originalId));

    if (incorrectQuestions.length === 0) {
      restartQuiz();
      return;
    }

    setQuestions(incorrectQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setReviews([]);
    setScore(0);
    setIsCompleted(false);
    setTotalTimeElapsed(0);
    setSecondsRemaining(timeLimitSeconds);
  };

  return {
    questions,
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    selectedOption,
    isAnswerSubmitted,
    score,
    isCompleted,
    secondsRemaining,
    totalTimeElapsed,
    reviews,
    selectAnswer,
    nextQuestion,
    restartQuiz,
    retryIncorrect
  };
}

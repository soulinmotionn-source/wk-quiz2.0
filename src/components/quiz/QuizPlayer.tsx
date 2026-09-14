import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, Volume2, VolumeX, Sparkles } from 'lucide-react';
import type { QuizMode, Difficulty, QuizResult } from '../../types/quiz';
import { useQuizEngine } from '../../hooks/useQuizEngine';
import { useQuizStorage } from '../../hooks/useQuizStorage';
import { QuizProgress } from './QuizProgress';
import { AnswerOption } from './AnswerOption';
import { ExplanationCard } from './ExplanationCard';
import { ResultsCard } from './ResultsCard';
import { cleanQuestionText } from '../../data/questionBank';

interface QuizPlayerProps {
  quizId: string;
  quizTitle: string;
  category?: string;
  subcategory?: string;
  difficulty?: Difficulty;
  mode?: QuizMode;
  count?: number;
  categorySlug?: string;
  onExit?: () => void;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({
  quizId,
  quizTitle,
  category = 'General Knowledge',
  subcategory,
  difficulty = 'mixed',
  mode = 'classic',
  count,
  categorySlug,
  onExit
}) => {
  const { recordQuizResult } = useQuizStorage();
  const [isMuted, setIsMuted] = useState(false);

  const handleComplete = (result: QuizResult) => {
    recordQuizResult(result);
  };

  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedOption,
    isAnswerSubmitted,
    isCompleted,
    secondsRemaining,
    reviews,
    selectAnswer,
    nextQuestion,
    restartQuiz,
    retryIncorrect,
    score,
    streak,
    totalTimeElapsed
  } = useQuizEngine({
    quizId,
    quizTitle,
    category,
    subcategory,
    difficulty,
    mode,
    count,
    onComplete: handleComplete
  });

  // Synthesized audio feedback for playful interactive delight
  const playTone = (isCorrect: boolean) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isCorrect) {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.12); // G5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.28);
      } else {
        osc.frequency.setValueAtTime(240, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(160, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.18);
      }
    } catch {
      // Ignore audio synthesis errors
    }
  };

  const questionCardRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (questionCardRef.current) {
      questionCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentIndex]);

  const handleNextQuestion = () => {
    nextQuestion();
    setTimeout(() => {
      if (questionCardRef.current) {
        questionCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 40);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted || !currentQuestion) return;
    selectAnswer(idx);
    const isCorrect = currentQuestion.correctAnswer === idx;
    playTone(isCorrect);
  };

  if (isCompleted) {
    const finalResult: QuizResult = {
      quizId,
      quizTitle,
      category,
      score,
      totalQuestions,
      percentage: totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0,
      timeTakenSeconds: totalTimeElapsed,
      difficulty,
      mode,
      date: new Date().toISOString(),
      reviews
    };

    return (
      <ResultsCard
        result={finalResult}
        onRestart={restartQuiz}
        onRetryIncorrect={retryIncorrect}
        categorySlug={categorySlug}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
        <h3 className="h3-title" style={{ marginBottom: 'var(--space-md)' }}>
          No questions available
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
          There are currently no questions matching this specific difficulty or category.
        </p>
        <button type="button" onClick={restartQuiz} className="btn btn-primary">
          Reload Quiz
        </button>
      </div>
    );
  }

  const isLastQuestion = currentIndex + 1 >= totalQuestions;

  return (
    <div
      style={{
        maxWidth: '820px',
        margin: '0 auto',
        animation: 'fadeIn var(--transition-base) ease-out'
      }}
    >
      {/* Top Bar with Back Button, Category Banner & Sound Toggle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-md)',
          gap: 'var(--space-sm)'
        }}
      >
        {onExit ? (
          <button
            type="button"
            onClick={onExit}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: 'var(--radius-full)', padding: '6px 14px' }}
          >
            <ArrowLeft size={16} />
            <span>Exit</span>
          </button>
        ) : (
          <span />
        )}

        {/* Category Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(255, 107, 53, 0.12)',
              border: '1px solid rgba(255, 107, 53, 0.25)',
              color: 'var(--color-primary)',
              fontSize: '0.85rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            <Sparkles size={14} />
            <span>{category}</span>
          </span>
        </div>

        {/* Sound toggle button */}
        <button
          type="button"
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: isMuted ? 'var(--color-text-muted)' : 'var(--color-primary)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
      </div>

      {/* Progress Bar & Question Counter */}
      <QuizProgress
        current={currentIndex}
        total={totalQuestions}
        secondsRemaining={secondsRemaining}
        isTimedMode={mode === 'timed'}
        streak={streak}
        score={score}
      />

      {/* Main Question Card with Playful Theme */}
      <div
        ref={questionCardRef}
        key={currentIndex}
        className="card animate-question-enter"
        style={{
          scrollMarginTop: '88px',
          padding: 'var(--space-2xl)',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25)',
          marginBottom: 'var(--space-xl)',
          background: 'radial-gradient(ellipse at top, rgba(255, 107, 53, 0.06) 0%, var(--color-surface) 60%)',
          border: '1.5px solid var(--color-border)'
        }}
      >
        {/* Difficulty & Subcategory Tag Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: 'var(--space-lg)'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            <span
              className={`badge badge-${currentQuestion.difficulty}`}
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)'
              }}
            >
              {currentQuestion.difficulty === 'easy' && '🟢 Easy'}
              {currentQuestion.difficulty === 'medium' && '🟡 Medium'}
              {currentQuestion.difficulty === 'hard' && '🔴 Hard'}
              {!['easy', 'medium', 'hard'].includes(currentQuestion.difficulty) && currentQuestion.difficulty}
            </span>

            {currentQuestion.subcategory && (
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border-light)'
                }}
              >
                🎯 {currentQuestion.subcategory}
              </span>
            )}
          </div>

          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
            #{currentIndex + 1}
          </span>
        </div>

        {/* Question Heading */}
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            lineHeight: 1.4,
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-xl)'
          }}
        >
          {cleanQuestionText(currentQuestion.question)}
        </h2>

        {/* Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {currentQuestion.options.map((optionText, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            const isSelected = selectedOption === idx;
            const isCorrect = currentQuestion.correctAnswer === idx;

            return (
              <AnswerOption
                key={`${currentQuestion.originalId}-${idx}`}
                index={idx}
                label={letter}
                optionText={optionText}
                isSelected={isSelected}
                isCorrectAnswer={isCorrect}
                isSubmitted={isAnswerSubmitted}
                onSelect={() => handleSelectOption(idx)}
                disabled={isAnswerSubmitted}
              />
            );
          })}
        </div>

        {/* Instant Explanation Box */}
        {isAnswerSubmitted && (
          <ExplanationCard
            isCorrect={selectedOption === currentQuestion.correctAnswer}
            explanation={currentQuestion.explanation}
          />
        )}

        {/* Next Question Navigation Bar */}
        {isAnswerSubmitted && (
          <div
            style={{
              marginTop: 'var(--space-xl)',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <button
              type="button"
              onClick={handleNextQuestion}
              className="btn btn-primary btn-lg btn-mobile-full"
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '14px 36px',
                boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)'
              }}
            >
              <span>{isLastQuestion ? 'View Results' : 'Next Question'}</span>
              {isLastQuestion ? <Check size={18} /> : <ArrowRight size={18} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

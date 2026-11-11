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
import { CATEGORIES } from '../../data/categories';
import { Mascot, type MascotMood } from '../common/Mascot';

interface QuizPlayerProps {
  quizId: string;
  quizTitle: string;
  category?: string;
  subcategory?: string;
  difficulty?: Difficulty;
  mode?: QuizMode;
  count?: number;
  categorySlug?: string;
  /** Topic colour; looked up from the category when omitted */
  accent?: string;
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
  accent,
  onExit
}) => {
  const topic = accent ?? CATEGORIES.find(c => c.name === category || c.slug === categorySlug)?.color ?? '#FF6B35';
  const { recordQuizResult } = useQuizStorage();
  const [isMuted, setIsMuted] = useState(false);

  const handleComplete = (result: QuizResult) => {
    recordQuizResult(result);
  };

  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    isLoadingQuestions,
    selectedOption,
    isAnswerSubmitted,
    isCompleted,
    isLastQuestion,
    endQuizEarly,
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

  const audioCtxRef = useRef<AudioContext | null>(null);
  useEffect(() => () => { void audioCtxRef.current?.close(); }, []);

  // Synthesized audio feedback for playful interactive delight
  const playTone = (isCorrect: boolean) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      // Reuse one context — browsers cap how many can exist at once.
      const ctx: AudioContext = (audioCtxRef.current ??= new AudioCtx());
      if (ctx.state === 'suspended') void ctx.resume();
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

  // Keyboard: 1-4 / A-D pick an answer, Enter / → continue
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      if (isLoadingQuestions || isCompleted || !currentQuestion) return;

      if (!isAnswerSubmitted) {
        const key = e.key.toLowerCase();
        const idx = /^[1-9]$/.test(key) ? Number(key) - 1 : 'abcdefgh'.indexOf(key);
        if (key.length === 1 && idx >= 0 && idx < currentQuestion.options.length) {
          e.preventDefault();
          handleSelectOption(idx);
        }
      } else if (e.key === 'Enter' || e.key === 'ArrowRight') {
        if (target && target.tagName === 'BUTTON' && e.key === 'Enter') return; // a focused button handles Enter itself
        e.preventDefault();
        handleNextQuestion();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (isLoadingQuestions) {
    return (
      <div className="card quiz-loading-card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
        <div className="quiz-spinner" aria-hidden="true" />
        <h3 className="h3-title" style={{ marginBottom: 'var(--space-sm)' }}>
          Loading questions…
        </h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Preparing your quiz. This only takes a moment.
        </p>
      </div>
    );
  }

  if (isCompleted) {
    const finalResult: QuizResult = {
      quizId,
      quizTitle,
      category,
      score,
      totalQuestions: reviews.length, // answered questions (endless runs end early)
      percentage: reviews.length > 0 ? Math.round((score / reviews.length) * 100) : 0,
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

  const answeredCorrect = isAnswerSubmitted && selectedOption === currentQuestion.correctAnswer;
  const timedOut = isAnswerSubmitted && selectedOption === null;
  const coachMood: MascotMood = !isAnswerSubmitted ? 'thinking' : answeredCorrect ? 'cheer' : 'sad';
  const coachText = !isAnswerSubmitted
    ? mode === 'timed'
      ? 'Quick, the clock is ticking!'
      : streak >= 3
        ? `${streak} in a row. Keep it going!`
        : 'Take your time and pick one.'
    : answeredCorrect
      ? streak >= 3
        ? `Correct! ${streak} in a row 🔥`
        : ['Nice one!', 'Spot on!', 'You got it!', 'Brilliant!'][currentIndex % 4]
      : timedOut
        ? 'Time is up. Read why below.'
        : 'Not quite. The explanation below will help.';

  return (
    <div
      className="quiz-topic"
      style={{
        ['--topic' as string]: topic,
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
              backgroundColor: 'color-mix(in srgb, var(--topic) 14%, transparent)',
              border: '1px solid color-mix(in srgb, var(--topic) 35%, transparent)',
              color: 'var(--topic)',
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
          background: 'radial-gradient(ellipse at top, color-mix(in srgb, var(--topic) 10%, transparent) 0%, var(--color-surface) 60%)',
          border: '1.5px solid color-mix(in srgb, var(--topic) 30%, var(--color-border))'
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

        {/* Mascot coach: reacts to every answer */}
        <div className="coach" aria-live="polite">
          <Mascot mood={coachMood} size={56} className={`coach-mascot${isAnswerSubmitted ? ' coach-react' : ''}`} />
          <div className="coach-bubble">{coachText}</div>
          {isAnswerSubmitted && selectedOption === currentQuestion.correctAnswer && (
            <span key={reviews.length} className="xp-pop" aria-hidden="true">
              +10 XP
            </span>
          )}
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
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 'var(--space-md)'
            }}
          >
            {mode === 'endless' && !isLastQuestion && (
              <button type="button" onClick={endQuizEarly} className="btn btn-secondary">
                End &amp; see results
              </button>
            )}
            <button
              type="button"
              onClick={handleNextQuestion}
              className="btn btn-primary btn-lg btn-mobile-full"
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '14px 36px',
                background: 'var(--topic)',
                boxShadow: '0 4px 20px color-mix(in srgb, var(--topic) 45%, transparent)'
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

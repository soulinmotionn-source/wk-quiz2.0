import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { QuizMode, Difficulty, QuizResult } from '../../types/quiz';
import { useQuizEngine } from '../../hooks/useQuizEngine';
import { useQuizStorage } from '../../hooks/useQuizStorage';
import { QuizProgress } from './QuizProgress';
import { AnswerOption } from './AnswerOption';
import { ExplanationCard } from './ExplanationCard';
import { ResultsCard } from './ResultsCard';

interface QuizPlayerProps {
  quizId: string;
  quizTitle: string;
  category?: string;
  subcategory?: string;
  difficulty?: Difficulty;
  mode?: QuizMode;
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
  categorySlug,
  onExit
}) => {
  const { recordQuizResult } = useQuizStorage();

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
    totalTimeElapsed
  } = useQuizEngine({
    quizId,
    quizTitle,
    category,
    subcategory,
    difficulty,
    mode,
    onComplete: handleComplete
  });

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
        maxWidth: '780px',
        margin: '0 auto',
        animation: 'fadeIn var(--transition-base) ease-out'
      }}
    >
      {/* Top Bar with Back Button & Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-md)'
        }}
      >
        {onExit ? (
          <button
            type="button"
            onClick={onExit}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <ArrowLeft size={16} />
            <span>Exit</span>
          </button>
        ) : (
          <span />
        )}

        <div style={{ textAlign: 'right' }}>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              letterSpacing: '0.04em'
            }}
          >
            {category}
          </span>
          {subcategory && (
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              {' '}• {subcategory}
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar & Question Counter */}
      <QuizProgress
        current={currentIndex}
        total={totalQuestions}
        secondsRemaining={secondsRemaining}
        isTimedMode={mode === 'timed'}
      />

      {/* Main Question Card */}
      <div
        className="card"
        style={{
          padding: 'var(--space-xl)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: 'var(--space-xl)'
        }}
      >
        {/* Difficulty Badge */}
        <div style={{ marginBottom: 'var(--space-sm)' }}>
          <span
            className={`badge badge-${currentQuestion.difficulty}`}
            style={{ fontSize: '0.75rem' }}
          >
            {currentQuestion.difficulty}
          </span>
        </div>

        {/* Question Heading */}
        <h2
          style={{
            fontSize: '1.45rem',
            fontWeight: 700,
            lineHeight: 1.35,
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-xl)'
          }}
        >
          {currentQuestion.question}
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
                onSelect={() => selectAnswer(idx)}
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
              onClick={nextQuestion}
              className="btn btn-primary btn-lg"
              style={{ borderRadius: 'var(--radius-full)', padding: '12px 32px' }}
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

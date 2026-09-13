import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, AlertTriangle, Play, Grid, Home, Clock, Award, CheckCircle, XCircle } from 'lucide-react';
import type { QuizResult } from '../../types/quiz';
import { ReviewList } from './ReviewList';
import { AdSlot } from '../common/AdSlot';

interface ResultsCardProps {
  result: QuizResult;
  onRestart: () => void;
  onRetryIncorrect: () => void;
  categorySlug?: string;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({
  result,
  onRestart,
  onRetryIncorrect,
  categorySlug
}) => {
  const { score, totalQuestions, percentage, timeTakenSeconds, category, reviews } = result;

  const incorrectCount = totalQuestions - score;

  useEffect(() => {
    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  }, [percentage]);

  const getPerformanceMessage = (pct: number) => {
    if (pct === 100) return { title: 'Flawless Victory!', subtitle: 'You answered every question correctly. True mastery!' };
    if (pct >= 80) return { title: 'Great Job!', subtitle: 'Impressive score! Your preparation and knowledge really show.' };
    if (pct >= 60) return { title: 'Good Effort!', subtitle: 'Solid performance! Review the questions below to level up.' };
    return { title: 'Keep Practicing!', subtitle: 'Every quiz is a stepping stone. Learn from the explanations and try again!' };
  };

  const perf = getPerformanceMessage(percentage);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}m ${rem}s`;
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Score Card Hero */}
      <div
        className="card"
        style={{
          textAlign: 'center',
          padding: 'var(--space-2xl) var(--space-xl)',
          borderRadius: 'var(--radius-xl)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Trophy icon */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-md)',
            boxShadow: '0 8px 24px rgba(255, 107, 53, 0.2)'
          }}
        >
          <Trophy size={42} />
        </div>

        <span
          style={{
            display: 'inline-block',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--color-primary)',
            marginBottom: 'var(--space-xs)'
          }}
        >
          Quiz Complete!
        </span>

        <h2 className="h2-title" style={{ marginBottom: 'var(--space-xs)' }}>
          {perf.title}
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto var(--space-xl)' }}>
          {perf.subtitle}
        </p>

        {/* Big Score Counter */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: '8px',
            backgroundColor: 'var(--color-bg)',
            border: '2px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: '16px 36px',
            marginBottom: 'var(--space-xl)'
          }}
        >
          <span
            style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              lineHeight: 1,
              color: 'var(--color-primary)'
            }}
          >
            {score}
          </span>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
            / {totalQuestions}
          </span>
          <span
            style={{
              marginLeft: '12px',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: percentage >= 70 ? 'var(--color-success)' : 'var(--color-warning)'
            }}
          >
            ({percentage}%)
          </span>
        </div>

        {/* Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-xl)'
          }}
        >
          <div style={{ backgroundColor: 'var(--color-bg-alt)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: 'var(--color-success)', marginBottom: '4px' }}>
              <CheckCircle size={16} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Correct</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{score}</div>
          </div>

          <div style={{ backgroundColor: 'var(--color-bg-alt)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: 'var(--color-error)', marginBottom: '4px' }}>
              <XCircle size={16} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Incorrect</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{incorrectCount}</div>
          </div>

          <div style={{ backgroundColor: 'var(--color-bg-alt)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
              <Clock size={16} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Time Taken</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{formatTime(timeTakenSeconds)}</div>
          </div>

          <div style={{ backgroundColor: 'var(--color-bg-alt)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: 'var(--color-warning)', marginBottom: '4px' }}>
              <Award size={16} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>XP Earned</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>+{score * 10} XP</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-md)'
          }}
        >
          <button
            type="button"
            onClick={onRestart}
            className="btn btn-primary"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <RotateCcw size={16} />
            <span>Try Again</span>
          </button>

          {incorrectCount > 0 && (
            <button
              type="button"
              onClick={onRetryIncorrect}
              className="btn btn-secondary"
              style={{
                borderRadius: 'var(--radius-full)',
                borderColor: 'var(--color-error)',
                color: 'var(--color-error)'
              }}
            >
              <AlertTriangle size={16} />
              <span>Retry Incorrect ({incorrectCount})</span>
            </button>
          )}

          <Link
            to="/quizzes/mixed-knowledge-classic"
            className="btn btn-secondary"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <Play size={16} />
            <span>Another Quiz</span>
          </Link>

          {categorySlug && (
            <Link
              to={`/categories/${categorySlug}`}
              className="btn btn-secondary"
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              <Grid size={16} />
              <span>Browse {category}</span>
            </Link>
          )}

          <Link
            to="/"
            className="btn btn-secondary"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <Home size={16} />
            <span>Back Home</span>
          </Link>
        </div>
      </div>

      {/* AdSense Placeholder in Results View */}
      <AdSlot type="results" slotId="results-screen-ad" />

      {/* Detailed Question Review */}
      {reviews && reviews.length > 0 && (
        <ReviewList reviews={reviews} />
      )}
    </div>
  );
};

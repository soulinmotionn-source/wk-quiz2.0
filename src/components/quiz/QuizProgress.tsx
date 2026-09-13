import React from 'react';
import { Clock } from 'lucide-react';

interface QuizProgressProps {
  current: number;
  total: number;
  secondsRemaining?: number;
  isTimedMode?: boolean;
}

export const QuizProgress: React.FC<QuizProgressProps> = ({
  current,
  total,
  secondsRemaining,
  isTimedMode = false
}) => {
  const percentage = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;
  const isUrgent = isTimedMode && typeof secondsRemaining === 'number' && secondsRemaining <= 5;

  return (
    <div style={{ marginBottom: 'var(--space-lg)' }}>
      {/* Top row: Counter & Timer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-xs)'
        }}
      >
        <span
          style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            color: 'var(--color-text-secondary)'
          }}
        >
          Question <span style={{ color: 'var(--color-primary)' }}>{current + 1}</span> of {total}
        </span>

        {isTimedMode && typeof secondsRemaining === 'number' && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              fontSize: '0.85rem',
              backgroundColor: isUrgent ? 'var(--color-error-light)' : 'var(--color-bg-alt)',
              color: isUrgent ? 'var(--color-error)' : 'var(--color-text-primary)',
              border: isUrgent ? '1px solid var(--color-error-border)' : '1px solid var(--color-border)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Clock size={15} />
            <span>{secondsRemaining}s</span>
          </div>
        )}
      </div>

      {/* Progress Track */}
      <div
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: 'var(--color-border-light)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden'
        }}
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: 'var(--color-primary)',
            borderRadius: 'var(--radius-full)',
            transition: 'width var(--transition-smooth)'
          }}
        />
      </div>
    </div>
  );
};

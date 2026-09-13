import React from 'react';
import { Clock, Flame, Star } from 'lucide-react';

interface QuizProgressProps {
  current: number;
  total: number;
  secondsRemaining?: number;
  isTimedMode?: boolean;
  streak?: number;
  score?: number;
}

export const QuizProgress: React.FC<QuizProgressProps> = ({
  current,
  total,
  secondsRemaining,
  isTimedMode = false,
  streak = 0,
  score = 0
}) => {
  const percentage = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;
  const isUrgent = isTimedMode && typeof secondsRemaining === 'number' && secondsRemaining <= 5;

  return (
    <div style={{ marginBottom: 'var(--space-lg)' }}>
      {/* Top row: Counter & Playful Badges */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          marginBottom: 'var(--space-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontSize: '1rem',
              fontWeight: 800,
              color: 'var(--color-text-primary)'
            }}
          >
            Question <span style={{ color: 'var(--color-primary)', fontSize: '1.15rem' }}>{current + 1}</span> of {total}
          </span>

          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)'
            }}
          >
            {percentage}%
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Playful Streak Badge */}
          {streak > 1 && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#EF4444',
                fontWeight: 700,
                fontSize: '0.8rem',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                animation: 'pulse 1.5s infinite'
              }}
            >
              <Flame size={14} fill="#EF4444" />
              <span>{streak} Streak!</span>
            </div>
          )}

          {/* Score Counter */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              color: '#F59E0B',
              fontWeight: 700,
              fontSize: '0.8rem',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}
          >
            <Star size={13} fill="#F59E0B" />
            <span>{score * 10} pts</span>
          </div>

          {/* Timed countdown pill */}
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
      </div>

      {/* Playful Glowing Progress Track */}
      <div
        style={{
          width: '100%',
          height: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          padding: '2px',
          border: '1px solid var(--color-border-light)',
          position: 'relative'
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
            background: 'linear-gradient(90deg, #10B981 0%, #06B6D4 50%, #F59E0B 100%)',
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
          }}
        />
      </div>
    </div>
  );
};

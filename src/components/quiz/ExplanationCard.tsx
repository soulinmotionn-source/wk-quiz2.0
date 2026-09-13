import React from 'react';
import { Lightbulb, CheckCircle2, AlertCircle } from 'lucide-react';

interface ExplanationCardProps {
  isCorrect: boolean;
  explanation: string;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({
  isCorrect,
  explanation
}) => {
  return (
    <div
      style={{
        marginTop: 'var(--space-lg)',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: isCorrect ? 'var(--color-success-light)' : 'var(--color-error-light)',
        border: `1.5px solid ${isCorrect ? 'var(--color-success-border)' : 'var(--color-error-border)'}`,
        animation: 'fadeIn var(--transition-base) ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        {isCorrect ? (
          <>
            <CheckCircle2 size={20} color="var(--color-success)" />
            <span style={{ fontWeight: 700, color: 'var(--color-success)', fontSize: '0.95rem' }}>
              Spot on! Correct answer.
            </span>
          </>
        ) : (
          <>
            <AlertCircle size={20} color="var(--color-error)" />
            <span style={{ fontWeight: 700, color: 'var(--color-error)', fontSize: '0.95rem' }}>
              Not quite right. Let's learn why:
            </span>
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <Lightbulb size={18} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '3px' }} />
        <p
          style={{
            fontSize: '0.925rem',
            color: 'var(--color-text-primary)',
            lineHeight: 1.6
          }}
        >
          {explanation}
        </p>
      </div>
    </div>
  );
};

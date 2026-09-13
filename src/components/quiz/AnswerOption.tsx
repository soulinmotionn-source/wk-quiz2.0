import React from 'react';
import { Check, X } from 'lucide-react';

interface AnswerOptionProps {
  index: number;
  label: string;
  optionText: string;
  isSelected: boolean;
  isCorrectAnswer: boolean;
  isSubmitted: boolean;
  onSelect: () => void;
  disabled: boolean;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  label,
  optionText,
  isSelected,
  isCorrectAnswer,
  isSubmitted,
  onSelect,
  disabled
}) => {
  // Determine styling based on state
  let bg = 'var(--color-surface)';
  let borderColor = 'var(--color-border)';
  let textColor = 'var(--color-text-primary)';
  let badgeBg = 'var(--color-bg-alt)';
  let badgeColor = 'var(--color-text-secondary)';

  if (isSubmitted) {
    if (isCorrectAnswer) {
      bg = 'var(--color-success-light)';
      borderColor = 'var(--color-success)';
      textColor = 'var(--color-text-primary)';
      badgeBg = 'var(--color-success)';
      badgeColor = '#FFFFFF';
    } else if (isSelected && !isCorrectAnswer) {
      bg = 'var(--color-error-light)';
      borderColor = 'var(--color-error)';
      textColor = 'var(--color-text-primary)';
      badgeBg = 'var(--color-error)';
      badgeColor = '#FFFFFF';
    } else {
      // Unselected other option
      bg = 'var(--color-surface)';
      borderColor = 'var(--color-border-light)';
      textColor = 'var(--color-text-muted)';
    }
  } else if (isSelected) {
    bg = 'var(--color-primary-light)';
    borderColor = 'var(--color-primary)';
    textColor = 'var(--color-primary)';
    badgeBg = 'var(--color-primary)';
    badgeColor = '#FFFFFF';
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      style={{
        width: '100%',
        minHeight: '56px',
        padding: '14px 18px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: bg,
        border: `2px solid ${borderColor}`,
        color: textColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-md)',
        textAlign: 'left',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all var(--transition-fast)',
        userSelect: 'none',
        boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
      }}
      className={`answer-option-btn ${!isSubmitted ? 'hover-lift' : ''}`}
      aria-pressed={isSelected}
      aria-label={`Option ${label}: ${optionText}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', flex: 1 }}>
        {/* Letter Label Badge */}
        <span
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: badgeBg,
            color: badgeColor,
            fontWeight: 700,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all var(--transition-fast)'
          }}
        >
          {label}
        </span>

        {/* Text */}
        <span style={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.4, wordBreak: 'break-word' }}>
          {optionText}
        </span>
      </div>

      {/* Verification Icon (for accessibility beyond color) */}
      {isSubmitted && (
        <div style={{ flexShrink: 0 }}>
          {isCorrectAnswer ? (
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
              title="Correct answer"
            >
              <Check size={18} strokeWidth={3} />
            </div>
          ) : isSelected ? (
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-error)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
              title="Incorrect choice"
            >
              <X size={18} strokeWidth={3} />
            </div>
          ) : null}
        </div>
      )}
    </button>
  );
};

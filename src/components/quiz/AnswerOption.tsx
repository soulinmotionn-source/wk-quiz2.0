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

const OPTION_ACCENTS = [
  { color: '#F43F5E', badgeBg: 'rgba(244, 63, 94, 0.18)', badgeBorder: 'rgba(244, 63, 94, 0.4)' }, // A: Rose
  { color: '#3B82F6', badgeBg: 'rgba(59, 130, 246, 0.18)', badgeBorder: 'rgba(59, 130, 246, 0.4)' }, // B: Sky Blue
  { color: '#F59E0B', badgeBg: 'rgba(245, 158, 11, 0.18)', badgeBorder: 'rgba(245, 158, 11, 0.4)' }, // C: Amber
  { color: '#10B981', badgeBg: 'rgba(16, 185, 129, 0.18)', badgeBorder: 'rgba(16, 185, 129, 0.4)' }  // D: Emerald
];

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  index,
  label,
  optionText,
  isSelected,
  isCorrectAnswer,
  isSubmitted,
  onSelect,
  disabled
}) => {
  const accent = OPTION_ACCENTS[index % OPTION_ACCENTS.length];

  // Determine styling based on state
  let bg = 'var(--color-surface)';
  let borderColor = 'var(--color-border)';
  let textColor = 'var(--color-text-primary)';
  let badgeBg = accent.badgeBg;
  let badgeColor = accent.color;
  let badgeBorder = accent.badgeBorder;
  let boxShadow = 'none';

  if (isSubmitted) {
    if (isCorrectAnswer) {
      bg = 'rgba(16, 185, 129, 0.15)';
      borderColor = '#10B981';
      textColor = 'var(--color-text-primary)';
      badgeBg = '#10B981';
      badgeColor = '#FFFFFF';
      badgeBorder = '#10B981';
      boxShadow = '0 0 16px rgba(16, 185, 129, 0.3)';
    } else if (isSelected && !isCorrectAnswer) {
      bg = 'rgba(239, 68, 68, 0.15)';
      borderColor = '#EF4444';
      textColor = 'var(--color-text-primary)';
      badgeBg = '#EF4444';
      badgeColor = '#FFFFFF';
      badgeBorder = '#EF4444';
      boxShadow = '0 0 16px rgba(239, 68, 68, 0.25)';
    } else {
      // Unselected other option
      bg = 'var(--color-surface)';
      borderColor = 'var(--color-border-light)';
      textColor = 'var(--color-text-muted)';
      badgeBg = 'rgba(255, 255, 255, 0.04)';
      badgeColor = 'var(--color-text-muted)';
      badgeBorder = 'var(--color-border)';
    }
  } else if (isSelected) {
    bg = 'rgba(255, 107, 53, 0.12)';
    borderColor = 'var(--color-primary)';
    textColor = 'var(--color-text-primary)';
    badgeBg = 'var(--color-primary)';
    badgeColor = '#FFFFFF';
    badgeBorder = 'var(--color-primary)';
    boxShadow = '0 0 14px rgba(255, 107, 53, 0.35)';
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
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        userSelect: 'none',
        boxShadow: boxShadow
      }}
      className={`answer-option-btn ${!isSubmitted ? 'hover-lift' : ''}`}
      aria-pressed={isSelected}
      aria-label={`Option ${label}: ${optionText}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', flex: 1 }}>
        {/* Letter Label Badge */}
        <span
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: badgeBg,
            color: badgeColor,
            border: `1.5px solid ${badgeBorder}`,
            fontWeight: 800,
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: isSubmitted && isCorrectAnswer ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none'
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

import React, { useState } from 'react';
import type { QuestionReviewItem } from '../../types/quiz';
import { Check, X, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { cleanQuestionText } from '../../data/questionBank';

interface ReviewListProps {
  reviews: QuestionReviewItem[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const expandAll = () => setExpandedIndices(reviews.map((_, i) => i));
  const collapseAll = () => setExpandedIndices([]);

  return (
    <div style={{ marginTop: 'var(--space-2xl)' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-md)'
        }}
      >
        <h3 className="h3-title">Detailed Question Review</h3>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          <button
            type="button"
            onClick={expandAll}
            className="btn btn-secondary btn-sm"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="btn btn-secondary btn-sm"
          >
            Collapse
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {reviews.map((item, idx) => {
          const isExpanded = expandedIndices.includes(idx);

          return (
            <div
              key={item.questionId || idx}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              {/* Question summary row */}
              <button
                type="button"
                onClick={() => toggleExpand(idx)}
                style={{
                  width: '100%',
                  padding: 'var(--space-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-md)',
                  textAlign: 'left',
                  backgroundColor: isExpanded ? 'var(--color-bg-alt)' : 'transparent',
                  transition: 'background-color var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', flex: 1 }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: item.isCorrect ? 'var(--color-success)' : 'var(--color-error)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {item.isCorrect ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}
                  </div>

                  <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>
                    {idx + 1}. {cleanQuestionText(item.question)}
                  </span>
                </div>

                <div style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div
                  style={{
                    padding: 'var(--space-md)',
                    borderTop: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'var(--space-md)' }}>
                    {item.options.map((opt, optIdx) => {
                      const isUserChoice = item.userAnswerIndex === optIdx;
                      const isCorrect = item.correctAnswerIndex === optIdx;

                      let optBg = 'transparent';
                      let optBorder = 'var(--color-border-light)';
                      let badgeLabel = '';

                      if (isCorrect) {
                        optBg = 'var(--color-success-light)';
                        optBorder = 'var(--color-success)';
                        badgeLabel = '✓ Correct Answer';
                      } else if (isUserChoice) {
                        optBg = 'var(--color-error-light)';
                        optBorder = 'var(--color-error)';
                        badgeLabel = '✗ Your Choice';
                      }

                      return (
                        <div
                          key={optIdx}
                          style={{
                            padding: '10px 14px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: optBg,
                            border: `1px solid ${optBorder}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.9rem'
                          }}
                        >
                          <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                          {badgeLabel && (
                            <span
                              style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: isCorrect ? 'var(--color-success)' : 'var(--color-error)'
                              }}
                            >
                              {badgeLabel}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation text */}
                  <div
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-bg)',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'flex-start'
                    }}
                  >
                    <Lightbulb size={16} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      <strong>Explanation:</strong> {item.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

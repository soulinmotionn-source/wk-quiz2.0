import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, HelpCircle, Play } from 'lucide-react';
import type { QuizMetadata } from '../../types/quiz';

interface QuizCardProps {
  quiz: QuizMetadata;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const getBadgeClass = (diff: string) => {
    switch (diff) {
      case 'easy':
        return 'badge-easy';
      case 'medium':
        return 'badge-medium';
      case 'hard':
        return 'badge-hard';
      default:
        return 'badge-primary';
    }
  };

  return (
    <div
      className="card card-interactive"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-lg)'
      }}
    >
      <div>
        {/* Category & Difficulty Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-sm)',
            marginBottom: 'var(--space-sm)'
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              letterSpacing: '0.04em'
            }}
          >
            {quiz.category}
          </span>
          <span className={`badge ${getBadgeClass(quiz.difficulty)}`}>
            {quiz.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-xs)',
            lineHeight: 1.3
          }}
        >
          {quiz.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.5,
            marginBottom: 'var(--space-md)'
          }}
        >
          {quiz.description}
        </p>
      </div>

      {/* Meta details & CTA */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-md)',
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-md)',
            borderTop: '1px solid var(--color-border-light)',
            paddingTop: 'var(--space-sm)'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <HelpCircle size={15} />
            {quiz.questionCount} Questions
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={15} />
            {quiz.estimatedTime}
          </span>
        </div>

        <Link
          to={`/quizzes/${quiz.slug}`}
          className="btn btn-primary"
          style={{ width: '100%', borderRadius: 'var(--radius-md)' }}
        >
          <Play size={16} fill="currentColor" />
          <span>Start Quiz</span>
        </Link>
      </div>
    </div>
  );
};

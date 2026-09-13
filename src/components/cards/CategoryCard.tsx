import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { CategoryInfo } from '../../types/quiz';
import { IconHelper } from '../common/IconHelper';

interface CategoryCardProps {
  category: CategoryInfo;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="card card-interactive"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius-lg)',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div>
        {/* Category Icon Container */}
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: `${category.color}15`,
            color: category.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-md)'
          }}
        >
          <IconHelper name={category.iconName} size={26} />
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-xs)',
            lineHeight: 1.3
          }}
        >
          {category.name}
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
          {category.description}
        </p>
      </div>

      {/* Footer info: Question count & arrow */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--color-border-light)',
          paddingTop: 'var(--space-sm)',
          marginTop: 'var(--space-sm)'
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--color-text-muted)'
          }}
        >
          {category.questionCount}+ Questions
        </span>

        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--color-primary)'
          }}
        >
          <span>Explore</span>
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
};

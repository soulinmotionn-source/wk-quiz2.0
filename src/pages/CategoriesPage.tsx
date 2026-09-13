import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { CategoryCard } from '../components/cards/CategoryCard';
import { AdSlot } from '../components/common/AdSlot';
import { CATEGORIES } from '../data/categories';

export const CategoriesPage: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (!filterQuery.trim()) return CATEGORIES;
    const q = filterQuery.toLowerCase().trim();
    return CATEGORIES.filter(
      c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }, [filterQuery]);

  return (
    <div style={{ padding: 'var(--space-2xl) 0' }}>
      <SEOHead
        title="All Quiz Categories — 34+ Knowledge Fields"
        description="Browse all 34 quiz categories on WKQuiz.com: Healthcare, Nursing, Medical Terminology, Anatomy, Science, Technology, Geography, History, and more."
        canonicalPath="/categories"
      />

      <div className="app-container">
        {/* Header Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-lg)',
            marginBottom: 'var(--space-2xl)'
          }}
        >
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', letterSpacing: '0.05em' }}>
              Knowledge Catalog
            </span>
            <h1 className="h1-title" style={{ fontSize: '2.4rem' }}>
              Explore Categories
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', marginTop: 'var(--space-xs)' }}>
              Choose from 34 curated topics spanning professional certifications, sciences, and general knowledge.
            </p>
          </div>

          {/* Quick Filter Input */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '12px',
                color: 'var(--color-text-muted)'
              }}
            />
            <input
              type="text"
              placeholder="Filter categories..."
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              style={{
                width: '100%',
                height: '44px',
                paddingLeft: '42px',
                paddingRight: '14px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-lg)'
            }}
          >
            {filteredCategories.map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
            <h3 className="h3-title" style={{ marginBottom: 'var(--space-sm)' }}>
              No categories match "{filterQuery}"
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
              Try another keyword or clear your filter to view all 34 categories.
            </p>
            <button
              type="button"
              onClick={() => setFilterQuery('')}
              className="btn btn-primary"
            >
              Show All Categories
            </button>
          </div>
        )}

        {/* AdSense Between-Section Placeholder */}
        <AdSlot type="between-section" slotId="categories-footer-slot" />
      </div>
    </div>
  );
};

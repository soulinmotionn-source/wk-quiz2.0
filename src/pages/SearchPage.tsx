import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, BookOpen, Grid } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { QuizCard } from '../components/cards/QuizCard';
import { CategoryCard } from '../components/cards/CategoryCard';
import { FEATURED_QUIZZES } from '../data/quizzes';
import { CATEGORIES } from '../data/categories';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query.trim() });
  };

  const currentQ = (searchParams.get('q') || '').trim().toLowerCase();

  // Search in quizzes
  const matchingQuizzes = useMemo(() => {
    if (!currentQ) return [];
    return FEATURED_QUIZZES.filter(q => {
      return (
        q.title.toLowerCase().includes(currentQ) ||
        q.description.toLowerCase().includes(currentQ) ||
        q.category.toLowerCase().includes(currentQ) ||
        (q.subcategory && q.subcategory.toLowerCase().includes(currentQ)) ||
        q.tags.some(t => t.toLowerCase().includes(currentQ))
      );
    });
  }, [currentQ]);

  // Search in categories
  const matchingCategories = useMemo(() => {
    if (!currentQ) return [];
    return CATEGORIES.filter(c => {
      return (
        c.name.toLowerCase().includes(currentQ) ||
        c.description.toLowerCase().includes(currentQ) ||
        c.slug.toLowerCase().includes(currentQ)
      );
    });
  }, [currentQ]);

  const totalResults = matchingQuizzes.length + matchingCategories.length;

  return (
    <div style={{ padding: 'var(--space-2xl) 0' }}>
      <SEOHead
        title={currentQ ? `Search results for "${currentQ}"` : 'Search Quizzes & Categories'}
        description="Search through quizzes, questions, medical topics, and study categories on WKQuiz.com."
        canonicalPath="/search"
      />

      <div className="app-container">
        {/* Search Header */}
        <div style={{ maxWidth: '680px', margin: '0 auto var(--space-2xl)', textAlign: 'center' }}>
          <h1 className="h1-title" style={{ fontSize: '2.4rem', marginBottom: 'var(--space-md)' }}>
            Search WKQuiz
          </h1>

          <form onSubmit={handleSearchSubmit}>
            <div style={{ position: 'relative', display: 'flex', gap: '8px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '15px',
                    color: 'var(--color-text-muted)'
                  }}
                />
                <input
                  type="text"
                  placeholder="Search quizzes, anatomy, nursing, capitals, tags..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  style={{
                    width: '100%',
                    height: '50px',
                    paddingLeft: '48px',
                    paddingRight: '16px',
                    borderRadius: 'var(--radius-full)',
                    border: '1.5px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    fontSize: '1rem',
                    outline: 'none',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  borderRadius: 'var(--radius-full)',
                  padding: '0 24px',
                  height: '50px'
                }}
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick sample keywords */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: 'var(--space-md)',
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)'
            }}
          >
            <span>Popular:</span>
            {['bones', 'capitals', 'nursing', 'nclex', 'science', 'dmv', 'electrical'].map(kw => (
              <button
                key={kw}
                type="button"
                onClick={() => {
                  setQuery(kw);
                  setSearchParams({ q: kw });
                }}
                style={{
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-bg-alt)',
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        {currentQ && (
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)' }}>
              Found <strong>{totalResults}</strong> result{totalResults === 1 ? '' : 's'} for "
              <span style={{ color: 'var(--color-primary)' }}>{currentQ}</span>"
            </p>
          </div>
        )}

        {/* Results Sections */}
        {totalResults > 0 ? (
          <div>
            {/* Matching Quizzes */}
            {matchingQuizzes.length > 0 && (
              <section style={{ marginBottom: 'var(--space-3xl)' }}>
                <h2 className="h2-title" style={{ fontSize: '1.5rem', marginBottom: 'var(--space-lg)' }}>
                  Matching Quizzes ({matchingQuizzes.length})
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 'var(--space-lg)'
                  }}
                >
                  {matchingQuizzes.map(quiz => (
                    <QuizCard key={quiz.id} quiz={quiz} />
                  ))}
                </div>
              </section>
            )}

            {/* Matching Categories */}
            {matchingCategories.length > 0 && (
              <section style={{ marginBottom: 'var(--space-3xl)' }}>
                <h2 className="h2-title" style={{ fontSize: '1.5rem', marginBottom: 'var(--space-lg)' }}>
                  Matching Categories ({matchingCategories.length})
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: 'var(--space-lg)'
                  }}
                >
                  {matchingCategories.map(cat => (
                    <CategoryCard key={cat.id} category={cat} />
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : currentQ ? (
          /* Empty State */
          <div className="card" style={{ textAlign: 'center', padding: 'var(--space-3xl)', maxWidth: '580px', margin: '0 auto' }}>
            <h3 className="h3-title" style={{ marginBottom: 'var(--space-xs)' }}>
              No quizzes found for "{currentQ}"
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)', lineHeight: 1.6 }}>
              Try searching for general terms like <em>"capitals"</em>, <em>"bones"</em>, <em>"nursing"</em>, or explore our full category list.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)' }}>
              <Link to="/categories" className="btn btn-primary">
                <Grid size={16} />
                <span>Explore All Categories</span>
              </Link>
              <Link to="/quizzes" className="btn btn-secondary">
                <BookOpen size={16} />
                <span>Browse All Quizzes</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Pre-search invitation */
          <div className="card" style={{ textAlign: 'center', padding: 'var(--space-3xl)', maxWidth: '580px', margin: '0 auto' }}>
            <h3 className="h3-title" style={{ marginBottom: 'var(--space-xs)' }}>
              Search Across Our Knowledge Library
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
              Type any subject, exam topic, or tag above to instantly find matching quizzes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

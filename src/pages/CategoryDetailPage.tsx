import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, ShieldAlert } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { QuizPlayer } from '../components/quiz/QuizPlayer';
import { QuizCard } from '../components/cards/QuizCard';
import { AdSlot } from '../components/common/AdSlot';
import { CATEGORIES } from '../data/categories';
import { FEATURED_QUIZZES } from '../data/quizzes';
import type { Difficulty, QuizMode } from '../types/quiz';
import { IconHelper } from '../components/common/IconHelper';
import { getCategoryStats } from '../data/questionBank';

export const CategoryDetailPage: React.FC = () => {
  const { category: categorySlug } = useParams<{ category: string }>();

  // Find matching category
  const category = CATEGORIES.find(
    c => c.slug === categorySlug || c.id === categorySlug
  ) || CATEGORIES[0];

  const stats = getCategoryStats(category.slug || category.name);

  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('mixed');
  const [selectedMode, setSelectedMode] = useState<QuizMode>('classic');
  const [isPlaying, setIsPlaying] = useState(false);

  // Available quizzes matching category
  const relatedQuizzes = FEATURED_QUIZZES.filter(
    q => q.category.toLowerCase().includes(category.name.toLowerCase()) ||
         category.name.toLowerCase().includes(q.category.toLowerCase())
  );

  // Suggested other categories
  const otherCategories = CATEGORIES.filter(c => c.id !== category.id).slice(0, 4);

  return (
    <div style={{ padding: 'var(--space-2xl) 0' }}>
      <SEOHead
        title={`${category.name} Quizzes — Practice Questions & Tests`}
        description={category.description}
        canonicalPath={`/categories/${category.slug}`}
      />

      <div className="app-container">
        {/* Breadcrumb / Back button */}
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <Link
            to="/categories"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--color-text-muted)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Categories</span>
          </Link>
        </div>

        {isPlaying ? (
          /* Active Interactive Quiz Player */
          <div style={{ marginBottom: 'var(--space-3xl)' }}>
            <QuizPlayer
              key={`cat-${category.id}-${selectedMode}-${selectedDifficulty}`}
              quizId={`cat-${category.id}-${selectedMode}-${selectedDifficulty}`}
              quizTitle={`${category.name} ${selectedMode.toUpperCase()} Quiz`}
              category={category.name}
              difficulty={selectedDifficulty}
              mode={selectedMode}
              count={category.questionCount > 0 ? category.questionCount : 10}
              categorySlug={category.slug}
              onExit={() => setIsPlaying(false)}
            />
          </div>
        ) : (
          /* Category Hero Banner */
          <div
            className="card"
            style={{
              padding: 'var(--space-2xl)',
              borderRadius: 'var(--radius-xl)',
              marginBottom: 'var(--space-2xl)',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xl)', alignItems: 'center' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: `${category.color}18`,
                  color: category.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <IconHelper name={category.iconName} size={40} />
              </div>

              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-xs)' }}>
                  <span className="badge badge-primary">
                    {category.questionCount > 0 ? `${category.questionCount} Questions` : 'Coming Soon'}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Verified Bank</span>
                </div>

                <h1 className="h1-title" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-xs)' }}>
                  {category.name} Quizzes
                </h1>

                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '720px' }}>
                  {category.description}
                </p>

                {/* Dynamic Difficulty Breakdown & Subcategories (Rule 13, 14, 15) */}
                {stats && (
                  <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'var(--space-sm)' }}>
                      <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10B981', fontWeight: 600, fontSize: '0.8rem', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
                        Easy: {stats.easy}
                      </span>
                      <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#F59E0B', fontWeight: 600, fontSize: '0.8rem', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
                        Medium: {stats.medium}
                      </span>
                      <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#EF4444', fontWeight: 600, fontSize: '0.8rem', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
                        Hard: {stats.hard}
                      </span>
                    </div>

                    {/* Subcategory Dynamic Breakdown */}
                    {Object.keys(stats.subcategories).length > 0 && (
                      <div style={{ marginTop: 'var(--space-md)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '6px', letterSpacing: '0.05em' }}>
                          Subcategories
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {Object.entries(stats.subcategories).map(([subcat, count]) => (
                            <span
                              key={subcat}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '4px 10px',
                                borderRadius: 'var(--radius-full)',
                                backgroundColor: 'var(--color-bg)',
                                border: '1px solid var(--color-border)',
                                fontSize: '0.8rem',
                                color: 'var(--color-text-secondary)'
                              }}
                            >
                              <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{subcat}</span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>— {Number(count)} Questions</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Medical / NCLEX Disclaimer Note if applicable */}
            {(category.name.toLowerCase().includes('nurs') ||
              category.name.toLowerCase().includes('medic') ||
              category.name.toLowerCase().includes('nclex') ||
              category.name.toLowerCase().includes('pharm')) && (
              <div
                style={{
                  marginTop: 'var(--space-lg)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center'
                }}
              >
                <ShieldAlert size={16} color="var(--color-warning)" style={{ flexShrink: 0 }} />
                <span>
                  <strong>Clinical Notice:</strong> Educational study material only. Not affiliated with NCSBN or official NCLEX.
                </span>
              </div>
            )}

            {/* Quiz Configuration Hub */}
            <div
              style={{
                marginTop: 'var(--space-2xl)',
                paddingTop: 'var(--space-xl)',
                borderTop: '1px solid var(--color-border-light)'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xl)', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                {/* Mode Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--color-text-muted)' }}>
                    Select Quiz Mode
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {(['classic', 'quick', 'practice', 'timed', 'endless'] as QuizMode[]).map(mode => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setSelectedMode(mode)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          backgroundColor: selectedMode === mode ? 'var(--color-primary)' : 'var(--color-bg)',
                          color: selectedMode === mode ? '#FFFFFF' : 'var(--color-text-primary)',
                          border: `1px solid ${selectedMode === mode ? 'var(--color-primary)' : 'var(--color-border)'}`,
                          transition: 'all var(--transition-fast)',
                          textTransform: 'capitalize'
                        }}
                      >
                        {mode === 'classic' && 'Classic (10q)'}
                        {mode === 'quick' && 'Quick (5q)'}
                        {mode === 'practice' && 'Practice'}
                        {mode === 'timed' && 'Timed (20s)'}
                        {mode === 'endless' && 'Endless'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--color-text-muted)' }}>
                    Difficulty Level
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {(['easy', 'medium', 'hard', 'mixed'] as Difficulty[]).map(diff => (
                      <button
                        key={diff}
                        type="button"
                        onClick={() => setSelectedDifficulty(diff)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          backgroundColor: selectedDifficulty === diff ? 'var(--color-secondary)' : 'var(--color-bg)',
                          color: selectedDifficulty === diff ? '#FFFFFF' : 'var(--color-text-primary)',
                          border: `1px solid ${selectedDifficulty === diff ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                          transition: 'all var(--transition-fast)',
                          textTransform: 'capitalize'
                        }}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Big Launch Button */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="btn btn-primary btn-lg"
                  style={{ borderRadius: 'var(--radius-full)', padding: '14px 36px' }}
                >
                  <Play size={18} fill="currentColor" />
                  <span>Launch {category.name} Quiz</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RELATED CURATED QUIZZES */}
        {relatedQuizzes.length > 0 && (
          <section style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2 className="h2-title" style={{ marginBottom: 'var(--space-lg)' }}>
              Curated {category.name} Quizzes
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'var(--space-lg)'
              }}
            >
              {relatedQuizzes.map(q => (
                <QuizCard key={q.id} quiz={q} />
              ))}
            </div>
          </section>
        )}

        {/* AdSlot */}
        <AdSlot type="in-content" slotId="category-detail-mid" />

        {/* RELATED CATEGORIES */}
        <section style={{ marginTop: 'var(--space-3xl)' }}>
          <h3 className="h3-title" style={{ marginBottom: 'var(--space-lg)' }}>
            Related Categories You May Like
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 'var(--space-md)'
            }}
          >
            {otherCategories.map(cat => (
              <Link
                key={cat.id}
                to={`/categories/${cat.slug}`}
                className="card card-interactive"
                style={{
                  padding: 'var(--space-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  textDecoration: 'none'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: `${cat.color}15`,
                    color: cat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <IconHelper name={cat.iconName} size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {cat.name}
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {cat.questionCount}+ Questions
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

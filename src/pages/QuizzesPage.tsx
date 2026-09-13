import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { QuizCard } from '../components/cards/QuizCard';
import { AdSlot } from '../components/common/AdSlot';
import { FEATURED_QUIZZES } from '../data/quizzes';

export const QuizzesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const set = new Set(FEATURED_QUIZZES.map(q => q.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredQuizzes = useMemo(() => {
    return FEATURED_QUIZZES.filter(q => {
      const matchSearch =
        searchTerm === '' ||
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
      const matchCat = selectedCategory === 'all' || q.category === selectedCategory;

      return matchSearch && matchDiff && matchCat;
    });
  }, [searchTerm, selectedDifficulty, selectedCategory]);

  return (
    <div style={{ padding: 'var(--space-2xl) 0' }}>
      <SEOHead
        title="Quizzes Catalog — Practice by Difficulty & Topic"
        description="Browse all educational quizzes on WKQuiz.com. Choose from state capitals, NCLEX nursing practice, human anatomy, medical terminology, and science tests."
        canonicalPath="/quizzes"
      />

      <div className="app-container">
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', letterSpacing: '0.05em' }}>
            Comprehensive Library
          </span>
          <h1 className="h1-title" style={{ fontSize: '2.5rem' }}>
            All Quizzes
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', marginTop: 'var(--space-xs)' }}>
            Select a tailored quiz to evaluate your retention, timed response, or general trivia skills.
          </p>
        </div>

        {/* Filters Bar */}
        <div
          className="card"
          style={{
            padding: 'var(--space-md)',
            marginBottom: 'var(--space-2xl)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Search bar */}
          <div style={{ position: 'relative', flex: '1 1 240px' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '12px',
                top: '12px',
                color: 'var(--color-text-muted)'
              }}
            />
            <input
              type="text"
              placeholder="Search by title, tag, or topic..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                height: '42px',
                paddingLeft: '38px',
                paddingRight: '12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Difficulty filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Difficulty:
            </span>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              style={{
                height: '42px',
                padding: '0 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                fontSize: '0.9rem'
              }}
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>

          {/* Category filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Category:
            </span>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              style={{
                height: '42px',
                padding: '0 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                fontSize: '0.9rem'
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quizzes Grid */}
        {filteredQuizzes.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-lg)'
            }}
          >
            {filteredQuizzes.map(quiz => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
            <h3 className="h3-title" style={{ marginBottom: 'var(--space-sm)' }}>
              No quizzes match your filters
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
              Try adjusting your search query or reset your difficulty and category filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedDifficulty('all');
                setSelectedCategory('all');
              }}
              className="btn btn-primary"
            >
              Reset All Filters
            </button>
          </div>
        )}

        <AdSlot type="banner" slotId="quizzes-catalog-bottom" />
      </div>
    </div>
  );
};

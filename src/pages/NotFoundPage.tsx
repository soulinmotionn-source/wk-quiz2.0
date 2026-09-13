import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home, Grid, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ padding: 'var(--space-3xl) 0' }}>
      <SEOHead
        title="404 — Page Not Found | WKQuiz.com"
        description="The page you were looking for could not be found. Explore our quiz categories or try today's daily challenge."
      />

      <div className="app-container" style={{ maxWidth: '600px', textAlign: 'center' }}>
        <div className="card" style={{ padding: 'var(--space-3xl) var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-md)'
            }}
          >
            <HelpCircle size={40} />
          </div>

          <span
            style={{
              display: 'block',
              fontSize: '4.5rem',
              fontWeight: 800,
              lineHeight: 1,
              color: 'var(--color-primary)',
              marginBottom: 'var(--space-xs)'
            }}
          >
            404
          </span>

          <h1 className="h2-title" style={{ marginBottom: 'var(--space-sm)' }}>
            Lost in the Question Bank?
          </h1>

          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: 'var(--space-xl)' }}>
            The quiz page or resource you requested doesn't exist or may have been moved. Let's get you back on track!
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-md)' }}>
            <Link to="/" className="btn btn-primary">
              <Home size={16} />
              <span>Back to Home</span>
            </Link>
            <Link to="/categories" className="btn btn-secondary">
              <Grid size={16} />
              <span>Browse Categories</span>
            </Link>
            <Link to="/daily-quiz" className="btn btn-secondary">
              <Sparkles size={16} />
              <span>Today's Daily Quiz</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

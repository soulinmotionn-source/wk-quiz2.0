import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Sparkles, BookOpen, BarChart3, Globe2, ArrowRight, Zap } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { CategoryCard } from '../components/cards/CategoryCard';
import { QuizCard } from '../components/cards/QuizCard';
import { DailyChallengeCard } from '../components/cards/DailyChallengeCard';
import { AdSlot } from '../components/common/AdSlot';
import { CATEGORIES } from '../data/categories';
import { FEATURED_QUIZZES } from '../data/quizzes';
import { getQuestionStats } from '../data/questionBank';

export const HomePage: React.FC = () => {
  const stats = getQuestionStats();
  const popularCategories = CATEGORIES.filter(c => c.popular).slice(0, 8);
  const popularQuizzes = FEATURED_QUIZZES.filter(q => q.popular).slice(0, 4);
  const newQuizzes = FEATURED_QUIZZES.filter(q => q.isNew || q.featured).slice(0, 4);

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WKQuiz.com',
    url: 'https://wkquiz.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://wkquiz.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    description: 'Free interactive quiz platform for healthcare, nursing NCLEX, science, geography, DMV, and general knowledge.'
  };

  return (
    <>
      <SEOHead
        title="WKQuiz.com — Learn • Play • Grow | Test Your Knowledge"
        description="Fun, educational quizzes to help you learn, remember and grow. Practice NCLEX nursing questions, anatomy, US state capitals, science, and DMV tests."
        canonicalPath="/"
        schema={homeSchema}
      />

      {/* HERO SECTION */}
      <section
        style={{
          paddingTop: 'var(--space-3xl)',
          paddingBottom: 'var(--space-3xl)',
          background: 'radial-gradient(ellipse at 50% 0%, var(--color-primary-light) 0%, var(--color-bg) 70%)',
          borderBottom: '1px solid var(--color-border-light)'
        }}
      >
        <div className="app-container">
          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                fontWeight: 700,
                fontSize: '0.875rem',
                letterSpacing: '0.02em',
                marginBottom: 'var(--space-md)'
              }}
            >
              <Sparkles size={16} />
              <span>Small Quizzes. A Smarter You.</span>
            </div>

            {/* H1 Headline */}
            <h1 className="h1-title" style={{ marginBottom: 'var(--space-md)', maxWidth: '720px' }}>
              Test Your <span style={{ color: 'var(--color-primary)' }}>Knowledge</span>
            </h1>

            {/* Subheading */}
            <p
              style={{
                fontSize: '1.15rem',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-xl)',
                maxWidth: '640px'
              }}
            >
              Fun and engaging quizzes to help you learn, remember and grow. Explore nursing NCLEX scenarios, anatomy, geography, science, and daily challenges.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-md)' }}>
              <Link
                to="/quizzes/mixed-knowledge-classic"
                className="btn btn-primary btn-lg btn-mobile-full"
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                <Play size={18} fill="currentColor" />
                <span>Start Mixed Quiz</span>
              </Link>

              <Link
                to="/categories"
                className="btn btn-secondary btn-lg btn-mobile-full"
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                <span>Browse Categories</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Trust Metric */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'var(--space-lg)',
                marginTop: 'var(--space-2xl)',
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)'
              }}
            >
              <span>✓ {stats.totalQuestions.toLocaleString()}+ Questions</span>
              <span>✓ {CATEGORIES.length} Categories</span>
              <span>✓ Instant Explanations</span>
              <span>✓ 100% Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section style={{ padding: 'var(--space-2xl) 0', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="app-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--space-lg)'
            }}
          >
            <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <BookOpen size={22} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>Multiple Categories</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  Over {CATEGORIES.length} diverse categories from NCLEX nursing to electrical symbols and US capitals.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-secondary-light)',
                  color: 'var(--color-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <BarChart3 size={22} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>Track Progress</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  Gain XP, unlock achievements, and maintain your daily learning streak locally.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-warning-light)',
                  color: 'var(--color-warning)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Zap size={22} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>Daily Quiz</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  A fresh, deterministic 10-question challenge generated every morning.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-success-light)',
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Globe2 size={22} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>Learn Anywhere</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  Optimized for one-hand mobile use on any phone, tablet, or desktop screen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DAILY CHALLENGE PROMO */}
      <section style={{ padding: 'var(--space-3xl) 0 var(--space-xl)' }}>
        <div className="app-container">
          <DailyChallengeCard />
        </div>
      </section>

      {/* EXPLORE CATEGORIES */}
      <section style={{ padding: 'var(--space-2xl) 0' }}>
        <div className="app-container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-xl)',
              gap: 'var(--space-md)'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', letterSpacing: '0.05em' }}>
                Diverse Knowledge Bank
              </span>
              <h2 className="h2-title">Explore Categories</h2>
            </div>

            <Link
              to="/categories"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600,
                color: 'var(--color-primary)'
              }}
            >
              <span>View All {CATEGORIES.length} Categories</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
              gap: 'var(--space-md)'
            }}
          >
            {popularCategories.map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* BANNER AD PLACEHOLDER */}
      <div className="app-container">
        <AdSlot type="banner" slotId="home-mid-banner" />
      </div>

      {/* POPULAR QUIZZES */}
      <section style={{ padding: 'var(--space-2xl) 0' }}>
        <div className="app-container">
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', letterSpacing: '0.05em' }}>
              Most Played
            </span>
            <h2 className="h2-title">Popular Quizzes</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: 'var(--space-md)'
            }}
          >
            {popularQuizzes.map(quiz => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </div>
      </section>

      {/* NEW QUIZZES */}
      <section style={{ padding: 'var(--space-2xl) 0' }}>
        <div className="app-container">
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', letterSpacing: '0.05em' }}>
              Recently Added
            </span>
            <h2 className="h2-title">New Quizzes</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: 'var(--space-md)'
            }}
          >
            {newQuizzes.map(quiz => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

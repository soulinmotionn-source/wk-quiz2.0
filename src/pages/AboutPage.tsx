import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Target, ShieldCheck, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const AboutPage: React.FC = () => {
  return (
    <div style={{ padding: 'var(--space-2xl) 0' }}>
      <SEOHead
        title="About WKQuiz — Learn • Play • Grow"
        description="Learn about the mission, educational philosophy, and technology behind WKQuiz.com, a free quiz platform for active learning."
        canonicalPath="/about"
      />

      <div className="app-container" style={{ maxWidth: '860px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--color-primary)',
              marginBottom: 'var(--space-xs)'
            }}
          >
            Our Mission
          </span>
          <h1 className="h1-title" style={{ fontSize: '2.75rem', marginBottom: 'var(--space-md)' }}>
            Learn • Play • Grow
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
            WKQuiz was created with one simple conviction: active retrieval through well-crafted quizzes is the fastest, most enduring way to build knowledge.
          </p>
        </div>

        {/* Story Section */}
        <div
          className="card"
          style={{
            padding: 'var(--space-2xl)',
            borderRadius: 'var(--radius-xl)',
            marginBottom: 'var(--space-2xl)',
            lineHeight: 1.8
          }}
        >
          <h2 className="h2-title" style={{ fontSize: '1.6rem', marginBottom: 'var(--space-md)' }}>
            The Story Behind WKQuiz.com
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
            Traditional studying often involves passive re-reading and highlighting, which creates an illusion of competence. In reality, testing yourself forces your brain to recall concepts, reinforcing neural pathways and pinpointing exactly where your knowledge gaps lie.
          </p>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
            We developed WKQuiz to provide high-yield, distraction-free practice quizzes across crucial fields: nursing fundamentals, NCLEX-style clinical prioritization, human anatomy, essential sciences, world geography, and practical everyday challenges like DMV rules of the road.
          </p>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Every quiz on WKQuiz is completely free, mobile-optimized, requires no account to get started, and provides instant, verified explanations so every wrong answer becomes a learning milestone.
          </p>
        </div>

        {/* Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--space-lg)',
            marginBottom: 'var(--space-3xl)'
          }}
        >
          <div className="card" style={{ padding: 'var(--space-xl)' }}>
            <Target size={30} color="var(--color-primary)" style={{ marginBottom: 'var(--space-sm)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>Active Recall</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Strengthen memory retention through dynamic question and answer randomization that discourages rote memorization.
            </p>
          </div>

          <div className="card" style={{ padding: 'var(--space-xl)' }}>
            <Zap size={30} color="var(--color-primary)" style={{ marginBottom: 'var(--space-sm)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>Zero Friction</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Instant quiz starts with no mandatory logins, paywalls, or annoying popups. Play and learn in seconds on any device.
            </p>
          </div>

          <div className="card" style={{ padding: 'var(--space-xl)' }}>
            <ShieldCheck size={30} color="var(--color-primary)" style={{ marginBottom: 'var(--space-sm)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>Responsible Content</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Every clinical or technical question is verified with accurate explanations and clear educational disclaimers.
            </p>
          </div>
        </div>

        {/* Call to Action Card */}
        <div
          style={{
            backgroundColor: 'var(--color-primary-light)',
            border: '1.5px solid var(--color-primary)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-2xl)',
            textAlign: 'center'
          }}
        >
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 'var(--space-xs)', color: 'var(--color-text-primary)' }}>
            Ready to Put Your Mind to the Test?
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto var(--space-lg)' }}>
            Explore our curated question banks and join thousands of daily learners.
          </p>
          <Link to="/categories" className="btn btn-primary btn-lg" style={{ borderRadius: 'var(--radius-full)' }}>
            <span>Explore All 34 Categories</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

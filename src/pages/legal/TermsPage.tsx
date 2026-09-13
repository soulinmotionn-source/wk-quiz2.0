import React from 'react';
import { SEOHead } from '../../components/common/SEOHead';

export const TermsPage: React.FC = () => {
  return (
    <div style={{ padding: 'var(--space-2xl) 0' }}>
      <SEOHead
        title="Terms & Conditions — WKQuiz.com"
        description="Terms and conditions for utilizing the WKQuiz.com platform and practice questions."
        canonicalPath="/terms-and-conditions"
      />

      <div className="app-container" style={{ maxWidth: '800px' }}>
        <div className="card" style={{ padding: 'var(--space-2xl)', borderRadius: 'var(--radius-xl)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)' }}>
            Legal Information
          </span>
          <h1 className="h1-title" style={{ fontSize: '2.4rem', margin: 'var(--space-xs) 0 var(--space-lg)' }}>
            Terms &amp; Conditions
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: 'var(--space-xl)' }}>
            Last Updated: September 13, 2026 • <em>Placeholder Terms Document</em>
          </p>

          <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <section>
              <h2 className="h3-title" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using WKQuiz.com, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please discontinue using the website immediately.
              </p>
            </section>

            <section>
              <h2 className="h3-title" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                2. Educational &amp; Entertainment Use Only
              </h2>
              <p>
                All quizzes, questions, answers, and explanations provided on WKQuiz.com are intended solely for general self-study, educational enrichment, and entertainment. They do not constitute professional, clinical, legal, or technical certification.
              </p>
            </section>

            <section>
              <h2 className="h3-title" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                3. Intellectual Property
              </h2>
              <p>
                The WKQuiz.com trademark, website design, UI layout, original software code, and question formatting are the intellectual property of WKQuiz. Content is protected under applicable copyright laws.
              </p>
            </section>

            <section>
              <h2 className="h3-title" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                4. Limitation of Liability
              </h2>
              <p>
                WKQuiz.com makes no warranties, express or implied, regarding examination pass rates or academic performance. Under no circumstances shall WKQuiz be liable for any indirect, incidental, or consequential damages resulting from your use of this site.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { SEOHead } from '../../components/common/SEOHead';

export const CookiePolicyPage: React.FC = () => {
  return (
    <div style={{ padding: 'var(--space-2xl) 0' }}>
      <SEOHead
        title="Cookie Policy — WKQuiz.com"
        description="Learn how WKQuiz uses cookies and browser storage technologies to maintain themes and user preferences."
        canonicalPath="/cookie-policy"
      />

      <div className="app-container" style={{ maxWidth: '800px' }}>
        <div className="card" style={{ padding: 'var(--space-2xl)', borderRadius: 'var(--radius-xl)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)' }}>
            Legal Information
          </span>
          <h1 className="h1-title" style={{ fontSize: '2.4rem', margin: 'var(--space-xs) 0 var(--space-lg)' }}>
            Cookie Policy
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: 'var(--space-xl)' }}>
            Last Updated: September 13, 2026 • <em>Placeholder Cookie Policy</em>
          </p>

          <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <section>
              <h2 className="h3-title" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                1. What Are Cookies?
              </h2>
              <p>
                Cookies and browser storage objects (such as HTML5 <code>localStorage</code>) are small data files stored directly on your computer or mobile device when you visit a website.
              </p>
            </section>

            <section>
              <h2 className="h3-title" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                2. How WKQuiz Uses Storage
              </h2>
              <p>
                We use strictly functional client storage to:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
                <li>Remember your Light, Dark, or System visual theme preference.</li>
                <li>Track your XP points, learning streak, and past quiz attempts locally.</li>
                <li>Prevent repeating questions in endless or daily quiz modes.</li>
              </ul>
            </section>

            <section>
              <h2 className="h3-title" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                3. Third-Party Advertising Cookies
              </h2>
              <p>
                Third-party ad networks (e.g., Google AdSense) may set cookies to deliver tailored advertisements and measure ad performance. You can manage cookie preferences via your web browser settings at any time.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

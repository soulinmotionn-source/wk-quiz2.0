import React from 'react';
import { SEOHead } from '../../components/common/SEOHead';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div style={{ padding: 'var(--space-2xl) 0' }}>
      <SEOHead
        title="Privacy Policy — WKQuiz.com"
        description="Review the privacy policy for WKQuiz.com. Information about cookies, local storage, analytics, and advertising."
        canonicalPath="/privacy-policy"
      />

      <div className="app-container" style={{ maxWidth: '800px' }}>
        <div className="card" style={{ padding: 'var(--space-2xl)', borderRadius: 'var(--radius-xl)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)' }}>
            Legal Information
          </span>
          <h1 className="h1-title" style={{ fontSize: '2.4rem', margin: 'var(--space-xs) 0 var(--space-lg)' }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: 'var(--space-xl)' }}>
            Last Updated: September 13, 2026 • <em>Placeholder Policy Document</em>
          </p>

          <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <section>
              <h2 className="h3-title" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                1. Overview &amp; Commitment
              </h2>
              <p>
                WKQuiz.com ("we", "our", or "us") respects your privacy. This Privacy Policy explains our practices regarding data collection, local browser storage, and third-party services when you access WKQuiz.com.
              </p>
            </section>

            <section>
              <h2 className="h3-title" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                2. Information We Collect
              </h2>
              <p>
                <strong>No Mandatory Account:</strong> You can take all quizzes and explore categories without registering an account or providing personal identification information.
              </p>
              <p style={{ marginTop: '8px' }}>
                <strong>Local Storage:</strong> We use client-side browser storage (<code>localStorage</code>) strictly to save your local quiz progress, high scores, learning streak, and Light/Dark/System theme preference. This data never leaves your device unless you clear your browser cache.
              </p>
            </section>

            <section>
              <h2 className="h3-title" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                3. Cookies &amp; Advertising
              </h2>
              <p>
                WKQuiz may display advertisements provided by third-party ad networks, such as Google AdSense. Third-party vendors may use cookies to serve ads based on prior visits to this website or other websites on the Internet.
              </p>
              <p style={{ marginTop: '8px' }}>
                Users may opt out of personalized advertising by visiting Google Ads Settings or www.aboutads.info.
              </p>
            </section>

            <section>
              <h2 className="h3-title" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                4. Analytics
              </h2>
              <p>
                We may use privacy-preserving web analytics tools to aggregate anonymous page views, device types, and performance metrics to help us optimize the speed and user experience of our quizzes.
              </p>
            </section>

            <section>
              <h2 className="h3-title" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                5. Contact Information
              </h2>
              <p>
                If you have questions regarding this Privacy Policy, you may contact us at: <strong>privacy@wkquiz.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

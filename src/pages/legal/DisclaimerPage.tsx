import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';

export const DisclaimerPage: React.FC = () => {
  return (
    <div style={{ padding: 'var(--space-2xl) 0' }}>
      <SEOHead
        title="Disclaimer — Medical, NCLEX & DMV Notices | WKQuiz.com"
        description="Important legal, medical, NCLEX, and DMV disclaimers for practice quizzes and educational content on WKQuiz.com."
        canonicalPath="/disclaimer"
      />

      <div className="app-container" style={{ maxWidth: '800px' }}>
        <div className="card" style={{ padding: 'var(--space-2xl)', borderRadius: 'var(--radius-xl)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)' }}>
            Legal Notice
          </span>
          <h1 className="h1-title" style={{ fontSize: '2.4rem', margin: 'var(--space-xs) 0 var(--space-lg)' }}>
            Disclaimer
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: 'var(--space-xl)' }}>
            Last Updated: September 13, 2026 • <em>Official Disclaimers &amp; Non-Affiliation Notices</em>
          </p>

          <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            {/* Medical & Nursing Disclaimer Box */}
            <div
              style={{
                backgroundColor: 'var(--color-warning-light)',
                border: '1.5px solid rgba(245, 158, 11, 0.4)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-lg)',
                color: 'var(--color-text-primary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <ShieldAlert size={24} color="#D97706" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#92400E' }}>
                  Medical &amp; Nursing Content Disclaimer
                </h2>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                Medical and nursing quizzes on WKQuiz.com are for <strong>educational and self-study purposes only</strong> and are NOT a substitute for professional medical advice, clinical judgment, diagnostic evaluation, hospital protocol, institutional policy, or official examination preparation.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, marginTop: '8px' }}>
                Never disregard professional healthcare advice or delay seeking medical care because of information or quiz rationales provided on this website.
              </p>
            </div>

            {/* Non-Affiliation Statement */}
            <section>
              <h2 className="h3-title" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                Non-Affiliation Notice (NCLEX, NCSBN, DMV, Government Agencies)
              </h2>
              <p>
                WKQuiz.com is an independent educational platform. WKQuiz is <strong>NOT affiliated with, authorized by, endorsed by, or in any way officially connected</strong> with:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
                <li>The National Council of State Boards of Nursing (NCSBN) or the NCLEX® examination.</li>
                <li>Any State Department of Motor Vehicles (DMV), Department of Public Safety (DPS), or BMV.</li>
                <li>Any official medical licensing board, state board of nursing, or government entity.</li>
              </ul>
              <p style={{ marginTop: '8px' }}>
                NCLEX® is a registered trademark of the National Council of State Boards of Nursing, Inc. Any references to NCLEX-style practice questions are solely descriptive and denote formatting style for study enrichment.
              </p>
            </section>

            {/* General Disclaimer */}
            <section>
              <h2 className="h3-title" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                Accuracy of Information
              </h2>
              <p>
                While we make rigorous efforts to curate accurate questions and rationales, clinical guidelines, traffic regulations, and scientific knowledge evolve. WKQuiz cannot guarantee the complete absence of errors or omissions. If you believe a question contains an error, please report it via our Contact page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

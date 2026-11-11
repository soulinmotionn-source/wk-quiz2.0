import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from './SEOHead';
import { breadcrumbSchema } from '../../seo/schema';

export const LEGAL_UPDATED = 'November 11, 2026';

interface LegalPageProps {
  title: string;
  seoTitle?: string;
  description: string;
  path: string;
  eyebrow?: string;
  children: React.ReactNode;
}

/** Shared layout for policy and trust pages: readable width, consistent heading style. */
export const LegalPage: React.FC<LegalPageProps> = ({ title, seoTitle, description, path, eyebrow = 'Legal & Trust', children }) => (
  <div style={{ padding: 'var(--space-xl) 0 var(--space-2xl)' }}>
    <SEOHead
      title={seoTitle ?? `${title} — WKQuiz.com`}
      description={description}
      canonicalPath={path}
      schema={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: title, path }
      ])}
    />
    <div className="app-container">
      <div className="legal">
        <nav aria-label="Breadcrumb" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 14 }}>
          <Link to="/">Home</Link> / <span aria-current="page">{title}</span>
        </nav>
        <article className="legal-card">
          <span className="legal-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="legal-updated">Last updated: {LEGAL_UPDATED}</p>
          {children}
        </article>
      </div>
    </div>
  </div>
);

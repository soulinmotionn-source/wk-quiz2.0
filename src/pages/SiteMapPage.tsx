import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { CATEGORIES } from '../data/categories';
import { FEATURED_QUIZZES } from '../data/quizzes';
import { HUBS } from '../content/hubs';
import { breadcrumbSchema } from '../seo/schema';

const PAGES = [
  { to: '/', label: 'Home' },
  { to: '/iq-test', label: 'Free IQ-style brain test' },
  { to: '/daily-quiz', label: 'Daily quiz' },
  { to: '/quizzes', label: 'All quizzes' },
  { to: '/categories', label: 'All categories' },
  { to: '/search', label: 'Search' }
];

const ABOUT = [
  { to: '/about', label: 'About WKQuiz' },
  { to: '/editorial-policy', label: 'Editorial policy' },
  { to: '/contact', label: 'Contact' },
  { to: '/advertising-disclosure', label: 'Advertising disclosure' },
  { to: '/accessibility', label: 'Accessibility statement' },
  { to: '/privacy-policy', label: 'Privacy policy' },
  { to: '/terms-and-conditions', label: 'Terms & conditions' },
  { to: '/cookie-policy', label: 'Cookie policy' },
  { to: '/disclaimer', label: 'Disclaimer' }
];

export const SiteMapPage: React.FC = () => {
  const hubSlugs = new Set(HUBS.map(h => h.slug));
  const hubs = CATEGORIES.filter(c => hubSlugs.has(c.slug));
  const others = CATEGORIES.filter(c => !hubSlugs.has(c.slug));

  return (
    <div style={{ padding: 'var(--space-xl) 0 var(--space-2xl)' }}>
      <SEOHead
        title="Site Map: Every Quiz, Category and Page on WKQuiz"
        description="Browse every WKQuiz page in one place: study topics with guides, quiz categories, curated quizzes, the brain test and our policy pages."
        canonicalPath="/site-map"
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Site map', path: '/site-map' }
        ])}
      />
      <div className="app-container">
        <h1 className="h1-title" style={{ marginBottom: 8 }}>
          Site map
        </h1>
        <p className="text-secondary" style={{ marginBottom: 28, maxWidth: 620 }}>
          Everything on WKQuiz in one place. Start with a study topic if you are preparing for something, or jump into the brain test for fun.
        </p>

        <div className="sitemap-grid">
          <section>
            <h2>Main pages</h2>
            <ul>
              {PAGES.map(p => (
                <li key={p.to}>
                  <Link to={p.to}>{p.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Study topics (quiz + guide)</h2>
            <ul>
              {hubs.map(c => (
                <li key={c.slug}>
                  <Link to={`/categories/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Curated quizzes</h2>
            <ul>
              {FEATURED_QUIZZES.map(q => (
                <li key={q.slug}>
                  <Link to={`/quizzes/${q.slug}`}>{q.title}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>More categories</h2>
            <ul>
              {others.map(c => (
                <li key={c.slug}>
                  <Link to={`/categories/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>About, policies and help</h2>
            <ul>
              {ABOUT.map(p => (
                <li key={p.to}>
                  <Link to={p.to}>{p.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

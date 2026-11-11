import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldAlert } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { HUBS } from '../../content/hubs';
import { reopenConsent } from '../../hooks/useConsent';

const SOCIAL = [
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@wkquizs',
    path: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z'
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCeEZz94n1bmsnezrF3aI6fw',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/wkquiz/',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z'
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/wkquiz',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
  }
];

export const Footer: React.FC = () => {
  const studyTopics = HUBS.map(h => CATEGORIES.find(c => c.slug === h.slug)).filter((c): c is (typeof CATEGORIES)[number] => Boolean(c));

  return (
    <footer className="site-footer">
      <div className="app-container">
        <div className="footer-grid">
          {/* Brand + social */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="WKQuiz.com home">
              <span className="footer-logo-mark">
                <Zap size={20} fill="#FFFFFF" aria-hidden="true" />
              </span>
              <span>
                WK<span style={{ color: 'var(--color-primary)' }}>Quiz</span>.com
              </span>
            </Link>
            <p>Free practice quizzes with an explanation for every answer, plus a brain test to share with friends.</p>
            <div className="footer-social" aria-label="WKQuiz on social media">
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`WKQuiz on ${s.label}`} title={s.label}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav className="footer-col" aria-label="Study topics">
            <h2>Study</h2>
            <ul>
              {studyTopics.map(c => (
                <li key={c.slug}>
                  <Link to={`/categories/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
              <li>
                <Link to="/categories" className="footer-more">
                  Browse all categories →
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Play">
            <h2>Play</h2>
            <ul>
              <li>
                <Link to="/iq-test">Free IQ test</Link>
              </li>
              <li>
                <Link to="/daily-quiz">Daily quiz</Link>
              </li>
              <li>
                <Link to="/quizzes/mixed-knowledge-classic">Mixed trivia</Link>
              </li>
              <li>
                <Link to="/quizzes">All quizzes</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="About and trust">
            <h2>About</h2>
            <ul>
              <li>
                <Link to="/about">About WKQuiz</Link>
              </li>
              <li>
                <Link to="/editorial-policy">Editorial policy</Link>
              </li>
              <li>
                <Link to="/advertising-disclosure">Advertising</Link>
              </li>
              <li>
                <Link to="/accessibility">Accessibility</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/site-map">Site map</Link>
              </li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Legal">
            <h2>Legal</h2>
            <ul>
              <li>
                <Link to="/privacy-policy">Privacy policy</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions">Terms &amp; conditions</Link>
              </li>
              <li>
                <Link to="/cookie-policy">Cookie policy</Link>
              </li>
              <li>
                <Link to="/disclaimer">Disclaimer</Link>
              </li>
              <li>
                <button type="button" onClick={reopenConsent}>
                  Cookie settings
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <p className="footer-disclaimer">
          <ShieldAlert size={18} aria-hidden="true" />
          <span>
            <strong>Educational &amp; healthcare disclaimer:</strong> Medical and nursing quizzes on WKQuiz.com are for education and review only. They are not medical advice and do not replace professional judgment, hospital policy or official exam materials. WKQuiz is not affiliated with the NCSBN, NCLEX, any state DMV or any government agency.
          </span>
        </p>

        <div className="footer-bottom">
          <span suppressHydrationWarning>© {new Date().getFullYear()} WKQuiz.com. All rights reserved.</span>
          <span>Learn • Play • Grow</span>
        </div>
      </div>
    </footer>
  );
};

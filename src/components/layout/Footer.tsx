import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Heart, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        marginTop: 'auto',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-2xl)'
      }}
    >
      <div className="app-container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-2xl)',
            marginBottom: 'var(--space-2xl)'
          }}
        >
          {/* Brand Column */}
          <div>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                marginBottom: 'var(--space-md)'
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <Zap size={20} fill="#FFFFFF" />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}>
                WK<span style={{ color: 'var(--color-primary)' }}>Quiz</span>.com
              </span>
            </Link>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 'var(--space-md)' }}>
              "Learn • Play • Grow" — Test your knowledge with fun, engaging, and educational quizzes across healthcare, sciences, trivia, and exams.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)'
                }}
              >
                Fast &amp; Mobile-First
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-secondary-light)',
                  color: 'var(--color-secondary)'
                }}
              >
                100% Free
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 'var(--space-md)',
                color: 'var(--color-text-primary)'
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                  All 34 Categories
                </Link>
              </li>
              <li>
                <Link to="/daily-quiz" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                  Today's Daily Quiz
                </Link>
              </li>
              <li>
                <Link to="/quizzes" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                  Curated Quizzes
                </Link>
              </li>
              <li>
                <Link to="/search" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                  Search Catalog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 'var(--space-md)',
                color: 'var(--color-text-primary)'
              }}
            >
              About &amp; Policies
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/about" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                  About WKQuiz
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                  Disclaimer Notice
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div>
            <h4
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 'var(--space-md)',
                color: 'var(--color-text-primary)'
              }}
            >
              Follow WK Quiz
            </h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: 'var(--space-md)' }}>
              Join our growing audience across social platforms for daily brain teasers, short quizzes, and study tips:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
              <a
                href="#tiktok"
                onClick={e => e.preventDefault()}
                className="btn btn-secondary btn-sm"
                title="Follow on TikTok"
              >
                TikTok
              </a>
              <a
                href="#youtube"
                onClick={e => e.preventDefault()}
                className="btn btn-secondary btn-sm"
                title="Subscribe on YouTube"
              >
                YouTube
              </a>
              <a
                href="#instagram"
                onClick={e => e.preventDefault()}
                className="btn btn-secondary btn-sm"
                title="Follow on Instagram"
              >
                Instagram
              </a>
              <a
                href="#facebook"
                onClick={e => e.preventDefault()}
                className="btn btn-secondary btn-sm"
                title="Like on Facebook"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Responsible Medical & Exam Disclaimer Box */}
        <div
          style={{
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-md)',
            marginBottom: 'var(--space-xl)',
            display: 'flex',
            gap: 'var(--space-md)',
            alignItems: 'flex-start'
          }}
        >
          <ShieldAlert size={20} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            <strong>Educational &amp; Healthcare Disclaimer:</strong> Medical and nursing quizzes on WKQuiz.com are provided for educational and review purposes only and are not a substitute for professional medical advice, clinical judgment, hospital policy, or official examination materials. WKQuiz is not affiliated with the NCSBN, NCLEX, state DMVs, or any government agency.
          </p>
        </div>

        {/* Copyright */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-sm)',
            borderTop: '1px solid var(--color-border-light)',
            paddingTop: 'var(--space-md)',
            color: 'var(--color-text-muted)',
            fontSize: '0.85rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>© {new Date().getFullYear()} WKQuiz.com. All rights reserved. Crafted with</span>
            <Heart size={14} fill="#EF4444" color="#EF4444" />
            <span>for learners worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldAlert } from 'lucide-react';

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
                href="https://tiktok.com/@wkquizs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                title="Follow on TikTok (@wkquizs)"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                </svg>
                <span>TikTok</span>
              </a>
              <a
                href="https://www.youtube.com/channel/UCeEZz94n1bmsnezrF3aI6fw"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                title="Subscribe on YouTube"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span>YouTube</span>
              </a>
              <a
                href="https://www.instagram.com/wkquiz/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                title="Follow on Instagram (@wkquiz)"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/wkquiz"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                title="Like on Facebook"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <span>© {new Date().getFullYear()} WKQuiz.com. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

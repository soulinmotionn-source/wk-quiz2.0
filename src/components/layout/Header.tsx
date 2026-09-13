import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Play, Zap } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-xs)'
      }}
    >
      <div
        className="app-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'var(--header-height)',
          gap: 'var(--space-sm)'
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            flexShrink: 0
          }}
          aria-label="WKQuiz.com Homepage"
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
              boxShadow: '0 4px 10px rgba(255, 107, 53, 0.3)',
              color: '#FFFFFF',
              flexShrink: 0
            }}
          >
            <Zap size={20} fill="#FFFFFF" />
          </div>
          <div>
            <div
              style={{
                fontSize: '1.2rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: 'var(--color-text-primary)'
              }}
            >
              WK<span style={{ color: 'var(--color-primary)' }}>Quiz</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>.com</span>
            </div>
            <div
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'var(--color-text-muted)'
              }}
              className="logo-tagline"
            >
              Learn • Play • Grow
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 'var(--space-lg)'
          }}
          className="desktop-nav"
        >
          <Link
            to="/"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--color-text-secondary)'
            }}
          >
            Home
          </Link>
          <Link
            to="/categories"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--color-text-secondary)'
            }}
          >
            Categories
          </Link>
          <Link
            to="/daily-quiz"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--color-text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)'
              }}
            />
            Daily Quiz
          </Link>
          <Link
            to="/quizzes"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--color-text-secondary)'
            }}
          >
            Quizzes
          </Link>
          <Link
            to="/about"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--color-text-secondary)'
            }}
          >
            About
          </Link>
        </nav>

        {/* Search Field & Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {/* Desktop Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: 'none',
              alignItems: 'center',
              position: 'relative'
            }}
            className="desktop-search"
          >
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '12px',
                color: 'var(--color-text-muted)',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                height: '40px',
                width: '180px',
                paddingLeft: '38px',
                paddingRight: '12px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg)',
                fontSize: '0.875rem',
                outline: 'none',
                transition: 'width var(--transition-fast)'
              }}
              onFocus={e => (e.target.style.width = '220px')}
              onBlur={e => (e.target.style.width = '180px')}
            />
          </form>

          {/* Theme Toggle */}
          <div className="header-theme-toggle">
            <ThemeToggle />
          </div>

          {/* Desktop Start Quiz CTA */}
          <Link
            to="/quizzes/mixed-knowledge-classic"
            className="btn btn-primary desktop-cta"
            style={{
              height: '40px',
              padding: '0 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem'
            }}
          >
            <Play size={15} fill="currentColor" />
            <span>Start Quiz</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              flexShrink: 0
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
            padding: 'var(--space-lg) var(--space-md)',
            boxShadow: 'var(--shadow-lg)'
          }}
          className="mobile-drawer animate-fade-in"
        >
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} style={{ marginBottom: 'var(--space-md)' }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '12px',
                  color: 'var(--color-text-muted)'
                }}
              />
              <input
                type="text"
                placeholder="Search quizzes, categories..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  height: '44px',
                  paddingLeft: '42px',
                  paddingRight: '14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg)',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          </form>

          {/* Mobile Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                color: 'var(--color-text-primary)'
              }}
            >
              Home
            </Link>
            <Link
              to="/categories"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                color: 'var(--color-text-primary)'
              }}
            >
              All 34 Categories
            </Link>
            <Link
              to="/daily-quiz"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                color: 'var(--color-primary)'
              }}
            >
              Today's Daily Quiz
            </Link>
            <Link
              to="/quizzes"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                color: 'var(--color-text-primary)'
              }}
            >
              All Quizzes
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                color: 'var(--color-text-primary)'
              }}
            >
              About WKQuiz
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                color: 'var(--color-text-primary)'
              }}
            >
              Contact Us
            </Link>

            <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: 'var(--space-sm) 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Visual Theme</span>
              <ThemeToggle />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', padding: '12px 14px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              <Link to="/privacy-policy" onClick={() => setMobileMenuOpen(false)}>Privacy</Link>
              <Link to="/terms-and-conditions" onClick={() => setMobileMenuOpen(false)}>Terms</Link>
              <Link to="/cookie-policy" onClick={() => setMobileMenuOpen(false)}>Cookies</Link>
              <Link to="/disclaimer" onClick={() => setMobileMenuOpen(false)}>Disclaimer</Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .desktop-search { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          .desktop-cta { display: inline-flex !important; }
        }
        @media (max-width: 899px) {
          .desktop-cta { display: none !important; }
        }
        @media (max-width: 480px) {
          .logo-tagline { display: none !important; }
        }
      `}</style>
    </header>
  );
};

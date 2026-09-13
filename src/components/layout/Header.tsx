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
          gap: 'var(--space-md)'
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            flexShrink: 0
          }}
          aria-label="WKQuiz.com Homepage"
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(255, 107, 53, 0.3)',
              color: '#FFFFFF'
            }}
          >
            <Zap size={22} fill="#FFFFFF" />
          </div>
          <div>
            <div
              style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: 'var(--color-text-primary)'
              }}
            >
              WK<span style={{ color: 'var(--color-primary)' }}>Quiz</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>.com</span>
            </div>
            <div
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'var(--color-text-muted)'
              }}
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
              color: 'var(--color-text-secondary)',
              transition: 'color var(--transition-fast)'
            }}
          >
            Home
          </Link>
          <Link
            to="/categories"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--color-text-secondary)',
              transition: 'color var(--transition-fast)'
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
            gap: 'var(--space-md)'
          }}
        >
          {/* Desktop Search */}
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
                width: '200px',
                paddingLeft: '38px',
                paddingRight: '12px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg)',
                fontSize: '0.875rem',
                outline: 'none',
                transition: 'width var(--transition-fast), border-color var(--transition-fast)'
              }}
              onFocus={e => (e.target.style.width = '240px')}
              onBlur={e => (e.target.style.width = '200px')}
            />
          </form>

          {/* Theme Toggle */}
          <div className="desktop-theme">
            <ThemeToggle />
          </div>

          {/* Start Quiz CTA */}
          <Link
            to="/quizzes/mixed-knowledge-classic"
            className="btn btn-primary"
            style={{
              height: '42px',
              padding: '0 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.9rem'
            }}
          >
            <Play size={16} fill="currentColor" />
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
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
          className="mobile-drawer"
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
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
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                color: 'var(--color-text-primary)'
              }}
            >
              Categories
            </Link>
            <Link
              to="/daily-quiz"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                color: 'var(--color-primary)'
              }}
            >
              Daily Quiz
            </Link>
            <Link
              to="/quizzes"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
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
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                color: 'var(--color-text-primary)'
              }}
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                color: 'var(--color-text-primary)'
              }}
            >
              Contact
            </Link>

            <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: 'var(--space-sm) 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 14px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Theme</span>
              <ThemeToggle />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', padding: '10px 14px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              <Link to="/privacy-policy" onClick={() => setMobileMenuOpen(false)}>Privacy</Link>
              <Link to="/terms-and-conditions" onClick={() => setMobileMenuOpen(false)}>Terms</Link>
              <Link to="/cookie-policy" onClick={() => setMobileMenuOpen(false)}>Cookies</Link>
              <Link to="/disclaimer" onClick={() => setMobileMenuOpen(false)}>Disclaimer</Link>
            </div>
          </div>
        </div>
      )}

      {/* Style hook for responsive desktop nav visibility */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .desktop-search { display: flex !important; }
          .desktop-theme { display: block !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 899px) {
          .desktop-theme { display: none !important; }
        }
      `}</style>
    </header>
  );
};

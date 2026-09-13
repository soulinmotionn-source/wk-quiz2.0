import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, Flame, BookOpen, Search } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  return (
    <nav
      className="mobile-bottom-nav"
      aria-label="Mobile Bottom Navigation"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '60px',
          maxWidth: '500px',
          margin: '0 auto',
          padding: '0 8px'
        }}
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            textDecoration: 'none',
            color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
            fontWeight: isActive ? 700 : 500,
            fontSize: '0.7rem',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            transition: 'all var(--transition-fast)'
          })}
        >
          <Home size={20} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            textDecoration: 'none',
            color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
            fontWeight: isActive ? 700 : 500,
            fontSize: '0.7rem',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            transition: 'all var(--transition-fast)'
          })}
        >
          <Grid size={20} />
          <span>Categories</span>
        </NavLink>

        <NavLink
          to="/daily-quiz"
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            textDecoration: 'none',
            color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
            fontWeight: isActive ? 700 : 500,
            fontSize: '0.7rem',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            transition: 'all var(--transition-fast)',
            position: 'relative'
          })}
        >
          <div style={{ position: 'relative' }}>
            <Flame size={20} />
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-4px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)'
              }}
            />
          </div>
          <span>Daily</span>
        </NavLink>

        <NavLink
          to="/quizzes"
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            textDecoration: 'none',
            color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
            fontWeight: isActive ? 700 : 500,
            fontSize: '0.7rem',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            transition: 'all var(--transition-fast)'
          })}
        >
          <BookOpen size={20} />
          <span>Quizzes</span>
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            textDecoration: 'none',
            color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
            fontWeight: isActive ? 700 : 500,
            fontSize: '0.7rem',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            transition: 'all var(--transition-fast)'
          })}
        >
          <Search size={20} />
          <span>Search</span>
        </NavLink>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mobile-bottom-nav {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

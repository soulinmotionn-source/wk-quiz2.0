import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, Flame, Brain, Search } from 'lucide-react';

const ITEMS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/categories', label: 'Categories', icon: Grid },
  { to: '/iq-test', label: 'IQ Test', icon: Brain, highlight: true },
  { to: '/daily-quiz', label: 'Daily', icon: Flame, dot: true },
  { to: '/search', label: 'Search', icon: Search }
] as const;

/** Always-visible phone navigation. The IQ test sits in the middle so it is one tap away. */
export const MobileBottomNav: React.FC = () => (
  <nav className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
    <div className="mobile-bottom-nav-row">
      {ITEMS.map(item => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={'end' in item ? item.end : false}
            className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}${'highlight' in item ? ' is-highlight' : ''}`}
          >
            <span className="mobile-nav-icon">
              <Icon size={'highlight' in item ? 22 : 20} aria-hidden="true" />
              {'dot' in item && <i className="mobile-nav-dot" aria-hidden="true" />}
            </span>
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </div>
  </nav>
);

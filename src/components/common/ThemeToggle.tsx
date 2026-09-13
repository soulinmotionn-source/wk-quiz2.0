import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div 
      className="theme-toggle"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-full)',
        padding: '3px',
        gap: '2px'
      }}
      role="radiogroup"
      aria-label="Select theme"
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-label="Light theme"
        title="Light theme"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: 'var(--radius-full)',
          background: theme === 'light' ? 'var(--color-primary)' : 'transparent',
          color: theme === 'light' ? '#FFFFFF' : 'var(--color-text-muted)',
          transition: 'all var(--transition-fast)'
        }}
      >
        <Sun size={16} />
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-label="Dark theme"
        title="Dark theme"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: 'var(--radius-full)',
          background: theme === 'dark' ? 'var(--color-primary)' : 'transparent',
          color: theme === 'dark' ? '#FFFFFF' : 'var(--color-text-muted)',
          transition: 'all var(--transition-fast)'
        }}
      >
        <Moon size={16} />
      </button>

      <button
        type="button"
        onClick={() => setTheme('system')}
        aria-label="System theme"
        title="System theme"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: 'var(--radius-full)',
          background: theme === 'system' ? 'var(--color-primary)' : 'transparent',
          color: theme === 'system' ? '#FFFFFF' : 'var(--color-text-muted)',
          transition: 'all var(--transition-fast)'
        }}
      >
        <Laptop size={16} />
      </button>
    </div>
  );
};

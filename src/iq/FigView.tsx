import React from 'react';
import type { Fig } from './puzzles';

/** Draws a figure (grid of lit squares) as inline SVG. */
export const FigView: React.FC<{ fig: Fig; title?: string; fit?: boolean }> = ({ fig, title, fit = false }) => {
  const unit = 12;
  const lit = new Set(fig.on);
  const cells = [];
  for (let y = 0; y < fig.h; y++) {
    for (let x = 0; x < fig.w; x++) {
      const on = lit.has(y * fig.w + x);
      cells.push(
        <rect
          key={`${x}-${y}`}
          x={x * unit + 1}
          y={y * unit + 1}
          width={unit - 2}
          height={unit - 2}
          rx={2.2}
          fill={on ? 'var(--color-primary)' : 'transparent'}
          stroke={on ? 'var(--color-text-primary)' : 'var(--color-border)'}
          strokeWidth={on ? 1.1 : 0.6}
        />
      );
    }
  }
  return (
    <svg
      viewBox={`0 0 ${fig.w * unit} ${fig.h * unit}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={title ?? 'Puzzle figure'}
      className={fit ? 'iq-fig fit' : 'iq-fig'}
      style={fit ? undefined : { aspectRatio: `${fig.w} / ${fig.h}` }}
    >
      {cells}
    </svg>
  );
};

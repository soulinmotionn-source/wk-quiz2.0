import React, { useId } from 'react';
import type { Cell } from './puzzles';

const POSITIONS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [
    [31, 50],
    [69, 50]
  ],
  3: [
    [50, 30],
    [30, 70],
    [70, 70]
  ]
};
const COUNT_SCALE = { 1: 1, 2: 0.78, 3: 0.64 } as const;
const SIZE_SCALE = [0.6, 0.8, 1] as const;

/** Draws one puzzle cell as an inline SVG (no images, so it scales and themes cleanly). */
export const Glyph: React.FC<{ cell: Cell; title?: string }> = ({ cell, title }) => {
  const uid = useId().replace(/:/g, '');
  const r = 27 * COUNT_SCALE[cell.count] * SIZE_SCALE[cell.size];
  const fill = cell.fill === 0 ? 'none' : cell.fill === 1 ? 'var(--color-primary)' : `url(#stripe-${uid})`;

  const shapeAt = (x: number, y: number, i: number) => {
    const common = {
      key: i,
      fill,
      stroke: 'var(--color-text-primary)',
      strokeWidth: 3.2,
      strokeLinejoin: 'round' as const,
      transform: `rotate(${cell.rot} ${x} ${y})`
    };
    if (cell.shape === 0) return <circle {...common} cx={x} cy={y} r={r} />;
    if (cell.shape === 1) return <rect {...common} x={x - r * 0.9} y={y - r * 0.9} width={r * 1.8} height={r * 1.8} rx={2} />;
    const h = r * 1.15;
    return <polygon {...common} points={`${x},${y - h} ${x + h * 1.05},${y + h * 0.8} ${x - h * 1.05},${y + h * 0.8}`} />;
  };

  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={title ?? 'Puzzle shape'} className="iq-glyph">
      <defs>
        <pattern id={`stripe-${uid}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="3.2" height="7" fill="var(--color-primary)" />
        </pattern>
      </defs>
      {POSITIONS[cell.count].map(([x, y], i) => shapeAt(x, y, i))}
    </svg>
  );
};

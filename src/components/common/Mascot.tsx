import React from 'react';

export type MascotMood = 'idle' | 'thinking' | 'cheer' | 'sad';

interface MascotProps {
  mood?: MascotMood;
  /** Body colour; defaults to the current topic colour */
  color?: string;
  size?: number;
  className?: string;
}

/**
 * "Wiz", the WKQuiz mascot: a round little spark-headed creature drawn in plain SVG
 * (no images, so it is tiny, crisp at any size and recolours per topic).
 */
export const Mascot: React.FC<MascotProps> = ({ mood = 'idle', color = 'var(--topic, #FF6B35)', size = 64, className = '' }) => {
  const happy = mood === 'cheer';
  const sad = mood === 'sad';
  const thinking = mood === 'thinking';

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`mascot mascot-${mood} ${className}`}
      role="img"
      aria-label={`Wiz the mascot looks ${mood === 'cheer' ? 'excited' : mood === 'sad' ? 'sympathetic' : mood === 'thinking' ? 'thoughtful' : 'friendly'}`}
    >
      {/* spark antenna */}
      <path d="M50 14 L44 27 H51 L47 38 L58 23 H51 Z" fill="#FFC83D" stroke="#B9770E" strokeWidth="1.6" strokeLinejoin="round" className="mascot-spark" />

      {/* arms */}
      {happy ? (
        <>
          <path d="M20 60 Q8 44 14 32" stroke={color} strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M80 60 Q92 44 86 32" stroke={color} strokeWidth="9" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <path d="M20 66 Q9 70 11 80" stroke={color} strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M80 66 Q91 70 89 80" stroke={color} strokeWidth="9" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* body */}
      <ellipse cx="50" cy="62" rx="33" ry="30" fill={color} />
      <ellipse cx="50" cy="70" rx="21" ry="17" fill="#fff" opacity="0.25" />
      <ellipse cx="38" cy="46" rx="9" ry="5" fill="#fff" opacity="0.3" transform="rotate(-25 38 46)" />

      {/* eyes */}
      {happy ? (
        <>
          <path d="M33 56 Q39 47 45 56" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M55 56 Q61 47 67 56" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <circle cx="39" cy="56" r="8" fill="#fff" />
          <circle cx="61" cy="56" r="8" fill="#fff" />
          <circle cx={thinking ? 42 : 39} cy={thinking ? 53 : sad ? 59 : 57} r="4" fill="#1E293B" />
          <circle cx={thinking ? 64 : 61} cy={thinking ? 53 : sad ? 59 : 57} r="4" fill="#1E293B" />
        </>
      )}

      {/* brows */}
      {sad && (
        <>
          <path d="M31 45 L45 49" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <path d="M69 45 L55 49" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {thinking && <path d="M55 44 Q62 40 69 45" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />}

      {/* mouth */}
      {happy && <path d="M38 70 Q50 86 62 70 Z" fill="#7F1D1D" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />}
      {mood === 'idle' && <path d="M40 72 Q50 80 60 72" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />}
      {sad && <path d="M41 79 Q50 70 59 79" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />}
      {thinking && <ellipse cx="52" cy="76" rx="4" ry="3.2" fill="#1E293B" />}

      {/* extras */}
      {sad && <path d="M72 40 Q76 47 72 51 Q68 47 72 40 Z" fill="#7DD3FC" />}
      {thinking && (
        <text x="73" y="30" fontSize="20" fontWeight="800" fill="#FFC83D" stroke="#B9770E" strokeWidth="0.8">
          ?
        </text>
      )}
      {happy && (
        <>
          <circle cx="16" cy="22" r="3" fill="#FFC83D" />
          <circle cx="84" cy="20" r="3" fill="#34D399" />
          <circle cx="26" cy="12" r="2.4" fill="#F472B6" />
          <circle cx="76" cy="10" r="2.4" fill="#60A5FA" />
        </>
      )}
    </svg>
  );
};

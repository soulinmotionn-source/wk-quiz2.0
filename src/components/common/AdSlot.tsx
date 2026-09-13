import React from 'react';

export type AdSlotType = 'banner' | 'in-content' | 'between-section' | 'results';

interface AdSlotProps {
  type?: AdSlotType;
  className?: string;
  slotId?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  type = 'in-content',
  className = '',
  slotId = 'wk-ad-placeholder'
}) => {
  // Height and max-width based on standard IAB ad dimensions
  let minHeight = '90px';
  let maxWidth = '728px';

  if (type === 'banner') {
    minHeight = '90px';
    maxWidth = '970px';
  } else if (type === 'results') {
    minHeight = '140px';
    maxWidth = '600px';
  } else if (type === 'between-section') {
    minHeight = '100px';
    maxWidth = '728px';
  }

  return (
    <div 
      className={`ad-slot-wrapper ${className}`}
      style={{
        width: '100%',
        maxWidth,
        margin: 'var(--space-xl) auto',
        padding: 'var(--space-sm)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-label="Advertisement Area"
    >
      <div 
        style={{
          width: '100%',
          minHeight,
          borderRadius: 'var(--radius-md)',
          border: '1.5px dashed var(--color-border)',
          backgroundColor: 'var(--color-bg-alt)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-sm)',
          textAlign: 'center',
          userSelect: 'none'
        }}
      >
        <span 
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            fontWeight: 700,
            marginBottom: '4px'
          }}
        >
          Advertisement
        </span>
        <span 
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
            opacity: 0.8
          }}
        >
          AdSense Ready Slot ({slotId})
        </span>
      </div>
    </div>
  );
};

import React, { useEffect, useRef } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Clear any previous ad elements to avoid duplicate containers
    el.innerHTML = '';

    // Create the container div expected by the ad network
    const adContainer = document.createElement('div');
    adContainer.id = 'container-44381791c844e0dd28904bf9e33e3a46';
    el.appendChild(adContainer);

    // Create and append the ad script
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://pl31486114.profitableratecpmnetwork.com/44381791c844e0dd28904bf9e33e3a46/invoke.js';
    el.appendChild(script);

    return () => {
      if (el) {
        el.innerHTML = '';
      }
    };
  }, [slotId]);

  return (
    <div 
      className={`ad-slot-wrapper ${className}`}
      style={{
        width: '100%',
        maxWidth,
        margin: 'var(--space-xl) auto',
        padding: 'var(--space-xs)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-label="Advertisement Area"
    >
      <span 
        style={{
          fontSize: '0.65rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          fontWeight: 600,
          marginBottom: '4px'
        }}
      >
        Advertisement
      </span>
      <div 
        ref={containerRef}
        style={{
          width: '100%',
          minHeight,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      />
    </div>
  );
};


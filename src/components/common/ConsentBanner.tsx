import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { setConsent, useConsent } from '../../hooks/useConsent';

/**
 * Simple opt-in consent banner. Analytics and advertising scripts only load after
 * the visitor presses Accept. Rendered after mount so prerendered HTML stays identical.
 */
export const ConsentBanner: React.FC = () => {
  const { showBanner } = useConsent();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !showBanner) return null;

  return (
    <div className="consent" role="dialog" aria-label="Cookie preferences" aria-live="polite">
      <p>
        <Cookie size={16} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-3px', marginRight: 6 }} />
        We use cookies for analytics and to show ads that help keep WKQuiz free. Quiz progress is saved on your device and doesn’t need cookies. Choose whether to allow analytics and ads. Read our{' '}
        <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/cookie-policy">Cookie Policy</Link>.
      </p>
      <div className="consent-actions">
        <button type="button" className="btn btn-primary" onClick={() => setConsent('granted')}>
          Accept
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => setConsent('denied')}>
          Decline
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { LegalPage } from '../../components/common/LegalPage';
import { reopenConsent } from '../../hooks/useConsent';

export const CookiePolicyPage: React.FC = () => (
  <LegalPage
    title="Cookie Policy"
    description="Which cookies and browser storage WKQuiz.com uses, why, and how to accept, decline or change your choice at any time."
    path="/cookie-policy"
  >
    <p>
      Cookies are small files that websites store in your browser. We also use “local storage”, a similar browser feature that is not sent to our servers. This page explains what we use and how you stay in control.
    </p>

    <h2>1. What we use</h2>
    <h3 style={{ margin: '14px 0 4px', fontWeight: 800 }}>Essential browser storage (always on)</h3>
    <p>This is needed for the site to work the way you expect and stays on your device:</p>
    <ul>
      <li>
        <code>wkquiz_user_progress</code>: your quiz results, XP, level and streak
      </li>
      <li>
        <code>wkquiz_theme</code>: your light, dark or system theme choice
      </li>
      <li>
        <code>wkquiz_consent</code>: whether you accepted or declined cookies
      </li>
      <li>
        <code>wkquiz_iq_history</code>: your brain-test history
      </li>
    </ul>

    <h3 style={{ margin: '18px 0 4px', fontWeight: 800 }}>Analytics cookies (only if you accept)</h3>
    <p>
      Google Analytics sets cookies, usually named <code>_ga</code> and <code>_ga_*</code>, to tell visits apart and report aggregated usage such as pages viewed and device type. Without consent, the analytics script is not loaded.
    </p>

    <h3 style={{ margin: '18px 0 4px', fontWeight: 800 }}>Advertising cookies (only if you accept)</h3>
    <p>
      Advertising partners, which may include Google AdSense and other ad networks, can set cookies to show ads, limit repeats and measure results. Without consent, advertising scripts are not loaded, so those cookies are not set.
    </p>

    <h2>2. Your choices</h2>
    <ul>
      <li>
        Change your choice at any time:{' '}
        <button type="button" className="guide-link" onClick={reopenConsent}>
          open cookie settings
        </button>
        , or use the “Cookie settings” link in the footer.
      </li>
      <li>Delete cookies and site data in your browser settings. Doing so also resets your saved quiz progress.</li>
      <li>
        Control personalised ads through{' '}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>{' '}
        or{' '}
        <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">
          aboutads.info
        </a>
        .
      </li>
    </ul>

    <h2>3. More information</h2>
    <p>
      Read the <Link to="/privacy-policy">Privacy Policy</Link> for how we handle information and the <Link to="/advertising-disclosure">Advertising Disclosure</Link> for how ads work on WKQuiz.
    </p>
  </LegalPage>
);

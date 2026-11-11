import React from 'react';
import { Link } from 'react-router-dom';
import { LegalPage } from '../../components/common/LegalPage';
import { reopenConsent } from '../../hooks/useConsent';

export const AdvertisingPage: React.FC = () => (
  <LegalPage
    title="Advertising Disclosure"
    description="How advertising works on WKQuiz.com: why we show ads, how they are labelled, what we do not do, and how to control cookies and personalised ads."
    path="/advertising-disclosure"
    eyebrow="Trust & Quality"
  >
    <p>
      WKQuiz is free to use. Advertising helps pay for hosting and for writing and checking our content. This page explains how ads work on the site.
    </p>

    <h2>How ads appear</h2>
    <ul>
      <li>Ads are shown in clearly separated areas labelled “Advertisement”, between sections or after a quiz.</li>
      <li>We keep ads away from answer buttons and question text so you never tap one by accident.</li>
      <li>We do not show ads that look like quiz questions, buttons or navigation.</li>
    </ul>

    <h2>Who serves the ads</h2>
    <p>
      Ads are provided by third-party advertising partners, which may include Google AdSense and other advertising networks. These partners choose and deliver the ads. We do not endorse the advertisers or the products they promote, and we are not responsible for what they say.
    </p>

    <h2>Cookies and your choices</h2>
    <p>
      Advertising scripts only load if you accept cookies on our banner. If you decline, they are not loaded. You can change your choice any time:{' '}
      <button type="button" className="guide-link" onClick={reopenConsent}>
        open cookie settings
      </button>
      . You can also manage personalised advertising through{' '}
      <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
        Google Ads Settings
      </a>
      .
    </p>

    <h2>Our editorial independence</h2>
    <p>
      Advertisers do not influence our questions, guides or scores, and we do not sell placement in our content. If we ever add sponsored content or affiliate links, we will label it clearly.
    </p>

    <h2>Report an ad</h2>
    <p>
      If you see an ad that is offensive, misleading or broken, tell us through the <Link to="/contact">contact page</Link>, with the page address and a short description, and we will report it to the ad provider. See also our <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/cookie-policy">Cookie Policy</Link>.
    </p>
  </LegalPage>
);

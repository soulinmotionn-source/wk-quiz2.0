import React from 'react';
import { Link } from 'react-router-dom';
import { LegalPage } from '../../components/common/LegalPage';
import { reopenConsent } from '../../hooks/useConsent';
import { CONTACT_EMAIL } from '../../seo/site';

export const PrivacyPolicyPage: React.FC = () => (
  <LegalPage
    title="Privacy Policy"
    description="How WKQuiz.com handles your data: what stays on your device, how analytics and advertising cookies work, your choices, and your rights."
    path="/privacy-policy"
  >
    <p>
      This policy explains what information WKQuiz.com (“WKQuiz”, “we”, “us”) collects when you use the website, how we use it, and the choices you have. We have written it in plain language. If anything is unclear, email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
    </p>

    <h2>1. The short version</h2>
    <ul>
      <li>You do not need an account to use WKQuiz, and we do not ask for your name, email or payment details to play.</li>
      <li>Your quiz progress, scores, streaks, theme choice and brain-test history are stored on your own device, in your browser.</li>
      <li>If you accept cookies, we use Google Analytics to measure how the site is used and our advertising partners show ads, which can use cookies.</li>
      <li>You can decline or change your cookie choice at any time with the “Cookie settings” link in the footer.</li>
    </ul>

    <h2>2. Information we collect</h2>
    <p>
      <strong>Information stored on your device.</strong> We use your browser’s local storage to remember your quiz results, XP and streak, which theme you picked, your cookie choice, and your brain-test history. This information stays on your device. We do not receive it, and clearing your browser data removes it.
    </p>
    <p>
      <strong>Usage information (only if you accept cookies).</strong> Google Analytics collects aggregated information about visits, such as the pages you view, the type of device and browser you use, your approximate location (for example, country or city), how you reached the site, and how long you stayed. We use it to understand which quizzes are useful and to make the site faster and easier to use.
    </p>
    <p>
      <strong>Advertising information (only if you accept cookies).</strong> Our advertising partners, which may include Google AdSense and other advertising networks, can use cookies and similar technologies to show ads, limit how often you see an ad, and measure ad performance.
    </p>
    <p>
      <strong>Messages you send us.</strong> The contact form opens your email app with a prepared message. If you email us, we receive your email address and whatever you write, and we use it only to reply and to improve the site.
    </p>

    <h2>3. How we use information</h2>
    <ul>
      <li>To provide the quizzes, remember your progress and keep the site working.</li>
      <li>To understand usage in aggregate and fix problems.</li>
      <li>To show advertising that helps cover the cost of running the site.</li>
      <li>To answer your messages and correct mistakes in our content.</li>
      <li>To protect the site from abuse and meet legal obligations.</li>
    </ul>
    <p>We do not sell your personal information for money, and we do not build profiles of individual visitors ourselves.</p>

    <h2>4. Cookies, Google and advertising</h2>
    <p>
      Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to this website or other websites. Google’s use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and other sites on the internet.
    </p>
    <p>
      You can opt out of personalised advertising by visiting{' '}
      <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
        Google Ads Settings
      </a>
      , and you can opt out of some third-party vendors’ use of cookies for personalised advertising at{' '}
      <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">
        www.aboutads.info
      </a>
      . You can learn how Google uses information from sites that use its services at{' '}
      <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
        policies.google.com/technologies/partner-sites
      </a>
      .
    </p>
    <p>
      Analytics and advertising scripts only load after you press Accept on our cookie banner. If you decline, they do not load. You can change your choice at any time:{' '}
      <button type="button" className="guide-link" onClick={reopenConsent}>
        open cookie settings
      </button>
      . See our <Link to="/cookie-policy">Cookie Policy</Link> and <Link to="/advertising-disclosure">Advertising Disclosure</Link> for details.
    </p>

    <h2>5. Your rights</h2>
    <p>
      Depending on where you live, you may have the right to access, correct, delete or export personal information held about you, to object to or restrict certain processing, and to withdraw consent at any time. This applies, for example, under the EU and UK GDPR and under US state laws such as the California Consumer Privacy Act. Because we hold very little personal information and no accounts, the most useful controls are the cookie settings and clearing your browser storage. To make a request about anything else, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. You may also complain to your local data protection authority.
    </p>
    <p>
      Where the law requires a legal basis, we rely on your consent for analytics and advertising cookies, and on our legitimate interest in running and securing a free educational website for the rest.
    </p>

    <h2>6. Children’s privacy</h2>
    <p>
      WKQuiz is a general-audience website and is not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has sent us personal information, contact us and we will delete it.
    </p>

    <h2>7. How long we keep data and how we protect it</h2>
    <p>
      Data in your browser stays until you clear it. We do not keep a database of quiz results. Analytics data is kept by Google for the retention period configured in our analytics account. We use secure HTTPS connections, but no website can guarantee absolute security.
    </p>

    <h2>8. Other websites and international transfers</h2>
    <p>
      We link to other sites, such as social networks and official exam bodies. We do not control them and are not responsible for their privacy practices. Our analytics and advertising providers may process data in countries other than your own, using the safeguards those providers describe.
    </p>

    <h2>9. Changes to this policy</h2>
    <p>
      We may update this policy as the site changes. The date at the top shows the latest version. If a change is significant, we will say so on this page.
    </p>

    <h2>10. Contact</h2>
    <p>
      Questions about privacy? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use the <Link to="/contact">contact page</Link>.
    </p>
  </LegalPage>
);

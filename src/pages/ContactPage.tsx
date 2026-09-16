import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ padding: 'var(--space-2xl) 0' }}>
      <SEOHead
        title="Contact Us — WKQuiz Support & Inquiries"
        description="Have feedback, a question correction, or category suggestions? Contact the WKQuiz.com team."
        canonicalPath="/contact"
      />

      <div className="app-container" style={{ maxWidth: '720px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', letterSpacing: '0.05em' }}>
            Get in Touch
          </span>
          <h1 className="h1-title" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-xs)' }}>
            Contact WKQuiz
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem' }}>
            We'd love to hear from you. Suggest a question bank, report a typo, or ask a question.
          </p>
        </div>

        <div className="card" style={{ padding: 'var(--space-2xl)', borderRadius: 'var(--radius-xl)' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
              <CheckCircle2 size={54} color="var(--color-success)" style={{ margin: '0 auto var(--space-md)' }} />
              <h3 className="h2-title" style={{ fontSize: '1.5rem', marginBottom: 'var(--space-xs)' }}>
                Thank You for Reaching Out!
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
                Your message has been received. Our team will review your feedback and respond to{' '}
                <strong>{formData.email}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'general', message: '' });
                }}
                className="btn btn-primary"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    height: '46px',
                    padding: '0 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    height: '46px',
                    padding: '0 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  Topic / Category
                </label>
                <select
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    height: '46px',
                    padding: '0 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    fontSize: '0.95rem'
                  }}
                >
                  <option value="general">General Feedback</option>
                  <option value="correction">Question Correction / Clarification</option>
                  <option value="suggest">Suggest a New Question Bank</option>
                  <option value="business">Partnership / Inquiries</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    fontSize: '0.95rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <Send size={18} />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Social Connection */}
        <div
          style={{
            marginTop: 'var(--space-xl)',
            textAlign: 'center',
            padding: 'var(--space-lg)',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>Connect With Us on Social Media</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--space-md)' }}>
            Follow our daily video quizzes, question breakdowns, and quick study tips.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            <a
              href="https://tiktok.com/@wkquizs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
              </svg>
              <span>TikTok</span>
            </a>
            <a
              href="https://www.youtube.com/channel/UCeEZz94n1bmsnezrF3aI6fw"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>YouTube</span>
            </a>
            <a
              href="https://www.instagram.com/wkquiz/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/wkquiz"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

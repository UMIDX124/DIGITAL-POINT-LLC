'use client';

import Link from 'next/link';

/**
 * Phase 15 C.4 — 404 redesign with DPL hierarchy.
 * Editorial typography: massive italic Instrument Serif "404", grounded
 * sans body. Three escape routes (home, audit form, Cosmo chat) — no
 * dead-end. Cosmo open via window event (Phase 13 pattern).
 */
export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <p
          className="font-mono uppercase mb-6"
          style={{
            fontSize: 'var(--text-micro)',
            letterSpacing: '0.18em',
            color: 'var(--text-tertiary)',
          }}
        >
          DIGITAL POINT — 404
        </p>

        <h1
          className="font-italic-display"
          style={{
            fontSize: 'clamp(5rem, 16vw, 12rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: 'var(--accent)',
            opacity: 0.9,
            marginBottom: '1.5rem',
            fontStyle: 'italic',
          }}
        >
          off-route
        </h1>

        <p
          className="font-display"
          style={{
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            color: 'var(--text-primary)',
            lineHeight: 1.4,
            marginBottom: '0.75rem',
            maxWidth: 'var(--maxw-heading-section)',
            marginInline: 'auto',
          }}
        >
          The page you were aiming for doesn&apos;t exist, was moved, or never
          shipped.
        </p>

        <p
          className="font-body"
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            maxWidth: 'var(--maxw-body)',
            marginInline: 'auto',
            marginBottom: '2.5rem',
          }}
        >
          Three ways back into the loop:
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm transition-colors"
            style={{
              background: 'var(--accent)',
              color: '#0A0A0B',
            }}
          >
            Back to home
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/free-growth-audit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm transition-colors"
            style={{
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
            }}
          >
            Book a free audit
            <span aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('cosmo:open'))}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            Talk to Cosmo
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <p
          className="font-mono uppercase mt-12"
          style={{
            fontSize: 'var(--text-micro)',
            letterSpacing: '0.18em',
            color: 'var(--text-tertiary)',
          }}
        >
          AI agents · Automation · Operators · Since 2017
        </p>
      </div>
    </div>
  );
}

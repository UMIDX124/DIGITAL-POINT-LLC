'use client';

/**
 * Phase 17b 3-restructured A3 — GDPR cookie consent banner.
 *
 * Native HTML/CSS modal pattern (no third-party SaaS dependency). Two
 * actions: "Accept all" → enables analytics; "Necessary only" → suppresses
 * analytics. localStorage flag `dpl_cookie_consent` ∈ {accepted, necessary, null}.
 *
 * Banner appears on first visit (flag === null), suppressed thereafter.
 * Footer Cookies link can re-open via global event 'dpl:open-cookie-prefs'
 * dispatched on document — listener resets flag and re-shows banner.
 *
 * Conditional analytics mount: <Analytics> + <SpeedInsights> in layout.tsx
 * are wrapped in <AnalyticsGate> which reads the same flag client-side
 * and only mounts when accepted.
 *
 * Bloomberg Operator palette compliance:
 *   bg #0A0A0A   border var(--border-default)   amber accept CTA
 *   ring-stroke  ghost necessary-only           text tokens
 */

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'dpl_cookie_consent';
type Consent = 'accepted' | 'necessary' | null;

export function getConsent(): Consent {
  if (typeof window === 'undefined') return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  if (v === 'accepted' || v === 'necessary') return v;
  return null;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setVisible(true);
    const onOpen = () => {
      window.localStorage.removeItem(STORAGE_KEY);
      setVisible(true);
    };
    document.addEventListener('dpl:open-cookie-prefs', onOpen);
    return () => document.removeEventListener('dpl:open-cookie-prefs', onOpen);
  }, []);

  const set = (v: Exclude<Consent, null>) => {
    window.localStorage.setItem(STORAGE_KEY, v);
    setVisible(false);
    // Notify any listeners (AnalyticsGate) so it can mount/unmount immediately.
    document.dispatchEvent(new CustomEvent('dpl:consent-changed', { detail: v }));
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-live="polite"
      className="fixed left-3 right-3 bottom-3 z-[60] max-w-3xl mx-auto rounded-xl"
      style={{
        background: 'rgba(10, 10, 10, 0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid var(--border-default)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
      }}
    >
      <div className="px-3 py-2.5 sm:px-4 sm:py-3 flex items-center gap-3">
        <p
          className="text-[12px] sm:text-[13px] leading-snug flex-1 min-w-0"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span className="hidden sm:inline" style={{ color: 'var(--text-primary)' }}>
            Minimal analytics — no trackers, no ad pixels.
          </span>
          <span className="sm:hidden" style={{ color: 'var(--text-primary)' }}>
            Minimal analytics only.
          </span>
          {' '}
          <a
            href="/cookies"
            className="underline whitespace-nowrap"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Details
          </a>
        </p>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => set('necessary')}
            className="px-2.5 py-1.5 rounded-md text-[12px] font-medium transition-colors whitespace-nowrap"
            style={{
              background: 'transparent',
              border: '1px solid var(--ring-stroke)',
              color: 'var(--text-secondary)',
            }}
            aria-label="Necessary cookies only"
          >
            Necessary
          </button>
          <button
            type="button"
            onClick={() => set('accepted')}
            className="px-3 py-1.5 rounded-md text-[12px] font-semibold transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{
              background: 'var(--accent-bright)',
              color: 'var(--cta-text-on-amber)',
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

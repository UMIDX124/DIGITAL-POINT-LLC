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
      className="fixed left-4 right-4 bottom-4 z-[60] max-w-3xl mx-auto rounded-2xl"
      style={{
        background: '#0A0A0A',
        border: '1px solid var(--border-default)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-primary)' }}
          >
            We use minimal analytics (Vercel Speed Insights + Vercel Analytics)
            to understand how the site performs and what visitors find useful.
            No third-party trackers, no ad pixels, no profiling.
          </p>
          <p
            className="text-xs mt-2"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Read more in our{' '}
            <a href="/cookies" className="underline" style={{ color: 'var(--text-secondary)' }}>
              cookie policy
            </a>
            .
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => set('necessary')}
            className="px-4 py-2 rounded-md text-[13px] font-medium transition-colors"
            style={{
              background: 'transparent',
              border: '1px solid var(--ring-stroke)',
              color: 'var(--text-primary)',
            }}
          >
            Necessary only
          </button>
          <button
            type="button"
            onClick={() => set('accepted')}
            className="px-4 py-2 rounded-md text-[13px] font-medium transition-opacity hover:opacity-90"
            style={{
              background: 'var(--accent-bright)',
              color: 'var(--cta-text-on-amber)',
            }}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

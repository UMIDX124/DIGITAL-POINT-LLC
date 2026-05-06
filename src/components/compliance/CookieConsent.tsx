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

import { useSyncExternalStore, useEffect, useState } from 'react';

const STORAGE_KEY = 'dpl_cookie_consent';
type Consent = 'accepted' | 'necessary' | null;

export function getConsent(): Consent {
  if (typeof window === 'undefined') return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  if (v === 'accepted' || v === 'necessary') return v;
  return null;
}

function subscribeConsent(callback: () => void) {
  const onOpenPrefs = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    callback();
  };
  document.addEventListener('dpl:consent-changed', callback);
  document.addEventListener('dpl:open-cookie-prefs', onOpenPrefs);
  return () => {
    document.removeEventListener('dpl:consent-changed', callback);
    document.removeEventListener('dpl:open-cookie-prefs', onOpenPrefs);
  };
}

const getVisibleSnapshot = () => getConsent() === null;
const getVisibleServerSnapshot = () => false;

export default function CookieConsent() {
  const visible = useSyncExternalStore(subscribeConsent, getVisibleSnapshot, getVisibleServerSnapshot);
  // Phase 20.1.5 — delayed first-paint so the banner never appears in the
  // hero above-fold shot. Mounts at 1800ms post-load. Also collapses to a
  // compact bottom-left pill at all viewports so it never overlaps the
  // centered content / CTAs.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 1800);
    return () => window.clearTimeout(t);
  }, []);

  const set = (v: Exclude<Consent, null>) => {
    window.localStorage.setItem(STORAGE_KEY, v);
    document.dispatchEvent(new CustomEvent('dpl:consent-changed', { detail: v }));
  };

  if (!visible || !mounted) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-live="polite"
      className="fixed left-4 bottom-4 z-[60] rounded-md"
      style={{
        background: 'rgba(10, 10, 10, 0.94)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid var(--border-default)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.55)',
        maxWidth: 'min(420px, calc(100vw - 2rem))',
        animation: 'dpl-consent-in 480ms cubic-bezier(0.16, 1, 0.3, 1) both',
      }}
    >
      <div className="px-3 py-2.5 flex items-center gap-2.5">
        <p
          className="text-[11.5px] leading-snug flex-1 min-w-0"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span style={{ color: 'var(--text-primary)' }}>
            Minimal analytics. No trackers.
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
            className="px-2 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap"
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
            className="px-2.5 py-1 rounded text-[11px] font-semibold transition-opacity hover:opacity-90 whitespace-nowrap"
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

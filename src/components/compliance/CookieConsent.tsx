'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'dpl_cookie_consent';
type Consent = 'accepted' | 'necessary' | null;

export function getConsent(): Consent {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === 'accepted' || v === 'necessary') return v;
  } catch {
    // localStorage can throw in private-browsing or quota cases. Fall through.
  }
  return null;
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const read = () => setConsent(getConsent());
    read();
    const reveal = window.setTimeout(() => setHydrated(true), 1800);

    const onConsentChanged = () => read();
    const onOpenPrefs = () => {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      setConsent(null);
    };
    document.addEventListener('dpl:consent-changed', onConsentChanged);
    document.addEventListener('dpl:open-cookie-prefs', onOpenPrefs);

    return () => {
      window.clearTimeout(reveal);
      document.removeEventListener('dpl:consent-changed', onConsentChanged);
      document.removeEventListener('dpl:open-cookie-prefs', onOpenPrefs);
    };
  }, []);

  const set = (v: Exclude<Consent, null>) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, v);
    } catch {
      // ignore
    }
    setConsent(v);
    document.dispatchEvent(new CustomEvent('dpl:consent-changed', { detail: v }));
  };

  if (!hydrated || consent !== null) return null;

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
          style={{ color: 'var(--color-text-dark-secondary)' }}
        >
          <span style={{ color: 'var(--color-text-dark-primary)' }}>
            Minimal analytics. No trackers.
          </span>
          {' '}
          <a
            href="/cookies"
            className="whitespace-nowrap"
            style={{
              color: 'var(--color-text-dark-primary)',
              textDecoration: 'underline',
              textDecorationColor: 'var(--color-accent)',
              textDecorationThickness: '1px',
              textUnderlineOffset: '2px',
            }}
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
              border: '1px solid var(--color-line-dark-bright)',
              color: 'var(--color-text-dark-primary)',
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
              background: 'var(--color-accent)',
              color: '#0a0a0a',
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

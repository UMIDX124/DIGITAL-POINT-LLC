'use client';

/**
 * Phase 17b 3-restructured A3 — analytics consent gate.
 *
 * Wraps Vercel <Analytics /> + <SpeedInsights /> so they only mount when
 * the user has accepted analytics in CookieConsent. Reads the same
 * localStorage flag (dpl_cookie_consent === 'accepted'). Listens for
 * 'dpl:consent-changed' events to toggle without page reload.
 */

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useEffect, useState } from 'react';
import { getConsent } from './CookieConsent';

export default function AnalyticsGate() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(getConsent() === 'accepted');
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<'accepted' | 'necessary'>).detail;
      setEnabled(detail === 'accepted');
    };
    document.addEventListener('dpl:consent-changed', handler);
    return () => document.removeEventListener('dpl:consent-changed', handler);
  }, []);

  if (!enabled) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

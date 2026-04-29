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
import { useSyncExternalStore } from 'react';
import { getConsent } from './CookieConsent';

function subscribe(callback: () => void) {
  document.addEventListener('dpl:consent-changed', callback);
  return () => document.removeEventListener('dpl:consent-changed', callback);
}

const getSnapshot = () => getConsent() === 'accepted';
const getServerSnapshot = () => false;

export default function AnalyticsGate() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!enabled) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

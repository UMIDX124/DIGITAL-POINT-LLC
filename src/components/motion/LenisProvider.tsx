'use client';

import { useEffect } from 'react';

/**
 * Lenis smooth-scroll provider. Mounts once at the top of the tree.
 * Respects prefers-reduced-motion — disables smoothing for those users.
 *
 * Phase 3a-fix: exposes the Lenis instance on window.__lenis__ so ScrollMotion
 * can bridge Lenis scroll events into ScrollTrigger. Without that bridge,
 * ScrollTrigger's trigger positions go stale against Lenis's virtual scroll
 * and `once: true` triggers below the fold never fire — content stuck at
 * opacity:0.
 */
type LenisInstance = {
  raf: (time: number) => void;
  destroy: () => void;
  on: (event: 'scroll', cb: () => void) => void;
};

declare global {
  interface Window {
    __lenis__?: LenisInstance;
  }
}

/**
 * Phase 7 — Lenis FULLY DISABLED.
 *
 * User reported felt-smoothness regression on the live preview: scrolling
 * felt heavy. Lenis intercepts wheel/touch events and re-runs RAF-throttled
 * scroll math, which on modern macOS/iOS clashes with the OS-level GPU-
 * accelerated momentum scroll — net result is laggier than native.
 *
 * Native scroll is the right primitive for a marketing site. Linear,
 * Stripe, Vercel marketing all use native scroll. Lenis is for award-
 * bait portfolio choreography (Cuberto, Active Theory) — DPL is a B2B
 * services site optimizing for conversion.
 *
 * The provider is kept (no-op) so re-enabling later is a single-edit
 * change. The Lenis dependency stays in package.json but isn't imported
 * anywhere — Tree-shaking removes it from the bundle.
 *
 * If this is permanently dropped, follow-up cleanup: remove the import
 * indirection in ScrollMotion.tsx (window.__lenis__ check is harmless
 * — it just always returns false now).
 */
export function LenisProvider() {
  useEffect(() => {
    // Intentionally empty. Native scroll is the design choice.
  }, []);

  return null;
}

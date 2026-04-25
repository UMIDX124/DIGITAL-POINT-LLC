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
 * Phase 6 v2 — Lenis lazy-loaded + mobile-disabled.
 *
 * The Lenis bundle (~12 KB gzipped) was loading eagerly on every page.
 * On touch devices it added bundle weight without delivering value
 * (native momentum scrolling already feels good on mobile). Now Lenis
 * is dynamic-imported only on viewports >= 768px AND prefers-reduced-
 * motion: no-preference.
 */
export function LenisProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    if (window.matchMedia('(max-width: 767px)').matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { default: Lenis } = await import('lenis');
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.0,
      }) as unknown as LenisInstance;

      window.__lenis__ = lenis;

      let rafId = 0;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        if (window.__lenis__ === lenis) delete window.__lenis__;
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}

'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

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
declare global {
  interface Window {
    __lenis__?: Lenis;
  }
}

export function LenisProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.0,
    });

    window.__lenis__ = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.__lenis__ === lenis) delete window.__lenis__;
    };
  }, []);

  return null;
}

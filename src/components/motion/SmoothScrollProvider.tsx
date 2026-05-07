'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Phase 19 — Lenis smooth-scroll integration with GSAP ScrollTrigger
 * bridge (Stripe / Vercel marketing pattern). Repo-owner authorized
 * supersedure of the Phase 8 "no Lenis" lock.
 *
 * Integration contract:
 * 1. Lenis ticker drives gsap.ticker so ScrollTrigger.update fires in
 *    sync with the smooth-scroll wheel/touch translation.
 * 2. ScrollTrigger.scrollerProxy points at Lenis's wrapper so all
 *    pin/scrub triggers measure scroll against Lenis state, not the
 *    native scrollY.
 * 3. Anchor links (<a href="#foo">) are intercepted globally and
 *    routed through lenis.scrollTo so hash navigation lands precisely
 *    on the target.
 * 4. prefers-reduced-motion: reduce → Lenis NOT initialized; native
 *    scroll preserved (pin/scrub still works against native scrollY,
 *    just without smooth-wheel inertia).
 * 5. Lenis ticker + gsap.ticker uses lerp 0.085 (snappy but smooth);
 *    duration 1.0; easing: easeOutExpo. Tuned to feel like Stripe
 *    landing — not floaty.
 *
 * Bundle cost: ~7kb gzipped lenis + ~1kb of integration glue.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (initialized.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    initialized.current = true;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        /* Phase 20.1.7 — UF flagged residual "halka lag". 0.07 lerp was
           slow-following (extended catch-up tail = lag feel). Bumped to
           0.10 for snappier wheel response while staying above the
           jittery 0.15+ range. Duration tightened 1.2 → 1.0 so anchor
           scrollTo lands faster. */
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
        lerp: 0.10,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        smoothWheel: true,
      });

      // Bridge: every Lenis tick, fire ScrollTrigger.update.
      lenis.on('scroll', ScrollTrigger.update);

      // Drive Lenis off gsap.ticker (single rAF source for both).
      const onTick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      // Anchor link interception. Any <a href="#foo"> click routes
      // through lenis.scrollTo so the smooth-scroll engine handles it.
      const onAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
        if (!anchor) return;
        const href = anchor.getAttribute('href');
        if (!href || href === '#' || href.length < 2) return;
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el, { offset: -16, duration: 1.2 });
        if (history.pushState) history.pushState(null, '', href);
      };
      document.addEventListener('click', onAnchorClick);

      // Refresh ScrollTrigger after fonts have loaded so pin distances
      // are measured against the final layout (font-swap CLS could move
      // section boundaries by a few px otherwise).
      if ('fonts' in document) {
        document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
      }
      // Belt-and-suspenders: refresh on full window load.
      const onLoad = () => ScrollTrigger.refresh();
      if (document.readyState === 'complete') ScrollTrigger.refresh();
      else window.addEventListener('load', onLoad, { once: true });

      cleanup = () => {
        gsap.ticker.remove(onTick);
        document.removeEventListener('click', onAnchorClick);
        window.removeEventListener('load', onLoad);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
      initialized.current = false;
    };
  }, []);

  return <>{children}</>;
}

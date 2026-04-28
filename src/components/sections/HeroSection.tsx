'use client';

import { useEffect, useRef } from 'react';
import { AutomationOrbit } from '@/components/hero/AutomationOrbit';
import { HeroDataTicker } from '@/components/hero/HeroDataTicker';
import { HeroHeadline } from '@/components/hero/HeroHeadline';
import { HeroCTA } from '@/components/hero/HeroCTA';
import { HeroTrustStrip } from '@/components/hero/HeroTrustStrip';

/**
 * Phase 6 v2 editorial hero — AI-first hybrid positioning.
 * Phase 18 reduced-scope C4 — decomposed into orchestrator (this file) +
 * 3 child components (HeroHeadline, HeroCTA, HeroTrustStrip). The
 * orchestrator owns layout + GSAP timeline orchestration; children are
 * presentational.
 *
 * Word-reveal animation is component-owned (no ScrollMotion dependency).
 * GSAP is lazy-imported in useEffect so it doesn't block first paint.
 */

const HERO_EYEBROW = 'DIGITAL POINT LLC · EST. 2017';
const HERO_SUB =
  'AI agents lead. Automation handles the repeat. Trained operators back the loop. Together they run your CRM, ops, reporting, and growth workflows — so you scale without scaling headcount.';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const orbWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const headline = headlineRef.current;
    if (!headline) return;

    const innerEls = Array.from(
      headline.querySelectorAll<HTMLSpanElement>('[data-word-reveal]'),
    );

    // Forced final-state helper — used by both the reduced-motion path and
    // the 1.5s safety net that protects against GSAP scheduling regressions
    // (Phase 6 visual probe caught the .to() landing opacity but stranding
    // yPercent: 110 — clipped by .word overflow:hidden).
    const forceVisible = () => {
      innerEls.forEach((el) => {
        el.style.transform = 'translateY(0%)';
        el.style.opacity = '1';
      });
    };

    if (reduced) {
      forceVisible();
      return;
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    // Safety net — if the GSAP timeline ever fails to land yPercent:0 within
    // 1.5s, force the final state so the headline is never invisible.
    const safetyId = window.setTimeout(forceVisible, 1500);

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      // Word reveal — direct fromTo (not chained inside a timeline). This
      // avoids the Phase 6 regression where `.to(innerEls, ...)` after a
      // `gsap.set()` landed opacity but not yPercent. Phase 9 — animation
      // tightened: last word lands ~780ms (was ~1.77s).
      gsap.fromTo(
        innerEls,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.035,
          ease: 'cubic-bezier(0.65, 0.05, 0, 1)',
          delay: 0.15,
          onComplete: () => {
            innerEls.forEach((el) => {
              el.style.transform = 'translateY(0%)';
              el.style.opacity = '1';
            });
            window.clearTimeout(safetyId);
          },
        },
      );

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('[data-hero-orb]', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.5 }, 0)
        .fromTo('[data-hero-eyebrow]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.1)
        .fromTo('[data-hero-sub]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45 }, 0.55)
        .fromTo('[data-hero-cta] > *', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.7);

      // Scroll-tied effects. Phase 17b 2A-REFIX (Scope C) — anticipatePin +
      // fastScrollEnd + invalidateOnRefresh smooth pin engagement and
      // resize. Snap y/scale to integer pixels so sub-pixel transform
      // interpolation can't accumulate floating-point error during scrub.
      const orbEl = orbWrapRef.current;
      const triggers: ScrollTrigger[] = [];
      if (orbEl) {
        triggers.push(
          ScrollTrigger.create({
            trigger: sectionRef.current!,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            animation: gsap.to(orbEl, {
              scale: 0.9,
              y: 40,
              ease: 'none',
              snap: { y: 1 },
            }),
          }),
        );
      }
      triggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current!,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.9,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          animation: gsap.to('[data-hero-eyebrow]', {
            y: -20,
            ease: 'none',
            snap: { y: 1 },
          }),
        }),
      );

      ScrollTrigger.refresh();

      cleanup = () => {
        tl.kill();
        triggers.forEach((t) => t.kill());
      };
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(safetyId);
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero hero-section relative w-full overflow-hidden"
    >
      {/* Phase 16 C — Bloomberg Operator data substrate replaces the
          Phase 6 conic ambient blur and the legacy radial glow. */}
      <HeroDataTicker />

      <div className="hero-grid relative mx-auto w-full max-w-[90rem]">
        <div className="hero-content">
          <p className="hero-eyebrow font-mono uppercase mb-8" data-hero-eyebrow>
            {HERO_EYEBROW}
          </p>

          <HeroHeadline ref={headlineRef} />

          <p className="hero-sub font-body mb-10" data-hero-sub>
            {HERO_SUB}
          </p>

          <HeroCTA />

          <HeroTrustStrip />
        </div>

        <div
          ref={orbWrapRef}
          className="automation-orbit-container relative"
          data-hero-orb
        >
          {/* Phase 16 A.1 — orbital system replacing Phase 14 2×2 grid.
              Cosmo mascot at center as the "sun"; 4 process nodes on two
              concentric rings; 90s GPU rotation, mobile-hidden,
              reduced-motion static. */}
          <AutomationOrbit />
        </div>
      </div>
    </section>
  );
}

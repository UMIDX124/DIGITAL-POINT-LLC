'use client';

import { useEffect } from 'react';

/**
 * HeroScrollEnhance — Phase 20.1 Batch C cinematic scroll motion.
 *
 * Adds a scroll-driven exit animation on the hero content layer. As
 * the user scrolls down past the hero, content drifts upward + fades
 * out, supporting the Hero3DStage camera-dolly-back already shipped.
 * GSAP ScrollTrigger with scrub for the smooth-following feel; no
 * keyframe-based animation, no jank on fast scroll.
 *
 * prefers-reduced-motion: aborts entirely. No scroll listener bound.
 *
 * Mounts as a sibling of HeroSection content (no DOM contribution).
 * Selector-based: targets `.hero-eyebrow`, `.hero-h1`, `.hero-sub`,
 * `.hero-cta-row` from anywhere in the section.
 */
export default function HeroScrollEnhance() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let cleanup: (() => void) | null = null;

    (async () => {
      const gsapMod = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapMod.default ?? gsapMod;
      gsap.registerPlugin(ScrollTrigger);

      const hero = document.getElementById('hero');
      if (!hero) return;
      const targets = hero.querySelectorAll<HTMLElement>(
        '.hero-eyebrow, .hero-h1, .hero-sub, .hero-cta-row, [data-hero-trust-strip]',
      );
      if (targets.length === 0) return;

      const trigger = ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        animation: gsap
          .timeline()
          .to(targets, {
            y: -40,
            opacity: 0.15,
            ease: 'power1.in',
            stagger: 0.04,
          }),
      });

      cleanup = () => {
        trigger.kill();
      };
    })();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return null;
}

'use client';

import { useEffect } from 'react';

/**
 * SectionFlow — Phase 20.1.4 cinematic scroll narrative.
 *
 * UF: "transitions nahi add ki, flow nahi he koi website mein."
 * Adds GSAP ScrollTrigger reveals to every <section> in main content,
 * giving the page cinematic flow instead of jarring section breaks.
 *
 * Behavior:
 *   - Each <section> outside the hero gets a scrub-on-enter animation
 *     (opacity 0 → 1, translateY 60 → 0, scale 0.96 → 1) over the
 *     last 50% of viewport entry.
 *   - Section content (h2 / h3 / p / direct cards) gets a stagger
 *     reveal once the section is fully in view (cubic-bezier brand ease).
 *   - A document-level CSS variable --scroll-progress (0..1) is set
 *     from total page scroll, used by the body atmosphere to shift
 *     hue/intensity across the page.
 *
 * Performance:
 *   - prefers-reduced-motion → aborts entirely
 *   - All triggers cleaned on unmount
 *   - Lenis already drives gsap.ticker (Phase 19), so this hooks into
 *     the same single rAF source — no double-driving
 */
export default function SectionFlow() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let cleanup: (() => void) | null = null;

    (async () => {
      const gsapMod = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapMod.default ?? gsapMod;
      gsap.registerPlugin(ScrollTrigger);

      const main = document.querySelector('main');
      if (!main) return;
      const sections = Array.from(
        main.querySelectorAll<HTMLElement>('section'),
      ).filter((s) => s.id !== 'hero');

      const triggers: Array<{ kill: () => void }> = [];

      for (const section of sections) {
        // Scrub-on-enter: section slides up + fades in as it enters viewport
        const enterTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            end: 'top 35%',
            scrub: 0.6,
          },
        });
        enterTl.fromTo(
          section,
          { opacity: 0.0, y: 60, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, ease: 'none' },
        );
        triggers.push(enterTl.scrollTrigger as unknown as { kill: () => void });

        // Stagger inner content once fully in view
        const inner = section.querySelectorAll<HTMLElement>(
          ':scope > .container-wide > *, :scope > [data-flow-stagger] > *, :scope h2, :scope h3, :scope > p',
        );
        if (inner.length > 0) {
          const innerTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          });
          innerTl.fromTo(
            inner,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: 'cubic-bezier(0.65, 0.05, 0, 1)',
              stagger: 0.05,
            },
          );
          triggers.push(innerTl.scrollTrigger as unknown as { kill: () => void });
        }
      }

      // Document-level scroll-progress variable for body atmosphere shift.
      // Phase 20.1.7 — rAF-throttled. Without this, every wheel tick fires
      // a layout read (scrollHeight) + style write (setProperty) on the
      // <html> element. Lenis fires scroll events at 60+ Hz; the layout
      // thrash compounded with the body atmosphere recalc was the
      // residual lag UF flagged. One rAF per real frame, no thrash.
      let scrollScheduled = false;
      const writeProgress = () => {
        scrollScheduled = false;
        const max = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1,
        );
        const progress = Math.max(0, Math.min(1, window.scrollY / max));
        document.documentElement.style.setProperty(
          '--scroll-progress',
          progress.toFixed(4),
        );
      };
      const onScroll = () => {
        if (scrollScheduled) return;
        scrollScheduled = true;
        requestAnimationFrame(writeProgress);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      writeProgress();

      cleanup = () => {
        for (const t of triggers) t.kill();
        window.removeEventListener('scroll', onScroll);
      };
    })();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return null;
}

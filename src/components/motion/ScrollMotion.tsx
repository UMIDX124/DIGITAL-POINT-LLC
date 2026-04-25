'use client';

import { useEffect } from 'react';

/**
 * Global GSAP + ScrollTrigger init for the marketing tree.
 * Respects prefers-reduced-motion.
 *
 * Phase 6 v2:
 *   - GSAP + ScrollTrigger lazy-imported in useEffect (no longer block
 *     first paint via module-top imports). Saves ~12 KB from the
 *     initial bundle on routes that don't reach scroll-tied effects
 *     before idle.
 *   - Hero mount cascade is owned by HeroSection.tsx (component-owned
 *     ref-based gsap.set + timeline). ScrollMotion no longer touches
 *     [data-hero-eyebrow] / [data-hero-subhead] / [data-hero-cta]
 *     to avoid duplicate animations / conflicting from-states.
 *   - 2.5s fallback safety net preserved (any element at opacity:0
 *     gets forced visible).
 */
export function ScrollMotion() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      // Phase 8: Lenis bridge removed (Lenis itself was removed in Phase 8
      // — native scroll is the design choice). ScrollTrigger now reads
      // from the native window scroll directly.

      const ctx = gsap.context(() => {
        const revealTrigger = (trigger: Element | string) => ({
          trigger,
          start: 'top 92%',
          once: true,
        });

        const pillarCards = gsap.utils.toArray<HTMLElement>('[data-pillar-card]');
        if (pillarCards.length) {
          gsap.fromTo(
            pillarCards,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              stagger: 0.12,
              scrollTrigger: revealTrigger('[data-pillars]'),
            },
          );
        }

        const caseCards = gsap.utils.toArray<HTMLElement>('[data-case-strip] > a');
        if (caseCards.length) {
          gsap.fromTo(
            caseCards,
            { x: 40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              stagger: 0.2,
              scrollTrigger: revealTrigger('[data-case-strip]'),
            },
          );
        }

        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          const delay = parseFloat(el.dataset.revealDelay ?? '0') || 0;
          gsap.fromTo(
            el,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay,
              ease: 'power2.out',
              scrollTrigger: revealTrigger(el),
            },
          );
        });

        gsap.utils.toArray<HTMLElement>('[data-stagger-group]').forEach((group) => {
          const items = Array.from(group.querySelectorAll<HTMLElement>('[data-stagger-item]'));
          if (!items.length) return;
          const stagger = parseFloat(group.dataset.staggerDelay ?? '0.08') || 0.08;
          gsap.fromTo(
            items,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              stagger,
              scrollTrigger: revealTrigger(group),
            },
          );
        });

        const serviceItems = gsap.utils.toArray<HTMLElement>('[data-service-item]');
        if (serviceItems.length) {
          gsap.fromTo(
            serviceItems,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.08,
              scrollTrigger: revealTrigger('[data-services-list]'),
            },
          );
        }

        const workCards = gsap.utils.toArray<HTMLElement>('[data-work-card]');
        if (workCards.length) {
          gsap.fromTo(
            workCards,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              stagger: 0.14,
              scrollTrigger: revealTrigger('[data-work-grid]'),
            },
          );
        }

        const testimonialCards = gsap.utils.toArray<HTMLElement>('[data-testimonial-card]');
        if (testimonialCards.length) {
          gsap.fromTo(
            testimonialCards,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              stagger: 0.12,
              scrollTrigger: revealTrigger('[data-testimonials]'),
            },
          );
        }

        // Phase 4h — Recent Work parallax (desktop only).
        if (!window.matchMedia('(max-width: 767px)').matches) {
          const workGrid = document.querySelector('[data-work-grid]');
          if (workGrid) {
            gsap.to(workGrid, {
              y: -30,
              ease: 'none',
              scrollTrigger: {
                trigger: '#recent-work',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            });
          }
        }

        // Pull quote subtle scale accent.
        const pullQuote = document.querySelector('.pull-quote-text');
        if (pullQuote) {
          gsap.fromTo(
            pullQuote,
            { scale: 0.98 },
            {
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: { trigger: pullQuote, start: 'top 85%', once: true },
            },
          );
        }

        // Workflow SVG draw-in (desktop only — mobile gets a static SVG).
        if (!window.matchMedia('(max-width: 767px)').matches) {
          const workflowPaths = gsap.utils.toArray<SVGPathElement>('[data-workflow-path]');
          const workflowNodes = gsap.utils.toArray<SVGGElement>('[data-workflow-node]');
          const workflowLabels = gsap.utils.toArray<HTMLElement>('[data-workflow-label]');
          if (workflowPaths.length || workflowNodes.length) {
            workflowPaths.forEach((p) => {
              const len = p.getTotalLength();
              p.style.strokeDasharray = `${len}`;
              p.style.strokeDashoffset = `${len}`;
            });
            gsap
              .timeline({ scrollTrigger: revealTrigger('[data-workflow]') })
              .to(workflowPaths, {
                strokeDashoffset: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: 'power2.inOut',
              })
              .fromTo(
                workflowNodes,
                { opacity: 0, scale: 0.85, transformOrigin: 'center center' },
                { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(2)' },
                '<0.2',
              )
              .fromTo(
                workflowLabels,
                { y: 16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
                '-=0.4',
              );
          }
        }
      });

      ScrollTrigger.refresh();
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoad);

      // Fallback safety net (2.5s).
      const fallbackId = window.setTimeout(() => {
        const selectors = [
          '[data-reveal]',
          '[data-stagger-item]',
          '[data-service-item]',
          '[data-work-card]',
          '[data-testimonial-card]',
          '[data-pillar-card]',
          '[data-workflow-label]',
          '[data-word-reveal]',
          '[data-letter-reveal]',
        ];
        gsap.utils.toArray<HTMLElement>(selectors.join(',')).forEach((el) => {
          const o = parseFloat(getComputedStyle(el).opacity || '1');
          if (o < 0.05) {
            gsap.set(el, { opacity: 1, y: 0, x: 0, clearProps: 'transform' });
          }
        });
        gsap.utils.toArray<HTMLElement>('[data-word-reveal]').forEach((el) => {
          const t = getComputedStyle(el).transform;
          if (t && t !== 'none' && t !== 'matrix(1, 0, 0, 1, 0, 0)') {
            gsap.set(el, { yPercent: 0, y: 0, opacity: 1, clearProps: 'transform' });
          }
        });
        gsap.utils.toArray<SVGGElement>('[data-workflow-node]').forEach((el) => {
          const o = parseFloat(getComputedStyle(el).opacity || '1');
          if (o < 0.05) gsap.set(el, { opacity: 1, scale: 1 });
        });
        gsap.utils.toArray<SVGPathElement>('[data-workflow-path]').forEach((p) => {
          if (parseFloat(p.style.strokeDashoffset || '0') > 0.5) {
            p.style.strokeDashoffset = '0';
          }
        });
      }, 2500);

      cleanup = () => {
        window.clearTimeout(fallbackId);
        window.removeEventListener('load', onLoad);
        ctx.revert();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}

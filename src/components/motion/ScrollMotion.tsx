'use client';

import { useEffect } from 'react';

/**
 * Phase 12 — ScrollMotion split:
 *   - Class C reveals (pillar/case/reveal/stagger/service/work/testimonial/
 *     pull-quote scale) migrated to native IntersectionObserver + CSS
 *     @keyframes. Zero GSAP cost on first paint for these.
 *   - Class B (work-grid parallax scrub, workflow SVG draw-in timeline)
 *     stays GSAP — they need scrub or coordinated timeline.
 *   - Hero word-reveal + cascade is component-owned in HeroSection.tsx
 *     (Class A, eager GSAP, mount-tied).
 *
 * 2.5s safety net retained for the GSAP-owned animations only.
 * prefers-reduced-motion kills all reveals via globals.css media query.
 */

const REVEAL_SELECTORS = [
  '[data-pillar-card]',
  '[data-case-strip] > a',
  '[data-reveal]',
  '[data-stagger-item]',
  '[data-service-item]',
  '[data-work-card]',
  '[data-testimonial-card]',
  '.pull-quote-text',
];

const STAGGER_MAP: Record<string, number> = {
  '[data-pillar-card]': 0.12,
  '[data-case-strip] > a': 0.2,
  '[data-stagger-item]': 0.08,
  '[data-service-item]': 0.08,
  '[data-work-card]': 0.14,
  '[data-testimonial-card]': 0.12,
};

function applyStagger(el: HTMLElement) {
  if (el.dataset.revealDelay) {
    el.style.animationDelay = `${el.dataset.revealDelay}s`;
    return;
  }
  for (const sel of Object.keys(STAGGER_MAP)) {
    if (el.matches(sel)) {
      const parent = el.parentElement;
      if (!parent) return;
      const siblings = Array.from(parent.querySelectorAll(sel));
      const idx = siblings.indexOf(el);
      if (idx >= 0) el.style.animationDelay = `${idx * STAGGER_MAP[sel]}s`;
      return;
    }
  }
}

export function ScrollMotion() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    // --- Class C: native IntersectionObserver + CSS reveal ---
    // Only hide OFF-SCREEN targets via inline opacity:0. Above-fold targets
    // stay visible from first paint so LCP isn't deferred to animation end.
    const targets = document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS.join(','));
    const vh = window.innerHeight;
    const offscreen: HTMLElement[] = [];
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top >= vh) {
        el.style.opacity = '0';
        offscreen.push(el);
      } else {
        // In or above viewport → mark revealed without animating (no FOUC).
        el.classList.add('is-revealed');
        el.style.opacity = '';
      }
    });
    offscreen.forEach(applyStagger);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '';
            el.classList.add('is-revealed');
            io.unobserve(el);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    offscreen.forEach((t) => io.observe(t));

    // 1.5s safety net: anything still hidden gets revealed.
    const cssFallback = window.setTimeout(() => {
      offscreen.forEach((t) => {
        t.style.opacity = '';
        t.classList.add('is-revealed');
      });
    }, 1500);

    // --- Class B: GSAP for parallax scrub + workflow timeline ---
    let cancelled = false;
    let gsapCleanup: (() => void) | undefined;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const hasClassB =
      (!isMobile && document.querySelector('[data-work-grid]')) ||
      (!isMobile && document.querySelector('[data-workflow]'));

    if (hasClassB) {
      (async () => {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
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
              .timeline({ scrollTrigger: { trigger: '[data-workflow]', start: 'top 92%', once: true } })
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
        });

        ScrollTrigger.refresh();
        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener('load', onLoad);

        const gsapFallback = window.setTimeout(() => {
          gsap.utils.toArray<SVGGElement>('[data-workflow-node]').forEach((el) => {
            const o = parseFloat(getComputedStyle(el).opacity || '1');
            if (o < 0.05) gsap.set(el, { opacity: 1, scale: 1 });
          });
          gsap.utils.toArray<SVGPathElement>('[data-workflow-path]').forEach((p) => {
            if (parseFloat(p.style.strokeDashoffset || '0') > 0.5) {
              p.style.strokeDashoffset = '0';
            }
          });
          gsap.utils.toArray<HTMLElement>('[data-workflow-label]').forEach((el) => {
            const o = parseFloat(getComputedStyle(el).opacity || '1');
            if (o < 0.05) gsap.set(el, { opacity: 1, y: 0 });
          });
        }, 2500);

        gsapCleanup = () => {
          window.clearTimeout(gsapFallback);
          window.removeEventListener('load', onLoad);
          ctx.revert();
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      })();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(cssFallback);
      io.disconnect();
      gsapCleanup?.();
    };
  }, []);

  return null;
}

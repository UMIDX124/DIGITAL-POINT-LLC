'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Global GSAP + ScrollTrigger init for the marketing tree.
 * Respects prefers-reduced-motion.
 *
 * Phase 3a-fix reliability layers:
 *   1. Bridge Lenis scroll events into ScrollTrigger. Without this, Lenis's
 *      virtual-transform scroll is invisible to ScrollTrigger and triggers
 *      below the fold stall at `opacity: 0`. Root cause of the invisible-
 *      Automation-row / invisible-Workflow / invisible-RecentWork bugs.
 *   2. ScrollTrigger.refresh() after tween registration + on window load so
 *      trigger positions recalc once fonts/images settle.
 *   3. 2.5s fallback safety net: any reveal element whose trigger never fired
 *      gets force-revealed so the page can't stay in a half-hidden state.
 */
export function ScrollMotion() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    // ---- Lenis <-> ScrollTrigger bridge ----------------------------------
    // LenisProvider exposes window.__lenis__. Retry once on next tick if
    // LenisProvider's useEffect hasn't run yet.
    const attachLenisBridge = () => {
      const lenis = window.__lenis__;
      if (!lenis) return false;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time: number) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      return true;
    };
    if (!attachLenisBridge()) {
      setTimeout(attachLenisBridge, 60);
    }

    const ctx = gsap.context(() => {
      // Hero headline — split by word. Each word gets its own inline-block
      // span; a literal text-node space is appended BETWEEN siblings so inline-
      // block layout doesn't collapse the inter-word gaps.
      const headline = document.querySelector<HTMLElement>('[data-hero-headline]');
      if (headline && !headline.dataset.split) {
        const text = headline.textContent ?? '';
        headline.textContent = '';
        const parts = text.split(' ');
        const spans: HTMLSpanElement[] = [];
        parts.forEach((w, i) => {
          const span = document.createElement('span');
          span.style.display = 'inline-block';
          span.style.willChange = 'transform, opacity';
          span.textContent = w;
          headline.appendChild(span);
          spans.push(span);
          if (i < parts.length - 1) headline.appendChild(document.createTextNode(' '));
        });
        headline.dataset.split = '1';
        gsap.fromTo(
          spans,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.1 },
        );
      }

      // Hero eyebrow + subhead + cta — load-time cascade (no scrollTrigger).
      gsap.fromTo('[data-hero-eyebrow]', { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
      gsap.fromTo('[data-hero-subhead]', { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'power2.out' });
      gsap.fromTo('[data-hero-cta]', { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.8, ease: 'power2.out' });

      // Common reveal options — `once: true` but with a safer trigger window
      // (start earlier so offscreen elements below the fold actually receive
      // the onEnter callback when ScrollTrigger calculates positions after
      // Lenis bridge is active).
      const revealTrigger = (trigger: Element | string) => ({
        trigger,
        start: 'top 92%',
        once: true,
      });

      // Pillar cards
      const pillarCards = gsap.utils.toArray<HTMLElement>('[data-pillar-card]');
      if (pillarCards.length) {
        gsap.fromTo(pillarCards, { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.12,
            scrollTrigger: revealTrigger('[data-pillars]') });
      }

      // Case strip
      const caseCards = gsap.utils.toArray<HTMLElement>('[data-case-strip] > a');
      if (caseCards.length) {
        gsap.fromTo(caseCards, { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.2,
            scrollTrigger: revealTrigger('[data-case-strip]') });
      }

      // Generic data-reveal (wins over per-element start; honors data-reveal-delay).
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay ?? '0') || 0;
        gsap.fromTo(el, { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, delay, ease: 'power2.out',
            scrollTrigger: revealTrigger(el) });
      });

      // Stagger group
      gsap.utils.toArray<HTMLElement>('[data-stagger-group]').forEach((group) => {
        const items = Array.from(group.querySelectorAll<HTMLElement>('[data-stagger-item]'));
        if (!items.length) return;
        const stagger = parseFloat(group.dataset.staggerDelay ?? '0.08') || 0.08;
        gsap.fromTo(items, { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger,
            scrollTrigger: revealTrigger(group) });
      });

      // Services list
      const serviceItems = gsap.utils.toArray<HTMLElement>('[data-service-item]');
      if (serviceItems.length) {
        gsap.fromTo(serviceItems, { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.08,
            scrollTrigger: revealTrigger('[data-services-list]') });
      }

      // Recent Work cards
      const workCards = gsap.utils.toArray<HTMLElement>('[data-work-card]');
      if (workCards.length) {
        gsap.fromTo(workCards, { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.14,
            scrollTrigger: revealTrigger('[data-work-grid]') });
      }

      // Testimonial cards
      const testimonialCards = gsap.utils.toArray<HTMLElement>('[data-testimonial-card]');
      if (testimonialCards.length) {
        gsap.fromTo(testimonialCards, { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.12,
            scrollTrigger: revealTrigger('[data-testimonials]') });
      }

      // Phase 4h — subtle parallax on Recent Work cards. 5% slower than
      // page scroll, capped at 30px vertical drift. Uses `scrub` so it
      // stays locked to scroll position.
      if (typeof window !== 'undefined' && !window.matchMedia('(max-width: 767px)').matches) {
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

      // Phase 4h — pull quote emphasis. The generic [data-reveal] handler
      // already fades the blockquote in; we add a tiny scale accent so the
      // line-break moment feels intentional. `once: true` guarantees the
      // final state is opacity 1 regardless of scroll direction (the scrub
      // variant left the quote at 0.3 whenever the user scrolled back to
      // the top).
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

      // Workflow SVG draw-in timeline
      const workflowPaths = gsap.utils.toArray<SVGPathElement>('[data-workflow-path]');
      const workflowNodes = gsap.utils.toArray<SVGGElement>('[data-workflow-node]');
      const workflowLabels = gsap.utils.toArray<HTMLElement>('[data-workflow-label]');
      if (workflowPaths.length || workflowNodes.length) {
        workflowPaths.forEach((p) => {
          const len = p.getTotalLength();
          p.style.strokeDasharray = `${len}`;
          p.style.strokeDashoffset = `${len}`;
        });
        gsap.timeline({ scrollTrigger: revealTrigger('[data-workflow]') })
          .to(workflowPaths, { strokeDashoffset: 0, duration: 0.9, stagger: 0.15, ease: 'power2.inOut' })
          .fromTo(workflowNodes,
            { opacity: 0, scale: 0.85, transformOrigin: 'center center' },
            { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(2)' }, '<0.2')
          .fromTo(workflowLabels, { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.4');
      }
    });

    // Refresh immediately to pick up post-init layout.
    ScrollTrigger.refresh();
    // Refresh again on window load so images + fonts don't shift trigger Ys.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    // ---- Fallback safety net --------------------------------------------
    // After 2.5s, any element still sitting at opacity:0 gets force-revealed.
    // Covers: Lenis bridge never attached, ScrollTrigger stalled, DOM
    // mutation invalidated trigger position, etc. Content MUST NEVER stay
    // invisible.
    const fallbackId = window.setTimeout(() => {
      const selectors = [
        '[data-reveal]',
        '[data-stagger-item]',
        '[data-service-item]',
        '[data-work-card]',
        '[data-testimonial-card]',
        '[data-pillar-card]',
        '[data-workflow-label]',
        // Phase 4c additions:
        '[data-word-reveal]',
        '[data-letter-reveal]',
      ];
      gsap.utils.toArray<HTMLElement>(selectors.join(',')).forEach((el) => {
        const o = parseFloat(getComputedStyle(el).opacity || '1');
        if (o < 0.05) {
          gsap.set(el, { opacity: 1, y: 0, x: 0, clearProps: 'transform' });
        }
      });
      // Hero word-reveal inner spans — translate-back if still at 110%.
      gsap.utils.toArray<HTMLElement>('[data-word-reveal]').forEach((el) => {
        const t = getComputedStyle(el).transform;
        if (t && t !== 'none') {
          // If translateY is still ~110%, force back to 0.
          gsap.set(el, { yPercent: 0, y: 0, clearProps: 'transform' });
        }
      });
      // Workflow nodes (SVGGElement)
      gsap.utils.toArray<SVGGElement>('[data-workflow-node]').forEach((el) => {
        const o = parseFloat(getComputedStyle(el).opacity || '1');
        if (o < 0.05) gsap.set(el, { opacity: 1, scale: 1 });
      });
      // Workflow paths — draw full if still dashed
      gsap.utils.toArray<SVGPathElement>('[data-workflow-path]').forEach((p) => {
        if (parseFloat(p.style.strokeDashoffset || '0') > 0.5) {
          p.style.strokeDashoffset = '0';
        }
      });
    }, 2500);

    return () => {
      window.clearTimeout(fallbackId);
      window.removeEventListener('load', onLoad);
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}

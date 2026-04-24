'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Global GSAP + ScrollTrigger init for the marketing tree.
 * One-time registration + scroll-driven reveals. Respects prefers-reduced-motion.
 */
export function ScrollMotion() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero headline — split by word. Each word gets its own inline-block
      // span; a literal text-node space is appended BETWEEN siblings so inline-
      // block layout doesn't collapse the inter-word gaps (Phase-2 bug fix).
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
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.08,
            delay: 0.1,
          },
        );
      }

      // Hero eyebrow + subhead + cta — stagger in after headline
      gsap.fromTo(
        '[data-hero-eyebrow]',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      );
      gsap.fromTo(
        '[data-hero-subhead]',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'power2.out' },
      );
      gsap.fromTo(
        '[data-hero-cta]',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.8, ease: 'power2.out' },
      );

      // Pillar cards — scroll-in stagger
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
            scrollTrigger: {
              trigger: '[data-pillars]',
              start: 'top 75%',
              once: true,
            },
          },
        );
      }

      // Case strip — right-enter stagger
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
            scrollTrigger: {
              trigger: '[data-case-strip]',
              start: 'top 75%',
              once: true,
            },
          },
        );
      }

      // Generic section reveal for any element with data-reveal.
      // Respects data-reveal-delay (in seconds) on the element.
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
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        );
      });

      // Stagger group — each [data-stagger-group] reveals its direct
      // [data-stagger-item] children in cascade. Stagger interval read from
      // `data-stagger-delay` (seconds) on the group, default 0.08.
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
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          },
        );
      });

      // Services list — stagger lines in
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
            scrollTrigger: {
              trigger: '[data-services-list]',
              start: 'top 80%',
              once: true,
            },
          },
        );
      }

      // Recent Work cards — stagger + y-lift
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
            scrollTrigger: {
              trigger: '[data-work-grid]',
              start: 'top 80%',
              once: true,
            },
          },
        );
      }

      // Testimonial cards — stagger
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
            scrollTrigger: {
              trigger: '[data-testimonials]',
              start: 'top 80%',
              once: true,
            },
          },
        );
      }

      // Workflow SVG — draw connector paths + pop nodes
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
          .timeline({
            scrollTrigger: {
              trigger: '[data-workflow]',
              start: 'top 75%',
              once: true,
            },
          })
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

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}

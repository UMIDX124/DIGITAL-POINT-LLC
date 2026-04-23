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
      // Hero headline — split by word
      const headline = document.querySelector<HTMLElement>('[data-hero-headline]');
      if (headline && !headline.dataset.split) {
        const text = headline.textContent ?? '';
        headline.textContent = '';
        const words = text.split(' ').map((w) => {
          const span = document.createElement('span');
          span.style.display = 'inline-block';
          span.style.willChange = 'transform, opacity';
          span.textContent = w + ' ';
          headline.appendChild(span);
          return span;
        });
        headline.dataset.split = '1';
        gsap.fromTo(
          words,
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

      // Generic section reveal for any element with data-reveal
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          },
        );
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}

'use client';

import { useEffect } from 'react';

/**
 * Adds `.is-revealed` to elements with `[data-reveal]` or `.pillar-grid` /
 * `.math-tile--accent` selectors when they enter the viewport. Used in place
 * of an animation library where a small CSS class flip is sufficient.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document
        .querySelectorAll<HTMLElement>('[data-reveal], .pillar-grid, .math-tile--accent')
        .forEach((el) => el.classList.add('is-revealed', 'is-visible'));
      return;
    }
    const els = document.querySelectorAll<HTMLElement>(
      '[data-reveal], .pillar-grid, .math-tile--accent'
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed', 'is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

export default RevealOnScroll;

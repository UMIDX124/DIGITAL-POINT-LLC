'use client';

import { useEffect, useRef } from 'react';

/**
 * Phase 19 scroll progress indicator. 2px amber line at the very top of
 * the viewport, scales horizontally with document scroll position.
 * Pure transform animation (no width/layout reflow), passive scroll
 * listener with rAF throttling. Hidden under prefers-reduced-motion
 * (decorative, not informational). z-index above all content.
 */
export function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div ref={ref} className="scroll-progress-bar" />
    </div>
  );
}

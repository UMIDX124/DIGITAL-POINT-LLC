'use client';

import { useEffect } from 'react';

/**
 * MouseTracker — single global cursor publisher.
 *
 * Publishes two CSS custom properties on <html>:
 *   --cursor-x (px, viewport-relative)
 *   --cursor-y (px, viewport-relative)
 *
 * All cursor-driven effects (magnetic CTAs, hairline target brackets,
 * spotlight overlays) read from these vars instead of attaching their
 * own listeners. Mounted once at the root, RAF-throttled, passive
 * listener — one update per frame max.
 *
 * Pointer support: works for both mouse and stylus. On touch-only
 * devices the listeners never fire and the CSS vars stay at the
 * initial value defined in globals.css (centered).
 *
 * Reduced motion: still publishes coords (callers gate their own
 * animations on prefers-reduced-motion).
 */
export function MouseTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    let frame = 0;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    const flush = () => {
      frame = 0;
      root.style.setProperty('--cursor-x', `${lastX}px`);
      root.style.setProperty('--cursor-y', `${lastY}px`);
    };

    const onMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (frame === 0) {
        frame = requestAnimationFrame(flush);
      }
    };

    const onLeave = () => {
      lastX = window.innerWidth / 2;
      lastY = window.innerHeight / 2;
      if (frame === 0) frame = requestAnimationFrame(flush);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave, { passive: true });

    flush();

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

export default MouseTracker;

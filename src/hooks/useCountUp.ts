'use client';

import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  to: number;
  durationMs?: number;
  startOnInView?: boolean;
}

/**
 * Count-up from 0 to `to`. By default triggers the first time the ref
 * enters the viewport. Respects prefers-reduced-motion (jumps to final).
 */
export function useCountUp({ to, durationMs = 1200, startOnInView = true }: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;

    const reduced = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reduced) {
        setValue(to);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / durationMs);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!startOnInView) {
      run();
      return;
    }

    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      run();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { run(); io.disconnect(); }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, durationMs, startOnInView]);

  return { value, ref };
}

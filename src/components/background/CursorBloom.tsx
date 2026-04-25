'use client';

import { useEffect, useRef } from 'react';
import { subscribePointer } from '@/lib/motion/sharedPointer';

/**
 * Phase 4g cursor bloom — soft purple radial gradient following the cursor
 * on desktop only. Uses the shared RAF pointer bus from Phase 4b (one
 * mousemove listener, one spring-lerp loop, consumers just subscribe).
 *
 * Automatically disabled on mobile + prefers-reduced-motion via
 * subscribePointer's internal gating.
 */
export function CursorBloom() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const unsub = subscribePointer((state) => {
      if (!state.active) return;
      // Convert normalized −1..1 back to viewport pixels, subtract half the
      // bloom diameter so the gradient center follows the cursor.
      const px = ((state.sx + 1) / 2) * window.innerWidth - 200;
      const py = ((state.sy + 1) / 2) * window.innerHeight - 200;
      el.style.transform = `translate3d(${px}px, ${py}px, 0)`;
    });

    return () => {
      unsub();
      if (el) el.style.transform = '';
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="cursor-bloom"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 400,
        height: 400,
        pointerEvents: 'none',
        zIndex: 2,
        mixBlendMode: 'screen',
        willChange: 'transform',
        background:
          'radial-gradient(circle, var(--accent-glow-soft) 0%, transparent 70%)',
        opacity: 0.8,
        transform: 'translate3d(-9999px, -9999px, 0)',
      }}
    />
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { subscribePointer } from '@/lib/motion/sharedPointer';

/**
 * Phase 4g cursor bloom — soft purple radial gradient following the cursor
 * on desktop only. Uses the shared RAF pointer bus (one mousemove listener,
 * one spring-lerp loop, consumers just subscribe).
 *
 * Phase 5c: defers mount to the first real pointer event. On mobile + reduced-
 * motion contexts, mousemove never fires, so the bloom never mounts and its
 * paint cost never hits the critical path. Saves ~0.1s init on mobile.
 */
export function CursorBloom() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  // Wait for the first real mousemove before mounting the bloom element.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 767px)').matches) return;

    const onFirstMove = () => setActive(true);
    window.addEventListener('mousemove', onFirstMove, { once: true, passive: true });
    return () => window.removeEventListener('mousemove', onFirstMove);
  }, []);

  // Once active, subscribe to the shared pointer bus.
  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;

    const unsub = subscribePointer((state) => {
      if (!state.active) return;
      const px = ((state.sx + 1) / 2) * window.innerWidth - 200;
      const py = ((state.sy + 1) / 2) * window.innerHeight - 200;
      el.style.transform = `translate3d(${px}px, ${py}px, 0)`;
    });

    return () => {
      unsub();
      if (el) el.style.transform = '';
    };
  }, [active]);

  if (!active) return null;

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

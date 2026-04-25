'use client';

import { useRef, useEffect, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
};

/**
 * Phase 6 v2 — Apple/Cuberto-style magnetic cursor pull.
 *
 * GPU-only (translate3d). Auto-disables on:
 *  - prefers-reduced-motion: reduce
 *  - hover: none (touch devices)
 *
 * Uses RAF lerp toward target, idles when stationary.
 */
export default function MagneticCTA({
  children,
  strength = 0.35,
  radius = 80,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      const dx = Math.abs(targetX - currentX);
      const dy = Math.abs(targetY - currentY);
      if (dx > 0.1 || dy > 0.1) {
        rafId = requestAnimationFrame(tick);
      } else if (targetX === 0 && targetY === 0) {
        // settled at origin — clear
        el.style.transform = '';
        rafId = null;
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dxAbs = Math.abs(e.clientX - cx);
      const dyAbs = Math.abs(e.clientY - cy);

      // Phase 7 — bounding-box pre-distance gate. Skip the sqrt + tween
      // wake-up when the cursor is clearly outside the magnetic field
      // (covers ~95% of mousemove events on a typical page where the
      // cursor isn't hovering near the CTA). Cheaper than the full
      // Euclidean distance every frame.
      const farThreshold = radius * 1.5;
      if (dxAbs > farThreshold || dyAbs > farThreshold) {
        if (targetX !== 0 || targetY !== 0) {
          targetX = 0;
          targetY = 0;
          if (rafId === null) rafId = requestAnimationFrame(tick);
        }
        return;
      }

      const distance = Math.sqrt(dxAbs * dxAbs + dyAbs * dyAbs);
      if (distance < radius) {
        const factor = (1 - distance / radius) * strength;
        targetX = (e.clientX - cx) * factor;
        targetY = (e.clientY - cy) * factor;
      } else {
        targetX = 0;
        targetY = 0;
      }
      if (rafId === null) rafId = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (rafId === null) rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
      el.style.transform = '';
    };
  }, [strength, radius]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform', display: 'inline-block' }}>
      {children}
    </div>
  );
}

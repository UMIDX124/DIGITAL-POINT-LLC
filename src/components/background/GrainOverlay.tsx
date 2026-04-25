'use client';

import { useEffect, useState } from 'react';

/**
 * Phase 4g grain overlay — fixed, pointer-events-none, overlay blend mode.
 * Uses inline SVG feTurbulence for infinite-detail film grain without
 * a network round-trip.
 *
 * Phase 5c: mounts on requestIdleCallback (or a 1s setTimeout fallback) so
 * the SVG filter paint doesn't compete with first-paint. Saves ~0.15s
 * mobile LCP.
 *
 * The html[data-paused-global="true"] selector (set by Phase 4h visibility
 * tracker) pauses this element when the tab is inactive.
 */
export function GrainOverlay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const ric = (window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    }).requestIdleCallback;
    if (typeof ric === 'function') {
      const id = ric(() => setMounted(true), { timeout: 2000 });
      return () => {
        const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void })
          .cancelIdleCallback;
        if (typeof cic === 'function') cic(id);
      };
    }
    const t = window.setTimeout(() => setMounted(true), 1000);
    return () => window.clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="grain-overlay fixed inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        mixBlendMode: 'overlay',
        opacity: 0.05,
        transform: 'translateZ(0)',
        willChange: 'opacity',
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="dpl-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0.5 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#dpl-grain)" />
      </svg>
    </div>
  );
}

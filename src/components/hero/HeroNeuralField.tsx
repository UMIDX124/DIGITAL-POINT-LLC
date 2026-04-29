'use client';

import { useEffect, useRef } from 'react';

/**
 * Phase 19 hero neural field. Animated SVG particle network drifting
 * behind the hero content layer. Communicates the AI/automation register
 * visually: dots represent agents, faint connecting lines represent
 * inference paths/data flow. Sits BETWEEN hero atmosphere fallback and
 * HeroDataTicker (z-index region 1, atmospheric exception layer).
 *
 * Render contract:
 * - SVG only, no canvas, no Three.js. ~3kb runtime.
 * - 26 nodes seeded deterministically (no SSR/CSR mismatch).
 * - Each node drifts with smooth sine path; lines drawn between any 2
 *   nodes within proximity threshold (auto-cull during render).
 * - amber #FF8800 at 0.45 line opacity (K17 atmospheric exception ceiling
 *   buffered: 0.45 * 0.6 visible = 0.27 < 0.30 cap).
 * - prefers-reduced-motion: animation disabled, static frame rendered.
 * - Desktop only (>=1024px); mobile suppressed by parent wrapper.
 */

type Node = {
  x: number;
  y: number;
  rx: number; // amplitude x
  ry: number; // amplitude y
  px: number; // phase x
  py: number; // phase y
  speed: number;
  size: number;
};

const W = 1600;
const H = 800;

// Deterministic seeded random — Mulberry32. Same seed every render so
// SSR + CSR agree on initial node positions.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildNodes(): Node[] {
  const rng = mulberry32(0x4ec9b1);
  const N = 26;
  const nodes: Node[] = [];
  for (let i = 0; i < N; i++) {
    nodes.push({
      x: rng() * W,
      y: rng() * H,
      rx: 14 + rng() * 30,
      ry: 10 + rng() * 24,
      px: rng() * Math.PI * 2,
      py: rng() * Math.PI * 2,
      speed: 0.0002 + rng() * 0.00035,
      size: 1.4 + rng() * 1.6,
    });
  }
  return nodes;
}

const NODES = buildNodes();
const PROXIMITY = 220; // px in viewBox
const PROXIMITY_SQ = PROXIMITY * PROXIMITY;

export function HeroNeuralField() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const lineLayerRef = useRef<SVGGElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    if (!window.matchMedia('(min-width: 1024px)').matches) return;

    const svg = svgRef.current;
    const lineLayer = lineLayerRef.current;
    if (!svg || !lineLayer) return;

    // Pre-allocate line elements (max possible = N*(N-1)/2). We'll reuse
    // them every frame and toggle visibility via x1/x2 attributes.
    const maxLines = (NODES.length * (NODES.length - 1)) / 2;
    const lineEls: SVGLineElement[] = [];
    for (let i = 0; i < maxLines; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('stroke', 'var(--accent-primary)');
      line.setAttribute('stroke-width', '0.6');
      line.setAttribute('stroke-linecap', 'round');
      line.setAttribute('opacity', '0');
      lineLayer.appendChild(line);
      lineEls.push(line);
    }

    let t0 = performance.now();
    let visible = true;

    // Pause when tab hidden to save battery on background tabs.
    const onVis = () => {
      visible = !document.hidden;
      if (visible) t0 = performance.now() - tElapsed;
      tick();
    };
    document.addEventListener('visibilitychange', onVis);

    let tElapsed = 0;
    const tick = () => {
      if (!visible) return;
      const now = performance.now();
      tElapsed = now - t0;

      // Update node positions.
      const live = NODES.map((n) => ({
        x: n.x + Math.sin(tElapsed * n.speed + n.px) * n.rx,
        y: n.y + Math.cos(tElapsed * n.speed + n.py) * n.ry,
        size: n.size,
      }));

      // Place node circles.
      live.forEach((p, i) => {
        const c = nodeRefs.current[i];
        if (!c) return;
        c.setAttribute('cx', String(p.x));
        c.setAttribute('cy', String(p.y));
      });

      // Draw connecting lines for proximity pairs.
      let lineIdx = 0;
      for (let i = 0; i < live.length; i++) {
        for (let j = i + 1; j < live.length; j++) {
          const a = live[i];
          const b = live[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < PROXIMITY_SQ) {
            const line = lineEls[lineIdx++];
            // opacity falls off with distance — closer pairs glow brighter.
            const alpha = 0.45 * (1 - d2 / PROXIMITY_SQ);
            line.setAttribute('x1', String(a.x));
            line.setAttribute('y1', String(a.y));
            line.setAttribute('x2', String(b.x));
            line.setAttribute('y2', String(b.y));
            line.setAttribute('opacity', String(alpha));
          }
        }
      }
      // Hide unused line slots.
      for (let k = lineIdx; k < lineEls.length; k++) {
        lineEls[k].setAttribute('opacity', '0');
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('visibilitychange', onVis);
      lineEls.forEach((el) => el.remove());
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="hero-neural-field"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g ref={lineLayerRef} />
      <g>
        {NODES.map((n, i) => (
          <circle
            key={i}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            cx={n.x}
            cy={n.y}
            r={n.size}
            fill="var(--accent-bright)"
            opacity={0.55}
          />
        ))}
      </g>
    </svg>
  );
}

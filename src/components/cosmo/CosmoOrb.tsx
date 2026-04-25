'use client';

/**
 * CosmoOrb — purely decorative AI mascot visual.
 *
 * DISAMBIGUATION: NOT related to the Phase 3a SupportChatbot (commit 4386ab3
 * removal). This component contains ZERO AI SDK imports, ZERO chat logic,
 * ZERO API calls, ZERO user input. Pure SVG + CSS keyframes + GSAP
 * ScrollTrigger scrub. The "Cosmo" name is reused intentionally as the
 * AI-automation mascot brand; the visual orb represents that brand.
 *
 * If chatbot functionality is ever re-added, name it differently (e.g.
 * "DPLAssistant") to avoid re-introducing the confusion.
 *
 * Phase 4b behaviors:
 *   - Breath pulse (4s ease-in-out infinite, CSS)
 *   - Outer ring rotation (40s linear CW, CSS)
 *   - Middle ring rotation (28s linear CCW, CSS)
 *   - Inner-core bright pulse (2.4s ease-in-out infinite, CSS)
 *   - 6 orbital dust particles (15–30s per particle, staggered durations,
 *     staggered phase offsets, CSS)
 *   - Mouse-follow on desktop (spring-lerped via shared RAF, 15px core /
 *     8px outer-ring max translate, disabled below 768px + reduced-motion)
 *   - IntersectionObserver pauses all animations when offscreen
 *   - Optional scroll-morph timeline (Phase 4c wiring — accept the prop
 *     now, GSAP timeline implementation lives in the hero host so the
 *     morph can be tied to the actual page scroll length)
 *
 * API keeps the prompt's shape:
 *   size?: 'sm' | 'md' | 'lg' = 'md'
 *   scrollMorph?: boolean = true   (consumed when mounted under a GSAP
 *                                   timeline host; this component exposes
 *                                   the right data-* hooks, Phase 4c wires
 *                                   the actual morph)
 *   mouseFollow?: boolean = true
 *   className?: string
 *   aria-label?: string (default: "AI automation orb — decorative")
 */

import { memo, useEffect, useRef } from 'react';
import { subscribePointer } from '@/lib/motion/sharedPointer';

type Size = 'sm' | 'md' | 'lg';

interface CosmoOrbProps {
  size?: Size;
  scrollMorph?: boolean;
  mouseFollow?: boolean;
  className?: string;
  'aria-label'?: string;
}

const SIZE_CLASSES: Record<Size, string> = {
  // Responsive sizing clamps: mobile shrinks to ~22vh at 640px viewport,
  // desktop caps at 480px for 'lg', 400px for 'md', 320px for 'sm'.
  sm: 'w-[min(280px,45vw)] sm:w-[min(320px,30vh)]',
  md: 'w-[min(280px,55vw)] sm:w-[min(400px,35vh)]',
  lg: 'w-[min(280px,60vw)] sm:w-[min(480px,40vh)]',
};

/** Dust particle layout — radius (px), size (px), duration (s), phase (deg), opacity. */
const DUST: Array<{ r: number; s: number; d: number; phase: number; o: number }> = [
  { r: 118, s: 1.6, d: 18,  phase:  20, o: 0.55 },
  { r: 125, s: 1.2, d: 24,  phase: 110, o: 0.35 },
  { r: 132, s: 2.0, d: 15,  phase: 200, o: 0.60 },
  { r: 120, s: 1.1, d: 28,  phase: 275, o: 0.40 },
  { r: 140, s: 1.4, d: 22,  phase: 150, o: 0.30 },
  { r: 128, s: 1.8, d: 30,  phase:  60, o: 0.50 },
];

export const CosmoOrb = memo(function CosmoOrb({
  size = 'md',
  scrollMorph = true,
  mouseFollow = true,
  className = '',
  'aria-label': ariaLabel = 'AI automation orb — decorative',
}: CosmoOrbProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<SVGGElement | null>(null);
  const outerRingRef = useRef<SVGGElement | null>(null);

  /* ---- IntersectionObserver: pause CSS animations when offscreen ----- */
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          el.dataset.cosmoIoPaused = entry.isIntersecting ? 'false' : 'true';
        }
      },
      { rootMargin: '120px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ---- Mouse-follow via shared pointer RAF ---------------------------- */
  useEffect(() => {
    if (!mouseFollow) return;
    const core = coreRef.current;
    const outerRing = outerRingRef.current;
    if (!core && !outerRing) return;

    const unsub = subscribePointer(({ sx, sy, active }) => {
      if (!active) return;
      // Core translates up to 15px; outer ring parallaxes at 8px (shallower
      // depth). Both honor normalized sx/sy in [-1, 1].
      if (core) {
        core.style.transform = `translate3d(${sx * 15}px, ${sy * 15}px, 0)`;
      }
      if (outerRing) {
        outerRing.style.transform = `translate3d(${sx * 8}px, ${sy * 8}px, 0)`;
      }
    });
    return () => {
      unsub();
      if (core) core.style.transform = '';
      if (outerRing) outerRing.style.transform = '';
    };
  }, [mouseFollow]);

  return (
    <div
      ref={rootRef}
      data-cosmo-root
      data-cosmo-size={size}
      data-cosmo-scroll-morph={scrollMorph ? 'true' : 'false'}
      data-cosmo-io-paused="false"
      className={`relative aspect-square mx-auto ${SIZE_CLASSES[size]} ${className}`}
      aria-label={ariaLabel}
      role="img"
    >
      {/* Breathing wrapper — scales + fades 1-2% every 4s. Gives the orb a living feel. */}
      <div data-cosmo-breath className="absolute inset-0">
        <svg
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            {/* Outer halo — soft bloom. Phase 5c: multi-stop radial gradient
                simulates the Gaussian-blur falloff without the compositor
                cost of feGaussianBlur (mobile LCP saver). */}
            <radialGradient id="cosmo-halo" cx="50%" cy="50%" r="52%">
              <stop offset="0%"   stopColor="var(--accent-bright)" stopOpacity="0.55" />
              <stop offset="22%"  stopColor="var(--accent-bright)" stopOpacity="0.4"  />
              <stop offset="45%"  stopColor="var(--accent)"        stopOpacity="0.2"  />
              <stop offset="70%"  stopColor="var(--accent)"        stopOpacity="0.08" />
              <stop offset="90%"  stopColor="var(--accent-deep)"   stopOpacity="0.02" />
              <stop offset="100%" stopColor="var(--accent-deep)"   stopOpacity="0"    />
            </radialGradient>

            {/* Core sphere — bright center, deeper edge. */}
            <radialGradient id="cosmo-core" cx="38%" cy="34%" r="66%">
              <stop offset="0%"   stopColor="#E0E7FF" stopOpacity="1" />
              <stop offset="22%"  stopColor="#A5B4FC" stopOpacity="1" />
              <stop offset="60%"  stopColor="var(--accent-bright)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--accent-deep)"   stopOpacity="1" />
            </radialGradient>

            {/* Specular highlight — upper-left soft white. */}
            <radialGradient id="cosmo-spec" cx="32%" cy="28%" r="28%">
              <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"    />
            </radialGradient>

            {/* Inner bright core — small pulsing hot-spot. */}
            <radialGradient id="cosmo-inner" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="40%"  stopColor="#E0E7FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#A5B4FC" stopOpacity="0"   />
            </radialGradient>
          </defs>

          {/* Layer 1: halo, pre-baked gradient (no filter). */}
          <circle cx="200" cy="200" r="200" fill="url(#cosmo-halo)" opacity="0.9" />

          {/* Layer 2: outer ring, slowly rotating CW. */}
          <g ref={outerRingRef}>
            <g data-cosmo-ring-outer>
              <circle cx="200" cy="200" r="154" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.55" />
              <circle cx="200" cy="200" r="154" fill="none" stroke="var(--accent-bright)" strokeWidth="0.5" strokeDasharray="2 10" opacity="0.6" />
            </g>
          </g>

          {/* Layer 3: middle ring, counter-rotating CCW. */}
          <g data-cosmo-ring-middle>
            <circle cx="200" cy="200" r="138" fill="none" stroke="var(--accent-bright)" strokeWidth="1.25" opacity="0.8" />
          </g>

          {/* Layer 4: core sphere + specular highlight — the hero element. */}
          <g ref={coreRef}>
            <circle cx="200" cy="200" r="130" fill="url(#cosmo-core)" />
            <circle cx="200" cy="200" r="130" fill="url(#cosmo-spec)" />
            {/* Inner-core pulse — scales + opacity-pulses. */}
            <g data-cosmo-inner-pulse style={{ transformOrigin: '200px 200px' }}>
              <circle cx="200" cy="200" r="26" fill="url(#cosmo-inner)" />
            </g>
          </g>

          {/* Layer 5: orbital dust particles — 6 total, staggered. */}
          <g transform="translate(200 200)">
            {DUST.map((d, i) => (
              <g
                key={i}
                data-cosmo-dust
                style={{
                  // Phase offset via negative animation-delay so each particle
                  // starts at a distinct angle.
                  animationDelay: `${-(d.d * (d.phase / 360))}s`,
                  animationDuration: `${d.d}s`,
                  // @ts-expect-error — custom props via style.
                  '--cosmo-dust-radius': `${d.r}px`,
                  '--cosmo-dust-duration': `${d.d}s`,
                  opacity: d.o,
                }}
              >
                <circle cx="0" cy="0" r={d.s} fill="var(--accent-bright)" />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
});

export default CosmoOrb;

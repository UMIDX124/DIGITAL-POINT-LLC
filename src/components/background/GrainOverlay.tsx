/**
 * Phase 4g grain overlay — fixed, pointer-events-none, overlay blend mode.
 * Uses inline SVG feTurbulence for infinite-detail film grain without
 * a network round-trip. Server-rendered safe: zero JS, zero state.
 *
 * The html[data-paused-global="true"] selector (set by Phase 4h visibility
 * tracker) pauses this element — not via animation (grain is static),
 * but by hiding it when the tab is inactive so there's nothing painted
 * underneath user-agent overlays on wakeup.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain-overlay fixed inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        mixBlendMode: 'overlay',
        opacity: 0.035,
        // GPU-promotion + pointer-event isolation.
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

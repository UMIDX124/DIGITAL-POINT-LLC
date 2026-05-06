/**
 * HeroSidePanels — Phase 20.1.2 cinematic side telemetry strips.
 *
 * Reference: Hubtown.com hero (vertical "LOGIN / MENU" type labels left
 * and right of the hero centerpiece + bottom scroll indicator).
 *
 * Server Component — pure CSS positioning, no JS, no client cost.
 *
 * Composition:
 *   - Left column: "LIVE OPS" / "9 AGENTS" / "24/7" (rotated 90°,
 *     mono uppercase, muted with amber accent at top).
 *   - Right column: "DPL" / "2017 → NOW" / "OPERATING" (rotated 90°,
 *     mono uppercase, muted).
 *   - Bottom-center: "SCROLL" with downward arrow + animated dash
 *     (CSS-only animation, prefers-reduced-motion safe).
 *
 * All elements absolutely positioned within the hero section. Only
 * visible at viewport ≥ 1024px so they don't clutter mobile.
 */
export function HeroSidePanels() {
  return (
    <>
      {/* Left vertical telemetry strip */}
      <div
        className="hero-side-panel hero-side-panel--left"
        aria-hidden="true"
      >
        <span className="hero-side-strip">
          <span className="hero-side-strip-tag">LIVE.OPS</span>
          <span className="hero-side-strip-rule" />
          <span className="hero-side-strip-meta">9 AGENTS</span>
          <span className="hero-side-strip-rule" />
          <span className="hero-side-strip-meta">24 / 7</span>
        </span>
      </div>

      {/* Right vertical telemetry strip */}
      <div
        className="hero-side-panel hero-side-panel--right"
        aria-hidden="true"
      >
        <span className="hero-side-strip">
          <span className="hero-side-strip-tag">DPL</span>
          <span className="hero-side-strip-rule" />
          <span className="hero-side-strip-meta">2017 → NOW</span>
          <span className="hero-side-strip-rule" />
          <span className="hero-side-strip-meta">OPERATING</span>
        </span>
      </div>

      {/* Bottom-center scroll indicator */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="hero-scroll-tag">SCROLL</span>
        <span className="hero-scroll-bar">
          <span className="hero-scroll-bar-dot" />
        </span>
      </div>
    </>
  );
}

export default HeroSidePanels;

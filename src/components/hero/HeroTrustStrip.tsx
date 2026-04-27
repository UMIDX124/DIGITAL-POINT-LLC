/**
 * Hero trust strip — 3 operator-accountability signals with middot
 * separators. Extracted from HeroSection (Phase 18 reduced-scope C4).
 *
 * Phase 13 trust signals → Phase 17b Pillar 4 P0.4. CSS-only stagger
 * fade-in (`.hero-trust-signal:nth-of-type(N) { animation-delay: ... }`
 * in globals.css) — no JS coupling.
 */
export function HeroTrustStrip() {
  return (
    <div className="hero-trust-strip" aria-label="Track record">
      <span className="hero-trust-signal">$50M ad spend operated</span>
      <span className="dot-sep" aria-hidden="true">·</span>
      <span className="hero-trust-signal">200+ audits shipped</span>
      <span className="dot-sep" aria-hidden="true">·</span>
      <span className="hero-trust-signal">8 years operating, not pitching</span>
    </div>
  );
}

/**
 * Hero atmosphere CSS-only fallback (Phase 18.5.D).
 *
 * Renders 3 absolutely-positioned divs with the sphere base colors at the
 * locked positions, using radial-gradient + filter blur to simulate the
 * Three.js sphere material visually without a canvas. Used in two cases:
 *   1. Mobile <1024px (Three.js disabled, prefers-reduced-motion guard)
 *   2. prefers-reduced-motion: reduce (static spheres, no rotation, no
 *      parallax)
 *
 * No JavaScript, no animation, no scroll listener. Pure presentational.
 *
 * Phase 18.5 K17 buffered opacities: A 0.27, B 0.25, C 0.17 (0.01-0.03
 * below the K17 amber-≤30%/blue-≤22% caps to absorb Lightning CSS
 * rounding).
 */
export function HeroAtmosphereFallback() {
  return (
    <div className="hero-atmosphere-fallback" aria-hidden="true">
      <div className="hero-atmosphere-sphere hero-atmosphere-sphere--a" />
      <div className="hero-atmosphere-sphere hero-atmosphere-sphere--b" />
      <div className="hero-atmosphere-sphere hero-atmosphere-sphere--c" />
    </div>
  );
}

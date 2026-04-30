/**
 * Hero h1 — Phase 19 nuke-lag static rewrite.
 *
 * GSAP word-reveal animation removed. All `<span class="word">` masking
 * wrappers stripped. Server-component-friendly (no forwardRef needed
 * since the consumer no longer attaches refs for animation).
 *
 * Locked invariants preserved:
 *   - Copy: "Hire the AI. Skip the headcount." (em wraps "the AI",
 *     period inline outside em)
 *   - Phase 18.6 P2: em renders as .font-display.font-bold.not-italic
 *     (Geist Sans bold amber accent), not Instrument Serif italic
 *   - .hero-h1-line-2 wrapper provides the line break
 *   - .hero-em padding-block clamp for descender clearance
 */
export function HeroHeadline() {
  return (
    <h1 className="hero-h1 font-display mb-8" data-hero-headline>
      Hire{' '}
      <em className="hero-em font-display font-bold not-italic">the AI</em>.
      <span className="hero-h1-line-2">Skip the headcount.</span>
    </h1>
  );
}

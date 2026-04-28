import { forwardRef } from 'react';

/**
 * Hero h1 — extracted from HeroSection (Phase 18 reduced-scope C4).
 *
 * Locked invariants preserved:
 *  - Hero copy: "Hire the AI." / "Skip the headcount." (two-sentence beat;
 *    italic em wraps "the AI" only; period inline outside the em)
 *  - GSAP word-reveal queries `[data-word-reveal]` scoped to the headline ref
 *  - `.hero-em` italic descender padding fix (Pillar 5 R1)
 *  - `.hero-h1-line-2` nowrap wrapper for line 2 at ≥640px
 */
export const HeroHeadline = forwardRef<HTMLHeadingElement>(function HeroHeadline(_props, ref) {
  return (
    <h1
      ref={ref}
      className="hero-h1 font-hero mb-8"
      data-hero-headline
    >
      <span className="word inline-block overflow-hidden align-top">
        <span className="word-inner inline-block" data-word-reveal>Hire</span>
      </span>
      <span aria-hidden="true">{' '}</span>
      {/* Phase 18.6 P1 — V3 .hero-em-inner inline-block wrapper REMOVED.
          The inline-block + padding-block-start: 0.25em was inflating the
          h1 line box, producing a ~300px gap between sentence beats. V3
          structural theory (BFC for descender clearance) is now superseded
          by Pillar 5 R1 padding-block-end clamp re-applied directly on
          .hero-em (see globals.css). Word-reveal animation chain unchanged. */}
      <em className="hero-em font-italic-display not-italic">
        <span className="word inline-block overflow-hidden align-top">
          <span className="word-inner inline-block" data-word-reveal>the</span>
        </span>
        <span aria-hidden="true">{' '}</span>
        <span className="word inline-block overflow-hidden align-top">
          <span className="word-inner inline-block" data-word-reveal>AI</span>
        </span>
      </em>
      <span aria-hidden="true">.</span>
      {/* Phase 18.6 P1 fourth pass — <br> REMOVED. With .hero-h1-line-2
          now display: block (P1 third pass), the <br> was producing an
          EXTRA empty line in the anonymous inline block BEFORE the new
          block-display sentence 2 started. That empty <br> line was the
          ~250px gap visible in production. Block-display alone gives
          the line break; <br> redundant + harmful. nowrap @ ≥640px on
          .hero-h1-line-2 still preserved. */}
      <span className="hero-h1-line-2">
        <span className="word inline-block overflow-hidden align-top">
          <span className="word-inner inline-block" data-word-reveal>Skip</span>
        </span>
        <span aria-hidden="true">{' '}</span>
        <span className="word inline-block overflow-hidden align-top">
          <span className="word-inner inline-block" data-word-reveal>the</span>
        </span>
        <span aria-hidden="true">{' '}</span>
        <span className="word inline-block overflow-hidden align-top">
          <span className="word-inner inline-block" data-word-reveal>headcount.</span>
        </span>
      </span>
    </h1>
  );
});

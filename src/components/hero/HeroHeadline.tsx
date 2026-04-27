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
      className="hero-headline font-hero mb-8"
      data-hero-headline
    >
      <span className="word inline-block overflow-hidden align-top">
        <span className="word-inner inline-block" data-word-reveal>Hire</span>
      </span>
      <span aria-hidden="true">{' '}</span>
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
      {/* Phase 17b Pillar 4 P0.2 — explicit line break between the two
          sentences. Wrapper carries `white-space: nowrap` (.hero-h1-line-2)
          so "Skip the headcount." stays single-line at ≥640px. */}
      <br aria-hidden="true" />
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

/**
 * Phase 7 — letter-hover replacement for ScrambleText.
 *
 * Per-character spans with CSS-only :hover transitions. Zero JS runtime
 * cost. The parent [data-service-row] is the hover trigger; each letter
 * gets a transition-delay derived from its index for a cascade effect.
 *
 * Reduced-motion fallback (in globals.css) drops the transform and
 * transition-delay so motion-sensitive users still see the color change.
 */

type Props = {
  text: string;
  className?: string;
};

export default function LetterHoverText({ text, className = '' }: Props) {
  const chars = text.split('');
  return (
    <span
      className={`letter-hover-text inline ${className}`}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="letter-hover-char inline-block"
          aria-hidden="true"
          style={{ ['--letter-index' as string]: i } as React.CSSProperties}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
}

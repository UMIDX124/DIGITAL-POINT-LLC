import type { CSSProperties } from 'react';

type CosmoMarkProps = {
  state?: 'idle' | 'active' | 'speaking';
  size?: number;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * CosmoMark — operator-brief signature.
 *
 * Concentric sonar concept: a static outer ring, two pulsing rings that expand
 * outward on a stagger, a breathing core dot, and a rotating sweep arc.
 * Single amber accent, hairline weights, no glow. The whole thing reads as
 * "agent on a live channel" rather than the generic chatbot wave.
 *
 * State drives speed only — the geometry is identical across idle / active /
 * speaking, so the FAB → panel-open transition stays visually continuous.
 */
export function CosmoMark({
  state = 'idle',
  size = 64,
  ariaLabel = '',
  className = '',
  style,
}: CosmoMarkProps) {
  const decorative = ariaLabel === '';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role={decorative ? 'presentation' : 'img'}
      aria-label={ariaLabel || undefined}
      aria-hidden={decorative || undefined}
      className={`cosmo-mark cosmo-mark--${state} ${className}`}
      style={{ color: 'var(--color-accent)', ...style }}
    >
      {/* Static outer track (hairline) */}
      <circle
        cx="16"
        cy="16"
        r="14.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.22"
      />

      {/* Sweep arc — rotates around the outer track */}
      <g className="cosmo-mark__sweep">
        <circle
          cx="16"
          cy="16"
          r="14.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="22 78"
        />
      </g>

      {/* Pulsing rings — staggered */}
      <circle
        cx="16"
        cy="16"
        r="6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="cosmo-mark__ring cosmo-mark__ring--1"
      />
      <circle
        cx="16"
        cy="16"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="cosmo-mark__ring cosmo-mark__ring--2"
      />

      {/* Core dot — breathes */}
      <circle cx="16" cy="16" r="2.4" fill="currentColor" className="cosmo-mark__core" />
    </svg>
  );
}

export default CosmoMark;

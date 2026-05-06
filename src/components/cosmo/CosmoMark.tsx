/**
 * CosmoMark — concept 2 (oscilloscope-wave) inline SVG mascot for the
 * Cosmo chat surface. Phase 20 Loop A Sub-phase B locked invariant:
 * Cosmo mascot is the oscilloscope-wave variant of the Bloomberg Operator
 * design language.
 *
 * Architectural separation: this is the Cosmo identity, distinct from
 * Dp-logo1.png (DPL brand mark used in nav, footer, conversion pages,
 * schema.org, intro loader). Brand mark and chat-surface mark are
 * intentionally different so Cosmo can evolve without dragging the DPL
 * brand identity along.
 *
 * Motion states are pure CSS (transform + opacity) for K11 budget +
 * prefers-reduced-motion compliance via globals.css `.cosmo-mark-*`
 * classes. No JS animation loops.
 *
 * The single sine wave path is a 4-segment cubic bezier approximation
 * across two full cycles (period 28 on the 64x64 viewBox), amplitude 14,
 * centered at y=32. Control-point math: each half-cycle uses control
 * points at x ± P/3 from endpoints with y = ±4A/3 from baseline; this
 * is the best-known cubic approximation of a sine half-wave.
 */
import type { CSSProperties } from 'react';

type CosmoMarkProps = {
  /** Visual state — drives stroke brightness and (via CSS) animation */
  state?: 'idle' | 'active' | 'speaking';
  /** Render size in px (square). Inline SVG scales perfectly; default 64 */
  size?: number;
  /** Optional aria-label; defaults to '' (decorative) */
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

const PRIMARY_PATH =
  'M 4 32 C 8.67 13.33 13.33 13.33 18 32 S 27.33 50.67 32 32 S 41.33 13.33 46 32 S 55.33 50.67 60 32';

/* Speaking-state secondary wave: half amplitude, offset phase, faint trail */
const ECHO_PATH =
  'M 4 32 C 8.67 25 13.33 25 18 32 S 27.33 39 32 32 S 41.33 25 46 32 S 55.33 39 60 32';

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
      viewBox="0 0 64 64"
      role={decorative ? 'presentation' : 'img'}
      aria-label={ariaLabel || undefined}
      aria-hidden={decorative || undefined}
      className={`cosmo-mark cosmo-mark-${state} ${className}`}
      style={style}
    >
      {/* Faint hairline grid (oscilloscope substrate) */}
      <g
        stroke="var(--accent-primary, #FF8800)"
        strokeWidth="0.25"
        opacity="0.12"
      >
        <line x1="4" y1="32" x2="60" y2="32" />
        <line x1="32" y1="4" x2="32" y2="60" />
      </g>
      {/* Echo wave (only visible in speaking state via CSS opacity) */}
      <path
        d={ECHO_PATH}
        fill="none"
        stroke="var(--accent-primary, #FF8800)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="cosmo-mark-echo"
      />
      {/* Primary waveform */}
      <path
        d={PRIMARY_PATH}
        fill="none"
        stroke="var(--accent-primary, #FF8800)"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="cosmo-mark-wave"
      />
    </svg>
  );
}

export default CosmoMark;

/**
 * CosmoMark v2 — Phase 20.1.2 cinematic redesign.
 *
 * v1 was a sine waveform; UF flagged it as "didn't work." v2 redesigns
 * Cosmo as a faceted crystal-shard mark that visually matches the
 * Hero3DStage v3 octahedron centerpiece. Same design language, same
 * palette gradient (amber core → copper mid → cream rim), same rim-
 * glow visual register at icon scale.
 *
 * Construction: 6-point diamond/octahedron silhouette with internal
 * facet lines. Three radial-gradient stops applied via SVG <radialGradient>.
 * Outer halo via blur-filtered duplicate path. Pulse animations driven
 * by .cosmo-mark-* CSS classes for state.
 *
 * States (props.state):
 *   - 'idle'    → gentle ambient pulse on core gradient (5s)
 *   - 'active'  → brighter rim, amber drop-shadow halo
 *   - 'speaking'→ rapid pulse + cream rim flash
 *
 * Architectural separation preserved: this is the Cosmo identity (chat
 * surface mark), distinct from Dp-logo1.png (DPL brand mark).
 */
import type { CSSProperties } from 'react';

type CosmoMarkProps = {
  state?: 'idle' | 'active' | 'speaking';
  size?: number;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

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
      <defs>
        {/* Core radial gradient — matches Hero3DStage crystal palette */}
        <radialGradient id="cosmo-core-grad" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#FFF0D4" stopOpacity="1" />
          <stop offset="35%" stopColor="#FFA833" stopOpacity="1" />
          <stop offset="70%" stopColor="#FF8800" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#C26F3C" stopOpacity="0.85" />
        </radialGradient>
        <radialGradient id="cosmo-halo-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF8800" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#C26F3C" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#C26F3C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cosmo-facet-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF0D4" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#C26F3C" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* Outer halo — diamond shape, radial gradient, blur-faded */}
      <circle
        cx="32"
        cy="32"
        r="28"
        fill="url(#cosmo-halo-grad)"
        className="cosmo-mark-halo"
      />

      {/* Core diamond / octahedron silhouette */}
      <g className="cosmo-mark-core">
        {/* Main diamond fill (stretched octahedron) */}
        <polygon
          points="32,8 50,32 32,56 14,32"
          fill="url(#cosmo-core-grad)"
          opacity="0.92"
        />
        {/* Top-right facet highlight */}
        <polygon
          points="32,8 50,32 32,32"
          fill="url(#cosmo-facet-grad)"
          opacity="0.55"
        />
        {/* Bottom-left facet shadow */}
        <polygon
          points="14,32 32,32 32,56"
          fill="#0A0908"
          opacity="0.18"
        />
        {/* Center facet lines (hairline structure) */}
        <g
          stroke="#FFF0D4"
          strokeWidth="0.6"
          opacity="0.55"
          fill="none"
          strokeLinecap="round"
        >
          <line x1="32" y1="8" x2="32" y2="56" />
          <line x1="14" y1="32" x2="50" y2="32" />
        </g>
        {/* Outer outline — amber stroke */}
        <polygon
          points="32,8 50,32 32,56 14,32"
          fill="none"
          stroke="#FFA833"
          strokeWidth="1.2"
          strokeLinejoin="round"
          className="cosmo-mark-outline"
        />
      </g>

      {/* Bright apex highlight — small bright dot top */}
      <circle
        cx="32"
        cy="14"
        r="1.4"
        fill="#FFF0D4"
        opacity="0.85"
        className="cosmo-mark-apex"
      />
    </svg>
  );
}

export default CosmoMark;

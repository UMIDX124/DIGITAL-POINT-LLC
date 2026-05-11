import type { CSSProperties } from 'react';

type CosmoMarkProps = {
  state?: 'idle' | 'active' | 'speaking';
  size?: number;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

const bars = [
  { x: 0, y: 6, h: 4 },
  { x: 4, y: 3, h: 10 },
  { x: 8, y: 1, h: 14 },
  { x: 12, y: 2, h: 12 },
  { x: 16, y: 1, h: 14 },
  { x: 20, y: 3, h: 10 },
  { x: 24, y: 6, h: 4 },
];

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
      viewBox="0 0 28 16"
      preserveAspectRatio="xMidYMid meet"
      role={decorative ? 'presentation' : 'img'}
      aria-label={ariaLabel || undefined}
      aria-hidden={decorative || undefined}
      className={`cosmo-mark cosmo-mark-${state} ${className}`}
      style={{ color: 'var(--color-accent)', ...style }}
    >
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={2}
          height={b.h}
          fill="currentColor"
          rx={0.5}
          className="cosmo-bar"
          style={{ '--bar-i': i } as CSSProperties}
        />
      ))}
    </svg>
  );
}

export default CosmoMark;

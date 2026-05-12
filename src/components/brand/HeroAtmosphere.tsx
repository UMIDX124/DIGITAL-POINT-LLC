type Variant = 'home' | 'pillar' | 'subtle' | 'subtle-dark';

type Props = {
  variant?: Variant;
  className?: string;
};

const LINE_LIGHT = 'rgba(10,10,10,0.04)';
const LINE_DARK = 'rgba(255,255,255,0.04)';

export function HeroAtmosphere({ variant = 'home', className }: Props) {
  const isDarkContext = variant === 'subtle-dark';
  const line = isDarkContext ? LINE_DARK : LINE_LIGHT;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <defs>
        <radialGradient id="dpl-hero-amber" cx="20%" cy="0%" r="55%">
          <stop offset="0%" stopColor="#FF8800" stopOpacity="0.16" />
          <stop offset="60%" stopColor="#FF8800" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#FF8800" stopOpacity="0" />
        </radialGradient>
        <pattern id="dpl-hero-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke={line} strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="1440" height="720" fill="url(#dpl-hero-grid)" />
      <rect width="1440" height="720" fill="url(#dpl-hero-amber)" />

      {variant === 'home' && (
        <g opacity="0.18">
          <rect x="1180" y="80" width="80" height="80" fill="none" stroke="#FF8800" strokeWidth="1.5" />
          <rect x="1260" y="120" width="60" height="60" fill="none" stroke="#FF8800" strokeWidth="1.5" />
          <rect x="1200" y="180" width="40" height="40" fill="none" stroke="#FF8800" strokeWidth="1.5" />
          <rect x="1260" y="200" width="28" height="28" fill="#FF8800" />
        </g>
      )}

      {variant === 'pillar' && (
        <g opacity="0.2">
          <rect x="1240" y="80" width="3" height="160" fill="#FF8800" />
          <rect x="1264" y="120" width="3" height="220" fill="#FF8800" opacity="0.7" />
          <rect x="1288" y="60" width="3" height="280" fill="#FF8800" opacity="0.5" />
          <rect x="1312" y="100" width="3" height="200" fill="#FF8800" opacity="0.35" />
        </g>
      )}
    </svg>
  );
}

export default HeroAtmosphere;

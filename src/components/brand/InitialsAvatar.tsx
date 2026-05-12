type Props = {
  initials: string;
  size?: number;
  context?: 'light' | 'dark';
  ariaLabel?: string;
  className?: string;
};

export function InitialsAvatar({
  initials,
  size = 120,
  context = 'light',
  ariaLabel,
  className,
}: Props) {
  const letters = initials.trim().slice(0, 2).toUpperCase() || '·';
  const bg = context === 'dark' ? '#161616' : '#F2F2F2';
  const text = context === 'dark' ? '#F5F5F7' : '#0A0A0A';
  const ring = '#FF8800';
  const half = size / 2;
  const fontPx = Math.round(size * 0.36);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      className={className}
      style={{ display: 'block', flexShrink: 0 }}
    >
      <circle cx={half} cy={half} r={half - 2} fill={bg} stroke={ring} strokeWidth={2} />
      <text
        x={half}
        y={half}
        fill={text}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-sans), system-ui, sans-serif"
        fontWeight={600}
        fontSize={fontPx}
        letterSpacing={Math.round(fontPx * -0.025)}
      >
        {letters}
      </text>
    </svg>
  );
}

export default InitialsAvatar;

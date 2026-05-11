type Props = {
  size?: number;
  color?: string;
  className?: string;
  ariaHidden?: boolean;
  ariaLabel?: string;
};

export function Logomark({
  size = 28,
  color = 'var(--color-accent)',
  className,
  ariaHidden = true,
  ariaLabel,
}: Props) {
  const w = size;
  const h = Math.round((size / 28) * 16);
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 28 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
      className={className}
      style={{ color, flexShrink: 0, display: 'block' }}
    >
      <rect x="0" y="6" width="2" height="4" fill="currentColor" rx="0.5" />
      <rect x="4" y="3" width="2" height="10" fill="currentColor" rx="0.5" />
      <rect x="8" y="1" width="2" height="14" fill="currentColor" rx="0.5" />
      <rect x="12" y="2" width="2" height="12" fill="currentColor" rx="0.5" />
      <rect x="16" y="1" width="2" height="14" fill="currentColor" rx="0.5" />
      <rect x="20" y="3" width="2" height="10" fill="currentColor" rx="0.5" />
      <rect x="24" y="6" width="2" height="4" fill="currentColor" rx="0.5" />
    </svg>
  );
}

export function LogomarkSquare({
  size = 32,
  color = 'var(--color-accent)',
  bg = 'var(--color-canvas)',
  className,
  ariaHidden = true,
  ariaLabel,
}: Props & { bg?: string }) {
  return (
    <span
      className={className}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: bg,
        borderRadius: Math.max(4, size * 0.18),
        border: '1px solid var(--color-line-soft)',
        flexShrink: 0,
      }}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      <Logomark size={Math.round(size * 0.66)} color={color} />
    </span>
  );
}

export default Logomark;

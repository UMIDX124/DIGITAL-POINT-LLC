import Image from 'next/image';

type Variant = 'dark' | 'light';

type Props = {
  /** Rendered width in CSS pixels. Height auto-computes from the asset's 3.5:1 aspect ratio. */
  size?: number;
  variant?: Variant;
  className?: string;
  ariaHidden?: boolean;
  ariaLabel?: string;
  priority?: boolean;
};

const VARIANT_SRC: Record<Variant, string> = {
  dark: '/Dp-logo1-dark.png',
  light: '/Dp-logo1.png',
};

// Intrinsic dimensions of the cropped Dp-logo1*.png lockup (1960 x 560).
const ASSET_W = 1960;
const ASSET_H = 560;
const ASSET_RATIO = ASSET_H / ASSET_W;

export function Logomark({
  size = 120,
  variant = 'light',
  className,
  ariaHidden = true,
  ariaLabel,
  priority = false,
}: Props) {
  const renderedHeight = Math.round(size * ASSET_RATIO);
  return (
    <Image
      src={VARIANT_SRC[variant]}
      width={size}
      height={renderedHeight}
      alt={ariaLabel ?? ''}
      aria-hidden={ariaHidden}
      role={ariaLabel ? 'img' : undefined}
      className={className}
      priority={priority}
      style={{ display: 'block', flexShrink: 0, height: 'auto' }}
    />
  );
}

export default Logomark;

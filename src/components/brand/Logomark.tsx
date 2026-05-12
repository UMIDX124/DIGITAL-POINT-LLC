import Image from 'next/image';

type Variant = 'dark' | 'light';

type Props = {
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

export function Logomark({
  size = 28,
  variant = 'dark',
  className,
  ariaHidden = true,
  ariaLabel,
  priority = false,
}: Props) {
  return (
    <Image
      src={VARIANT_SRC[variant]}
      width={size}
      height={size}
      alt={ariaLabel ?? ''}
      aria-hidden={ariaHidden}
      role={ariaLabel ? 'img' : undefined}
      className={className}
      priority={priority}
      style={{ display: 'block', flexShrink: 0, height: 'auto', width: size }}
    />
  );
}

export default Logomark;

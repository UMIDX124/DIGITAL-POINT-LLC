import Image from 'next/image';

type Mode = 'lockup' | 'mark' | 'text';
type Variant = 'light' | 'dark';

type Props = {
  mode?: Mode;
  variant?: Variant;
  size?: number;
  markSize?: number;
  textSize?: number;
  gap?: number;
  className?: string;
  ariaHidden?: boolean;
  ariaLabel?: string;
  priority?: boolean;
};

const SRC = {
  mark: { light: '/dp-mark-light.png', dark: '/dp-mark-dark.png' },
  text: { light: '/dp-text-light.png', dark: '/dp-text-dark.png' },
};

const MARK_W = 1024;
const MARK_H = 1024;
const TEXT_LIGHT_W = 2000;
const TEXT_LIGHT_H = 600;
const TEXT_DARK_W = 1250;
const TEXT_DARK_H = 375;

export function Logomark({
  mode = 'lockup',
  variant = 'light',
  size = 120,
  markSize,
  textSize,
  gap = 16,
  className,
  ariaHidden = true,
  ariaLabel,
  priority = false,
}: Props) {
  if (mode === 'mark') {
    return (
      <Image
        src={SRC.mark[variant]}
        width={size}
        height={size}
        alt={ariaLabel ?? ''}
        aria-hidden={ariaHidden}
        role={ariaLabel ? 'img' : undefined}
        className={className}
        priority={priority}
        style={{ display: 'block', flexShrink: 0, height: 'auto' }}
      />
    );
  }

  if (mode === 'text') {
    const textW = variant === 'light' ? TEXT_LIGHT_W : TEXT_DARK_W;
    const textH = variant === 'light' ? TEXT_LIGHT_H : TEXT_DARK_H;
    const renderedHeight = Math.round(size * (textH / textW));
    return (
      <Image
        src={SRC.text[variant]}
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

  // mode === 'lockup' — mark + text composed via flex
  const effectiveMarkSize = markSize ?? Math.round(size * 0.4);
  const effectiveTextSize = textSize ?? Math.round(size * 0.32);
  const textW = variant === 'light' ? TEXT_LIGHT_W : TEXT_DARK_W;
  const textH = variant === 'light' ? TEXT_LIGHT_H : TEXT_DARK_H;
  const textRenderedHeight = Math.round(effectiveTextSize * (textH / textW));
  // 2× srcset hint so Next/Image picks a variant large enough to stay sharp
  // on retina; CSS clamps the rendered width back to the intended display size.
  const RETINA = 2;

  return (
    <span
      className={className}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${gap}px`,
        flexShrink: 0,
      }}
    >
      <Image
        src={SRC.mark[variant]}
        width={effectiveMarkSize * RETINA}
        height={effectiveMarkSize * RETINA}
        alt=""
        aria-hidden
        priority={priority}
        style={{ display: 'block', flexShrink: 0, width: `${effectiveMarkSize}px`, height: 'auto' }}
      />
      <Image
        src={SRC.text[variant]}
        width={effectiveTextSize * RETINA}
        height={textRenderedHeight * RETINA}
        alt=""
        aria-hidden
        priority={priority}
        style={{ display: 'block', flexShrink: 0, width: `${effectiveTextSize}px`, height: 'auto' }}
      />
    </span>
  );
}

export default Logomark;

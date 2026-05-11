import type { ReactNode, HTMLAttributes } from 'react';

type CommonProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  className?: string;
  delay?: number;
  size?: string;
  align?: 'left' | 'center';
  eyebrow?: string;
  title?: string;
  description?: string;
  background?: string;
  pulse?: boolean;
  value?: string | number;
  label?: string;
};

export function FadeUp({ children, className, delay, ...rest }: CommonProps) {
  void delay;
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

export function FadeIn({ children, className, delay, ...rest }: CommonProps) {
  void delay;
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

export function Container({ children, className, size }: CommonProps) {
  void size;
  return <div className={`container-wide ${className ?? ''}`.trim()}>{children}</div>;
}

export function Section({ children, className, background }: CommonProps) {
  void background;
  return <section className={`section ${className ?? ''}`.trim()}>{children}</section>;
}

export function GlassCard({ children, className }: CommonProps) {
  return <div className={`surface ${className ?? ''}`.trim()}>{children}</div>;
}

export function StaggerContainer({ children, className }: CommonProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className }: CommonProps) {
  return <div className={className}>{children}</div>;
}

export function SectionHeader({ eyebrow, title, description, align, className }: CommonProps) {
  return (
    <header
      className={`section-header ${align === 'center' ? 'section-header--center' : ''} ${className ?? ''}`.trim()}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="section-title">{title}</h2> : null}
      {description ? <p className="section-desc">{description}</p> : null}
    </header>
  );
}

export function SignalPoint({ size = 'sm', pulse }: { size?: 'sm' | 'md' | 'lg' | string; pulse?: boolean }) {
  void pulse;
  const px = size === 'lg' ? 10 : size === 'md' ? 8 : 6;
  return (
    <span
      aria-hidden="true"
      style={{
        width: px,
        height: px,
        borderRadius: '50%',
        background: 'var(--color-accent)',
        display: 'inline-block',
      }}
    />
  );
}

export function MetricDisplay({
  value,
  label,
  prefix,
  suffix,
}: {
  value: string | number;
  label?: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <span
        className="font-mono"
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          fontWeight: 600,
          color: 'var(--color-accent)',
        }}
      >
        {prefix ?? ''}
        {value}
        {suffix ?? ''}
      </span>
      {label ? (
        <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
          {label}
        </span>
      ) : null}
    </div>
  );
}

export default FadeUp;

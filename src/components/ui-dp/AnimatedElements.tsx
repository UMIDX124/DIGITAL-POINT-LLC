import { memo, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Phase 3a: AnimatedElements is now a thin, SERVER-COMPONENT-first layout
 * library. framer-motion has been removed from this module's tree. Scroll
 * reveals are handled by ScrollMotion.tsx via `data-reveal` /
 * `data-stagger-group` / `data-stagger-item` attributes, so nothing in this
 * file needs to ship client-side JS beyond what the DOM already holds.
 *
 * Every export from the legacy API is preserved (Section, Container,
 * SectionHeader, FadeUp, StaggerContainer, StaggerItem, GlassCard, SignalPoint,
 * MetricDisplay). Visual output is flatter and more editorial — GlassCard now
 * renders as card-flat (hairline border, no glass, no inner glow), and eyebrow
 * gradient fills have been replaced with solid amber.
 */

/* =========================================================================
   Section — wraps a <section> with the Phase 1 fluid section-padding tokens.
   Legacy `background` prop still accepted; maps to class names that globals.css
   already aliases to transparent so no visual regression on legacy consumers.
   ========================================================================= */
interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'none' | 'gradient' | 'grid' | 'cosmic';
}

export function Section({ children, className, id, background = 'none' }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'section-main relative',
        background === 'gradient' && 'cosmic-glow',
        background === 'grid' && 'grid-bg',
        background === 'cosmic' && 'cosmic-bg',
        className,
      )}
    >
      {children}
    </section>
  );
}

/* =========================================================================
   Container — standard centered width wrapper. Fluid --site-margin applies.
   ========================================================================= */
interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'narrow' | 'wide' | 'full';
}

export function Container({ children, className, size = 'wide' }: ContainerProps) {
  const sizeClass =
    size === 'narrow' ? 'container-narrow' :
    size === 'full'   ? 'w-full px-[var(--site-margin)]' :
    'container-wide';
  return <div className={cn(sizeClass, className)}>{children}</div>;
}

/* =========================================================================
   SectionHeader — eyebrow + h2 + optional description. Solid amber eyebrow
   (no gradient). Always reveal-animated via data-reveal.
   ========================================================================= */
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, align = 'center', className }: SectionHeaderProps) {
  return (
    <header
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center max-w-3xl mx-auto',
        className,
      )}
      data-reveal
    >
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2 className="t-h2 font-display text-[color:var(--ivory)]">{title}</h2>
      {description && (
        <p className="mt-4 t-lead text-[color:var(--ivory-dim)] leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}

/* =========================================================================
   FadeUp — reveal wrapper. Emits data-reveal so ScrollMotion picks it up and
   plays the y:30 -> 0, opacity:0 -> 1 handler. Optional `delay` prop (seconds)
   maps to an inline custom property; ScrollMotion reads it for per-element
   delay.
   ========================================================================= */
interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;     // seconds
  duration?: number;  // seconds — accepted for API parity; ScrollMotion uses a fixed 0.7s
}

export function FadeUp({ children, className, delay = 0 }: FadeUpProps) {
  return (
    <div
      className={className}
      data-reveal
      {...(delay > 0 ? { 'data-reveal-delay': String(delay) } : {})}
    >
      {children}
    </div>
  );
}

/* =========================================================================
   StaggerContainer / StaggerItem — group of children revealed in cascade.
   Tag children with data-stagger-item so ScrollMotion's stagger handler picks
   up the whole group when the parent enters the viewport.
   ========================================================================= */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number; // seconds between children; default 0.08
}

export function StaggerContainer({ children, className, staggerDelay = 0.08 }: StaggerContainerProps) {
  return (
    <div
      className={className}
      data-stagger-group
      data-stagger-delay={String(staggerDelay)}
    >
      {children}
    </div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <div className={className} data-stagger-item>
      {children}
    </div>
  );
}

/* =========================================================================
   GlassCard — now a flat card (hairline border, no backdrop-blur, no glass
   inner glow). `hover` prop toggles the amber-border hover behavior from
   `.card-flat`; defaults on.
   ========================================================================= */
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = memo(function GlassCard({ children, className, hover = true, ...rest }: GlassCardProps) {
  return (
    <div
      {...rest}
      className={cn(
        'relative',
        hover ? 'card-flat' : 'bg-[color:var(--surface)] border-hairline rounded-lg',
        className,
      )}
    >
      {children}
    </div>
  );
});

/* =========================================================================
   SignalPoint — amber pulse dot. Pure CSS animation (keyframe already lives
   globally via Tailwind's `animate-pulse`).
   ========================================================================= */
interface SignalPointProps {
  className?: string;
  pulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const SignalPoint = memo(function SignalPoint({ className, pulse = true, size = 'md' }: SignalPointProps) {
  const dim = size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3';
  return (
    <span
      className={cn(
        'inline-block rounded-full bg-[color:var(--accent-bright)]',
        pulse && 'animate-pulse',
        dim,
        className,
      )}
      aria-hidden="true"
    />
  );
});

/* =========================================================================
   MetricDisplay — big mono number with a caption label. Server-compatible.
   ========================================================================= */
interface MetricDisplayProps {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const MetricDisplay = memo(function MetricDisplay({ value, label, prefix, suffix, className }: MetricDisplayProps) {
  return (
    <div className={cn('text-center', className)} data-reveal>
      <div className="font-mono text-[32px] md:text-[40px] leading-none text-[color:var(--ivory)] tabular-nums">
        {prefix && <span className="text-[color:var(--accent)]">{prefix}</span>}
        {value}
        {suffix && <span className="text-[color:var(--ivory-dim)] text-[20px]">{suffix}</span>}
      </div>
      <p className="text-[color:var(--ivory-dim)] text-sm mt-2">{label}</p>
    </div>
  );
});

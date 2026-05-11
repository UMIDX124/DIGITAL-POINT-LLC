'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
  style?: React.CSSProperties;
};

function defaultFormat(n: number) {
  return Math.round(n).toLocaleString('en-US');
}

export function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1400,
  format = defaultFormat,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.textContent = `${prefix}${format(to)}${suffix}`;
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const obj = { v: 0 };
            animate(obj, {
              v: to,
              duration,
              ease: 'outQuart',
              onUpdate: () => {
                if (el) el.textContent = `${prefix}${format(obj.v)}${suffix}`;
              },
            });
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, format, prefix, suffix]);

  return (
    <span
      ref={ref}
      className={className}
      style={style}
      aria-label={`${prefix}${format(to)}${suffix}`}
    >
      {prefix}
      {format(0)}
      {suffix}
    </span>
  );
}

export default CountUp;

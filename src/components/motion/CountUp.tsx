'use client';

import { useEffect, useRef } from 'react';

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
  style?: React.CSSProperties;
  index?: number;
};

function defaultFormat(n: number) {
  return Math.round(n).toLocaleString('en-US');
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1400,
  format = defaultFormat,
  className,
  style,
  index = 0,
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

    let rafId = 0;
    let startTime = 0;
    let delayId = 0;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = to * eased;
      if (el) el.textContent = `${prefix}${format(current)}${suffix}`;
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const start = () => {
      const delay = index * 80;
      if (delay > 0) {
        delayId = window.setTimeout(() => {
          rafId = requestAnimationFrame(tick);
        }, delay);
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            start();
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.2 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (delayId) clearTimeout(delayId);
    };
  }, [to, duration, format, prefix, suffix, index]);

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

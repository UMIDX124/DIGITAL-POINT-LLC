'use client';

import { useEffect, useRef } from 'react';

/**
 * Phase 19 instrument-panel stat strip with cinematic count-up.
 * Three metrics, mono-tabular numerals, transparent over body atmosphere.
 * When the section enters the viewport (>=40% visible), GSAP animates
 * each numeric value from 0 to its target over 1.4s with snap-to-int and
 * tnum stability. prefers-reduced-motion: snap straight to final values.
 *
 * Bloomberg Operator restraint: deliberate emptiness around the strip is
 * the compositional signal. The count-up reads as instrument boot, not
 * SaaS animation theatre.
 */

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

const STATS: ReadonlyArray<Stat> = [
  { value: 14400, suffix: '+', label: 'operator-hours replaced' },
  { value: 89, prefix: '+', suffix: '%', label: 'qualified pipeline' },
  { value: 60, suffix: '%', label: 'manual oversight automated' },
];

function formatStatic(s: Stat): string {
  // Render the same shape the count-up will land on (e.g. "14.4K+", "+89%", "60%").
  const n = s.value;
  let core: string;
  if (n >= 10000) {
    core = `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  } else {
    core = s.decimals ? n.toFixed(s.decimals) : Math.round(n).toString();
  }
  return `${s.prefix ?? ''}${core}${s.suffix ?? ''}`;
}

export function StatStripSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const section = sectionRef.current;
    if (!section) return;

    const valueEls = Array.from(section.querySelectorAll<HTMLElement>('[data-stat-value]'));
    if (!valueEls.length) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const proxy = STATS.map(() => ({ v: 0 }));

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          STATS.forEach((s, i) => {
            gsap.to(proxy[i], {
              v: s.value,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate: () => {
                const el = valueEls[i];
                if (!el) return;
                const v = proxy[i].v;
                let core: string;
                if (s.value >= 10000) {
                  core = `${(v / 1000).toFixed(1).replace(/\.0$/, '')}K`;
                } else {
                  core = s.decimals ? v.toFixed(s.decimals) : Math.round(v).toString();
                }
                el.textContent = `${s.prefix ?? ''}${core}${s.suffix ?? ''}`;
              },
            });
          });
        },
      });

      cleanup = () => trigger.kill();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stat-strip"
      aria-label="Operator results"
      className="relative section-deferred section-defer-paint"
      style={{
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
      }}
    >
      <div className="container-wide" style={{ paddingInline: 'var(--container-gutter)' }}>
        <ul
          className="flex flex-col sm:flex-row flex-wrap items-start sm:items-baseline justify-center gap-x-10 gap-y-4 sm:gap-x-16"
          style={{ listStyle: 'none', margin: 0, padding: 0 }}
        >
          {STATS.map((s, i) => (
            <li
              key={s.label}
              className="flex items-baseline gap-3"
              aria-label={`${formatStatic(s)} ${s.label}`}
            >
              <span
                className="font-mono tabular-nums"
                data-stat-value
                style={{
                  fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)',
                  color: 'var(--accent-primary)',
                  letterSpacing: '-0.01em',
                  fontWeight: 500,
                  minWidth: '4.5ch',
                  display: 'inline-block',
                }}
              >
                {formatStatic(s)}
              </span>
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: 'var(--text-micro)',
                  letterSpacing: '0.18em',
                  color: 'var(--text-muted)',
                }}
              >
                {s.label}
              </span>
              {i < STATS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden sm:inline-block"
                  style={{ color: 'var(--text-tertiary)', opacity: 0.4 }}
                >
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

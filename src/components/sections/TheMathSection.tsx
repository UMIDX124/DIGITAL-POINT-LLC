'use client';

import { copy } from '@/lib/copy';
import { useCountUp } from '@/hooks/useCountUp';

export function TheMathSection() {
  const { eyebrow, headline, body, anchor, pullQuote, lineItems } = copy.math;
  const { value, ref } = useCountUp({ to: anchor.value, durationMs: 1200 });

  const total = lineItems.reduce((s, i) => s + i.usd, 0);

  return (
    <section
      className="relative section-padding"
      style={{ background: 'var(--bg-canvas)', borderBottom: '1px solid #27272A' }}
      id="math"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: narrative */}
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">{eyebrow}</p>
            <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.05] tracking-tight text-[color:var(--ivory)] max-w-[16ch]">
              {headline}
            </h2>
            <p className="mt-8 max-w-xl text-[16px] md:text-[17px] leading-[1.6] text-[color:var(--ivory-dim)]">
              {body}
            </p>

            <blockquote
              className="mt-10 pl-5 font-display italic text-[22px] md:text-[26px] leading-snug text-[color:var(--ivory)]"
              style={{ borderLeft: '2px solid var(--accent)' }}
            >
              &ldquo;{pullQuote}&rdquo;
            </blockquote>
          </div>

          {/* Right: anchor card */}
          <div className="lg:col-span-5">
            <div
              ref={ref as React.RefObject<HTMLDivElement>}
              className="card-flat p-8 md:p-10"
              style={{ background: '#141416' }}
            >
              <p className="eyebrow mb-4">In-house (annual)</p>
              <div className="font-mono text-[48px] md:text-[64px] lg:text-[72px] leading-none tracking-tight text-[color:var(--accent)]">
                ${value.toLocaleString('en-US')}
              </div>
              <p className="mt-3 text-[13px] text-[color:var(--muted)]">{anchor.label}</p>

              <div className="mt-8 pt-6 divide-hairline">
                {lineItems.map((item) => (
                  <div key={item.role} className="flex items-center justify-between py-3">
                    <span className="text-[14px] text-[color:var(--ivory-dim)]">{item.role}</span>
                    <span className="font-mono text-[14px] text-[color:var(--ivory)] tabular-nums">
                      ${item.usd.toLocaleString('en-US')}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-4 pb-1">
                  <span className="eyebrow">Total</span>
                  <span className="font-mono text-[16px] text-[color:var(--accent)] tabular-nums">
                    ${total.toLocaleString('en-US')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

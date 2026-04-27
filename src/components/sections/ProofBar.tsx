'use client';

import { memo } from 'react';
import { FadeUp } from '@/components/ui-dp/AnimatedElements';

const metrics = [
  { value: '8+', label: 'Years in Market' },
  { value: '$50M+', label: 'Ad Spend Managed' },
  { value: '200+', label: 'Audits Delivered' },
  { value: '4.2x', label: 'Avg Client ROAS' },
];

/** Memoized metric to avoid re-renders */
const Metric = memo(function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div
        className="font-display text-3xl md:text-4xl font-bold mb-1"
        style={{
          background: 'linear-gradient(90deg, #FFA833, #FF8800)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {value}
      </div>
      <div className="text-[color:var(--text-muted)] text-sm">{label}</div>
    </div>
  );
});

export function ProofBar() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(13,8,21,0) 0%, rgba(255, 136, 0,0.05) 50%, rgba(13,8,21,0) 100%)',
          borderTop: '1px solid rgba(255, 168, 51, 0.08)',
          borderBottom: '1px solid rgba(255, 168, 51, 0.08)',
        }}
      />

      <div className="container-wide relative z-10">
        {/* Single FadeUp for the whole group instead of per-metric motion */}
        <FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center">
            {metrics.map((metric) => (
              <Metric key={metric.label} value={metric.value} label={metric.label} />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

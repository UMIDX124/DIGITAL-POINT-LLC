type Value = {
  label: string;
  amount: number;
  accent?: boolean;
};

type Props = {
  values: Value[];
  format?: 'usd' | 'number' | 'pct';
  context?: 'light' | 'dark';
  className?: string;
};

function formatValue(n: number, format: 'usd' | 'number' | 'pct'): string {
  if (format === 'usd') {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}K`;
    return `$${n.toLocaleString('en-US')}`;
  }
  if (format === 'pct') return `${n}%`;
  return n.toLocaleString('en-US');
}

export function DataBar({ values, format = 'usd', context = 'light', className }: Props) {
  const max = Math.max(...values.map((v) => v.amount), 1);
  const trackColor = context === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(10,10,10,0.06)';
  const labelColor = context === 'dark' ? 'var(--color-text-dark-secondary)' : 'var(--color-text-secondary)';
  const numberColor = context === 'dark' ? 'var(--color-text-dark-primary)' : 'var(--color-text-primary)';

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {values.map((v) => {
        const widthPct = (v.amount / max) * 100;
        const barColor = v.accent ? 'var(--color-accent)' : context === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(10,10,10,0.18)';
        return (
          <div key={v.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ color: labelColor }}>{v.label}</span>
              <span style={{ color: numberColor, fontWeight: 600, fontSize: '1.125rem', textTransform: 'none', letterSpacing: 'normal' }}>
                {formatValue(v.amount, format)}
              </span>
            </div>
            <div
              role="presentation"
              style={{
                width: '100%',
                height: '6px',
                background: trackColor,
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${widthPct}%`,
                  height: '100%',
                  background: barColor,
                  transition: 'width 600ms cubic-bezier(0.2, 0, 0.2, 1)',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DataBar;

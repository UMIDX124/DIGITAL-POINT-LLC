import Link from 'next/link';
import { copy } from '@/lib/copy';

/**
 * Phase 4e Recent Work.
 *
 * Asymmetric 2-col: 1 featured left + 2 stacked right. Each card holds a
 * hand-coded SVG dashboard mockup. Cards carry a faded italic-serif metric
 * watermark in the bottom-right (reads as texture, not label) and a primary
 * metric block in the card body.
 *
 * Hover: border brightens, translateY(-2px), soft purple glow.
 */

export function RecentWorkSection() {
  const { eyebrow, headline, body, cases } = copy.recentWork;
  const [featured, second, third] = cases;

  return (
    <section
      id="recent-work"
      className="relative"
      style={{
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
      }}
    >
      <div className="container-wide">
        <header className="max-w-2xl mb-[var(--section-space-tight)]">
          <p
            className="font-mono uppercase mb-5"
            data-reveal
            style={{
              fontSize: 'var(--text-micro)',
              letterSpacing: '0.12em',
              color: 'var(--text-tertiary)',
            }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-hero"
            data-reveal
            style={{
              fontSize: 'var(--text-h2)',
              color: 'var(--text-primary)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            {headline}
          </h2>
          <p
            className="mt-6 font-body max-w-xl"
            data-reveal
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
            }}
          >
            {body}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 recent-work-grid" data-work-grid>
          <div className="lg:col-span-7">
            <WorkCard case_={featured} size="featured" />
          </div>
          <div className="lg:col-span-5 grid grid-cols-1 gap-5">
            <WorkCard case_={second} size="standard" />
            <WorkCard case_={third} size="standard" />
          </div>
        </div>
      </div>
    </section>
  );
}

type CaseItem = typeof copy.recentWork.cases[number];

function WorkCard({ case_, size }: { case_: CaseItem; size: 'featured' | 'standard' }) {
  const isFeatured = size === 'featured';
  return (
    <Link
      href={case_.href}
      className="recent-work-card group relative flex flex-col overflow-hidden h-full focus-ring"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '2px',
        padding: isFeatured ? '2rem' : '1.75rem',
        minHeight: isFeatured ? '28rem' : '22rem',
      }}
      data-work-card
    >
      {/* Huge faded serif metric watermark — bottom-right texture. */}
      <span
        className="font-italic-display pointer-events-none select-none"
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: isFeatured ? '-0.5rem' : '-0.25rem',
          bottom: isFeatured ? '-2.25rem' : '-1.75rem',
          fontSize: isFeatured ? 'clamp(9rem, 20vw, 16rem)' : 'clamp(6rem, 14vw, 11rem)',
          color: 'var(--accent)',
          opacity: 0.1,
          lineHeight: 0.9,
          letterSpacing: '-0.04em',
        }}
      >
        {case_.metric}
      </span>

      {/* SVG viz */}
      <div
        className={isFeatured ? 'aspect-[16/10] w-full mb-6' : 'aspect-[16/9] w-full mb-5'}
        aria-hidden="true"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <DashboardViz variant={case_.viz} />
      </div>

      <p
        className="font-mono uppercase mb-3"
        style={{
          fontSize: 'var(--text-micro)',
          letterSpacing: '0.14em',
          color: 'var(--text-tertiary)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {case_.industry}
      </p>

      <h3
        className="font-hero"
        style={{
          fontSize: isFeatured ? 'var(--text-h3)' : 'var(--text-h4)',
          color: 'var(--text-primary)',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {case_.title}
      </h3>

      <p
        className="mt-3 font-body"
        style={{
          fontSize: '0.9375rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.55,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {case_.context}
      </p>

      <div
        className="mt-auto pt-6 flex items-baseline gap-3"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <span
          className="font-italic-display tabular-nums"
          style={{
            fontSize: isFeatured ? 'clamp(2.5rem, 5vw, 3.5rem)' : 'clamp(2rem, 4vw, 2.75rem)',
            color: 'var(--accent-bright)',
            lineHeight: 0.9,
          }}
        >
          {case_.metric}
        </span>
        <span
          className="font-mono uppercase"
          style={{
            fontSize: 'var(--text-micro)',
            letterSpacing: '0.12em',
            color: 'var(--text-tertiary)',
          }}
        >
          {case_.metricLabel}
        </span>
      </div>
    </Link>
  );
}

function DashboardViz({ variant }: { variant: CaseItem['viz'] }) {
  if (variant === 'line-ascending') return <LineAscendingViz />;
  if (variant === 'funnel-stages') return <FunnelStagesViz />;
  return <BarBeforeAfterViz />;
}

function LineAscendingViz() {
  return (
    <svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid meet" className="w-full h-full" role="img" aria-hidden="true">
      <rect x="0.5" y="0.5" width="479" height="299" fill="transparent" stroke="var(--border-subtle)" strokeWidth="1" rx="2" />
      {[60, 120, 180, 240].map((y) => (
        <line key={y} x1="40" y1={y} x2="460" y2={y} stroke="var(--border-subtle)" strokeWidth="0.5" />
      ))}
      {[
        { y: 62, v: '7.0x' }, { y: 122, v: '5.0x' }, { y: 182, v: '3.0x' }, { y: 242, v: '1.0x' },
      ].map((t) => (
        <text key={t.v} x="12" y={t.y} fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-tertiary)">{t.v}</text>
      ))}
      <line x1="40" y1="250" x2="460" y2="250" stroke="var(--border-subtle)" strokeWidth="1" />
      <path d="M 50 230 L 100 215 L 150 210 L 200 188 L 250 156 L 300 130 L 350 96 L 400 72 L 450 56"
        stroke="var(--accent)" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 50 230 L 100 215 L 150 210 L 200 188 L 250 156 L 300 130 L 350 96 L 400 72 L 450 56 L 450 250 L 50 250 Z"
        fill="var(--accent)" opacity="0.08" />
      <circle cx="450" cy="56" r="3.5" fill="var(--accent-bright)" />
      <circle cx="450" cy="56" r="7" fill="var(--accent-bright)" opacity="0.18" />
      <text x="40" y="32" fontSize="11" fontFamily="var(--font-mono)" fill="var(--text-tertiary)" letterSpacing="1.5">
        BLENDED ROAS · 14 MARKETS · 180D
      </text>
    </svg>
  );
}

function FunnelStagesViz() {
  return (
    <svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid meet" className="w-full h-full" role="img" aria-hidden="true">
      <rect x="0.5" y="0.5" width="479" height="299" fill="transparent" stroke="var(--border-subtle)" strokeWidth="1" rx="2" />
      <text x="20" y="32" fontSize="11" fontFamily="var(--font-mono)" fill="var(--text-tertiary)" letterSpacing="1.5">
        PIPELINE · BEFORE -&gt; AFTER
      </text>
      {[
        { y: 70,  label: 'RAW LEADS',  beforeW: 320, afterW: 360 },
        { y: 120, label: 'QUALIFIED',  beforeW: 140, afterW: 265 },
        { y: 170, label: 'SCORED A/B', beforeW: 92,  afterW: 205 },
        { y: 220, label: 'ROUTED',     beforeW: 74,  afterW: 174 },
      ].map((row) => (
        <g key={row.label}>
          <text x="20" y={row.y - 6} fontSize="9" fontFamily="var(--font-mono)" fill="var(--text-secondary)" letterSpacing="1.2">
            {row.label}
          </text>
          <rect x="20" y={row.y} width={row.beforeW} height="10" fill="var(--text-secondary)" opacity="0.22" />
          <rect x="20" y={row.y + 14} width={row.afterW} height="10" fill="var(--accent)" />
        </g>
      ))}
      <g transform="translate(388, 132)">
        <rect width="72" height="44" fill="transparent" stroke="var(--accent)" strokeWidth="1" rx="2" />
        <text x="36" y="20" fontSize="11" fontFamily="var(--font-mono)" fill="var(--text-tertiary)" textAnchor="middle" letterSpacing="1.5">DELTA</text>
        <text x="36" y="36" fontSize="15" fontFamily="var(--font-mono)" fill="var(--accent-bright)" textAnchor="middle">+89%</text>
      </g>
    </svg>
  );
}

function BarBeforeAfterViz() {
  return (
    <svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid meet" className="w-full h-full" role="img" aria-hidden="true">
      <rect x="0.5" y="0.5" width="479" height="299" fill="transparent" stroke="var(--border-subtle)" strokeWidth="1" rx="2" />
      <text x="20" y="32" fontSize="11" fontFamily="var(--font-mono)" fill="var(--text-tertiary)" letterSpacing="1.5">
        CPL · BEFORE vs AFTER
      </text>
      <g>
        <rect x="80" y="90" width="90" height="150" fill="var(--text-secondary)" opacity="0.22" />
        <text x="125" y="78" fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-tertiary)" textAnchor="middle" letterSpacing="1.2">BEFORE</text>
        <text x="125" y="262" fontSize="20" fontFamily="var(--font-mono)" fill="var(--text-secondary)" textAnchor="middle">$84</text>
      </g>
      <g transform="translate(195, 160)">
        <line x1="0" y1="0" x2="70" y2="0" stroke="var(--accent)" strokeWidth="1.25" />
        <polyline points="62,-6 70,0 62,6" stroke="var(--accent)" strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="35" y="-12" fontSize="10" fontFamily="var(--font-mono)" fill="var(--accent-bright)" textAnchor="middle" letterSpacing="1.5">-5.3x</text>
      </g>
      <g>
        <rect x="290" y="210" width="90" height="30" fill="var(--accent)" />
        <text x="335" y="78" fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-tertiary)" textAnchor="middle" letterSpacing="1.2">AFTER</text>
        <text x="335" y="262" fontSize="20" fontFamily="var(--font-mono)" fill="var(--accent-bright)" textAnchor="middle">$16</text>
      </g>
    </svg>
  );
}

import Link from 'next/link';
import { copy } from '@/lib/copy';

/**
 * Phase 2: Recent Work grid. Three anonymized cases. Each card holds a
 * hand-coded SVG dashboard mockup — no rasters, no fake screenshots.
 * Asymmetric 2-col layout: featured left + two stacked right. Breaks the
 * AI-standard 3-equal-card row while keeping editorial rhythm.
 */
export function RecentWorkSection() {
  const { eyebrow, headline, body, cases } = copy.recentWork;
  const [featured, second, third] = cases;

  return (
    <section
      className="relative section-main"
      style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
      id="work"
    >
      <div className="container-wide">
        <header className="max-w-2xl mb-[var(--space-8)]">
          <p className="eyebrow mb-5" data-reveal>{eyebrow}</p>
          <h2 className="t-h2 font-display text-[color:var(--ivory)]" data-reveal>
            {headline}
          </h2>
          <p className="mt-5 t-main text-[color:var(--ivory-dim)] max-w-xl" data-reveal>
            {body}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5" data-work-grid>
          {/* Featured — spans 7 cols on desktop */}
          <div className="lg:col-span-7">
            <WorkCard case_={featured} size="featured" />
          </div>
          {/* Two stacked — 5 cols on desktop */}
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
      className="group relative flex flex-col card-flat p-[var(--space-5)] md:p-[var(--space-6)] h-full focus-ring hover:-translate-y-1 transition-transform duration-[550ms]"
      style={{ transitionTimingFunction: 'var(--ease-brand)' }}
      data-work-card
    >
      {/* SVG dashboard viz */}
      <div
        className={isFeatured ? 'aspect-[16/10] w-full mb-[var(--space-5)]' : 'aspect-[16/9] w-full mb-[var(--space-4)]'}
        aria-hidden="true"
      >
        <DashboardViz variant={case_.viz} />
      </div>

      <p className="eyebrow mb-3">{case_.industry}</p>

      <h3
        className={
          (isFeatured ? 't-h3' : 't-h4') +
          ' font-display text-[color:var(--ivory)] leading-tight'
        }
      >
        {case_.title}
      </h3>

      <p className="mt-3 t-caption text-[color:var(--ivory-dim)] leading-relaxed">
        {case_.context}
      </p>

      <div className="mt-auto pt-[var(--space-5)] flex items-baseline gap-3">
        <span
          className={
            (isFeatured ? 'text-[44px] md:text-[56px]' : 'text-[32px] md:text-[40px]') +
            ' font-mono text-[color:var(--amber)] tabular-nums leading-none'
          }
        >
          {case_.metric}
        </span>
        <span className="eyebrow">{case_.metricLabel}</span>
      </div>
    </Link>
  );
}

/**
 * Hand-coded dashboard mockups. Three variants, all pure SVG, all amber +
 * ivory. They read as abstract data panels, not screenshots of real tools.
 */
function DashboardViz({ variant }: { variant: CaseItem['viz'] }) {
  if (variant === 'line-ascending') return <LineAscendingViz />;
  if (variant === 'funnel-stages') return <FunnelStagesViz />;
  return <BarBeforeAfterViz />;
}

function LineAscendingViz() {
  return (
    <svg
      viewBox="0 0 480 300"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      role="img"
      aria-hidden="true"
    >
      {/* panel */}
      <rect x="0.5" y="0.5" width="479" height="299" fill="transparent" stroke="var(--border)" strokeWidth="1" rx="6" />
      {/* grid lines */}
      {[60, 120, 180, 240].map((y) => (
        <line key={y} x1="40" y1={y} x2="460" y2={y} stroke="var(--border)" strokeWidth="0.5" />
      ))}
      {/* y-axis tick labels */}
      {[
        { y: 62, v: '7.0x' },
        { y: 122, v: '5.0x' },
        { y: 182, v: '3.0x' },
        { y: 242, v: '1.0x' },
      ].map((t) => (
        <text key={t.v} x="12" y={t.y} fontSize="10" fontFamily="var(--font-jetbrains-mono)" fill="var(--muted)">
          {t.v}
        </text>
      ))}
      {/* x-axis */}
      <line x1="40" y1="250" x2="460" y2="250" stroke="var(--border)" strokeWidth="1" />
      {/* ascending line path */}
      <path
        d="M 50 230 L 100 215 L 150 210 L 200 188 L 250 156 L 300 130 L 350 96 L 400 72 L 450 56"
        stroke="var(--amber)"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* area fill */}
      <path
        d="M 50 230 L 100 215 L 150 210 L 200 188 L 250 156 L 300 130 L 350 96 L 400 72 L 450 56 L 450 250 L 50 250 Z"
        fill="var(--amber)"
        opacity="0.08"
      />
      {/* terminal point */}
      <circle cx="450" cy="56" r="3.5" fill="var(--amber-bright)" />
      <circle cx="450" cy="56" r="7" fill="var(--amber-bright)" opacity="0.15" />
      {/* label */}
      <text x="40" y="32" fontSize="11" fontFamily="var(--font-jetbrains-mono)" fill="var(--muted)" letterSpacing="1.5">
        BLENDED ROAS · 14 MARKETS · 180D
      </text>
    </svg>
  );
}

function FunnelStagesViz() {
  return (
    <svg
      viewBox="0 0 480 300"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      role="img"
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="479" height="299" fill="transparent" stroke="var(--border)" strokeWidth="1" rx="6" />
      <text x="20" y="32" fontSize="11" fontFamily="var(--font-jetbrains-mono)" fill="var(--muted)" letterSpacing="1.5">
        PIPELINE · BEFORE -&gt; AFTER
      </text>
      {/* Funnel bars — stacked horizontal */}
      {[
        { y: 70, label: 'RAW LEADS', beforeW: 320, afterW: 360 },
        { y: 120, label: 'QUALIFIED', beforeW: 140, afterW: 265 },
        { y: 170, label: 'SCORED A/B', beforeW: 92, afterW: 205 },
        { y: 220, label: 'ROUTED', beforeW: 74, afterW: 174 },
      ].map((row) => (
        <g key={row.label}>
          <text x="20" y={row.y - 6} fontSize="9" fontFamily="var(--font-jetbrains-mono)" fill="var(--ivory-dim)" letterSpacing="1.2">
            {row.label}
          </text>
          {/* before — ivory dim */}
          <rect x="20" y={row.y} width={row.beforeW} height="10" fill="var(--ivory-dim)" opacity="0.25" />
          {/* after — amber */}
          <rect x="20" y={row.y + 14} width={row.afterW} height="10" fill="var(--amber)" />
        </g>
      ))}
      {/* delta label */}
      <g transform="translate(388, 132)">
        <rect width="72" height="44" fill="transparent" stroke="var(--amber)" strokeWidth="1" rx="4" />
        <text x="36" y="20" fontSize="11" fontFamily="var(--font-jetbrains-mono)" fill="var(--muted)" textAnchor="middle" letterSpacing="1.5">
          DELTA
        </text>
        <text x="36" y="36" fontSize="15" fontFamily="var(--font-jetbrains-mono)" fill="var(--amber-bright)" textAnchor="middle">
          +89%
        </text>
      </g>
    </svg>
  );
}

function BarBeforeAfterViz() {
  return (
    <svg
      viewBox="0 0 480 300"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      role="img"
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="479" height="299" fill="transparent" stroke="var(--border)" strokeWidth="1" rx="6" />
      <text x="20" y="32" fontSize="11" fontFamily="var(--font-jetbrains-mono)" fill="var(--muted)" letterSpacing="1.5">
        CPL · BEFORE vs AFTER
      </text>
      {/* Before bar */}
      <g>
        <rect x="80" y="90" width="90" height="150" fill="var(--ivory-dim)" opacity="0.22" />
        <text x="125" y="78" fontSize="10" fontFamily="var(--font-jetbrains-mono)" fill="var(--muted)" textAnchor="middle" letterSpacing="1.2">
          BEFORE
        </text>
        <text x="125" y="262" fontSize="20" fontFamily="var(--font-jetbrains-mono)" fill="var(--ivory-dim)" textAnchor="middle">
          $84
        </text>
      </g>
      {/* Arrow */}
      <g transform="translate(195, 160)">
        <line x1="0" y1="0" x2="70" y2="0" stroke="var(--amber)" strokeWidth="1.25" />
        <polyline points="62,-6 70,0 62,6" stroke="var(--amber)" strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="35" y="-12" fontSize="10" fontFamily="var(--font-jetbrains-mono)" fill="var(--amber-bright)" textAnchor="middle" letterSpacing="1.5">
          -5.3x
        </text>
      </g>
      {/* After bar */}
      <g>
        <rect x="290" y="210" width="90" height="30" fill="var(--amber)" />
        <text x="335" y="78" fontSize="10" fontFamily="var(--font-jetbrains-mono)" fill="var(--muted)" textAnchor="middle" letterSpacing="1.2">
          AFTER
        </text>
        <text x="335" y="262" fontSize="20" fontFamily="var(--font-jetbrains-mono)" fill="var(--amber-bright)" textAnchor="middle">
          $16
        </text>
      </g>
    </svg>
  );
}

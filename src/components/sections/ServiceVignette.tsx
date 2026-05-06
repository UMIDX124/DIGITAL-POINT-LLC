/**
 * ServiceVignette — Phase 20.1.5 right-side mood graphic per pin frame.
 *
 * One inline SVG per service slide. Instrument-grade hairline strokes,
 * amber primary + jade/copper secondaries, never decorative. Pure
 * Server Component.
 *
 * Slide map (matches copy.servicesList order):
 *   0 AI Agents              → operator aperture + agent grid
 *   1 Workflow Automation    → 4-step pipeline with active edge pulse
 *   2 Remote Operators       → distributed nodes around supervisor cell
 *   3 Performance Marketing  → 5-stage funnel with conversion ticks
 *   4 Systems & Reporting    → dashboard tile cluster with sparkline
 */

import type * as React from 'react';

type Kind = 'agents' | 'workflow' | 'operators' | 'marketing' | 'reporting';

const AMBER = 'rgba(255, 168, 51, 0.92)';
const AMBER_DIM = 'rgba(255, 168, 51, 0.50)';
const AMBER_FILL = 'rgba(255, 168, 51, 0.16)';
const JADE = 'rgba(44, 95, 90, 0.85)';
const COPPER = 'rgba(194, 111, 60, 0.75)';
const HAIRLINE = 'rgba(255, 255, 255, 0.10)';
const HAIRLINE_LO = 'rgba(255, 255, 255, 0.06)';
const TEXT = 'rgba(245, 232, 212, 0.75)';
const TEXT_DIM = 'rgba(245, 232, 212, 0.42)';
const MONO = 'var(--font-geist-mono), monospace';

function VAgents() {
  return (
    <svg className="service-vignette" viewBox="0 0 400 280" role="img" aria-label="Agent grid with operator aperture">
      <defs>
        <linearGradient id="vagents-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={AMBER} stopOpacity="0.25" />
          <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* outer aperture brackets */}
      <g stroke={TEXT} strokeWidth="1.25" fill="none">
        <path d="M 30 30 L 18 30 L 18 42" />
        <path d="M 370 30 L 382 30 L 382 42" />
        <path d="M 30 250 L 18 250 L 18 238" />
        <path d="M 370 250 L 382 250 L 382 238" />
      </g>

      {/* agent grid 4x3 */}
      {Array.from({ length: 12 }).map((_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 60 + col * 80;
        const y = 70 + row * 60;
        const active = i === 5;
        return (
          <g key={i}>
            <rect
              x={x - 22}
              y={y - 16}
              width="44"
              height="32"
              fill={active ? AMBER_FILL : 'transparent'}
              stroke={active ? AMBER : HAIRLINE}
              strokeWidth="1"
            />
            <circle cx={x} cy={y} r="4" fill={active ? AMBER : AMBER_DIM} />
            <text x={x} y={y + 28} fontSize="7" letterSpacing="1.2" fill={TEXT_DIM} textAnchor="middle" fontFamily={MONO}>
              AGT-{String(i + 1).padStart(2, '0')}
            </text>
          </g>
        );
      })}

      {/* status strip */}
      <line x1="30" x2="370" y1="262" y2="262" stroke={HAIRLINE} strokeWidth="1" />
      <text x="30" y="276" fontSize="9" letterSpacing="2.4" fill={TEXT_DIM} fontFamily={MONO}>FLEET · 12 ACTIVE</text>
      <text x="370" y="276" fontSize="9" letterSpacing="2.4" fill={AMBER} textAnchor="end" fontFamily={MONO}>UPTIME 99.4</text>
    </svg>
  );
}

function VWorkflow() {
  const stops = [
    { x: 60, label: 'TRIGGER' },
    { x: 145, label: 'ENRICH' },
    { x: 230, label: 'ROUTE' },
    { x: 315, label: 'AUDIT' },
  ];
  return (
    <svg className="service-vignette" viewBox="0 0 400 280" role="img" aria-label="Multi-step automation pipeline">
      {/* trace lane */}
      <rect x="40" y="120" width="320" height="40" fill="none" stroke={HAIRLINE} strokeWidth="1" />
      <line x1="40" y1="140" x2="360" y2="140" stroke={AMBER_DIM} strokeWidth="1" strokeDasharray="3 4" />

      {/* connectors */}
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={stops[i].x + 16}
          x2={stops[i + 1].x - 16}
          y1={140}
          y2={140}
          stroke={i === 1 ? AMBER : AMBER_DIM}
          strokeWidth={i === 1 ? 2 : 1.25}
        />
      ))}

      {/* nodes */}
      {stops.map((s, i) => (
        <g key={s.label}>
          <rect
            x={s.x - 18}
            y="124"
            width="36"
            height="32"
            fill="rgba(10, 9, 8, 0.85)"
            stroke={i === 1 || i === 2 ? AMBER : AMBER_DIM}
            strokeWidth={i === 1 || i === 2 ? 1.5 : 1}
          />
          <circle cx={s.x} cy="140" r="3.5" fill={AMBER} />
          <text x={s.x} y="172" fontSize="8.5" letterSpacing="1.6" fill={TEXT} textAnchor="middle" fontFamily={MONO}>{s.label}</text>
          <text x={s.x} y="110" fontSize="8" letterSpacing="1.6" fill={TEXT_DIM} textAnchor="middle" fontFamily={MONO}>STEP {String(i + 1).padStart(2, '0')}</text>
        </g>
      ))}

      {/* trail meta */}
      <text x="40" y="60" fontSize="9.5" letterSpacing="2.4" fill={TEXT_DIM} fontFamily={MONO}>RUN · 1,287 / 24H</text>
      <text x="360" y="60" fontSize="9.5" letterSpacing="2.4" fill={AMBER} textAnchor="end" fontFamily={MONO}>FAILURE 0.4%</text>
      <line x1="40" x2="360" y1="72" y2="72" stroke={HAIRLINE_LO} strokeWidth="1" />

      {/* status strip */}
      <line x1="40" x2="360" y1="220" y2="220" stroke={HAIRLINE} strokeWidth="1" />
      <text x="40" y="240" fontSize="9" letterSpacing="2.4" fill={TEXT_DIM} fontFamily={MONO}>OPERATOR REVIEW · 4 STEPS</text>
      <text x="360" y="240" fontSize="9" letterSpacing="2.4" fill={JADE} textAnchor="end" fontFamily={MONO}>HEALTH OK</text>
    </svg>
  );
}

function VOperators() {
  const ring = [
    { angle: -90 },
    { angle: -30 },
    { angle: 30 },
    { angle: 90 },
    { angle: 150 },
    { angle: 210 },
  ];
  const cx = 200;
  const cy = 140;
  const r = 80;
  return (
    <svg className="service-vignette" viewBox="0 0 400 280" role="img" aria-label="Distributed operators around supervisor cell">
      {/* supervisor cell */}
      <circle cx={cx} cy={cy} r="22" fill="rgba(10, 9, 8, 0.92)" stroke={AMBER} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="6" fill={AMBER} />
      <text x={cx} y={cy + 3} fontSize="9" letterSpacing="1.8" fill={TEXT} textAnchor="middle" fontFamily={MONO}>SUP</text>

      {/* orbit ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={HAIRLINE} strokeWidth="1" strokeDasharray="2 5" />

      {/* operators */}
      {ring.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * r;
        const y = cy + Math.sin(rad) * r;
        const active = i === 1;
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={active ? AMBER : HAIRLINE} strokeWidth={active ? 1.25 : 1} />
            <circle cx={x} cy={y} r={active ? 7 : 5} fill={active ? AMBER : 'rgba(10, 9, 8, 0.92)'} stroke={active ? AMBER : AMBER_DIM} strokeWidth="1" />
            <text x={x + 12} y={y + 4} fontSize="8" letterSpacing="1.4" fill={active ? AMBER : TEXT_DIM} fontFamily={MONO}>OP-{String(i + 1).padStart(2, '0')}</text>
          </g>
        );
      })}

      {/* status strip */}
      <line x1="30" x2="370" y1="240" y2="240" stroke={HAIRLINE} strokeWidth="1" />
      <text x="30" y="258" fontSize="9" letterSpacing="2.4" fill={TEXT_DIM} fontFamily={MONO}>OPERATORS · 6 ON-CALL</text>
      <text x="370" y="258" fontSize="9" letterSpacing="2.4" fill={AMBER} textAnchor="end" fontFamily={MONO}>ESCALATION 1</text>
    </svg>
  );
}

function VMarketing() {
  const stages = [
    { x: 60, w: 280, label: 'IMPRESSION' },
    { x: 100, w: 200, label: 'CLICK' },
    { x: 130, w: 140, label: 'LEAD' },
    { x: 160, w: 80, label: 'SQL' },
    { x: 180, w: 40, label: 'BOOKED' },
  ];
  return (
    <svg className="service-vignette" viewBox="0 0 400 280" role="img" aria-label="Five-stage performance marketing funnel">
      {stages.map((s, i) => {
        const y = 36 + i * 38;
        const opacity = 0.18 + i * 0.14;
        return (
          <g key={s.label}>
            <rect x={s.x} y={y} width={s.w} height="22" fill={`rgba(255, 168, 51, ${opacity.toFixed(2)})`} stroke={i === 4 ? AMBER : AMBER_DIM} strokeWidth={i === 4 ? 1.5 : 1} />
            <text x={s.x - 8} y={y + 14} fontSize="9" letterSpacing="1.6" fill={TEXT} textAnchor="end" fontFamily={MONO}>{s.label}</text>
            <text x={s.x + s.w + 8} y={y + 14} fontSize="9" letterSpacing="1.4" fill={i === 4 ? AMBER : TEXT_DIM} fontFamily={MONO}>
              {[ '12.4M', '184K', '8,420', '1,260', '347' ][i]}
            </text>
          </g>
        );
      })}

      {/* status strip */}
      <line x1="40" x2="360" y1="240" y2="240" stroke={HAIRLINE} strokeWidth="1" />
      <text x="40" y="258" fontSize="9" letterSpacing="2.4" fill={TEXT_DIM} fontFamily={MONO}>BLENDED CAC · $182</text>
      <text x="360" y="258" fontSize="9" letterSpacing="2.4" fill={AMBER} textAnchor="end" fontFamily={MONO}>OPERATOR-AUDITED</text>
    </svg>
  );
}

function VReporting() {
  return (
    <svg className="service-vignette" viewBox="0 0 400 280" role="img" aria-label="Reporting dashboard tiles with sparkline">
      {/* tile 1 — large sparkline */}
      <rect x="30" y="36" width="220" height="120" fill="rgba(10, 9, 8, 0.80)" stroke={HAIRLINE} strokeWidth="1" />
      <text x="42" y="56" fontSize="9" letterSpacing="2.4" fill={TEXT_DIM} fontFamily={MONO}>WEEKLY · OUTCOMES</text>
      <text x="42" y="84" fontSize="22" fill={AMBER} fontFamily={MONO} letterSpacing="0.5">+47.2%</text>
      <text x="42" y="100" fontSize="8.5" letterSpacing="1.4" fill={TEXT_DIM} fontFamily={MONO}>VS 30D ROLLING</text>

      {/* sparkline */}
      <polyline
        points="42,140 70,132 92,138 118,124 142,128 168,116 198,112 226,98"
        stroke={AMBER}
        strokeWidth="1.5"
        fill="none"
      />
      {[42, 70, 92, 118, 142, 168, 198, 226].map((x, i) => (
        <circle key={x} cx={x} cy={[140, 132, 138, 124, 128, 116, 112, 98][i]} r="1.5" fill={AMBER} />
      ))}

      {/* tile 2 — KPI */}
      <rect x="262" y="36" width="108" height="56" fill="rgba(10, 9, 8, 0.80)" stroke={HAIRLINE} strokeWidth="1" />
      <text x="272" y="54" fontSize="8" letterSpacing="2.0" fill={TEXT_DIM} fontFamily={MONO}>LIVE</text>
      <text x="272" y="80" fontSize="18" fill={TEXT} fontFamily={MONO}>1,287</text>

      {/* tile 3 — KPI */}
      <rect x="262" y="100" width="108" height="56" fill="rgba(10, 9, 8, 0.80)" stroke={HAIRLINE} strokeWidth="1" />
      <text x="272" y="118" fontSize="8" letterSpacing="2.0" fill={TEXT_DIM} fontFamily={MONO}>QUEUE</text>
      <text x="272" y="144" fontSize="18" fill={JADE} fontFamily={MONO}>12</text>

      {/* log strip */}
      <rect x="30" y="170" width="340" height="60" fill="rgba(10, 9, 8, 0.80)" stroke={HAIRLINE} strokeWidth="1" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <text x="42" y={188 + i * 16} fontSize="8.5" letterSpacing="1.4" fill={TEXT_DIM} fontFamily={MONO}>
            {[ '04:18:02', '04:17:44', '04:17:03' ][i]}
          </text>
          <text x="120" y={188 + i * 16} fontSize="8.5" letterSpacing="1.2" fill={TEXT} fontFamily={MONO}>
            {[ 'audit · weekly_roll closed', 'agent · sql_assigned 14', 'route · pod_alpha matched' ][i]}
          </text>
        </g>
      ))}

      {/* status strip */}
      <line x1="30" x2="370" y1="248" y2="248" stroke={HAIRLINE} strokeWidth="1" />
      <text x="30" y="264" fontSize="9" letterSpacing="2.4" fill={TEXT_DIM} fontFamily={MONO}>SOURCE-OF-TRUTH</text>
      <text x="370" y="264" fontSize="9" letterSpacing="2.4" fill={COPPER} textAnchor="end" fontFamily={MONO}>HUMAN-REVIEWED</text>
    </svg>
  );
}

const MAP: Record<Kind, () => React.ReactElement> = {
  agents: VAgents,
  workflow: VWorkflow,
  operators: VOperators,
  marketing: VMarketing,
  reporting: VReporting,
};

export function ServiceVignette({ kind }: { kind: Kind }) {
  const C = MAP[kind];
  return <C />;
}

export default ServiceVignette;

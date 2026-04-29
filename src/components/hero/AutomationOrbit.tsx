/**
 * Phase 16 B — Cosmo orbital system, Palette D geometry.
 *
 * SVG viewBox 400×300, center at (200, 150).
 * Outer orbit ellipse: rx=138 ry=98, dashed --ring-stroke 0.5px @ 0.7 opacity
 * Inner orbit ellipse: rx=62  ry=42, dashed --ring-stroke 0.5px @ 0.5 opacity
 * Center anchor:       circle r=30, fill --bg-canvas, stroke --accent-primary 1.2px
 *                      label COSMO in monospace 10px letter-spacing 1
 * 4 cardinal nodes, r=18, fill --bg-canvas:
 *   01 Lead Trigger   — top    — stroke --accent-primary
 *   02 AI Score       — right  — stroke --accent-secondary  (semantic AI step)
 *   03 Operator Route — bottom — stroke --accent-primary
 *   04 CRM Updated    — left   — stroke --accent-primary
 * Connection lines: linearGradient strokes from center → each node, bright
 *   at center fading to 0.05 at node. 1.4px stroke-width.
 * Sequence numbers (01–04) in monospace 11px letter-spacing 1.5 above nodes.
 *
 * Animation: rotate 90s linear infinite (single GPU transform).
 * Counter-rotate labels (rotate -360deg over same 90s) so text stays upright.
 * prefers-reduced-motion: rotation off.
 * < 768px: hidden.
 */

const CX = 200;
const CY = 150;

// Cardinal positions (top, right, bottom, left) on outer ellipse rx=138 ry=98.
// Phase 17b 3-restructured G1 — `tip` field provides hover/focus tooltip
// content via native SVG <title>. Browser-native hover surfaces the
// description; <title> is also read by screen readers via accessible name
// recompute, so this serves both UX-affordance and a11y.
const NODES = [
  {
    id: 'trigger',
    num: '01',
    label: 'Lead Trigger',
    tip: 'Inbound lead detected',
    x: CX,
    y: CY - 98,
    stroke: 'var(--accent-primary)',
  },
  {
    id: 'ai',
    num: '02',
    label: 'AI Score',
    tip: 'Qualification + intent scoring',
    x: CX + 138,
    y: CY,
    stroke: 'var(--accent-secondary)',
  },
  {
    id: 'operator',
    num: '03',
    label: 'Operator Route',
    tip: 'Human assignment if escalation needed',
    x: CX,
    y: CY + 98,
    stroke: 'var(--accent-primary)',
  },
  {
    id: 'crm',
    num: '04',
    label: 'CRM Updated',
    tip: 'State synced, follow-up scheduled',
    x: CX - 138,
    y: CY,
    stroke: 'var(--accent-primary)',
  },
] as const;

// Label-position offsets (relative to node center) — readable spacing.
const LABEL_OFFSETS: Record<string, { dx: number; dy: number; anchor: 'middle' | 'start' | 'end' }> = {
  trigger:  { dx: 0,  dy: -32, anchor: 'middle' },
  ai:       { dx: 32, dy: 4,   anchor: 'start' },
  operator: { dx: 0,  dy: 38,  anchor: 'middle' },
  crm:      { dx: -32, dy: 4,  anchor: 'end' },
};

const NUM_OFFSETS: Record<string, { dx: number; dy: number; anchor: 'middle' | 'start' | 'end' }> = {
  trigger:  { dx: 0,  dy: -16, anchor: 'middle' },
  ai:       { dx: 32, dy: -10, anchor: 'start' },
  operator: { dx: 0,  dy: 22,  anchor: 'middle' },
  crm:      { dx: -32, dy: -10, anchor: 'end' },
};

export function AutomationOrbit() {
  return (
    <div
      className="automation-orbit"
      role="img"
      aria-label="Digital Point operating loop. Cosmo coordinates four nodes: Lead Trigger feeds AI Score, which routes to Operator, which updates CRM as state of truth."
    >
      <svg
        className="automation-orbit-svg"
        viewBox="0 0 400 300"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {NODES.map((n) => (
            <linearGradient
              key={`grad-${n.id}`}
              id={`orbit-grad-${n.id}`}
              gradientUnits="userSpaceOnUse"
              x1={CX}
              y1={CY}
              x2={n.x}
              y2={n.y}
            >
              <stop offset="0%" stopColor={n.stroke} stopOpacity="0.65" />
              <stop offset="100%" stopColor={n.stroke} stopOpacity="0.05" />
            </linearGradient>
          ))}
        </defs>

        {/* ROTATING GROUP — orbits + connections + node circles. */}
        <g className="orbit-spinner" style={{ transformOrigin: `${CX}px ${CY}px` }}>
          {/* Outer orbit (dashed). */}
          <ellipse
            cx={CX}
            cy={CY}
            rx={138}
            ry={98}
            fill="none"
            stroke="var(--ring-stroke)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
            opacity="0.7"
          />
          {/* Inner orbit (dashed). */}
          <ellipse
            cx={CX}
            cy={CY}
            rx={62}
            ry={42}
            fill="none"
            stroke="var(--ring-stroke)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            opacity="0.5"
          />

          {/* Connection lines — center → each node, light-cone gradients. */}
          {NODES.map((n) => (
            <line
              key={`line-${n.id}`}
              x1={CX}
              y1={CY}
              x2={n.x}
              y2={n.y}
              stroke={`url(#orbit-grad-${n.id})`}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          ))}

          {/* Node circles. Phase 17b 3-restructured G1 — <title> children
              expose hover tooltip + accessible name. */}
          {NODES.map((n) => (
            <circle
              key={`node-${n.id}`}
              cx={n.x}
              cy={n.y}
              r={18}
              fill="var(--bg-canvas)"
              stroke={n.stroke}
              strokeWidth="1.2"
              tabIndex={0}
              role="img"
              aria-label={`${n.label}: ${n.tip}`}
            >
              <title>{`${n.label}: ${n.tip}`}</title>
            </circle>
          ))}

          {/* Counter-rotated labels — appear stationary as group rotates. */}
          {NODES.map((n) => {
            const lo = LABEL_OFFSETS[n.id];
            const no = NUM_OFFSETS[n.id];
            return (
              <g
                key={`label-${n.id}`}
                className="orbit-label"
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              >
                {/* Sequence number (small mono, above/beside node). */}
                <text
                  x={n.x + no.dx}
                  y={n.y + no.dy}
                  textAnchor={no.anchor}
                  fontFamily="var(--font-mono), ui-monospace, monospace"
                  fontSize="11"
                  letterSpacing="1.5"
                  fill="var(--text-muted)"
                >
                  {n.num}
                </text>
                {/* Node label (mono, larger). */}
                <text
                  x={n.x + lo.dx}
                  y={n.y + lo.dy}
                  textAnchor={lo.anchor}
                  fontFamily="var(--font-mono), ui-monospace, monospace"
                  fontSize="10.5"
                  letterSpacing="0.6"
                  fill="var(--text-primary)"
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </g>

        {/* CENTER ANCHOR — Cosmo. Static, not rotating. */}
        <circle
          cx={CX}
          cy={CY}
          r={30}
          fill="var(--bg-canvas)"
          stroke="var(--accent-primary)"
          strokeWidth="1.2"
          tabIndex={0}
          role="img"
          aria-label="Cosmo: AI orchestrator coordinating the loop"
        >
          <title>Cosmo: AI orchestrator coordinating the loop</title>
        </circle>
        <text
          x={CX}
          y={CY + 4}
          textAnchor="middle"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="10"
          letterSpacing="1"
          fill="var(--accent-primary)"
        >
          COSMO
        </text>
      </svg>
    </div>
  );
}

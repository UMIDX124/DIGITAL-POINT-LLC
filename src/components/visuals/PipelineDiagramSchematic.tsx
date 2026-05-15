type Props = {
  compact?: boolean;
  className?: string;
};

const sources = [
  { label: 'HUBSPOT', sub: 'crm' },
  { label: 'STRIPE', sub: 'payments' },
  { label: 'SLACK', sub: 'inbound' },
  { label: 'EMAIL', sub: 'parser' },
  { label: 'FORM', sub: 'webhook' },
];

const outputs = ['CRM WRITE', 'SLACK NOTIFY', 'EMAIL ACK', 'WAREHOUSE'];

/**
 * Clean left-to-right pipeline schematic. Four columns:
 *   1. Sources (5, stacked)
 *   2. N8N workers
 *   3. Postgres state
 *   4. Outputs (4, stacked)
 * Plus a downstream Operator Queue branch from Postgres, sitting below
 * the main row in amber so it reads as the "human" fallback.
 *
 * Previous version layered sources, workers, state, AND outputs on the
 * same row and let Postgres fan back to outputs on the left while the
 * Operator Queue overlapped the Warehouse box. This version commits to
 * strict LTR flow with no line crossings.
 */
export function PipelineDiagramSchematic({ compact = false, className }: Props) {
  const w = compact ? 560 : 760;
  const h = compact ? 320 : 380;

  // Layout constants. Coordinates chosen so every line travels strictly
  // left-to-right (or top-to-bottom for the queue branch). No crossings.
  const padL = compact ? 14 : 24;
  const padR = compact ? 14 : 24;

  // Column 1: sources
  const sourceX = padL;
  const sourceW = compact ? 96 : 130;
  const sourceH = compact ? 26 : 34;
  const sourceGap = compact ? 6 : 10;
  const sourceY0 = compact ? 18 : 22;

  // Column 2: workers
  const workerX = compact ? 138 : 200;
  const workerW = compact ? 100 : 130;
  const workerH = compact ? 80 : 110;
  const workerY = compact ? 60 : 70;

  // Column 3: state
  const stateX = compact ? 268 : 370;
  const stateW = compact ? 100 : 130;
  const stateH = workerH;
  const stateY = workerY;

  // Column 4: outputs
  const outputX = w - padR - (compact ? 100 : 130);
  const outputW = compact ? 100 : 130;
  const outputH = compact ? 26 : 34;
  const outputGap = compact ? 6 : 10;
  const outputY0 = sourceY0;

  // Operator queue, below state column, amber
  const queueW = compact ? 160 : 220;
  const queueH = compact ? 32 : 42;
  const queueX = stateX + stateW / 2 - queueW / 2;
  const queueY = compact ? 230 : 260;

  const workerCenterY = workerY + workerH / 2;
  const stateCenterY = stateY + stateH / 2;
  const stateBottomY = stateY + stateH;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="DPL parallel pipeline. Five inbound sources fan into n8n workers, land in Postgres state plus audit log, then fan out to four downstream writes. An operator queue branches off Postgres for low-confidence cases."
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker id="dpl-pipe-arrow" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3 z" fill="var(--color-accent)" />
        </marker>
      </defs>

      {/* Lines: sources → workers (fan-in, converging on worker left edge center) */}
      {sources.map((s, i) => {
        const sy = sourceY0 + i * (sourceH + sourceGap) + sourceH / 2;
        return (
          <line
            key={`l-src-${s.label}`}
            x1={sourceX + sourceW}
            y1={sy}
            x2={workerX}
            y2={workerCenterY}
            stroke="var(--color-accent)"
            strokeWidth="1"
            opacity={0.6}
          />
        );
      })}

      {/* Line: workers → state (horizontal) */}
      <line
        x1={workerX + workerW}
        y1={workerCenterY}
        x2={stateX}
        y2={stateCenterY}
        stroke="var(--color-accent)"
        strokeWidth="1.2"
        markerEnd="url(#dpl-pipe-arrow)"
      />

      {/* Lines: state → outputs (fan-out, diverging from state right edge center) */}
      {outputs.map((d, i) => {
        const oy = outputY0 + i * (outputH + outputGap) + outputH / 2;
        return (
          <line
            key={`l-out-${d}`}
            x1={stateX + stateW}
            y1={stateCenterY}
            x2={outputX}
            y2={oy}
            stroke="var(--color-accent)"
            strokeWidth="1"
            opacity={0.55}
          />
        );
      })}

      {/* Line: state → operator queue (branch, top-down) */}
      <line
        x1={stateX + stateW / 2}
        y1={stateBottomY}
        x2={stateX + stateW / 2}
        y2={queueY}
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        markerEnd="url(#dpl-pipe-arrow)"
      />

      {/* Sources */}
      {sources.map((s, i) => {
        const y = sourceY0 + i * (sourceH + sourceGap);
        return (
          <g key={s.label}>
            <rect
              x={sourceX}
              y={y}
              width={sourceW}
              height={sourceH}
              fill="var(--color-canvas)"
              stroke="var(--color-hairline-strong)"
              strokeWidth="1"
            />
            <text
              x={sourceX + 8}
              y={y + sourceH / 2 + 1}
              dominantBaseline="middle"
              fontFamily="var(--font-mono)"
              fontSize={compact ? 9 : 11}
              fontWeight={500}
              fill="var(--color-ink)"
              letterSpacing="0.06em"
            >
              {s.label}
            </text>
            <text
              x={sourceX + sourceW - 8}
              y={y + sourceH / 2 + 1}
              textAnchor="end"
              dominantBaseline="middle"
              fontFamily="var(--font-mono)"
              fontSize={compact ? 8 : 9}
              fill="var(--color-text-tertiary)"
            >
              {s.sub}
            </text>
          </g>
        );
      })}

      {/* Workers box */}
      <g>
        <rect
          x={workerX}
          y={workerY}
          width={workerW}
          height={workerH}
          fill="var(--color-canvas)"
          stroke="var(--color-hairline-strong)"
          strokeWidth="1"
        />
        <text
          x={workerX + workerW / 2}
          y={workerCenterY - 12}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={compact ? 9 : 11}
          fontWeight={500}
          fill="var(--color-ink)"
          letterSpacing="0.06em"
        >
          N8N WORKERS
        </text>
        <text
          x={workerX + workerW / 2}
          y={workerCenterY + 4}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={compact ? 8 : 10}
          fill="var(--color-text-secondary)"
        >
          parallel
        </text>
        <text
          x={workerX + workerW / 2}
          y={workerCenterY + 18}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={compact ? 8 : 10}
          fill="var(--color-text-secondary)"
        >
          per-source
        </text>
      </g>

      {/* State box */}
      <g>
        <rect
          x={stateX}
          y={stateY}
          width={stateW}
          height={stateH}
          fill="var(--color-canvas)"
          stroke="var(--color-hairline-strong)"
          strokeWidth="1"
        />
        <text
          x={stateX + stateW / 2}
          y={stateCenterY - 6}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={compact ? 9 : 11}
          fontWeight={500}
          fill="var(--color-ink)"
          letterSpacing="0.06em"
        >
          POSTGRES
        </text>
        <text
          x={stateX + stateW / 2}
          y={stateCenterY + 10}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={compact ? 8 : 10}
          fill="var(--color-text-secondary)"
        >
          state + audit log
        </text>
      </g>

      {/* Outputs */}
      {outputs.map((d, i) => {
        const y = outputY0 + i * (outputH + outputGap);
        return (
          <g key={d}>
            <rect
              x={outputX}
              y={y}
              width={outputW}
              height={outputH}
              fill="var(--color-canvas)"
              stroke="var(--color-hairline-strong)"
              strokeWidth="1"
            />
            <text
              x={outputX + outputW / 2}
              y={y + outputH / 2 + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-mono)"
              fontSize={compact ? 8 : 10}
              fontWeight={500}
              fill="var(--color-ink)"
              letterSpacing="0.06em"
            >
              {d}
            </text>
          </g>
        );
      })}

      {/* Operator queue (amber, distinct, below) */}
      <g>
        <rect
          x={queueX}
          y={queueY}
          width={queueW}
          height={queueH}
          fill="var(--color-accent-soft)"
          stroke="var(--color-accent)"
          strokeWidth="1.2"
        />
        <text
          x={queueX + queueW / 2}
          y={queueY + queueH / 2 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-mono)"
          fontSize={compact ? 9 : 11}
          fontWeight={500}
          fill="var(--color-accent-text)"
          letterSpacing="0.08em"
        >
          OPERATOR QUEUE
        </text>
      </g>

      {/* Figure label */}
      <text
        x={padL}
        y={h - (compact ? 14 : 18)}
        fontFamily="var(--font-mono)"
        fontSize={compact ? 8 : 10}
        fill="var(--color-text-tertiary)"
        letterSpacing="0.12em"
      >
        FIG. PIPE · DPL PARALLEL PIPELINE
      </text>
    </svg>
  );
}

export default PipelineDiagramSchematic;

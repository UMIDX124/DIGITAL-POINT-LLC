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

const destinations = ['CRM WRITE', 'SLACK NOTIFY', 'EMAIL ACK', 'WAREHOUSE'];

export function PipelineDiagramSchematic({ compact = false, className }: Props) {
  const w = compact ? 400 : 720;
  const h = compact ? 320 : 380;
  const padL = compact ? 16 : 40;
  const sourceW = compact ? 110 : 150;
  const sourceH = compact ? 28 : 36;
  const sourceGap = compact ? 8 : 12;
  const sourceY0 = compact ? 26 : 36;

  const workerX = compact ? 150 : 220;
  const workerW = compact ? 100 : 150;
  const workerY = compact ? 56 : 84;
  const workerH = compact ? 88 : 124;

  const stateX = compact ? 270 : 400;
  const stateY = workerY;
  const stateW = compact ? 90 : 140;
  const stateH = workerH;

  const destX0 = compact ? 16 : 40;
  const destY = compact ? 200 : 250;
  const destW = compact ? 80 : 140;
  const destH = compact ? 28 : 36;
  const destGap = compact ? 8 : 12;

  const operatorX = compact ? 270 : 400;
  const operatorY = compact ? 220 : 280;
  const operatorW = compact ? 110 : 200;
  const operatorH = compact ? 36 : 48;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="DPL parallel pipeline diagram. Five inbound sources fan into parallel n8n workers, land in Postgres state, then fan back out to downstream destinations. An operator queue branches off the state for low-confidence cases."
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker id="dpl-pipe-arrow" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3 z" fill="var(--color-accent)" />
        </marker>
      </defs>

      {/* Sources */}
      {sources.map((s, i) => {
        const y = sourceY0 + i * (sourceH + sourceGap);
        return (
          <g key={s.label}>
            <rect
              x={padL}
              y={y}
              width={sourceW}
              height={sourceH}
              fill="none"
              stroke="var(--color-hairline-strong)"
              strokeWidth="1"
            />
            <text
              x={padL + 8}
              y={y + sourceH / 2 + 1}
              dominantBaseline="middle"
              fontFamily="var(--font-mono)"
              fontSize={compact ? 10 : 12}
              fontWeight={500}
              fill="var(--color-ink)"
              letterSpacing="0.06em"
            >
              {s.label}
            </text>
            <text
              x={padL + sourceW - 8}
              y={y + sourceH / 2 + 1}
              textAnchor="end"
              dominantBaseline="middle"
              fontFamily="var(--font-mono)"
              fontSize={compact ? 8 : 10}
              fill="var(--color-text-tertiary)"
            >
              {s.sub}
            </text>
            <line
              x1={padL + sourceW}
              y1={y + sourceH / 2}
              x2={workerX}
              y2={workerY + workerH / 2}
              stroke="var(--color-accent)"
              strokeWidth="1"
              opacity={0.6}
            />
          </g>
        );
      })}

      {/* Parallel workers */}
      <g>
        <rect
          x={workerX}
          y={workerY}
          width={workerW}
          height={workerH}
          fill="none"
          stroke="var(--color-hairline-strong)"
          strokeWidth="1"
        />
        <text
          x={workerX + workerW / 2}
          y={workerY + workerH / 2 - 14}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={compact ? 10 : 12}
          fontWeight={500}
          fill="var(--color-ink)"
          letterSpacing="0.06em"
        >
          N8N WORKERS
        </text>
        <text
          x={workerX + workerW / 2}
          y={workerY + workerH / 2 + 4}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={compact ? 8 : 10}
          fill="var(--color-text-secondary)"
        >
          parallel
        </text>
        <text
          x={workerX + workerW / 2}
          y={workerY + workerH / 2 + 18}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={compact ? 8 : 10}
          fill="var(--color-text-secondary)"
        >
          per-source
        </text>
      </g>

      {/* Worker → state */}
      <line
        x1={workerX + workerW}
        y1={workerY + workerH / 2}
        x2={stateX}
        y2={stateY + stateH / 2}
        stroke="var(--color-accent)"
        strokeWidth="1"
        markerEnd="url(#dpl-pipe-arrow)"
      />

      {/* Postgres state */}
      <g>
        <rect
          x={stateX}
          y={stateY}
          width={stateW}
          height={stateH}
          fill="none"
          stroke="var(--color-hairline-strong)"
          strokeWidth="1"
        />
        <text
          x={stateX + stateW / 2}
          y={stateY + stateH / 2 - 6}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={compact ? 10 : 12}
          fontWeight={500}
          fill="var(--color-ink)"
          letterSpacing="0.06em"
        >
          POSTGRES
        </text>
        <text
          x={stateX + stateW / 2}
          y={stateY + stateH / 2 + 10}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={compact ? 8 : 10}
          fill="var(--color-text-secondary)"
        >
          state + audit log
        </text>
      </g>

      {/* State → destinations row */}
      {destinations.map((d, i) => {
        const x = destX0 + i * (destW + destGap);
        return (
          <g key={d}>
            <line
              x1={stateX + stateW / 2}
              y1={stateY + stateH}
              x2={x + destW / 2}
              y2={destY}
              stroke="var(--color-accent)"
              strokeWidth="1"
              opacity={0.5}
            />
            <rect
              x={x}
              y={destY}
              width={destW}
              height={destH}
              fill="none"
              stroke="var(--color-hairline-strong)"
              strokeWidth="1"
            />
            <text
              x={x + destW / 2}
              y={destY + destH / 2 + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-mono)"
              fontSize={compact ? 9 : 11}
              fontWeight={500}
              fill="var(--color-ink)"
              letterSpacing="0.06em"
            >
              {d}
            </text>
          </g>
        );
      })}

      {/* State → operator queue (amber highlight) */}
      <line
        x1={stateX + stateW / 2}
        y1={stateY + stateH}
        x2={operatorX + operatorW / 2}
        y2={operatorY}
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        markerEnd="url(#dpl-pipe-arrow)"
      />
      <g>
        <rect
          x={operatorX}
          y={operatorY}
          width={operatorW}
          height={operatorH}
          fill="var(--color-accent-soft)"
          stroke="var(--color-accent)"
          strokeWidth="1"
        />
        <text
          x={operatorX + operatorW / 2}
          y={operatorY + operatorH / 2 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-mono)"
          fontSize={compact ? 10 : 12}
          fontWeight={500}
          fill="var(--color-accent-text)"
          letterSpacing="0.06em"
        >
          OPERATOR QUEUE
        </text>
      </g>

      {/* Figure label */}
      <text
        x={padL}
        y={compact ? 306 : 372}
        fontFamily="var(--font-mono)"
        fontSize={compact ? 9 : 10}
        fill="var(--color-text-tertiary)"
        letterSpacing="0.1em"
      >
        FIG. PIPE · DPL PARALLEL PIPELINE
      </text>
    </svg>
  );
}

export default PipelineDiagramSchematic;

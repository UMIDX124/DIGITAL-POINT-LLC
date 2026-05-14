type Props = {
  compact?: boolean;
  className?: string;
};

export function SystemFlowSchematic({ compact = false, className }: Props) {
  const w = compact ? 400 : 720;
  const h = compact ? 320 : 380;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="DPL system flow diagram. Inbound signal routes through n8n workflow and a Groq agent, then through an operator audit, then writes Postgres state that fans out to CRM, Slack, and email."
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker id="dpl-flow-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3 z" fill="var(--color-accent)" />
        </marker>
      </defs>

      {/* Inbound */}
      <g>
        <rect x={compact ? 20 : 40} y={compact ? 20 : 30} width={compact ? 120 : 200} height={compact ? 56 : 80} fill="none" stroke="var(--color-hairline-strong)" strokeWidth="1" />
        <text x={compact ? 80 : 140} y={compact ? 44 : 64} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={compact ? 11 : 14} fontWeight={500} fill="var(--color-ink)" letterSpacing="0.06em">INBOUND</text>
        <text x={compact ? 80 : 140} y={compact ? 60 : 86} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={compact ? 9 : 11} fill="var(--color-text-secondary)">lead · form · signal</text>
      </g>

      {/* Arrow to n8n */}
      <line x1={compact ? 142 : 242} y1={compact ? 48 : 70} x2={compact ? 238 : 318} y2={compact ? 48 : 70} stroke="var(--color-accent)" strokeWidth="1" markerEnd="url(#dpl-flow-arrow)" />

      {/* n8n workflow */}
      <g>
        <rect x={compact ? 240 : 320} y={compact ? 20 : 30} width={compact ? 120 : 200} height={compact ? 56 : 80} fill="none" stroke="var(--color-hairline-strong)" strokeWidth="1" />
        <text x={compact ? 300 : 420} y={compact ? 44 : 64} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={compact ? 11 : 14} fontWeight={500} fill="var(--color-ink)" letterSpacing="0.06em">N8N WORKFLOW</text>
        <text x={compact ? 300 : 420} y={compact ? 60 : 86} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={compact ? 9 : 11} fill="var(--color-text-secondary)">orchestrate</text>
      </g>

      {/* Arrow right then down to Groq */}
      <line x1={compact ? 360 : 520} y1={compact ? 48 : 70} x2={compact ? 460 : 620} y2={compact ? 48 : 70} stroke="var(--color-accent)" strokeWidth="1" />
      {!compact && <line x1={620} y1={70} x2={620} y2={170} stroke="var(--color-accent)" strokeWidth="1" markerEnd="url(#dpl-flow-arrow)" />}
      {compact && <line x1={300} y1={78} x2={300} y2={118} stroke="var(--color-accent)" strokeWidth="1" markerEnd="url(#dpl-flow-arrow)" />}

      {/* Groq agent */}
      <g>
        <rect x={compact ? 240 : 540} y={compact ? 120 : 170} width={compact ? 120 : 160} height={compact ? 56 : 80} fill="none" stroke="var(--color-hairline-strong)" strokeWidth="1" />
        <text x={compact ? 300 : 620} y={compact ? 144 : 204} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={compact ? 11 : 14} fontWeight={500} fill="var(--color-ink)" letterSpacing="0.06em">GROQ AGENT</text>
        <text x={compact ? 300 : 620} y={compact ? 160 : 226} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={compact ? 9 : 11} fill="var(--color-text-secondary)">decide</text>
      </g>

      {/* Arrow left to operator audit */}
      <line x1={compact ? 238 : 538} y1={compact ? 148 : 210} x2={compact ? 142 : 442} y2={compact ? 148 : 210} stroke="var(--color-accent)" strokeWidth="1" markerEnd="url(#dpl-flow-arrow)" />

      {/* Operator audit (amber tint) */}
      <g>
        <rect x={compact ? 20 : 240} y={compact ? 120 : 170} width={compact ? 120 : 200} height={compact ? 56 : 80} fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth="1" />
        <text x={compact ? 80 : 340} y={compact ? 144 : 204} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={compact ? 11 : 14} fontWeight={500} fill="var(--color-accent-text)" letterSpacing="0.06em">OPERATOR AUDIT</text>
        <text x={compact ? 80 : 340} y={compact ? 160 : 226} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={compact ? 9 : 11} fill="var(--color-accent-text)">edge cases</text>
      </g>

      {/* Arrow down to postgres */}
      <line x1={compact ? 80 : 340} y1={compact ? 178 : 252} x2={compact ? 80 : 340} y2={compact ? 218 : 282} stroke="var(--color-accent)" strokeWidth="1" markerEnd="url(#dpl-flow-arrow)" />

      {/* Postgres + CRM bus */}
      <g>
        <rect x={compact ? 20 : 40} y={compact ? 220 : 290} width={compact ? 340 : 640} height={compact ? 56 : 70} fill="none" stroke="var(--color-hairline-strong)" strokeWidth="1" />
        <text x={compact ? 190 : 360} y={compact ? 244 : 318} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={compact ? 11 : 14} fontWeight={500} fill="var(--color-ink)" letterSpacing="0.06em">POSTGRES → CRM / SLACK / EMAIL</text>
        <text x={compact ? 190 : 360} y={compact ? 260 : 340} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={compact ? 9 : 11} fill="var(--color-text-secondary)">state · audit log · downstream notify</text>
      </g>

      {/* Figure label */}
      <text x={compact ? 20 : 40} y={compact ? 304 : 372} fontFamily="var(--font-mono)" fontSize={compact ? 9 : 10} fill="var(--color-text-tertiary)" letterSpacing="0.1em">FIG. SYS · DPL PRODUCTION FLOW</text>
    </svg>
  );
}

export default SystemFlowSchematic;

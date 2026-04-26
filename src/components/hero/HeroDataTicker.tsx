/**
 * Phase 16 C — Live data ticker substrate (Bloomberg Operator).
 *
 * Replaces Phase 6 .hero-ambient conic blur with functional metadata.
 * Three placements (all decorative, aria-hidden):
 *   - Top-left ID block      $DPL.OPS / live          — instrument blue
 *   - Right-side data column readouts (5 rows)        — phosphor amber
 *   - Bottom strip metadata  prod / uplink / sync     — phosphor amber
 *
 * Mono 9px, low opacity (0.12–0.18) — visible but non-distracting.
 * Mobile: hidden < 1024px to preserve perf + readability.
 */

const RIGHT_COLUMN = [
  ['leads.scored',   '1247',     '+12',     '14:32:08'],
  ['agents.active',  '12/14',    'ok',      '14:32:08'],
  ['ops.routed',     '89',       'qual_rate', '71.2%'],
  ['latency.p95',    '142ms',    'err',     '0.04%'],
  ['queue.depth',    '23',       'drained', '14:31:54'],
] as const;

export function HeroDataTicker() {
  return (
    <div className="hero-ticker" aria-hidden="true">
      {/* Top-left ID block. */}
      <div className="hero-ticker-id">
        <div>$DPL.OPS</div>
        <div>live</div>
      </div>

      {/* Right-side data column (operator readouts). */}
      <div className="hero-ticker-readouts">
        {RIGHT_COLUMN.map((row, i) => (
          <div key={i} className="hero-ticker-row">
            {row.map((cell, j) => (
              <span key={j}>{cell}</span>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom strip metadata. */}
      <div className="hero-ticker-strip">
        2026.04.26 14:32:08 UTC | dpl-prod-us-east | uplink ok | sync 142ms | err 0.04%
      </div>
    </div>
  );
}

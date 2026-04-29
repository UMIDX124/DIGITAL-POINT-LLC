'use client';

/**
 * Phase 16 C → Phase 17b 3-restructured G2 — live data ticker substrate.
 *
 * Three placements (all decorative, aria-hidden):
 *   - Top-left ID block      $DPL.OPS / live          — instrument blue
 *   - Right-side data column readouts (5 rows)        — phosphor amber
 *   - Bottom strip metadata  prod / uplink / sync     — phosphor amber
 *
 * G2 — counters increment subtly via setInterval (5–15s cadence). Small
 * deltas: +1–3 on integer counters, ±0.1–0.3% on rates, ±2–5ms on latency.
 * UTC clock advances each second. prefers-reduced-motion gate stops all
 * increments. Mobile <1024px hidden via CSS (locked). Locked opacities
 * (0.18 amber / 0.12 UTC / 0.18 instrument-blue) preserved via globals.css.
 */

import { useEffect, useState } from 'react';

type Counters = {
  leadsScored: number;     // integer  (1247 baseline)
  agentsActive: string;    // '12/14'
  opsRouted: number;       // integer  (89 baseline)
  qualRate: number;        // percent  (71.2 baseline)
  latencyP95: number;      // ms       (142 baseline)
  errRate: number;         // percent  (0.04 baseline)
  queueDepth: number;      // integer  (23 baseline)
};

const INITIAL: Counters = {
  leadsScored: 1247,
  agentsActive: '12/14',
  opsRouted: 89,
  qualRate: 71.2,
  latencyP95: 142,
  errRate: 0.04,
  queueDepth: 23,
};

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

function formatTime(d: Date) {
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
}

function formatDate(d: Date) {
  return `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())}`;
}

export function HeroDataTicker() {
  const [c, setC] = useState<Counters>(INITIAL);
  // Phase 18.6 P7 — hydration mismatch fix. Was: useState(() => new Date())
  // which produces a server-time value during SSR that NEVER matches the
  // client-time value at hydration → React error #418 hydration mismatch
  // → cascade re-render. Now: null on SSR + first client render, populated
  // on client mount. The "+random" delta in the leads.scored row was also
  // randomizing per-render server-vs-client; now seeded once on mount.
  const [now, setNow] = useState<Date | null>(null);
  const [randomDelta, setRandomDelta] = useState<number | null>(null);

  useEffect(() => {
    // Hydration-safety contract: SSR + first client render emit `null` so
    // server and client agree, then we seed once on mount. The setState
    // calls below are intentional and not subject to the cascading-render
    // concern react-hooks/set-state-in-effect targets (a one-shot seed,
    // not a derived value).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    setRandomDelta(Math.floor(Math.random() * 8) + 8);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    // UTC clock — 1s.
    const clock = setInterval(() => setNow(new Date()), 1_000);

    // Counters — 7s cadence with small per-tick deltas.
    const counters = setInterval(() => {
      setC((prev) => ({
        leadsScored: prev.leadsScored + Math.floor(Math.random() * 3) + 1,
        agentsActive: prev.agentsActive,
        opsRouted: prev.opsRouted + (Math.random() > 0.5 ? 1 : 0),
        qualRate: Math.max(60, Math.min(85, prev.qualRate + (Math.random() - 0.5) * 0.3)),
        latencyP95: Math.max(100, Math.min(200, prev.latencyP95 + Math.round((Math.random() - 0.5) * 5))),
        errRate: Math.max(0.01, Math.min(0.15, prev.errRate + (Math.random() - 0.5) * 0.01)),
        queueDepth: Math.max(0, prev.queueDepth + Math.round((Math.random() - 0.5) * 4)),
      }));
    }, 7_000);

    return () => {
      clearInterval(clock);
      clearInterval(counters);
    };
  }, []);

  // Render stable placeholders on SSR / first client render so server and
  // client agree, then re-render with live values on mount.
  const t = now ? formatTime(now) : '--:--:--';
  const dateStr = now ? formatDate(now) : '----.--.--';
  const delta = randomDelta ?? 12;

  return (
    <div className="hero-ticker" aria-hidden="true">
      {/* Top-left ID block. `representative` flag is the integrity tag:
          values below are illustrative, not live client telemetry. */}
      <div className="hero-ticker-id">
        <div>$DPL.OPS</div>
        <div>representative</div>
      </div>

      {/* Right-side data column (operator readouts). */}
      <div className="hero-ticker-readouts">
        <div className="hero-ticker-row">
          <span>leads.scored</span>
          <span>{c.leadsScored.toLocaleString()}</span>
          <span>+{delta}</span>
          <span>{t}</span>
        </div>
        <div className="hero-ticker-row">
          <span>agents.active</span>
          <span>{c.agentsActive}</span>
          <span>ok</span>
          <span>{t}</span>
        </div>
        <div className="hero-ticker-row">
          <span>ops.routed</span>
          <span>{c.opsRouted}</span>
          <span>qual_rate</span>
          <span>{c.qualRate.toFixed(1)}%</span>
        </div>
        <div className="hero-ticker-row">
          <span>latency.p95</span>
          <span>{c.latencyP95}ms</span>
          <span>err</span>
          <span>{c.errRate.toFixed(2)}%</span>
        </div>
        <div className="hero-ticker-row">
          <span>queue.depth</span>
          <span>{c.queueDepth}</span>
          <span>drained</span>
          <span>{t}</span>
        </div>
      </div>

      {/* Bottom strip metadata. */}
      <div className="hero-ticker-strip">
        {dateStr} {t} UTC | dpl-prod-us-east | uplink ok | sync {c.latencyP95}ms | err {c.errRate.toFixed(2)}%
      </div>
    </div>
  );
}

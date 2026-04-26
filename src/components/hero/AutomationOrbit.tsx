import Image from 'next/image';

/**
 * Phase 16 A.1 — Cosmo galaxy orbital system (mockup, awaiting ship-it).
 *
 * Center:    DP mascot ("sun"), 32px, no animation, subtle violet glow.
 * Inner ring (r=90):  Lead Trigger (12 o'clock), Operator Route (6 o'clock).
 * Outer ring (r=160): AI Score (3 o'clock), CRM Updated (9 o'clock).
 * Connection arcs:    4 SVG <path> quadratic Béziers, light-cone gradient
 *                     strokes (bright at source, dim at target) imply signal
 *                     direction Lead → AI → Operator → CRM → loop.
 *
 * Motion: parent rotates 360deg over 90s linear infinite — imperceptible
 * (4°/sec), single GPU transform on container. Labels co-rotate; readable
 * because cycle is below human-attention threshold.
 *
 * prefers-reduced-motion: rotation off (static still composition).
 * < 768px: hidden (matches Phase 14 mobile-hidden pattern).
 */

const NODES = [
  { id: 'trigger',  label: 'Lead Trigger',    sub: 'Form / webhook',     x: 200, y: 110, ring: 'inner' },
  { id: 'ai',       label: 'AI Score',        sub: 'Qualifies + routes', x: 360, y: 200, ring: 'outer' },
  { id: 'operator', label: 'Operator Route',  sub: 'Human backstop',     x: 200, y: 290, ring: 'inner' },
  { id: 'crm',      label: 'CRM Updated',     sub: 'State of truth',     x: 40,  y: 200, ring: 'outer' },
] as const;

const ARCS = [
  // Lead Trigger → AI Score (top → right)
  { from: 'trigger', to: 'ai',       d: 'M 200 110 Q 320 110 360 200', gradId: 'arc-trigger-ai' },
  // AI Score → Operator Route (right → bottom)
  { from: 'ai',       to: 'operator', d: 'M 360 200 Q 360 280 200 290', gradId: 'arc-ai-operator' },
  // Operator Route → CRM Updated (bottom → left)
  { from: 'operator', to: 'crm',      d: 'M 200 290 Q 80 290 40 200',   gradId: 'arc-operator-crm' },
  // CRM Updated → Lead Trigger (left → top, closes the loop)
  { from: 'crm',      to: 'trigger',  d: 'M 40 200 Q 40 120 200 110',   gradId: 'arc-crm-trigger' },
] as const;

const ICONS: Record<string, React.ReactNode> = {
  trigger: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="3.5" y="4.5" width="13" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6.5" y1="9"  x2="13.5" y2="9"  stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="6.5" y1="12" x2="13.5" y2="12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="6.5" y1="15" x2="11"   y2="15" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M16 12 L21 12 M18 9 L21 12 L18 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M13 3 L6 13 L11 13 L10 21 L17 11 L12 11 L13 3 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="3"  cy="6"  r="1"   fill="currentColor" />
      <circle cx="21" cy="18" r="1"   fill="currentColor" />
    </svg>
  ),
  operator: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 5 20 C 5 16.5 8 14 12 14 C 16 14 19 16.5 19 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  crm: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <ellipse cx="9" cy="6" rx="5.5" ry="2.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 6 V12 C3.5 13.25 6 14.25 9 14.25 C12 14.25 14.5 13.25 14.5 12 V6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 12 V18 C3.5 19.25 6 20.25 9 20.25 C12 20.25 14.5 19.25 14.5 18 V12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16 L19 19 L22 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export function AutomationOrbit() {
  return (
    <div
      className="automation-orbit"
      role="img"
      aria-label="Digital Point operating loop — Lead trigger feeds the AI score, which routes to a trained operator, which updates the CRM as state of truth. Cosmo coordinates at the center."
    >
      <div className="automation-orbit-spinner">
        <svg
          className="automation-orbit-svg"
          viewBox="0 0 400 400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {ARCS.map((a) => (
              <linearGradient
                key={a.gradId}
                id={a.gradId}
                gradientUnits="userSpaceOnUse"
                x1={NODES.find((n) => n.id === a.from)!.x}
                y1={NODES.find((n) => n.id === a.from)!.y}
                x2={NODES.find((n) => n.id === a.to)!.x}
                y2={NODES.find((n) => n.id === a.to)!.y}
              >
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.12" />
              </linearGradient>
            ))}
          </defs>

          {/* Light-cone arcs (signal travel direction). */}
          {ARCS.map((a) => (
            <path
              key={a.gradId}
              d={a.d}
              fill="none"
              stroke={`url(#${a.gradId})`}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ))}

          {/* Inner ring guide (very faint, decorative). */}
          <circle cx="200" cy="200" r="90" fill="none" stroke="var(--accent)" strokeOpacity="0.08" strokeWidth="0.75" />
          <circle cx="200" cy="200" r="160" fill="none" stroke="var(--accent)" strokeOpacity="0.05" strokeWidth="0.75" />
        </svg>

        {/* Cosmo center — DP mascot as the sun. No animation, only glow. */}
        <div className="automation-orbit-cosmo" aria-hidden="true">
          <Image
            src="/Dp-logo1.png"
            alt=""
            width={32}
            height={32}
            unoptimized
            priority
          />
        </div>

        {/* 4 nodes positioned absolutely (% based on 400px viewBox). */}
        {NODES.map((n) => (
          <div
            key={n.id}
            className="automation-orbit-node"
            data-ring={n.ring}
            style={{ left: `${(n.x / 400) * 100}%`, top: `${(n.y / 400) * 100}%` }}
          >
            <span className="automation-orbit-node-icon">{ICONS[n.id]}</span>
            <span className="automation-orbit-node-label">{n.label}</span>
            <span className="automation-orbit-node-sub">{n.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

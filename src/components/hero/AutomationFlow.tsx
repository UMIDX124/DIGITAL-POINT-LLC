/**
 * Phase 14 — Hero right-column automation visualisation.
 * 4 nodes in a 2×2 grid representing the DPL pipeline:
 *   Lead Trigger → AI Score → Operator Route → CRM Updated
 * Inline SVG icons + dashed connection paths. Pure CSS animations
 * (sequential reveal stagger + flowing-dot dashes + periodic pulse).
 * No GSAP, no JS. prefers-reduced-motion → static end-state.
 *
 * Bundle target: ≤4 KB (this component compresses to ~2 KB gzipped).
 * Mobile: hidden below 768px so hero copy gets the full column.
 */

const NODES = [
  {
    id: 'trigger',
    label: 'Lead Trigger',
    sub: 'Form / webhook',
    icon: (
      // form-with-arrow icon
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
        <rect x="3.5" y="4.5" width="13" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="6.5" y1="9" x2="13.5" y2="9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <line x1="6.5" y1="12" x2="13.5" y2="12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <line x1="6.5" y1="15" x2="11" y2="15" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M16 12 L21 12 M18 9 L21 12 L18 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'ai',
    label: 'AI Score',
    sub: 'Qualifies + routes',
    icon: (
      // lightning + circuit dots
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
        <path d="M13 3 L6 13 L11 13 L10 21 L17 11 L12 11 L13 3 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <circle cx="3" cy="6" r="1" fill="currentColor" />
        <circle cx="21" cy="18" r="1" fill="currentColor" />
        <circle cx="20" cy="5" r="1" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 'operator',
    label: 'Operator Route',
    sub: 'Human backstop',
    icon: (
      // person + nodes
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 20 C5 16.5 8 14 12 14 C16 14 19 16.5 19 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="3" cy="20" r="1.25" fill="currentColor" opacity="0.6" />
        <circle cx="21" cy="20" r="1.25" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 'crm',
    label: 'CRM Updated',
    sub: 'State-of-truth',
    icon: (
      // database stack with check
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
        <ellipse cx="9" cy="6" rx="5.5" ry="2.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3.5 6 V12 C3.5 13.25 6 14.25 9 14.25 C12 14.25 14.5 13.25 14.5 12 V6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3.5 12 V18 C3.5 19.25 6 20.25 9 20.25 C12 20.25 14.5 19.25 14.5 18 V12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 16 L19 19 L22 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function AutomationFlow() {
  return (
    <div
      className="automation-flow"
      role="img"
      aria-label="Digital Point operating loop — Lead trigger feeds the AI score, which routes to a trained operator, which updates the CRM as state of truth."
    >
      {/* Connection paths layer (decorative). 2x2 grid; arrows form a Z. */}
      <svg
        className="automation-flow-paths"
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* horizontal top row: trigger → ai */}
        <path d="M 38 32 L 162 32" className="flow-path flow-path-1" />
        {/* vertical right: ai → operator */}
        <path d="M 168 38 L 168 162" className="flow-path flow-path-2" />
        {/* horizontal bottom row reversed: operator → crm */}
        <path d="M 162 168 L 38 168" className="flow-path flow-path-3" />
      </svg>

      <div className="automation-flow-grid">
        {NODES.map((n, i) => (
          <div
            key={n.id}
            className="automation-flow-node"
            data-node-index={i}
            style={{ ['--node-delay' as string]: `${i * 100}ms` }}
          >
            <span className="automation-flow-node-icon" aria-hidden="true">{n.icon}</span>
            <span className="automation-flow-node-label">{n.label}</span>
            <span className="automation-flow-node-sub">{n.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * HeroSidePanels — Phase 20.1.3 Hubtown-clone section nav.
 *
 * Reference: Hubtown.co.in left section nav (FUTURE / INNOVATION /
 * COLLABORATION / EXCELLENCE / PURPOSE / LEGACY with active dot).
 * DPL adaptation: 5 service pillars in locked order with active-state
 * indicator on the first item.
 *
 * Right side: brief telemetry strip (DPL / 2017 → NOW vertical mono).
 *
 * Bottom-center: SCROLL TO EXPLORE indicator with animated bar.
 *
 * Server Component, pure CSS, zero JS cost.
 */
const PILLARS = [
  { label: 'AGENTS', active: true },
  { label: 'AUTOMATION', active: false },
  { label: 'OPERATORS', active: false },
  { label: 'MARKETING', active: false },
  { label: 'SYSTEMS', active: false },
];

export function HeroSidePanels() {
  return (
    <>
      {/* LEFT — section nav (Hubtown-style stacked labels with active dot) */}
      <nav
        className="hero-section-nav"
        aria-label="Service pillars overview"
      >
        <ol>
          {PILLARS.map((p) => (
            <li
              key={p.label}
              className={`hero-section-nav-item ${p.active ? 'is-active' : ''}`}
            >
              <span className="hero-section-nav-dot" aria-hidden="true" />
              <span className="hero-section-nav-label">{p.label}</span>
            </li>
          ))}
        </ol>
      </nav>

      {/* RIGHT — telemetry strip */}
      <div
        className="hero-side-panel hero-side-panel--right"
        aria-hidden="true"
      >
        <span className="hero-side-strip">
          <span className="hero-side-strip-tag">DPL</span>
          <span className="hero-side-strip-rule" />
          <span className="hero-side-strip-meta">2017 → NOW</span>
          <span className="hero-side-strip-rule" />
          <span className="hero-side-strip-meta">OPERATING</span>
        </span>
      </div>

      {/* BOTTOM — scroll to explore */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="hero-scroll-tag">SCROLL TO EXPLORE</span>
        <span className="hero-scroll-bar">
          <span className="hero-scroll-bar-dot" />
        </span>
      </div>
    </>
  );
}

export default HeroSidePanels;

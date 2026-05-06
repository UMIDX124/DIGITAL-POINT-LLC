/**
 * ManifestoSection — Phase 20.1.5 narrative + paired vignette.
 *
 * Each statement now pairs with a right-side visual mood vignette
 * (SVG, instrument-grade, hairline strokes). Vignettes are inline so
 * they share the section's stagger reveal, and they fill the previously
 * empty right column that made the section read as half-finished.
 *
 * Vignettes (per statement):
 *   1. Hours → outcomes: 8-bar fade-out vs 4-bar amber rise
 *   2. Automation breaks: a soft hairline mesh with one breach node
 *      pulsing amber and one operator-aperture node tracking it
 *   3. Eight years: vertical year-tick timeline 2017→2026 with
 *      operations marker at "NOW"
 *
 * Server Component. Pure markup. SectionFlow handles entry reveal.
 */

function VignetteHoursOutcomes() {
  return (
    <svg
      className="manifesto-vignette"
      viewBox="0 0 320 200"
      role="img"
      aria-label="Hours of effort fading; outcomes rising"
    >
      {/* hairline grid */}
      <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
        {[40, 80, 120, 160].map((y) => (
          <line key={y} x1="20" x2="300" y1={y} y2={y} />
        ))}
      </g>

      {/* left cluster: hours bars (cooler, faded) */}
      <g>
        {[
          { x: 30, h: 70 },
          { x: 50, h: 90 },
          { x: 70, h: 60 },
          { x: 90, h: 110 },
          { x: 110, h: 75 },
          { x: 130, h: 95 },
        ].map((b) => (
          <rect
            key={b.x}
            x={b.x}
            y={170 - b.h}
            width="10"
            height={b.h}
            fill="rgba(245, 232, 212, 0.20)"
            stroke="rgba(245, 232, 212, 0.42)"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* dividing tick */}
      <line x1="160" x2="160" y1="38" y2="180" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="2 4" />
      <text x="160" y="32" fontSize="9" letterSpacing="2" fill="rgba(255,255,255,0.42)" textAnchor="middle" fontFamily="var(--font-geist-mono), monospace">PIVOT</text>

      {/* right cluster: outcome bars (amber, rising) */}
      <g>
        {[
          { x: 180, h: 90 },
          { x: 210, h: 120 },
          { x: 240, h: 140 },
          { x: 270, h: 160 },
        ].map((b) => (
          <rect
            key={b.x}
            x={b.x}
            y={170 - b.h}
            width="14"
            height={b.h}
            fill="rgba(255, 168, 51, 0.18)"
            stroke="rgba(255, 168, 51, 0.85)"
            strokeWidth="1.25"
          />
        ))}
      </g>

      {/* axis */}
      <line x1="20" x2="300" y1="170" y2="170" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      <text x="20" y="186" fontSize="8.5" letterSpacing="2" fill="rgba(255,255,255,0.35)" fontFamily="var(--font-geist-mono), monospace">HOURS BILLED</text>
      <text x="300" y="186" fontSize="8.5" letterSpacing="2" fill="rgba(255, 168, 51, 0.85)" textAnchor="end" fontFamily="var(--font-geist-mono), monospace">OUTCOMES SHIPPED</text>
    </svg>
  );
}

function VignetteEdgeBreach() {
  return (
    <svg
      className="manifesto-vignette"
      viewBox="0 0 320 200"
      role="img"
      aria-label="Automation graph with breach node and operator aperture"
    >
      {/* hairline mesh */}
      <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
        <line x1="40" y1="40" x2="280" y2="40" />
        <line x1="40" y1="100" x2="280" y2="100" />
        <line x1="40" y1="160" x2="280" y2="160" />
        <line x1="40" y1="40" x2="40" y2="160" />
        <line x1="160" y1="40" x2="160" y2="160" />
        <line x1="280" y1="40" x2="280" y2="160" />
      </g>

      {/* connecting routes */}
      <g stroke="rgba(255, 168, 51, 0.55)" strokeWidth="1.25" fill="none">
        <path d="M 40 40 L 160 100 L 280 40" />
        <path d="M 40 160 L 160 100 L 280 160" />
      </g>
      <g stroke="rgba(44, 95, 90, 0.7)" strokeWidth="1" strokeDasharray="3 3" fill="none">
        <path d="M 40 100 L 280 100" />
      </g>

      {/* nodes */}
      {[
        { x: 40, y: 40 },
        { x: 280, y: 40 },
        { x: 40, y: 160 },
        { x: 280, y: 160 },
        { x: 40, y: 100 },
        { x: 280, y: 100 },
      ].map((n) => (
        <circle key={`${n.x}-${n.y}`} cx={n.x} cy={n.y} r="4" fill="rgba(255, 168, 51, 0.85)" />
      ))}

      {/* breach node — amber pulse */}
      <g>
        <circle cx="160" cy="100" r="14" fill="none" stroke="rgba(255, 168, 51, 0.55)" strokeWidth="1" />
        <circle cx="160" cy="100" r="22" fill="none" stroke="rgba(255, 168, 51, 0.30)" strokeWidth="1" strokeDasharray="3 4" />
        <circle cx="160" cy="100" r="6" fill="rgba(255, 168, 51, 1)" />
      </g>

      {/* operator aperture — bracket cursor on it */}
      <g stroke="rgba(245, 232, 212, 0.85)" strokeWidth="1.5" fill="none">
        <path d="M 138 78 L 130 78 L 130 86" />
        <path d="M 182 78 L 190 78 L 190 86" />
        <path d="M 138 122 L 130 122 L 130 114" />
        <path d="M 182 122 L 190 122 L 190 114" />
      </g>

      <text x="160" y="186" fontSize="8.5" letterSpacing="2.4" fill="rgba(245, 232, 212, 0.7)" textAnchor="middle" fontFamily="var(--font-geist-mono), monospace">OPERATOR · ACTIVE WATCH</text>
    </svg>
  );
}

function VignetteEightYears() {
  const years = [
    { y: 2017, label: 'INCORP' },
    { y: 2019 },
    { y: 2021, label: 'SCALE' },
    { y: 2023 },
    { y: 2025 },
    { y: 2026, label: 'NOW', active: true },
  ];
  return (
    <svg
      className="manifesto-vignette"
      viewBox="0 0 320 200"
      role="img"
      aria-label="Operating timeline 2017 to 2026"
    >
      {/* center axis */}
      <line x1="20" x2="300" y1="100" y2="100" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />

      {/* year ticks */}
      {years.map((t, i) => {
        const x = 30 + (i * (260 / (years.length - 1)));
        return (
          <g key={t.y}>
            <line
              x1={x}
              x2={x}
              y1={t.active ? 80 : 90}
              y2={t.active ? 120 : 110}
              stroke={t.active ? 'rgba(255,168,51,0.95)' : 'rgba(255,255,255,0.45)'}
              strokeWidth={t.active ? 1.5 : 1}
            />
            <text
              x={x}
              y={140}
              fontSize="9.5"
              letterSpacing="1.5"
              fill={t.active ? 'rgba(255,168,51,0.95)' : 'rgba(255,255,255,0.55)'}
              textAnchor="middle"
              fontFamily="var(--font-geist-mono), monospace"
            >
              {t.y}
            </text>
            {t.label ? (
              <text
                x={x}
                y={70}
                fontSize="8"
                letterSpacing="2.4"
                fill={t.active ? 'rgba(255,168,51,0.95)' : 'rgba(255,255,255,0.42)'}
                textAnchor="middle"
                fontFamily="var(--font-geist-mono), monospace"
              >
                {t.label}
              </text>
            ) : null}
          </g>
        );
      })}

      {/* progress bar from start to NOW */}
      <line x1="30" x2="290" y1="100" y2="100" stroke="rgba(255,168,51,0.55)" strokeWidth="2" />

      {/* operations marker */}
      <g>
        <circle cx="290" cy="100" r="10" fill="none" stroke="rgba(255,168,51,0.55)" strokeWidth="1" />
        <circle cx="290" cy="100" r="4" fill="rgba(255,168,51,1)" />
      </g>

      <text x="20" y="180" fontSize="8.5" letterSpacing="2.4" fill="rgba(255,255,255,0.42)" fontFamily="var(--font-geist-mono), monospace">DPL · OPERATING WINDOW</text>
      <text x="300" y="180" fontSize="8.5" letterSpacing="2.4" fill="rgba(255,168,51,0.85)" textAnchor="end" fontFamily="var(--font-geist-mono), monospace">SHIPPED · 9 YR</text>
    </svg>
  );
}

export function ManifestoSection() {
  return (
    <section
      id="manifesto"
      className="manifesto-section section-deferred"
      aria-labelledby="manifesto-eyebrow"
    >
      <div className="container-wide">
        <p
          id="manifesto-eyebrow"
          className="manifesto-eyebrow font-mono uppercase"
        >
          OUR REGISTER
        </p>

        <div className="manifesto-stack" data-flow-stagger>
          <div className="manifesto-row">
            <p className="manifesto-statement">
              Most agencies sell <span className="manifesto-amber">hours</span>.
              We operate <span className="manifesto-amber">outcomes</span>.
            </p>
            <div className="manifesto-vignette-wrap">
              <VignetteHoursOutcomes />
            </div>
          </div>

          <div className="manifesto-row manifesto-row--reverse">
            <p className="manifesto-statement">
              Most automation breaks at the edges.
              Ours has <span className="manifesto-amber">trained operators</span> watching them.
            </p>
            <div className="manifesto-vignette-wrap">
              <VignetteEdgeBreach />
            </div>
          </div>

          <div className="manifesto-row">
            <p className="manifesto-statement">
              Eight years of running the work, not selling the deck.
            </p>
            <div className="manifesto-vignette-wrap">
              <VignetteEightYears />
            </div>
          </div>
        </div>

        <p className="manifesto-tag font-mono uppercase">
          DPL · 2017 → NOW · OPERATING
        </p>
      </div>
    </section>
  );
}

export default ManifestoSection;

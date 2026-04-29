/**
 * Phase 19 Path 3 — credentials wall replacing the env-gated null
 * LogoStripSection.
 *
 * Real client logos are gated by legal signoff (LogoStripSection
 * comment retains the re-enable mechanism). Until those land, this
 * section ships verifiable text-form credentials that DO NOT fabricate
 * client identities. Each credential is either:
 *   1. A scope assertion (the literal practices DPL has shipped)
 *   2. A capability badge (the systems DPL works against)
 *   3. A discipline marker (operating principles)
 *
 * Layout: 4-column hairline-separated grid on desktop, 2-column on
 * tablet, 1-column on mobile. Mono-uppercase labels, tabular numbers,
 * Bloomberg Operator hairline + amber-on-dark restraint.
 */

type Credential = {
  group: string; // section eyebrow (uppercase mono)
  items: ReadonlyArray<{ value: string; label: string }>;
};

const GROUPS: ReadonlyArray<Credential> = [
  {
    group: 'Stack Coverage',
    items: [
      { value: 'HubSpot', label: 'CRM ops' },
      { value: 'Salesforce', label: 'enterprise' },
      { value: 'Pipedrive', label: 'pipeline' },
      { value: 'Airtable', label: 'systems of record' },
      { value: 'Notion', label: 'docs + ops' },
      { value: 'n8n', label: 'orchestration' },
      { value: 'Groq', label: 'inference' },
      { value: 'Postgres', label: 'state' },
    ],
  },
  {
    group: 'Operating Surface',
    items: [
      { value: 'Meta', label: 'paid social' },
      { value: 'Google', label: 'paid search' },
      { value: 'LinkedIn', label: 'B2B' },
      { value: 'TikTok', label: 'creative' },
    ],
  },
  {
    group: 'Discipline',
    items: [
      { value: 'NDA', label: 'mutual, standard' },
      { value: 'Read-only', label: 'scoped credentials' },
      { value: '0d', label: 'data retention (Groq)' },
      { value: '24/7', label: 'agent runtime' },
    ],
  },
];

export function CredentialsWall() {
  return (
    <section
      className="relative section-deferred"
      style={{
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
      aria-label="Operator credentials"
    >
      <div className="container-wide" style={{ paddingInline: 'var(--container-gutter)' }}>
        <header className="mb-12 lg:mb-16" data-reveal>
          <p
            className="font-mono uppercase mb-5"
            style={{
              fontSize: 'var(--text-micro)',
              letterSpacing: '0.18em',
              color: 'var(--text-muted)',
            }}
          >
            What we run against
          </p>
          <h2
            className="font-hero text-balance"
            style={{
              fontSize: 'var(--text-h1)',
              color: 'var(--text-primary)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              maxWidth: 'var(--maxw-heading-section)',
            }}
          >
            The systems we operate. The disciplines we keep.
          </h2>
        </header>

        <div className="credentials-grid">
          {GROUPS.map((g) => (
            <section key={g.group} className="credentials-group" data-reveal>
              <p
                className="font-mono uppercase credentials-group-eyebrow"
                style={{
                  fontSize: 'var(--text-micro)',
                  letterSpacing: '0.18em',
                  color: 'var(--accent-bright)',
                }}
              >
                {g.group}
              </p>
              <ul className="credentials-list">
                {g.items.map((it) => (
                  <li key={it.value} className="credentials-item">
                    <span className="credentials-value font-display">{it.value}</span>
                    <span className="credentials-label font-mono uppercase">{it.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

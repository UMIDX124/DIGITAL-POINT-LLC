const stack = [
  { label: 'n8n', detail: 'self-hosted orchestration' },
  { label: 'Groq', detail: 'llama-3 inference' },
  { label: 'Anthropic Claude', detail: 'planner + reviewer' },
  { label: 'PostgreSQL', detail: 'state + audit log' },
  { label: 'TypeScript', detail: 'custom services' },
  { label: 'Vercel', detail: 'hosted surfaces' },
  { label: 'Slack Connect', detail: 'live observability' },
  { label: 'BotID', detail: 'bot defense' },
];

export function StackSection() {
  return (
    <section className="section section-divider" id="stack">
      <div className="container-wide">
        <div className="section-header">
          <p className="eyebrow">The production stack</p>
          <h2 className="section-title text-balance">
            n8n, Groq, Postgres, TypeScript. Self-hosted where it matters.
          </h2>
          <p className="section-desc text-pretty">
            Buyer&apos;s guides will tell you to demand the tech stack upfront. So
            here it is. Not a Zapier shop, not a single-platform reseller.
            Open-source where the cost curve flattens, custom code where the
            edges break.
          </p>
        </div>

        <div className="stack-row" style={{ marginBlockStart: '2.5rem' }}>
          {stack.map((s) => (
            <div key={s.label} className="stack-badge">
              <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{s.label}</span>
              <span style={{ marginInlineStart: '0.5rem', color: 'var(--color-text-tertiary)' }}>
                {s.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StackSection;

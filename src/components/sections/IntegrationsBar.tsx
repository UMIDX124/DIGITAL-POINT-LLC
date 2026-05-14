const integrations = [
  { name: 'n8n', role: 'Orchestration' },
  { name: 'Groq', role: 'Inference' },
  { name: 'Claude', role: 'Reasoning' },
  { name: 'Postgres / Neon', role: 'State' },
  { name: 'Upstash Redis', role: 'Cache · rate' },
  { name: 'Vercel', role: 'Surfaces' },
  { name: 'Slack', role: 'Observability' },
  { name: 'Resend', role: 'Email' },
  { name: 'HubSpot', role: 'CRM' },
  { name: 'Salesforce', role: 'CRM' },
  { name: 'Notion', role: 'Knowledge' },
  { name: 'Stripe', role: 'Billing' },
  { name: 'Linear', role: 'Issues' },
  { name: 'Zapier', role: 'Inbound bridge' },
];

export function IntegrationsBar() {
  return (
    <section className="dpl-integrations" aria-label="Stack integrations">
      <div className="dpl-integrations__inner">
        <p className="dpl-eyebrow">
          <span className="dpl-eyebrow__rule" aria-hidden="true" />
          Stack integrations
        </p>
        <h2 className="dpl-integrations__heading">
          We deploy on a self-hosted backbone. We integrate with the tools you already pay for.
        </h2>

        <ul className="dpl-integrations__grid" role="list">
          {integrations.map((tool) => (
            <li key={tool.name} className="dpl-integrations__item">
              <span className="dpl-integrations__name">{tool.name}</span>
              <span className="dpl-integrations__role">{tool.role}</span>
            </li>
          ))}
        </ul>

        <p className="dpl-integrations__caption">
          Self-hosted where it matters. Cloud where it doesn&apos;t.
        </p>
      </div>
    </section>
  );
}

export default IntegrationsBar;

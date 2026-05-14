import { SystemFlowSchematic } from '@/components/visuals/SystemFlowSchematic';

export function HomeSystemFlow() {
  return (
    <section className="dpl-section dpl-section--flow" aria-label="System flow">
      <div className="dpl-section__rail" aria-hidden="true">
        <span className="dpl-section__rail-label">Section 05 · System flow</span>
      </div>
      <div className="dpl-section__page" aria-hidden="true">p.05 / p.09</div>
      <div className="dpl-section__inner">
        <div className="dpl-flow__grid">
          <div className="dpl-flow__copy">
            <p className="dpl-eyebrow">
              <span className="dpl-eyebrow__rule" aria-hidden="true" />
              System flow
            </p>
            <h2 className="dpl-flow__title">A production stack with self-hosted handoffs.</h2>
            <p className="dpl-flow__body">
              Every inbound signal moves through orchestration, a Groq-hosted agent, and an operator who audits the edge cases the model gets wrong. State writes to Postgres. CRM, Slack, and email pick up downstream.
            </p>
            <p className="dpl-flow__caption">Operator-audited edges are the only step a human owns. The rest is automated.</p>
          </div>
          <div className="dpl-flow__diagram">
            <SystemFlowSchematic />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSystemFlow;

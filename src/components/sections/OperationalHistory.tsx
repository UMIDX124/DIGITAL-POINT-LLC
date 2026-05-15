const stats = [
  {
    figure: '2017',
    label: 'Operating since',
    detail: 'First citation engagement closed August 2017.',
  },
  {
    figure: '15+',
    label: 'US states delivered',
    detail: 'Cumulative footprint, 2017 to present.',
  },
  {
    figure: '20',
    label: 'Engagements closed Feb to May 2026',
    detail: 'Active backlog tracked in internal sales record.',
  },
  {
    figure: '2 / 2',
    label: 'Co-founders signing every audit',
    detail: 'Faizan and Anwaar, both reachable, both replying.',
  },
];

export function OperationalHistory() {
  return (
    <section className="dpl-track-record" aria-label="Operational history">
      <div className="dpl-track-record__inner">
        <p className="dpl-eyebrow">
          <span className="dpl-eyebrow__rule" aria-hidden="true" />
          Operational history
        </p>
        <h2 className="dpl-track-record__heading">Track record on file.</h2>
        <p className="dpl-track-record__body">
          Eight years of operations behind every reply. The contractor business that
          ran before the rebrand still anchors how we deliver: founders sign every
          engagement, every commitment goes into a tracked record, every state we
          serve is on the receipts.
        </p>

        <dl className="dpl-track-record__grid" role="list">
          {stats.map((s) => (
            <div key={s.label} className="dpl-track-record__cell" role="listitem">
              <dt className="dpl-track-record__figure">{s.figure}</dt>
              <dd className="dpl-track-record__label">{s.label}</dd>
              <dd className="dpl-track-record__detail">{s.detail}</dd>
            </div>
          ))}
        </dl>

        <p className="dpl-track-record__source">
          Source: internal sales record, 2017 to present. Verifiable on request.
        </p>
      </div>
    </section>
  );
}

export default OperationalHistory;

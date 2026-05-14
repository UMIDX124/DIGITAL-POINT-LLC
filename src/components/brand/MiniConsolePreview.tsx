const lines = [
  { time: '14:32', tag: 'audit', body: 'Co-founder review attached to 0184' },
  { time: '14:18', tag: 'ops', body: 'Lead-routing edge case resolved' },
  { time: '13:52', tag: 'recovery', body: 'Diagnosis ticket DPL-RC-039 closed' },
  { time: '13:21', tag: 'system', body: 'Postgres backfill clean against 2.1M rows' },
];

export function MiniConsolePreview() {
  return (
    <div className="dpl-mini-console" data-design-only="true" aria-hidden="true">
      <ul className="dpl-mini-console__list">
        {lines.map((l) => (
          <li key={l.time} className="dpl-mini-console__row">
            <span className="dpl-mini-console__time">[{l.time}]</span>
            <span className="dpl-mini-console__tag">[{l.tag}]</span>
            <span className="dpl-mini-console__body">{l.body}</span>
          </li>
        ))}
      </ul>
      <span className="dpl-mini-console__designmark">[design only] static preview</span>
    </div>
  );
}

export default MiniConsolePreview;

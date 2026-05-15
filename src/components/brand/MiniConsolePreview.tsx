'use client';

import { useEffect, useRef, useState } from 'react';

const FEED = [
  { time: '14:32', tag: 'audit', body: 'Co-founder review attached to 0184' },
  { time: '14:18', tag: 'ops', body: 'Lead-routing edge case resolved' },
  { time: '13:52', tag: 'recovery', body: 'Diagnosis ticket DPL-RC-039 closed' },
  { time: '13:21', tag: 'system', body: 'Postgres backfill clean against 2.1M rows' },
  { time: '12:58', tag: 'ops', body: 'Slack escalation handled in 6 minutes' },
  { time: '12:34', tag: 'deploy', body: 'CRM enrichment agent pushed to staging' },
  { time: '11:47', tag: 'audit', body: 'Written plan delivered to $4.2M ARR ops lead' },
  { time: '11:12', tag: 'recovery', body: 'Hallucinating support agent re-prompted' },
];

const WINDOW = 4;
const TICK_MS = 3500;

export function MiniConsolePreview() {
  const [offset, setOffset] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduced.current = mq.matches;
    const onChange = () => {
      reduced.current = mq.matches;
    };
    mq.addEventListener('change', onChange);

    if (reduced.current) return () => mq.removeEventListener('change', onChange);

    const id = window.setInterval(() => {
      setOffset((o) => (o + 1) % FEED.length);
    }, TICK_MS);

    return () => {
      window.clearInterval(id);
      mq.removeEventListener('change', onChange);
    };
  }, []);

  const visible = Array.from({ length: WINDOW }, (_, i) => FEED[(offset + i) % FEED.length]);

  return (
    <div className="dpl-mini-console" data-design-only="true" aria-hidden="true">
      <ul className="dpl-mini-console__list">
        {visible.map((l, i) => (
          <li
            key={`${l.time}-${offset}-${i}`}
            className="dpl-mini-console__row"
            data-index={i}
          >
            <span className="dpl-mini-console__time">[{l.time}]</span>
            <span className="dpl-mini-console__tag">[{l.tag}]</span>
            <span className="dpl-mini-console__body">{l.body}</span>
          </li>
        ))}
      </ul>
      <span className="dpl-mini-console__designmark">
        [design only] sample feed · cycles every 3.5s
      </span>
    </div>
  );
}

export default MiniConsolePreview;

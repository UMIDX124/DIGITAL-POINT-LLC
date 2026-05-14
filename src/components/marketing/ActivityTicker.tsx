'use client';

import { useSyncExternalStore } from 'react';

const events = [
  { time: '14:32', tag: '[ops]', body: 'Faizan resolved a lead-routing edge case for Operations Ridge.' },
  { time: '13:08', tag: '[deploy]', body: 'CRM enrichment agent pushed to staging.' },
  { time: '11:47', tag: '[audit]', body: 'Written plan delivered to a $4.2M ARR ops lead.' },
  { time: '10:21', tag: '[ops]', body: 'Slack escalation handled in 6 minutes.' },
  { time: '09:15', tag: '[recovery]', body: 'Diagnosed a hallucinating support agent at a fintech client.' },
  { time: '08:42', tag: '[deploy]', body: 'Postgres backfill ran clean against 2.1M rows.' },
  { time: '07:30', tag: '[ops]', body: 'Anwaar approved overnight queue dispositions.' },
  { time: '06:12', tag: '[audit]', body: 'New audit request from a $1.8M ARR SaaS founder.' },
];

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

export function ActivityTicker() {
  const paused = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );

  const list = (key: string) => (
    <ul className="dpl-ticker__list" aria-hidden={key === 'b'}>
      {events.map((e, i) => (
        <li key={`${key}-${i}`} className="dpl-ticker__item" data-design-only="true">
          <span className="dpl-ticker__time">{e.time}</span>
          <span className="dpl-ticker__tag">{e.tag}</span>
          <span className="dpl-ticker__body">{e.body}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="dpl-ticker" aria-label="Recent operator activity">
      <div className="dpl-ticker__viewport">
        <div className={`dpl-ticker__rail ${paused ? 'is-paused' : ''}`}>
          {list('a')}
          {list('b')}
        </div>
      </div>
    </section>
  );
}

export default ActivityTicker;

import Link from 'next/link';
import { FooterExportedTime } from './FooterExportedTime';

const logs = [
  { time: '14:32:08', tag: 'audit', body: 'Audit no. 0184 delivered. Co-founder review attached.', level: 'ok' },
  { time: '14:18:41', tag: 'ops', body: 'Lead-routing edge case resolved by Faizan.', level: 'ok' },
  { time: '13:52:17', tag: 'recovery', body: 'Diagnosis ticket DPL-RC-039 closed.', level: 'info' },
  { time: '13:21:05', tag: 'system', body: 'Postgres backfill ran clean against 2.1M rows.', level: 'info' },
  { time: '12:48:33', tag: 'system', body: 'Operator handoff: Anwaar → Faizan.', level: 'rotation' },
];

export function Footer() {
  return (
    <footer className="dpl-footer dpl-footer--console" role="contentinfo">
      <div className="dpl-footer__inner">
        <div className="dpl-footer__head">
          <span className="dpl-footer__pulse" aria-hidden="true" />
          <span className="dpl-footer__head-label">
            Operator console · tail -f /var/log/dpl.log
          </span>
        </div>

        <ul className="dpl-footer__log" aria-label="Recent system log lines">
          {logs.map((l, i) => (
            <li key={i} className="dpl-footer__log-row" data-design-only="true">
              <span className="dpl-footer__log-time">[{l.time}]</span>
              <span className="dpl-footer__log-body">
                <span className="dpl-footer__log-tag">[{l.tag}]</span>
                {' '}{l.body}
              </span>
              <span className="dpl-footer__log-level">{l.level}</span>
            </li>
          ))}
        </ul>

        <div className="dpl-footer__nav" aria-label="Site links">
          <Link href="/agents" className="dpl-footer__link">/agents</Link>
          <Link href="/automation" className="dpl-footer__link">/automation</Link>
          <Link href="/operators" className="dpl-footer__link">/operators</Link>
          <Link href="/recovery" className="dpl-footer__link">/recovery</Link>
          <Link href="/pricing" className="dpl-footer__link">/pricing</Link>
          <Link href="/stack" className="dpl-footer__link">/stack</Link>
          <Link href="/audit" className="dpl-footer__link">/audit</Link>
          <Link href="/about" className="dpl-footer__link">/about</Link>
          <Link href="/blog" className="dpl-footer__link">/blog</Link>
          <Link href="/contact" className="dpl-footer__link">/contact</Link>
        </div>

        <div className="dpl-footer__bar">
          <span className="dpl-footer__brand">DPL · Wilmington DE · 2017 → present</span>
          <span className="dpl-footer__doc">
            Document version 2026.05 · Exported <FooterExportedTime />
          </span>
          <span className="dpl-footer__copy">
            © {new Date().getUTCFullYear()} Digital Point LLC ·{' '}
            <Link href="/privacy-policy" className="dpl-footer__link">Privacy</Link>{' · '}
            <Link href="/terms-of-service" className="dpl-footer__link">Terms</Link>{' · '}
            <Link href="/cookies" className="dpl-footer__link">Cookies</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

'use client';

import { useEffect, useState } from 'react';
import { Logomark } from '@/components/brand/Logomark';

/**
 * Operator-console boot splash. Premium brand moment on first hard
 * page-load per session — staggered mono boot lines, ending on the
 * founder handoff so the "human watches the agents" promise lands
 * at first paint.
 *
 * Gate: sessionStorage flag `dpl_splash_seen` set on first show.
 * Returning navigations in the same tab skip the 3.4s tax. Fresh
 * tab open still gets the brand moment.
 *
 * Render strategy: SSR returns null, useEffect reads/writes
 * sessionStorage after hydration. Hydration mismatch-free because
 * the SSR output and first client render both produce nothing —
 * splash mounts on the effect tick.
 *
 * Pure CSS animation. prefers-reduced-motion hides it via globals.css.
 */
export function IntroSplash() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    let firstVisit = true;
    try {
      if (sessionStorage.getItem('dpl_splash_seen')) {
        firstVisit = false;
      } else {
        sessionStorage.setItem('dpl_splash_seen', '1');
      }
    } catch {
      // Private mode / SSR: default to showing.
    }
    if (firstVisit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldShow(true);
    }
  }, []);

  if (!shouldShow) return null;

  return (
    <div className="dpl-intro-loader" aria-hidden="true">
      <header className="dpl-intro-head">
        <span className="dpl-intro-head__cell">DPL · Operator Console · 2026.05</span>
        <span className="dpl-intro-head__cell dpl-intro-head__cell--right">Wilmington · UTC</span>
      </header>
      <span className="dpl-intro-line" />
      <ol className="dpl-intro-boot" role="presentation">
        <li className="dpl-intro-boot__row" style={{ animationDelay: '0.40s' }}>
          <span className="dpl-intro-boot__ts">[00:00.42]</span>
          <span className="dpl-intro-boot__label">booting agent fleet</span>
          <span className="dpl-intro-boot__status">ok</span>
        </li>
        <li className="dpl-intro-boot__row" style={{ animationDelay: '0.58s' }}>
          <span className="dpl-intro-boot__ts">[00:00.71]</span>
          <span className="dpl-intro-boot__label">postgres.warm</span>
          <span className="dpl-intro-boot__status">ok</span>
        </li>
        <li className="dpl-intro-boot__row" style={{ animationDelay: '0.76s' }}>
          <span className="dpl-intro-boot__ts">[00:01.03]</span>
          <span className="dpl-intro-boot__label">groq.inference</span>
          <span className="dpl-intro-boot__status">ok</span>
        </li>
        <li className="dpl-intro-boot__row" style={{ animationDelay: '0.94s' }}>
          <span className="dpl-intro-boot__ts">[00:01.28]</span>
          <span className="dpl-intro-boot__label">n8n.orchestration</span>
          <span className="dpl-intro-boot__status">ok</span>
        </li>
        <li className="dpl-intro-boot__row" style={{ animationDelay: '1.12s' }}>
          <span className="dpl-intro-boot__ts">[00:01.56]</span>
          <span className="dpl-intro-boot__label">retainers.active</span>
          <span className="dpl-intro-boot__status">6</span>
        </li>
        <li className="dpl-intro-boot__row" style={{ animationDelay: '1.30s' }}>
          <span className="dpl-intro-boot__ts">[00:01.82]</span>
          <span className="dpl-intro-boot__label">operator handoff</span>
          <span className="dpl-intro-boot__status dpl-intro-boot__status--accent">faizan</span>
        </li>
        <li className="dpl-intro-boot__row" style={{ animationDelay: '1.48s' }}>
          <span className="dpl-intro-boot__ts">[00:02.04]</span>
          <span className="dpl-intro-boot__label">backup</span>
          <span className="dpl-intro-boot__status dpl-intro-boot__status--accent">anwaar</span>
        </li>
        <li className="dpl-intro-boot__row" style={{ animationDelay: '1.66s' }}>
          <span className="dpl-intro-boot__ts">[00:02.28]</span>
          <span className="dpl-intro-boot__label">ready</span>
          <span className="dpl-intro-boot__status dpl-intro-boot__status--ready" aria-hidden="true">▸</span>
        </li>
      </ol>
      <span className="dpl-intro-mark">
        <Logomark mode="lockup" variant="light" markSize={44} textSize={132} gap={12} className="dpl-intro-mark-lockup" />
      </span>
    </div>
  );
}

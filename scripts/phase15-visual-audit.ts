/**
 * Phase 15 visual audit — Playwright headless screenshots + axe-core a11y scan.
 * Runs against production https://www.digitalpointllc.com.
 * Output: /tmp/phase15-visual-audit/{screenshots,a11y-violations.json,timing.json}
 */
import { chromium, devices, type Browser, type BrowserContext, type Page } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import * as fs from 'node:fs';
import * as path from 'node:path';

const BASE = 'https://www.digitalpointllc.com';
const OUT = '/tmp/phase15-visual-audit';
const SHOTS = path.join(OUT, 'screenshots');

const PAGES: Array<{ id: string; path: string }> = [
  { id: 'home', path: '/' },
  { id: 'about', path: '/about' },
  { id: 'case-studies', path: '/case-studies' },
  { id: 'results', path: '/results' },
  { id: 'blog', path: '/blog' },
  { id: 'blog-post', path: '/blog/ab-testing-ads-guide' },
  { id: 'performance-marketing', path: '/performance-marketing' },
  { id: 'remote-workforce', path: '/remote-workforce' },
  { id: 'automation', path: '/automation' },
  { id: 'systems-reporting', path: '/systems-reporting' },
  { id: 'free-growth-audit', path: '/free-growth-audit' },
  { id: 'contact', path: '/contact' },
];

const VIEWPORTS = [
  { id: 'desktop', width: 1440, height: 900, isMobile: false },
  { id: 'mobile', width: 375, height: 812, isMobile: true },
];

type A11yResult = {
  page: string;
  viewport: string;
  url: string;
  violations: Array<{ id: string; impact: string | null | undefined; help: string; nodes: number; targets: string[] }>;
};

async function main() {
  fs.mkdirSync(SHOTS, { recursive: true });
  const browser: Browser = await chromium.launch({ headless: true });
  const a11yResults: A11yResult[] = [];
  const timing: Record<string, number> = {};

  for (const vp of VIEWPORTS) {
    const ctx: BrowserContext = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      deviceScaleFactor: 2,
      userAgent: vp.isMobile
        ? devices['iPhone 13'].userAgent
        : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Phase15Audit',
    });
    const page: Page = await ctx.newPage();

    for (const p of PAGES) {
      const url = `${BASE}${p.path}`;
      const key = `${p.id}-${vp.id}`;
      const t0 = Date.now();
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        // Suppress IntroLoader + force-reveal all opacity:0 reveal targets
        // so the full-page screenshot captures content instead of mid-animation
        // empty space. This mirrors the 1.5s safety net in ScrollMotion.
        await page.evaluate(() => {
          try { sessionStorage.setItem('dpl_i', '1'); document.documentElement.dataset.iSeen = '1'; } catch {}
          const loader = document.querySelector('.dpl-intro-loader');
          if (loader) (loader as HTMLElement).style.display = 'none';
          const sels = [
            '[data-pillar-card]', '[data-case-strip] > a', '[data-reveal]',
            '[data-stagger-item]', '[data-service-item]', '[data-work-card]',
            '[data-testimonial-card]', '.pull-quote-text', '[data-word-reveal]',
            '[data-workflow-label]', '[data-hero-eyebrow]', '[data-hero-sub]',
            '[data-hero-cta]', '[data-hero-orb]',
          ];
          document.querySelectorAll(sels.join(',')).forEach((el) => {
            const e = el as HTMLElement;
            e.classList.add('is-revealed');
            e.style.opacity = '';
            e.style.transform = '';
            e.style.visibility = '';
          });
        });
        await page.waitForTimeout(1200); // let CSS animations settle
        await page.screenshot({
          path: path.join(SHOTS, `${key}.png`),
          fullPage: true,
        });

        // axe-core scan
        const axe = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        a11yResults.push({
          page: p.id,
          viewport: vp.id,
          url,
          violations: axe.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            help: v.help,
            nodes: v.nodes.length,
            targets: v.nodes.slice(0, 3).map((n) => n.target.join(' > ')),
          })),
        });

        timing[key] = Date.now() - t0;
        console.log(`[ok]  ${key}  ${timing[key]}ms  violations=${axe.violations.length}`);
      } catch (err) {
        console.log(`[err] ${key}  ${(err as Error).message}`);
        timing[key] = -1;
      }
    }
    await ctx.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(OUT, 'a11y-violations.json'),
    JSON.stringify(a11yResults, null, 2),
  );
  fs.writeFileSync(path.join(OUT, 'timing.json'), JSON.stringify(timing, null, 2));

  // Summary
  const total = Object.values(timing).filter((n) => n > 0).length;
  const failed = Object.values(timing).filter((n) => n < 0).length;
  const a11ySummary: Record<string, number> = {};
  for (const r of a11yResults) {
    for (const v of r.violations) {
      const k = `${v.impact || 'none'}:${v.id}`;
      a11ySummary[k] = (a11ySummary[k] || 0) + 1;
    }
  }
  console.log(`\nDONE: ${total} screenshots, ${failed} failed`);
  console.log(`a11y rollup:`);
  Object.entries(a11ySummary)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, n]) => console.log(`  ${n}× ${k}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

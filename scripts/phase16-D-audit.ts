import { chromium } from 'playwright';
import * as fs from 'node:fs';

async function main() {
  const out = '/tmp/phase16';
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3009', { waitUntil: 'networkidle', timeout: 30000 });
  await page.evaluate(() => {
    try { sessionStorage.setItem('dpl_i', '1'); document.documentElement.dataset.iSeen = '1'; } catch {}
    const loader = document.querySelector('.dpl-intro-loader');
    if (loader) (loader as HTMLElement).style.display = 'none';
    document.querySelectorAll('[data-hero-eyebrow], [data-hero-sub], [data-hero-cta], [data-hero-orb], [data-word-reveal], .word, .word-inner, [data-reveal], [data-stagger-item], [data-work-card], .pull-quote-text').forEach((el) => {
      const e = el as HTMLElement;
      e.classList.add('is-revealed');
      e.style.opacity = '1';
      e.style.transform = 'none';
      e.style.visibility = 'visible';
    });
  });
  await page.waitForTimeout(1500);

  // D.3 — Recent Work full-bleed
  await page.locator('#recent-work').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${out}/D3-recent-work-1920.png`, fullPage: false });

  // D.4 — Pull-quote
  await page.locator('.pull-quote-text').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${out}/D4-pullquote-1920.png`, fullPage: false });

  // D.5 — Cosmo trigger button
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);
  const trigger = page.locator('[data-chat-trigger]').first();
  if (await trigger.count() > 0) {
    try { await trigger.screenshot({ path: `${out}/D5-cosmo-trigger.png`, timeout: 10000 }); }
    catch { await page.screenshot({ path: `${out}/D5-bottom-right.png`, clip: { x: 1820, y: 990, width: 100, height: 90 } }); }
  } else {
    await page.screenshot({ path: `${out}/D5-bottom-right.png`, clip: { x: 1820, y: 990, width: 100, height: 90 } });
  }

  console.log('DONE');
  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });

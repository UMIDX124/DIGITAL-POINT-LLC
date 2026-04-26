import { chromium } from 'playwright';
import * as fs from 'node:fs';

async function main() {
  const out = '/tmp/phase16';
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const vp of [
    { id: 'desktop-1440', width: 1440, height: 900 },
    { id: 'tablet-1024', width: 1024, height: 768 },
    { id: 'mobile-375', width: 375, height: 812, isMobile: true },
  ]) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile ?? false,
      deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.goto('http://localhost:3008', { waitUntil: 'networkidle', timeout: 30000 });
    await page.evaluate(() => {
      try { sessionStorage.setItem('dpl_i', '1'); document.documentElement.dataset.iSeen = '1'; } catch {}
      const loader = document.querySelector('.dpl-intro-loader');
      if (loader) (loader as HTMLElement).style.display = 'none';
      // Force-reveal hero
      document.querySelectorAll('[data-hero-eyebrow], [data-hero-sub], [data-hero-cta], [data-hero-orb], [data-word-reveal], .word, .word-inner, [data-reveal], [data-stagger-item], .pull-quote-text').forEach((el) => {
        const e = el as HTMLElement;
        e.classList.add('is-revealed');
        e.style.opacity = '1';
        e.style.transform = 'none';
        e.style.visibility = 'visible';
      });
    });
    await page.waitForTimeout(1500);

    // Zoomed crop on the hero h1 (the AI)
    const heroEm = await page.locator('.hero-em').first();
    if (await heroEm.count() > 0) {
      await heroEm.screenshot({ path: `${out}/D1-hero-em-${vp.id}.png` });
    }

    // Full hero viewport
    await page.screenshot({
      path: `${out}/D1-hero-${vp.id}.png`,
      clip: { x: 0, y: 0, width: vp.width, height: vp.height },
    });

    // Scroll to pull-quote
    const pq = page.locator('.pull-quote-text').first();
    if (await pq.count() > 0) {
      await pq.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await pq.screenshot({ path: `${out}/D1-pullquote-${vp.id}.png` });
    }
    console.log(`captured ${vp.id}`);
    await ctx.close();
  }
  await browser.close();
  console.log('DONE');
}

main().catch((e) => { console.error(e); process.exit(1); });

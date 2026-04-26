import { chromium } from 'playwright';
import * as fs from 'node:fs';

async function main() {
  const out = '/tmp/phase16';
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const vp of [
    { id: 'desktop', width: 1440, height: 900 },
    { id: 'tablet', width: 1024, height: 768 },
  ]) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });
    await page.evaluate(() => {
      try { sessionStorage.setItem('dpl_i', '1'); document.documentElement.dataset.iSeen = '1'; } catch {}
      const loader = document.querySelector('.dpl-intro-loader');
      if (loader) (loader as HTMLElement).style.display = 'none';
      // Force-reveal hero — word-reveal uses inner spans with translate
      // applied via GSAP. Reset ALL hero-scoped inline styles.
      const heroSel = '[data-hero-eyebrow], [data-hero-sub], [data-hero-cta], [data-hero-orb], [data-word-reveal], .word, .word-inner';
      document.querySelectorAll(heroSel).forEach((el) => {
        const e = el as HTMLElement;
        e.style.opacity = '1';
        e.style.transform = 'none';
        e.style.visibility = 'visible';
      });
      // Reveal sections that gate via opacity
      document.querySelectorAll('[data-reveal], [data-stagger-item], [data-pillar-card], [data-case-strip] > a, [data-service-item], [data-work-card], [data-testimonial-card], .pull-quote-text').forEach((el) => {
        const e = el as HTMLElement;
        e.classList.add('is-revealed');
        e.style.opacity = '';
        e.style.transform = '';
      });
    });
    await page.waitForTimeout(1500);

    // Hero-only viewport screenshot (above the fold)
    await page.screenshot({
      path: `${out}/orbit-mockup-${vp.id}.png`,
      fullPage: false,
      clip: { x: 0, y: 0, width: vp.width, height: vp.height },
    });
    console.log(`captured ${vp.id}`);
    await ctx.close();
  }
  await browser.close();
  console.log('DONE');
}

main().catch((e) => { console.error(e); process.exit(1); });

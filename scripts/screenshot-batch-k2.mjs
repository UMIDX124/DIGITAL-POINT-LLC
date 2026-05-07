import { chromium } from 'playwright';

const URL = 'https://digitalpointllc-1-3iw4vics6-umidx124s-projects.vercel.app/';
const BYPASS = '8QB5uUPV5nabqTlUwyRtAyAEZmceeFKU';

const FULL_URL = `${URL}?x-vercel-protection-bypass=${BYPASS}&x-vercel-set-bypass-cookie=true`;

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto(FULL_URL, { waitUntil: 'networkidle', timeout: 60000 });
  // Three.js loads via requestIdleCallback at 1500ms — wait long enough for
  // the scene to spin up and render at least a few frames.
  await page.waitForTimeout(5500);

  await page.screenshot({ path: '/tmp/dpl-k2-1-hero-a.jpg', fullPage: false, quality: 88 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/dpl-k2-2-hero-b.jpg', fullPage: false, quality: 88 });

  await browser.close();
  console.log('OK');
})();

import { chromium } from 'playwright';

const URL = 'https://digitalpointllc-1-dso7rodbi-umidx124s-projects.vercel.app/';
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
  await page.waitForTimeout(3000);

  await page.screenshot({ path: '/tmp/dpl-k1-1-hero.jpg', fullPage: false, quality: 88 });

  await page.evaluate(() => window.scrollBy({ top: window.innerHeight * 1.0, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/dpl-k1-2-manifesto-a.jpg', fullPage: false, quality: 88 });

  await page.evaluate(() => window.scrollBy({ top: window.innerHeight * 1.0, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/dpl-k1-3-manifesto-b.jpg', fullPage: false, quality: 88 });

  await page.evaluate(() => window.scrollBy({ top: window.innerHeight * 1.2, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/dpl-k1-4-services-a.jpg', fullPage: false, quality: 88 });

  await page.evaluate(() => window.scrollBy({ top: window.innerHeight * 1.0, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/dpl-k1-5-services-b.jpg', fullPage: false, quality: 88 });

  await page.evaluate(() => window.scrollBy({ top: window.innerHeight * 1.0, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/dpl-k1-6-services-c.jpg', fullPage: false, quality: 88 });

  await browser.close();
  console.log('OK');
})();

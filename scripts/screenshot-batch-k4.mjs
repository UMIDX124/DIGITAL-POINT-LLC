import { chromium } from 'playwright';

const URL = 'https://digitalpointllc-1-l9hgofp91-umidx124s-projects.vercel.app/';
const BYPASS = '8QB5uUPV5nabqTlUwyRtAyAEZmceeFKU';
const FULL_URL = `${URL}?x-vercel-protection-bypass=${BYPASS}&x-vercel-set-bypass-cookie=true`;

(async () => {
  const browser = await chromium.launch();

  // Desktop hero
  const dCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const dPage = await dCtx.newPage();
  await dPage.goto(FULL_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await dPage.waitForTimeout(5500);
  await dPage.screenshot({ path: '/tmp/dpl-k4-1-desktop-hero.jpg', fullPage: false, quality: 88 });

  // Scroll once and check that scroll-progress var actually moves smoothly (visual proof of throttle)
  await dPage.evaluate(() => window.scrollBy({ top: window.innerHeight * 1.5, behavior: 'instant' }));
  await dPage.waitForTimeout(700);
  await dPage.screenshot({ path: '/tmp/dpl-k4-2-desktop-scrolled.jpg', fullPage: false, quality: 88 });

  // Mobile fallback hero
  const mCtx = await browser.newContext({ viewport: { width: 414, height: 896 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const mPage = await mCtx.newPage();
  await mPage.goto(FULL_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await mPage.waitForTimeout(3500);
  await mPage.screenshot({ path: '/tmp/dpl-k4-3-mobile-hero.jpg', fullPage: false, quality: 88 });

  await browser.close();
  console.log('OK');
})();

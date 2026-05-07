import { chromium } from 'playwright';

const URL = 'https://digitalpointllc-1-a37w1vk1a-umidx124s-projects.vercel.app/';
const BYPASS = '8QB5uUPV5nabqTlUwyRtAyAEZmceeFKU';
const FULL_URL = `${URL}?x-vercel-protection-bypass=${BYPASS}&x-vercel-set-bypass-cookie=true`;

(async () => {
  const browser = await chromium.launch();

  // Desktop with motion
  const dCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const dPage = await dCtx.newPage();
  await dPage.goto(FULL_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await dPage.waitForTimeout(6000);
  await dPage.screenshot({ path: '/tmp/dpl-k5-1-desktop-hero.jpg', fullPage: false, quality: 88 });

  await dPage.evaluate(() => window.scrollBy({ top: window.innerHeight * 1.0, behavior: 'instant' }));
  await dPage.waitForTimeout(700);
  await dPage.screenshot({ path: '/tmp/dpl-k5-2-manifesto.jpg', fullPage: false, quality: 88 });

  await dPage.evaluate(() => window.scrollBy({ top: window.innerHeight * 2.5, behavior: 'instant' }));
  await dPage.waitForTimeout(700);
  await dPage.screenshot({ path: '/tmp/dpl-k5-3-services.jpg', fullPage: false, quality: 88 });

  // Mobile
  const mCtx = await browser.newContext({
    viewport: { width: 414, height: 896 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'no-preference',
  });
  const mPage = await mCtx.newPage();
  await mPage.goto(FULL_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await mPage.waitForTimeout(3500);
  await mPage.screenshot({ path: '/tmp/dpl-k5-4-mobile-hero.jpg', fullPage: false, quality: 88 });

  await browser.close();
  console.log('OK');
})();

import { chromium } from 'playwright';

const URL = 'https://digitalpointllc-1-4gmxs70y6-umidx124s-projects.vercel.app/';
const BYPASS = '8QB5uUPV5nabqTlUwyRtAyAEZmceeFKU';
const FULL_URL = `${URL}?x-vercel-protection-bypass=${BYPASS}&x-vercel-set-bypass-cookie=true`;

(async () => {
  const browser = await chromium.launch();
  const dCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const dPage = await dCtx.newPage();
  await dPage.goto(FULL_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await dPage.waitForTimeout(6000);
  await dPage.screenshot({ path: '/tmp/dpl-k6-1-desktop-hero.jpg', fullPage: false, quality: 88 });

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
  await mPage.screenshot({ path: '/tmp/dpl-k6-2-mobile-hero.jpg', fullPage: false, quality: 88 });

  await browser.close();
  console.log('OK');
})();

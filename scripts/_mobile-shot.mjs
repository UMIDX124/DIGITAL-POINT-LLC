import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';

const URL = process.argv[2] || 'http://127.0.0.1:3000/';
const OUT_DIR = '/tmp/dpl-mobile';
await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  ...devices['iPhone 14 Pro'],
});
const page = await ctx.newPage();
await page.addInitScript(() => {
  try { sessionStorage.setItem('dpl_splash_seen', '1'); } catch {}
});
await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(800);

const totalHeight = await page.evaluate(() => document.body.scrollHeight);
const viewportH = 852;
const folds = Math.ceil(totalHeight / viewportH);
console.log('totalHeight:', totalHeight, 'folds:', folds);

for (let i = 0; i < Math.min(folds, 14); i++) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), i * viewportH);
  await page.waitForTimeout(250);
  const out = `${OUT_DIR}/fold-${String(i).padStart(2, '0')}.png`;
  await page.screenshot({ path: out, fullPage: false });
  console.log('  fold', i, '→', out);
}

await browser.close();
console.log('done');

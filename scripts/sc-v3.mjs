import { chromium } from 'playwright';
const routes = ['/', '/guides', '/blog'];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
for (const r of routes) {
  const slug = r === '/' ? 'home' : r.replace(/\//g, '');
  await p.goto('http://localhost:3109' + r, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await p.waitForTimeout(2500);
  await p.screenshot({ path: `/tmp/v3-${slug}.png`, fullPage: false });
  console.log(`${r} ok`);
}
await b.close();

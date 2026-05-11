import { chromium } from 'playwright';
const routes = ['/about', '/contact', '/faq'];
const base = 'http://localhost:3104';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
for (const r of routes) {
  const slug = r.replace(/\//g, '');
  await p.goto(base + r, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await p.waitForTimeout(2200);
  await p.screenshot({ path: `/tmp/route-${slug}-desktop.png`, fullPage: false });
  console.log(`${r} ok`);
}
await b.close();

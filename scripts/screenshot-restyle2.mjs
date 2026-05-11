import { chromium } from 'playwright';
const routes = ['/tools', '/research', '/case-studies'];
const base = 'http://localhost:3108';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
for (const r of routes) {
  const slug = r.replace(/\//g, '');
  await p.goto(base + r, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await p.waitForTimeout(2000);
  await p.screenshot({ path: `/tmp/restyle-${slug}.png`, fullPage: false });
  console.log(`${r} ok`);
}
await b.close();

import { chromium } from 'playwright';
const routes = ['/', '/recovery', '/agents', '/operators', '/pricing', '/process', '/stack', '/automation'];
const base = 'http://localhost:3103';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
for (const r of routes) {
  const slug = r === '/' ? 'home' : r.replace(/\//g, '');
  await p.goto(base + r, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await p.waitForTimeout(2200);
  await p.screenshot({ path: `/tmp/route-${slug}-desktop.png`, fullPage: false });
  console.log(`${r} desktop ok`);
}
await ctx.close();
const ctxm = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const pm = await ctxm.newPage();
for (const r of ['/', '/recovery', '/pricing']) {
  const slug = r === '/' ? 'home' : r.replace(/\//g, '');
  await pm.goto(base + r, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await pm.waitForTimeout(2200);
  await pm.screenshot({ path: `/tmp/route-${slug}-mobile.png`, fullPage: true });
  console.log(`${r} mobile ok`);
}
await b.close();

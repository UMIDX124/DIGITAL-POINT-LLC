import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
const urls = [
  ['home', 'https://www.digitalpointllc.com/'],
  ['automation', 'https://www.digitalpointllc.com/automation'],
  ['contact', 'https://www.digitalpointllc.com/contact'],
  ['audit', 'https://www.digitalpointllc.com/free-growth-audit'],
];
for (const [name, url] of urls) {
  await p.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await p.screenshot({ path: `/tmp/dpl-${name}-mobile.png`, fullPage: true });
  console.log(`${name} mobile ${(await p.title()).slice(0,60)}`);
}
await ctx.close();
const ctx2 = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p2 = await ctx2.newPage();
for (const [name, url] of urls) {
  await p2.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await p2.screenshot({ path: `/tmp/dpl-${name}-desktop.png`, fullPage: false });
  console.log(`${name} desktop ${(await p2.title()).slice(0,60)}`);
}
await b.close();

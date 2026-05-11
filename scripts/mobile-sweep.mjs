import { chromium } from 'playwright';
const routes = ['/', '/recovery', '/agents', '/automation', '/operators', '/pricing', '/process', '/stack', '/audit', '/diagnostic', '/about', '/contact', '/faq', '/results', '/case-studies', '/tools', '/research', '/guides', '/blog'];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
const issues = [];
for (const r of routes) {
  const slug = r === '/' ? 'home' : r.replace(/\//g, '');
  try {
    await p.goto('http://localhost:3110' + r, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await p.waitForTimeout(1500);
    // Check for horizontal overflow
    const overflow = await p.evaluate(() => {
      const doc = document.documentElement;
      const body = document.body;
      const docW = doc.scrollWidth;
      const viewW = doc.clientWidth;
      return { docW, viewW, overflow: docW > viewW };
    });
    await p.screenshot({ path: `/tmp/mob-${slug}.png`, fullPage: false });
    if (overflow.overflow) issues.push(`${r}: overflow docW=${overflow.docW} viewW=${overflow.viewW}`);
    console.log(`${r} ${overflow.overflow ? 'OVERFLOW' : 'ok'}`);
  } catch (e) {
    console.log(`${r} ERROR: ${e.message.slice(0,60)}`);
    issues.push(`${r}: ${e.message.slice(0,60)}`);
  }
}
console.log('\n=== ISSUES ===');
issues.forEach((i) => console.log(i));
await b.close();

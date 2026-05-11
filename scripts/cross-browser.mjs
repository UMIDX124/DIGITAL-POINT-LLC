import { chromium, firefox, webkit } from 'playwright';

const routes = ['/', '/recovery', '/agents', '/automation', '/operators', '/pricing', '/process', '/stack', '/audit', '/diagnostic', '/about', '/contact', '/faq', '/results', '/case-studies', '/tools', '/research', '/guides', '/blog'];

const engines = [
  { name: 'chromium', launch: chromium },
  { name: 'firefox', launch: firefox },
  { name: 'webkit', launch: webkit },
];

const base = 'https://www.digitalpointllc.com';
const issues = [];

for (const e of engines) {
  console.log(`\n=== ${e.name} ===`);
  const b = await e.launch.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  p.on('pageerror', (err) => issues.push({ engine: e.name, kind: 'pageerror', msg: String(err).slice(0, 200) }));
  p.on('console', (msg) => {
    if (msg.type() === 'error') {
      const t = msg.text();
      if (!t.includes('vercel-insights') && !t.includes('csp_report')) {
        issues.push({ engine: e.name, kind: 'console-error', msg: t.slice(0, 200) });
      }
    }
  });
  for (const r of routes) {
    try {
      const resp = await p.goto(base + r, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await p.waitForTimeout(1500);
      const code = resp ? resp.status() : 0;
      const overflow = await p.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      const slug = r === '/' ? 'home' : r.replace(/\//g, '');
      await p.screenshot({ path: `/tmp/cb-${e.name}-${slug}.png`, fullPage: false });
      const status = (code === 200 ? 'ok' : `code:${code}`) + (overflow ? ' OVERFLOW' : '');
      console.log(`  ${r}: ${status}`);
      if (overflow) issues.push({ engine: e.name, kind: 'overflow', route: r });
      if (code !== 200) issues.push({ engine: e.name, kind: 'status', route: r, code });
    } catch (err) {
      console.log(`  ${r}: ERR ${String(err).slice(0, 60)}`);
      issues.push({ engine: e.name, kind: 'nav-error', route: r, msg: String(err).slice(0, 200) });
    }
  }
  await b.close();
}

console.log('\n=== TOTAL ISSUES ===', issues.length);
const grouped = {};
for (const i of issues) {
  const k = `${i.engine}/${i.kind}`;
  grouped[k] = (grouped[k] || 0) + 1;
}
for (const [k, v] of Object.entries(grouped)) console.log(`  ${k}: ${v}`);
if (issues.length > 0) {
  console.log('\n=== DETAIL (first 15) ===');
  for (const i of issues.slice(0, 15)) console.log(JSON.stringify(i));
}

#!/usr/bin/env node
// Audit screenshot harness.
// Usage:
//   node scripts/audit-screenshots.mjs <commit-number> [page-paths...]
// Example:
//   node scripts/audit-screenshots.mjs 5 / /pricing /blog
//
// Saves to docs/screenshots/commit-NN/<page-slug>-<viewport>.png.
// Requires dev server running on http://localhost:3000.

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const VIEWPORTS = [
  { name: '360', width: 360, height: 800 },
  { name: '768', width: 768, height: 1024 },
  { name: '1440', width: 1440, height: 900 },
];

const DEFAULT_PAGES = ['/', '/pricing', '/about', '/recovery', '/blog'];

function slug(pagePath) {
  if (pagePath === '/') return 'home';
  return pagePath.replace(/^\//, '').replace(/\//g, '-');
}

async function main() {
  const commitNum = process.argv[2];
  if (!commitNum || !/^\d+$/.test(commitNum)) {
    console.error('Usage: node scripts/audit-screenshots.mjs <commit-number> [page-paths...]');
    process.exit(1);
  }
  const padded = String(commitNum).padStart(2, '0');
  const pages = process.argv.slice(3).length > 0 ? process.argv.slice(3) : DEFAULT_PAGES;

  const outDir = path.join('docs', 'screenshots', `commit-${padded}`);
  await mkdir(outDir, { recursive: true });

  console.log(`Base URL: ${BASE}`);
  console.log(`Pages: ${pages.join(', ')}`);
  console.log(`Viewports: ${VIEWPORTS.map((v) => v.name).join(', ')}`);
  console.log(`Output: ${outDir}\n`);

  const browser = await chromium.launch();
  let failed = 0;

  for (const pagePath of pages) {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await ctx.newPage();
      const url = `${BASE}${pagePath}`;
      const outPath = path.join(outDir, `${slug(pagePath)}-${vp.name}.png`);
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
        await page.screenshot({ path: outPath, fullPage: true });
        console.log(`  ok  ${url}  ${vp.name}  →  ${outPath}`);
      } catch (err) {
        console.error(`  fail ${url}  ${vp.name}  ${err.message}`);
        failed++;
      }
      await ctx.close();
    }
  }

  await browser.close();

  if (failed > 0) {
    console.error(`\n${failed} screenshot(s) failed.`);
    process.exit(1);
  }
  console.log(`\nAll screenshots saved under ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

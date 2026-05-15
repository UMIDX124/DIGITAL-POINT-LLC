#!/usr/bin/env node
/**
 * Recompute the botid inline-script SHA-256 hash and compare against the
 * one pinned in src/proxy.ts. Fails CI when the hash drifts, so botid
 * package bumps can't silently break the CSP allowlist.
 *
 * Usage:
 *   node scripts/verify-botid-hash.mjs
 *
 * Requires a dev server running at http://127.0.0.1:3000 with the same
 * protect[] config as src/app/layout.tsx. CI flow:
 *   pnpm dev &  ;  sleep 8  ;  node scripts/verify-botid-hash.mjs
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const URL_TO_FETCH = process.env.DPL_URL || 'http://127.0.0.1:3000/';
const PROXY_PATH = new URL('../src/proxy.ts', import.meta.url).pathname;

async function main() {
  const html = await (await fetch(URL_TO_FETCH)).text();
  // Match the botid bootstrap inline script: <script>((...){protect:[...]})...</script>
  const match = html.match(/<script>(\(\(\{protect:[^<]+)<\/script>/);
  if (!match) {
    console.error('FAIL: botid inline script not found in', URL_TO_FETCH);
    process.exit(1);
  }
  const computed = "'sha256-" + createHash('sha256').update(match[1]).digest('base64') + "'";

  const proxySrc = readFileSync(PROXY_PATH, 'utf8');
  const pinnedMatch = proxySrc.match(/BOTID_INLINE_HASH\s*=\s*"([^"]+)"/);
  if (!pinnedMatch) {
    console.error('FAIL: BOTID_INLINE_HASH not found in', PROXY_PATH);
    process.exit(1);
  }
  const pinned = pinnedMatch[1];

  if (computed === pinned) {
    console.log('OK: botid hash matches', pinned);
    process.exit(0);
  }
  console.error('FAIL: botid hash drift');
  console.error('  pinned:   ', pinned);
  console.error('  computed: ', computed);
  console.error('Update BOTID_INLINE_HASH in src/proxy.ts with the computed value.');
  process.exit(1);
}

main().catch((e) => {
  console.error('FAIL:', e);
  process.exit(1);
});

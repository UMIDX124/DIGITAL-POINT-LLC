#!/usr/bin/env bash
# Pre-warms Vercel edge cache after a prod deploy so the first wave of real
# visitors doesn't hit cold-cache 503s on /_next/static/chunks/*.js.
#
# Why this exists:
#   Fresh deploys land with empty edge caches. Next.js home page pulls 14+
#   parallel JS chunks. Hitting origin in parallel can trip Vercel's burst
#   rate limit → 503 on a handful of chunks → Next.js retries → bad UX
#   for the first ~30s of users.
#
# What it does:
#   GETs the homepage + the next-rendered routes from this machine. Each
#   GET populates the local edge node, plus pulls and caches every linked
#   chunk on that edge. Vercel routes subsequent visitor requests to the
#   nearest cached edge.
#
# Usage:
#   pnpm warmup
#   # or directly:
#   ./scripts/post-deploy-warmup.sh https://www.digitalpointllc.com

set -euo pipefail

BASE="${1:-https://www.digitalpointllc.com}"
UA='Mozilla/5.0 (compatible; DPL-warmup/1.0)'

ROUTES=(
  "/"
  "/pricing"
  "/audit"
  "/contact"
  "/recovery"
  "/agents"
  "/automation"
  "/operators"
  "/stack"
  "/about"
  "/faq"
  "/process"
  "/case-studies"
  "/results"
  "/diagnostic"
  "/research"
  "/tools"
  "/blog"
  "/guides"
)

echo "→ warming ${#ROUTES[@]} routes on ${BASE}"

# Pass 1: pull HTML. This populates the edge with the HTML response and
# (more importantly) triggers the chunk preload hints so the edge starts
# fetching them.
for path in "${ROUTES[@]}"; do
  url="${BASE}${path}"
  code=$(curl -s -o /tmp/dpl-warmup-body -w "%{http_code}" -A "$UA" --max-time 30 "$url" || echo "ERR")
  printf "  %-3s  %s\n" "$code" "$path"
  # Extract every script src from the response and warm those URLs in parallel.
  grep -oE 'src="(/_next/static/[^"]+)"' /tmp/dpl-warmup-body 2>/dev/null \
    | sed -E 's|src="(.+)"|\1|' \
    | sort -u \
    | while read -r chunk; do
        curl -s -o /dev/null -A "$UA" --max-time 15 "${BASE}${chunk}" &
      done
  wait
done

# Pass 2: re-fetch the homepage to confirm the edge is now hot.
echo ""
echo "→ verifying edge cache state on /"
hdrs=$(curl -sI -A "$UA" --max-time 15 "${BASE}/")
echo "$hdrs" | grep -iE 'x-vercel-cache|cache-control|age' || true

rm -f /tmp/dpl-warmup-body
echo ""
echo "✓ warmup complete"

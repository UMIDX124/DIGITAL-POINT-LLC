# Sentry alert configuration

Sentry SDK is wired in code (instrumentation.ts + 3 sentry.*.config.ts +
4 Vercel env vars). The remaining piece is dashboard-side **alert rules**
so production regressions notify a human within minutes instead of
sitting silent until a customer complains.

Set these in https://digital-point-5d.sentry.io/issues/alerts/.

## 1. Recommended alert: new error in production

- **Name:** `Production · new error`
- **When (trigger):** "A new issue is created"
- **If (filter):** `environment` equals `production`
- **Then (action):** Send email to `backupsolutions1122@gmail.com`
  (and add Slack if a workspace gets wired later)
- **Frequency:** No throttle — first occurrence only because rule is on
  "new issue", duplicates won't refire

## 2. Recommended alert: regression of a resolved issue

- **Name:** `Regression`
- **When:** "An issue changes state from resolved to unresolved"
- **If:** `environment` equals `production`
- **Then:** Email

## 3. Recommended alert: chunk-load failures spike

These usually fire when an edge cache is cold after a deploy. App now
auto-recovers (src/app/error.tsx reloads on ChunkLoadError), but a
sustained spike means warmup didn't run or the edge is misbehaving.

- **Name:** `Chunk-load spike`
- **When:** "The issue is seen more than `25` times in `5 minutes`"
- **If:**
  - `environment` equals `production`
  - Issue title contains `ChunkLoadError` (or message matches `Loading chunk`)
- **Then:** Email + Slack
- **Frequency:** 1 hour throttle

## 4. Performance alert: TTFB or LCP regression

Only if you want it. Sentry Performance has its own alerting on
transaction p95s. Set after a week of baseline data so the threshold
isn't arbitrary.

## Linking Vercel to Sentry (optional)

The Sentry-Vercel integration lets Sentry auto-tag releases with the
Vercel commit SHA + deployment URL.

1. Sentry → Settings → Integrations → Vercel → Install
2. Connect to the `digitalpointllc-1` project
3. From now on every deploy creates a Sentry release; if a new error
   appears in a release the dashboard shows "regression in commit X"

## Verifying alerts fire

1. Trigger a test error via browser console on the live site:
   ```
   throw new Error("alert verification " + Date.now())
   ```
2. Check the recipient inbox within 5 minutes
3. Mute that test issue (Sentry → Issue → "Resolve" or "Ignore") so
   it doesn't keep arriving every time we test

# Analytics Tracking Audit (Phase 20 Loop H7)

> Generated 2026-05-07 · Phase 20 Loop H · audit + recommendations

## Current state (verified 2026-05-07)

### Tracked

- **Vercel Speed Insights** — wired in root layout (Phase 20 batch 4 commit b86e5f8). Captures real-user CWV at 75th percentile (LCP, INP, CLS) per route. Available immediately on production deployment via Vercel dashboard.
- **Google AdSense** — env-gated by `NEXT_PUBLIC_ADSENSE_ID`. Currently unset per ENV-AUDIT.md; no AdSense loads or tracks.
- **AnalyticsGate component** — mounted in root layout (`<AnalyticsGate />`). Phase 17b 3-restructured A3 — analytics gated on cookie consent. Need to verify which providers it gates.
- **Schema.org telemetry** — Organization, WebSite, LocalBusiness, BreadcrumbList, FAQPage, Service per pillar (5 added Phase 20), Person per founder (2 added Phase 20), BlogPosting per blog post (~100 inherited), Article per research deep-dive (5 inherited). Surfaces in AI-search citation tracking.

### NOT tracked (gaps)

- **Form completion events** — `/api/audit` and `/api/founder` POST routes have BotID protection + Resend send + Slack notify, but no analytics event fires on submit success/failure. Gap: cannot attribute marketing channel to qualified leads.
- **Scroll-depth events** — no scroll-depth tracking on hero, services, FAQ, or CTA sections. Gap: cannot diagnose engagement vs. drop-off per page.
- **CTA click events** — `data-cta` attributes inconsistent across pages. No central click-event handler.
- **Cosmo chat events** — no events fire on chat open / message sent / lead-routing trigger. Gap: cannot measure Cosmo-as-lead-qualification value.
- **Outbound link tracking** — no `data-outbound` markers on external links. Gap: cannot measure which research citations or vendor links drive traffic away.
- **Bot-blocked event volume** — BotID rejections happen server-side (good) but no aggregate counter surfaces, which makes BotID effectiveness unmeasurable post-deploy.
- **A/B test infrastructure** — none. Audit lists this as out-of-scope (UF directive: skip 5k).

## Recommendations (priority order)

### P1 — wire before next high-traffic moment

1. **Form-completion events on `/api/audit` and `/api/founder`**
   - On 200 response, fire a server-side event to whichever analytics provider AnalyticsGate enables (likely Plausible or PostHog given the cookie-consent gate)
   - Include: form type (audit / founder), referrer, UTM source, BotID outcome (clean / suspicious / blocked)
   - Effort: 2-4 hours
2. **Cosmo chat events**
   - Fire on: panel open, first message sent, response received, "Book scoping call" CTA click, lead-routing question answered
   - Effort: 1-2 hours

### P2 — wire within 2 weeks of go-live

3. **Scroll-depth on key pages** — `/`, `/automation`, `/performance-marketing`, `/results`, `/blog/*`. 25% / 50% / 75% / 100% breakpoints. Fire once per page per session.
4. **CTA click event handler** — central `data-cta="<name>"` attribute, single delegated click listener in root layout. One event per CTA click with the data-cta value.

### P3 — wire within 1 month

5. **Outbound link tracking** — `data-outbound` on all external links in /research and /blog. Fire on click.
6. **BotID rejection counter** — aggregate via server-side log analysis or Vercel Function metric.

### Out of scope per UF directive

- A/B testing setup (skip 5k)

## Recommended provider stack

If AnalyticsGate currently uses **Plausible** (privacy-first, EU-friendly): keep. Plausible covers P1-P3 with `<script defer data-domain>` + custom-event API.

If AnalyticsGate currently uses **GA4**: re-evaluate. GA4's privacy posture is borderline for the GDPR cookie-consent gate, and the events API is more cumbersome. Consider migration to Plausible or PostHog before adding more events.

If AnalyticsGate is currently **none**: PostHog (or Plausible) recommended. PostHog adds session-replay + funnel-analysis surface that GA4 / Plausible don't ship out of the box.

## Audit on AnalyticsGate

`src/components/compliance/AnalyticsGate.tsx` should be read to confirm which provider it currently gates. If unclear or gating multiple providers, recommend:

1. Audit file contents
2. Document which analytics provider is canonical for DPL
3. Wire P1 events against that provider only

## Status

Audit complete. Implementation queued for follow-up batches per priority order. Speed Insights is live as of Phase 20 batch 4 (2026-05-07).

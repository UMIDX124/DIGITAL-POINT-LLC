/**
 * Phase 13 — TestimonialsSection is currently a stub (returns null).
 *
 * The previous Phase 4f implementation rendered Sarah Chen / Marcus
 * Thompson / Jennifer Walsh quotes from `copy.testimonials`. Those
 * entries were fabricated and were removed for brand integrity — DPL
 * has onboarded clients but no published testimonials yet.
 *
 * To re-enable in Phase 14+:
 *   1. Restore the `testimonials` block in src/lib/copy.ts with shape
 *      { eyebrow, headline, items: [{ featured, quote, author, role,
 *      metric, metricLabel, initials }] }.
 *   2. Replace this stub with the prior implementation (see git
 *      history before commit phase-13-testimonials-removal).
 *   3. Re-mount <TestimonialsSection /> in src/app/(marketing)/page.tsx
 *      between WorkflowSection and CTASection.
 *
 * Component contract preserved so any stale import doesn't break.
 */
export function TestimonialsSection() {
  return null;
}

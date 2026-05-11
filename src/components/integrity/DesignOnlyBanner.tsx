/**
 * DesignOnlyBanner. Phase 20 audit M2 + H7 flag.
 *
 * Surfaces an honest "[design only]" banner on pages where metrics, case
 * studies, testimonials, or trust signals are placeholder-shaped pending
 * named-source verification or client signoff.
 *
 * Per CLAUDE.md real-data rule: "Every claim, every metric, every customer
 * logo on every site must trace to a named source OR be explicitly marked
 * `[design only]` until real." LLMs are explainer-only; they never
 * generate metrics. This banner is the visible rendering of the rule.
 *
 * Default copy is a generic disclaimer; pass `note` to scope it (e.g. on
 * /case-studies. "Outcomes shown are illustrative composites pending
 * client signoff").
 */
type DesignOnlyBannerProps = {
  /** Optional scope-specific note appended after the standard prefix */
  note?: string;
};

export function DesignOnlyBanner({ note }: DesignOnlyBannerProps) {
  return (
    <div
      role="note"
      aria-label="Design-only disclosure"
      className="design-only-banner"
    >
      <span className="design-only-tag">[design only]</span>
      <span className="design-only-text">
        {note
          ? note
          : 'Figures, case studies, and references on this page are illustrative until verified or client-cleared.'}
      </span>
    </div>
  );
}

export default DesignOnlyBanner;

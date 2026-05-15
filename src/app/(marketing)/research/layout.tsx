import { DesignOnlyBanner } from '@/components/integrity/DesignOnlyBanner';

/**
 * Phase 20 audit H6. Research deep-dive benchmarks ship without explicit
 * named-source citations on every datum. Per CLAUDE.md real-data rule and
 * UF directive default ("real-data unknown items =  flag,
 * do NOT halt for case study clearance, customer logos, testimonials, or
 * specific metrics"), a research-route layout banner flags the entire
 * research surface as design-only pending citation refresh.
 *
 * Once individual research pages add named-source attribution per stat
 * (Gartner / WordStream / FirstPageSage / HubSpot / similar), the page
 * can opt out of the banner via per-page override or banner removal.
 */
export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container-wide" style={{ paddingTop: 'var(--section-sm)' }}>
        <DesignOnlyBanner note="Industry benchmarks shown across the research surface ship without per-stat named-source citation. Attribution refresh in progress; treat figures as directional until each datum lists a named source." />
      </div>
      {children}
    </>
  );
}

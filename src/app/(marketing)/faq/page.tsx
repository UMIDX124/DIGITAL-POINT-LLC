/**
 * Phase 17b 3-reversal R2 — dedicated /faq route.
 *
 * FAQ section relocated off the homepage (Pillar 3-restructured H1 reverse).
 * The accordion + JSON-LD FAQPage schema render here. SEO benefit of
 * structured data preserved via this canonical URL.
 */

import type { Metadata } from 'next';
import { FAQSection } from '@/components/sections/FAQSection';
import { RelatedLinks } from '@/components/sections/RelatedLinks';

export const metadata: Metadata = {
  title: 'FAQ · Digital Point LLC',
  description:
    'Common questions about how Digital Point deploys AI agents, automation, and trained operators that replace operations headcount.',
  alternates: { canonical: 'https://www.digitalpointllc.com/faq' },
  openGraph: {
    title: 'FAQ · Digital Point LLC',
    description:
      'Common questions about how Digital Point deploys AI agents, automation, and trained operators that replace operations headcount.',
    url: 'https://www.digitalpointllc.com/faq',
    type: 'website',
  },
};

export default function FAQPage() {
  return (
    <main style={{ paddingTop: 'var(--section-top)' }}>
      <FAQSection />
      <RelatedLinks
        eyebrow="MORE CONTEXT"
        headline="The pages people land on after the FAQ."
        links={[
          {
            href: '/automation',
            label: 'What the agents run',
            body: 'Lead intake, document parsing, follow-up, reporting, portfolio monitoring. The actual workflows.',
          },
          {
            href: '/remote-workforce',
            label: 'Who audits the AI',
            body: 'Trained operators handling the exception cases the agents cannot resolve.',
          },
          {
            href: '/systems-reporting',
            label: 'How it all reports back',
            body: 'The reporting layer that makes every workflow legible without chasing a dashboard.',
          },
          {
            href: '/case-studies',
            label: 'Production examples',
            body: 'Anonymized engagements with operator-hours and pipeline numbers attached.',
          },
        ]}
      />
    </main>
  );
}

/**
 * Phase 17b 3-reversal R2 — dedicated /faq route.
 *
 * FAQ section relocated off the homepage (Pillar 3-restructured H1 reverse).
 * The accordion + JSON-LD FAQPage schema render here. SEO benefit of
 * structured data preserved via this canonical URL.
 */

import type { Metadata } from 'next';
import { FAQSection } from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'FAQ — Digital Point LLC',
  description:
    'Common questions about how Digital Point deploys AI agents, automation, and trained operators that replace operations headcount.',
  alternates: { canonical: 'https://digitalpointllc.com/faq' },
  openGraph: {
    title: 'FAQ — Digital Point LLC',
    description:
      'Common questions about how Digital Point deploys AI agents, automation, and trained operators that replace operations headcount.',
    url: 'https://digitalpointllc.com/faq',
    type: 'website',
  },
};

export default function FAQPage() {
  return (
    <main style={{ paddingTop: 'var(--section-top)' }}>
      <FAQSection />
    </main>
  );
}

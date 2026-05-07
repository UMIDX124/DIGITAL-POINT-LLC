import { AboutPage } from '@/components/sections/AboutPage';
import { DesignOnlyBanner } from '@/components/integrity/DesignOnlyBanner';
import { PersonSchema } from '@/components/seo/PersonSchema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Digital Point LLC. Eight-plus years deploying AI agents, automation, and trained operators that replace operations headcount for growth-stage companies.',
  openGraph: {
    title: 'About',
    description: 'Learn about Digital Point LLC. Eight-plus years deploying AI agents, automation, and trained operators that replace operations headcount for growth-stage companies.',
    url: 'https://www.digitalpointllc.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About',
    description: 'Learn about Digital Point LLC. Eight-plus years deploying AI agents, automation, and trained operators that replace operations headcount for growth-stage companies.',
  },
  alternates: { canonical: 'https://www.digitalpointllc.com/about' },
};

export default function About() {
  return (
    <>
      <PersonSchema
        name="M. Faizan Rafiq"
        jobTitle="Co-Founder"
        url="https://www.digitalpointllc.com/about"
        description="Co-founded Digital Point LLC in 2017. Operates the paid acquisition and ad-performance side of the firm. Eight-plus years running paid media across Meta, Google, LinkedIn, and TikTok for growth-stage companies."
      />
      <PersonSchema
        name="Anwaar Tayyab"
        jobTitle="Co-Founder"
        url="https://www.digitalpointllc.com/about"
        description="Co-founded Digital Point LLC in 2017. Operates the analytics, attribution, and reporting infrastructure side of the firm. Builds the systems that make paid-media work measurable."
      />
      <div className="container-wide" style={{ paddingTop: 'var(--section-sm)' }}>
        <DesignOnlyBanner note="Eight-plus years, $50M+ ad spend operated, 200+ growth audits, 4.2x ROAS — figures shown are operational composites pending fresh attribution audit before next refresh." />
      </div>
      <AboutPage />
    </>
  );
}

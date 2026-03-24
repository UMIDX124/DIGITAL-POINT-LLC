import type { Metadata } from 'next';
import { CaseStudiesPage } from './CaseStudiesPage';

export const metadata: Metadata = {
  title: 'Case Studies — Digital Point LLC',
  description:
    'See how Digital Point LLC helps growth-stage businesses scale paid acquisition, fix attribution, and turn ad spend into predictable revenue.',
  openGraph: {
    title: 'Case Studies — Digital Point LLC',
    description:
      'Real results from real clients. See how we drive ROAS, reduce CAC, and build full-funnel attribution.',
  },
};

export default function CaseStudies() {
  return <CaseStudiesPage />;
}

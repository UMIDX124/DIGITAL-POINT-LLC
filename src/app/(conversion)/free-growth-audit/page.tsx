import type { Metadata } from 'next';
import { AuditPage } from '@/components/sections/AuditPage';

export const metadata: Metadata = {
  title: 'Free Growth Audit',
  description:
    'Get a free, no-obligation review of your marketing setup. We analyze your ad spend, attribution gaps, and conversion rates to find quick wins.',
  openGraph: {
    title: 'Free Growth Audit — Digital Point LLC',
    description:
      'Free, no-obligation review of your marketing setup. Find what is broken and what to fix next.',
    url: 'https://digitalpointllc.com/free-growth-audit',
  },
  alternates: {
    canonical: 'https://digitalpointllc.com/free-growth-audit',
  },
};

export default function Page() {
  return <AuditPage />;
}

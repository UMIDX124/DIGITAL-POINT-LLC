import type { Metadata } from 'next';
import { AuditPage } from '@/components/sections/AuditPage';

export const metadata: Metadata = {
  title: 'Book a Free Audit',
  description:
    'Forty-five minutes. We map where AI agents could be running your repeatable work, where automation could remove handoffs, and where operators are still earning their seat. You leave with a deployment-ready blueprint, no agency retainer attached.',
  openGraph: {
    title: 'Book a Free Audit',
    description:
      "We map where AI agents could be running your repeatable work and where automation could replace handoffs. Deployment-ready blueprint in 45 minutes.",
    url: 'https://www.digitalpointllc.com/free-growth-audit',
    images: [
      {
        url: 'https://www.digitalpointllc.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Digital Point LLC. Book a free growth audit.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Free Audit',
    description:
      'Deployment-ready AI + automation blueprint in 45 minutes. No retainer attached.',
    images: ['https://www.digitalpointllc.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.digitalpointllc.com/free-growth-audit',
  },
};

export default function Page() {
  return <AuditPage />;
}

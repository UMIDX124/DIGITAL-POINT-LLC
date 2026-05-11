import type { Metadata } from 'next';
import { AuditPage } from '@/components/sections/AuditPage';

export const metadata: Metadata = {
  title: 'Book a Free Audit',
  description:
    '45-minute audit with a co-founder. We map where AI agents could run your repeatable work, where automation removes handoffs, and where operators stay in the loop. Deployment-ready blueprint within 5 business days. No retainer attached.',
  openGraph: {
    title: 'Book a Free Audit — Digital Point',
    description:
      '45 minutes with a co-founder. Written deployment plan within 5 business days. Free.',
    url: 'https://www.digitalpointllc.com/audit',
    images: [
      {
        url: 'https://www.digitalpointllc.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Digital Point. Book a free audit.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Free Audit — Digital Point',
    description: 'Deployment-ready AI + automation plan in 5 days. No retainer attached.',
    images: ['https://www.digitalpointllc.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.digitalpointllc.com/audit',
  },
};

export default function AuditRoute() {
  return <AuditPage />;
}

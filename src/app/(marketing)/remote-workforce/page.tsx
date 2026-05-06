import type { Metadata } from 'next';
import { RemoteWorkforcePage } from '@/components/sections/RemoteWorkforcePage';

export const metadata: Metadata = {
  title: 'Remote Workforce',
  description:
    'Managed remote teams for marketing ops, creative production, analytics, and execution support. Vetted specialists without the hiring overhead.',
  openGraph: {
    title: 'Remote Workforce · Digital Point LLC',
    description:
      'Managed remote teams for marketing ops, creative production, analytics, and execution support.',
    url: 'https://digitalpointllc.com/remote-workforce',
    type: 'website',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Digital Point Remote Workforce. Managed teams without the hiring overhead.' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remote Workforce · Digital Point LLC',
    description: 'Managed remote teams without the hiring overhead.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://digitalpointllc.com/remote-workforce',
  },
};

export default function Page() {
  return <RemoteWorkforcePage />;
}

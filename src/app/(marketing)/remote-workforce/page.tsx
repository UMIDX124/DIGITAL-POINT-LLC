import type { Metadata } from 'next';
import { RemoteWorkforcePage } from '@/components/sections/RemoteWorkforcePage';
import { ServiceSchema } from '@/components/seo/ServiceSchema';

export const metadata: Metadata = {
  title: 'Remote Workforce',
  description:
    'Managed remote teams for marketing ops, creative production, analytics, and execution support. Vetted specialists without the hiring overhead.',
  openGraph: {
    title: 'Remote Workforce',
    description:
      'Managed remote teams for marketing ops, creative production, analytics, and execution support.',
    url: 'https://www.digitalpointllc.com/remote-workforce',
    type: 'website',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Digital Point Remote Workforce. Managed teams without the hiring overhead.' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remote Workforce',
    description: 'Managed remote teams without the hiring overhead.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.digitalpointllc.com/remote-workforce',
  },
};

export default function Page() {
  return (
    <>
      <ServiceSchema
        name="Remote Operators"
        description="Vetted remote teams layered over the AI stack: marketing ops, creative production, analytics, execution support. Managed by Digital Point so headcount lift stays at zero."
        url="https://www.digitalpointllc.com/remote-workforce"
        serviceTypes={[
          'Remote Operators',
          'Marketing Ops',
          'Creative Production',
          'Analytics Operations',
          'Execution Support',
        ]}
      />
      <RemoteWorkforcePage />
    </>
  );
}

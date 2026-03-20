import type { Metadata } from 'next';
import { RemoteWorkforcePage } from '@/components/sections/RemoteWorkforcePage';

export const metadata: Metadata = {
  title: 'Remote Workforce',
  description:
    'Managed remote teams for marketing ops, creative production, analytics, and execution support. Vetted specialists without the hiring overhead.',
  openGraph: {
    title: 'Remote Workforce — Digital Point LLC',
    description:
      'Managed remote teams for marketing ops, creative production, analytics, and execution support.',
    url: 'https://digitalpointllc.com/remote-workforce',
  },
  alternates: {
    canonical: 'https://digitalpointllc.com/remote-workforce',
  },
};

export default function Page() {
  return <RemoteWorkforcePage />;
}

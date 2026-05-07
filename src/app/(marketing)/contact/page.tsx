import { ContactPage } from '@/components/sections/ContactPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Digital Point LLC. Reach out for a free growth audit, partnership inquiries, or general questions.',
  alternates: { canonical: 'https://www.digitalpointllc.com/contact' },
  openGraph: {
    title: 'Contact',
    description: 'Reach out for a free growth audit, partnership inquiries, or general questions.',
    url: 'https://www.digitalpointllc.com/contact',
    type: 'website',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Contact Digital Point LLC. Reach out via Cosmo or the audit form.' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact',
    description: 'Reach out via Cosmo or the audit form. No shared inbox.',
    images: ['/og-image.png'],
  },
};

export default function Contact() {
  return <ContactPage />;
}

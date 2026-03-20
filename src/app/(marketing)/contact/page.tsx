import { ContactPage } from '@/components/sections/ContactPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Digital Point LLC',
  description: 'Get in touch with Digital Point LLC. Reach out for a free growth audit, partnership inquiries, or general questions.',
};

export default function Contact() {
  return <ContactPage />;
}

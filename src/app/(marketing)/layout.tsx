import { DocumentHeader } from '@/components/layout/DocumentHeader';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <DocumentHeader />
      <Navigation />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
      <RevealOnScroll />
    </div>
  );
}

import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navigation />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

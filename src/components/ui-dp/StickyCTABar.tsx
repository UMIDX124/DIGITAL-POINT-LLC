'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function StickyCTABar() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  // Hide on the audit page itself
  const isAuditPage = pathname === '/free-growth-audit';

  useEffect(() => {
    if (isAuditPage) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setVisible(window.scrollY > 300);
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAuditPage]);

  if (isAuditPage) return null;

  return (
    <>
      {visible && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[55] md:hidden animate-in slide-in-from-bottom duration-300"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div
            className="px-4 py-3"
            style={{
              background: 'linear-gradient(135deg, rgba(13,8,21,0.95) 0%, rgba(26,10,46,0.95) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderTop: '1px solid rgba(199, 125, 255, 0.2)',
            }}
          >
            <Link href="/free-growth-audit" className="block">
              <div
                className="w-full py-3 rounded-xl text-center text-sm font-semibold text-white flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 50%, #c77dff 100%)',
                  boxShadow: '0 4px 16px rgba(123, 44, 191, 0.4)',
                }}
              >
                Get Free Audit
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

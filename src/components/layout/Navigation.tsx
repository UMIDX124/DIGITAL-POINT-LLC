'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Workforce', href: '/remote-workforce' },
  { name: 'Automation', href: '/automation' },
  { name: 'Marketing', href: '/performance-marketing' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Results', href: '/results' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
];

const NavLink = memo(function NavLink({ item, active }: { item: { name: string; href: string }; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        'px-3 py-2 text-[13px] font-medium transition-colors duration-200 whitespace-nowrap',
        active ? 'text-[color:var(--amber)]' : 'text-[color:var(--ivory-dim)] hover:text-[color:var(--ivory)]'
      )}
    >
      {item.name}
    </Link>
  );
});

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }, [pathname]);

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      <div
        className={cn(
          'relative w-full transition-colors duration-300',
          scrolled ? 'backdrop-blur-md' : ''
        )}
        style={{
          background: scrolled ? 'rgba(10, 10, 11, 0.85)' : 'rgba(10, 10, 11, 0.55)',
          borderBottom: `1px solid ${scrolled ? '#27272A' : 'transparent'}`,
        }}
      >
        <nav className="relative container-wide">
          <div className="flex items-center justify-between gap-6 h-16">
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <Image
                src="/Dp-logo1.png"
                alt="Digital Point LLC"
                width={40}
                height={40}
                priority
                style={{ width: '36px', height: 'auto' }}
                className="transition-opacity duration-200 group-hover:opacity-90"
              />
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-display text-[17px] text-[color:var(--ivory)]">Digital Point</span>
                <span className="text-[color:var(--muted)] text-[10px] tracking-[0.2em] uppercase mt-0.5">LLC · Since 2017</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navigation.map((item) => (
                <NavLink key={item.name} item={item} active={isActive(item.href)} />
              ))}
            </div>

            <div className="hidden lg:block">
              <Link
                href="/free-growth-audit"
                className="px-4 py-2 text-[13px] font-medium text-[#0A0A0B] rounded-md whitespace-nowrap inline-block transition-colors duration-150"
                style={{ background: 'var(--amber-bright)' }}
              >
                Book a free audit
              </Link>
            </div>

            <button
              className="lg:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-md text-[color:var(--ivory-dim)] hover:text-[color:var(--ivory)] transition-colors flex items-center justify-center border-hairline"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden absolute top-full left-4 right-4 mt-2 rounded-lg overflow-hidden animate-fade-in"
          style={{ background: '#141416', border: '1px solid #27272A' }}
        >
          <div className="p-3 flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-4 py-3 min-h-[44px] text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'text-[color:var(--amber)]'
                    : 'text-[color:var(--ivory-dim)] hover:text-[color:var(--ivory)]'
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-2 pt-3 border-t" style={{ borderColor: '#27272A' }}>
              <Link
                href="/free-growth-audit"
                className="block w-full py-3 rounded-md text-sm font-medium text-[#0A0A0B] text-center"
                style={{ background: 'var(--amber-bright)' }}
              >
                Book a free audit
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

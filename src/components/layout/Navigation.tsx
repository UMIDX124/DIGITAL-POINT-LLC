'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Performance Marketing', href: '/performance-marketing' },
  { name: 'Remote Workforce', href: '/remote-workforce' },
  { name: 'Systems & Reporting', href: '/systems-reporting' },
  { name: 'Results', href: '/results' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-4 py-3 md:px-6 md:py-4">
      {/* Apple Liquid Glass Navigation */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          'relative mx-auto max-w-7xl rounded-2xl transition-all duration-500',
          scrolled
            ? 'shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
            : 'shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
        )}
        style={{
          background: scrolled
            ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        {/* Glass reflection highlight */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 50%)',
          }}
        />

        {/* Inner glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)',
          }}
        />

        <nav className="relative px-4 md:px-6">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo — Cosmo mascot sitting on the navbar */}
            <Link
              href="/"
              className="flex items-center gap-2 group relative z-10"
            >
              <div className="relative" style={{ marginTop: '-44px', marginBottom: '-40px' }}>
                <Image
                  src="/Dp-logo1.png"
                  alt="Digital Point LLC"
                  width={120}
                  height={120}
                  priority
                  className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                  style={{
                    width: '110px',
                    height: 'auto',
                    filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.6)) drop-shadow(0 12px 24px rgba(139,92,246,0.35))',
                  }}
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-semibold text-base tracking-tight text-white/90">
                  Digital Point
                </span>
                <span className="text-white/40 text-xs block -mt-0.5">LLC</span>
              </div>
            </Link>

            {/* Desktop Navigation - Liquid Glass Pills */}
            <div className="hidden lg:flex items-center relative z-10">
              {/* Nav container with subtle glass effect */}
              <div
                className="flex items-center p-1 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg whitespace-nowrap',
                      isActive(item.href)
                        ? 'text-white'
                        : 'text-white/50 hover:text-white/80'
                    )}
                  >
                    {/* Active background */}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: 'linear-gradient(135deg, rgba(139,92,246,0.4) 0%, rgba(124,58,237,0.3) 100%)',
                          boxShadow: '0 2px 8px rgba(139,92,246,0.2), inset 0 1px 1px rgba(255,255,255,0.1)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Button - Liquid Glass Style */}
            <div className="hidden lg:block relative z-10 ml-2">
              <Link href="/free-growth-audit">
                <motion.span
                  className="relative px-5 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden group whitespace-nowrap inline-block"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.9) 0%, rgba(124,58,237,1) 100%)',
                    boxShadow: '0 4px 16px rgba(139,92,246,0.4), inset 0 1px 1px rgba(255,255,255,0.2)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Shine effect */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                      transform: 'translateX(-100%)',
                      animation: 'shine 1.5s infinite',
                    }}
                  />
                  <span className="relative z-10">Free Growth Audit</span>
                </motion.span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white transition-colors relative z-10"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile Menu - Liquid Glass */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden absolute top-full left-4 right-4 mt-2 mx-auto max-w-7xl rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(30,30,40,0.95) 0%, rgba(20,20,30,0.98) 100%)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            {/* Glass highlight */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 30%)',
              }}
            />

            <div className="relative p-4 space-y-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300',
                      isActive(item.href)
                        ? 'text-white'
                        : 'text-white/50 hover:text-white/80'
                    )}
                    style={
                      isActive(item.href)
                        ? {
                            background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(124,58,237,0.2) 100%)',
                            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)',
                          }
                        : {
                            background: 'transparent',
                          }
                    }
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="pt-3"
              >
                <Link
                  href="/free-growth-audit"
                  className="block w-full py-3 rounded-xl text-sm font-semibold text-white text-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.9) 0%, rgba(124,58,237,1) 100%)',
                    boxShadow: '0 4px 16px rgba(139,92,246,0.4)',
                  }}
                >
                  Free Growth Audit
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for shine animation */}
      <style jsx global>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </header>
  );
}

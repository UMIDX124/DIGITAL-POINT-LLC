"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Logomark } from '@/components/brand/Logomark';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Recovery', href: '/recovery' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Agents', href: '/agents' },
  { label: 'Automation', href: '/automation' },
  { label: 'Operators', href: '/operators' },
  { label: 'Stack', href: '/stack' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="dpl-nav" role="banner">
      <nav className="dpl-nav__inner" aria-label="Primary">
        <Link href="/" className="dpl-nav__brand" aria-label="Digital Point LLC, home">
          <span className="sr-only">Digital Point LLC</span>
          <Logomark
            mode="lockup"
            variant="light"
            markSize={44}
            textSize={120}
            gap={12}
            className="dpl-logo-nav"
            priority
            ariaHidden
          />
        </Link>

        {/* Desktop Menu */}
        <div className="dpl-nav__menu">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="dpl-nav__link">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="dpl-nav__cta">
          {/* Desktop CTAs */}
          <Link href="/contact" className="dpl-nav__cta-btn dpl-nav__cta-btn--ghost">
            Talk to a co-founder
          </Link>
          <Link href="/audit" className="dpl-nav__cta-btn">
            Book audit
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="dpl-nav__mobile-toggle"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Panel */}
      {isOpen && (
        <div className="dpl-nav__mobile-panel">
          <div className="dpl-nav__mobile-panel-links">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className="dpl-nav__mobile-link"
              >
                {l.label}
              </Link>
            ))}
            
            {/* Mobile-only CTAs */}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="dpl-nav__mobile-cta-ghost"
            >
              Talk to a co-founder
            </Link>
            <Link
              href="/audit"
              onClick={() => setIsOpen(false)}
              className="dpl-nav__mobile-cta-solid"
            >
              Book audit
            </Link>
          </div>
        </div>
      )}

      <style>{`
        /* Mobile toggle button */
        .dpl-nav__mobile-toggle {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: transparent !important;
          border: 1px solid var(--color-hairline-strong) !important;
          color: var(--color-ink) !important;
          cursor: pointer !important;
          padding: 0.5rem !important;
          border-radius: 4px !important;
          transition: background-color 0.15s ease, border-color 0.15s ease !important;
          margin-inline-start: 0.5rem !important;
        }

        .dpl-nav__mobile-toggle:hover {
          background: var(--color-canvas-elevated) !important;
          border-color: var(--color-ink) !important;
        }

        @media (min-width: 1024px) {
          .dpl-nav__mobile-toggle {
            display: none !important;
          }
        }

        /* Mobile Dropdown Panel */
        .dpl-nav__mobile-panel {
          position: absolute !important;
          top: 100% !important;
          left: 0 !important;
          right: 0 !important;
          background: rgba(250, 250, 247, 0.98) !important;
          backdrop-filter: saturate(180%) blur(14px) !important;
          -webkit-backdrop-filter: saturate(180%) blur(14px) !important;
          border-block-end: 1px solid var(--color-hairline) !important;
          z-index: 45 !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05) !important;
        }

        .dpl-nav__mobile-panel-links {
          display: flex !important;
          flex-direction: column !important;
          padding: 1.5rem var(--space-6) !important;
          gap: 0.75rem !important;
        }

        @media (min-width: 768px) {
          .dpl-nav__mobile-panel-links {
            padding-inline: var(--space-10) !important;
          }
        }

        .dpl-nav__mobile-link {
          font-family: var(--font-sans), sans-serif !important;
          font-size: 15px !important;
          font-weight: 500 !important;
          color: var(--color-text-secondary) !important;
          text-decoration: none !important;
          padding-block: 0.625rem !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04) !important;
          transition: color 0.15s ease !important;
        }

        .dpl-nav__mobile-link:hover {
          color: var(--color-accent-text) !important;
        }

        .dpl-nav__mobile-cta-ghost {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          height: 2.75rem !important;
          width: 100% !important;
          font-family: var(--font-sans), sans-serif !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          background: transparent !important;
          color: var(--color-ink) !important;
          border: 1px solid var(--color-hairline-strong) !important;
          border-radius: 2px !important;
          margin-block-start: 0.5rem !important;
          text-decoration: none !important;
          transition: background-color 0.15s ease, border-color 0.15s ease !important;
        }

        .dpl-nav__mobile-cta-ghost:hover {
          background: var(--color-canvas-elevated) !important;
          border-color: var(--color-ink) !important;
        }

        .dpl-nav__mobile-cta-solid {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          height: 2.75rem !important;
          width: 100% !important;
          font-family: var(--font-sans), sans-serif !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          background: var(--color-ink) !important;
          color: var(--color-canvas) !important;
          border-radius: 2px !important;
          text-decoration: none !important;
          transition: background-color 0.15s ease !important;
        }

        .dpl-nav__mobile-cta-solid:hover {
          background: var(--color-ink-soft) !important;
        }

        @media (min-width: 720px) {
          .dpl-nav__mobile-cta-ghost,
          .dpl-nav__mobile-cta-solid {
            display: none !important; /* CTAs are already visible in header */
          }
        }
      `}</style>
    </header>
  );
}

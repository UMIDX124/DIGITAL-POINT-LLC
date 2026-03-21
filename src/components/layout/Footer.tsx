import { Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const footerLinks = {
  services: [
    { name: 'Performance Marketing', href: '/performance-marketing' },
    { name: 'Remote Workforce', href: '/remote-workforce' },
    { name: 'Systems & Reporting', href: '/systems-reporting' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Results', href: '/results' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Free Growth Audit', href: '/free-growth-audit' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative mt-auto"
      style={{
        background: 'linear-gradient(180deg, #0d0815 0%, #080510 100%)',
        borderTop: '1px solid rgba(157, 78, 221, 0.1)',
      }}
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(157, 78, 221, 0.05) 0%, transparent 60%)',
        }}
      />

      <div className="container-wide relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 mb-6"
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/Dp-logo1.png"
                  alt="Digital Point LLC"
                  width={40}
                  height={40}
                  className="drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                  style={{ width: '40px', height: 'auto' }}
                />
              </div>
              <div>
                <span className="font-display font-semibold text-lg text-white">
                  Digital Point
                </span>
                <span className="text-[#9080a0] text-xs block -mt-1">LLC</span>
              </div>
            </Link>
            <p className="text-[#b794c7] text-sm leading-relaxed max-w-xs">
              Performance marketing and remote execution for businesses that need acquisition, systems, and workforce to scale together.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs"
                style={{
                  background: 'rgba(157, 78, 221, 0.1)',
                  border: '1px solid rgba(199, 125, 255, 0.15)',
                  color: '#c77dff',
                }}
              >
                8+ Years in Market
              </span>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs"
                style={{
                  background: 'rgba(157, 78, 221, 0.1)',
                  border: '1px solid rgba(199, 125, 255, 0.15)',
                  color: '#c77dff',
                }}
              >
                Global Delivery
              </span>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4
              className="font-display font-semibold mb-4"
              style={{
                background: 'linear-gradient(90deg, #ffffff, #c77dff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#b794c7] hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#c77dff]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4
              className="font-display font-semibold mb-4"
              style={{
                background: 'linear-gradient(90deg, #ffffff, #c77dff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#b794c7] hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#c77dff]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4
              className="font-display font-semibold mb-4"
              style={{
                background: 'linear-gradient(90deg, #ffffff, #c77dff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Connect
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:info@digitalpointllc.com"
                className="flex items-center gap-3 text-[#b794c7] hover:text-white text-sm transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#c77dff] group-hover:text-[#e0aaff] transition-colors" />
                info@digitalpointllc.com
              </a>
              <a
                href="https://linkedin.com/company/digitalpointllc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#b794c7] hover:text-white text-sm transition-colors group"
              >
                <Linkedin className="w-4 h-4 text-[#c77dff] group-hover:text-[#e0aaff] transition-colors" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(157, 78, 221, 0.1)' }}
        >
          <p className="text-[#7c5a8a] text-xs">
            &copy; {currentYear} Digital Point LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-[#7c5a8a] text-xs hover:text-[#b794c7] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/free-growth-audit"
              className="text-[#7c5a8a] text-xs hover:text-[#b794c7] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

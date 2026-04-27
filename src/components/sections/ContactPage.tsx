'use client';

import { useState } from 'react';
import { motion } from '@/lib/framer-compat';
import { MessageSquare, Linkedin, MapPin, Clock, Send, CheckCircle, ArrowRight, ClipboardList } from 'lucide-react';
import {
  Section, Container, FadeUp, GlassCard,
  StaggerContainer, StaggerItem, SignalPoint
} from '@/components/ui-dp/AnimatedElements';
import Link from 'next/link';

const contactMethods = [
  {
    icon: MessageSquare,
    title: 'Talk to Cosmo',
    value: 'Open the chat',
    href: '#cosmo-open',
    description: 'Cosmo routes your inquiry to the operator best matched to your stage. Not a ticket pool — a direct line.',
    isCosmo: true,
  },
  {
    icon: ClipboardList,
    title: 'Free growth audit',
    value: '/free-growth-audit',
    href: '/free-growth-audit',
    description: 'Quick form, then a real operator reviews your stack and replies from a personal account.',
    isCosmo: false,
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    value: 'Digital Point LLC',
    href: 'https://linkedin.com/company/digitalpointllc',
    description: 'Where we share what we\'re learning, building, and occasionally arguing about.',
    isCosmo: false,
  },
];

const officeDetails = [
  { icon: MapPin, label: 'Location', value: 'United States — Global Remote Operations' },
  { icon: Clock, label: 'Response Time', value: 'One business day, from a personal account' },
];

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/founder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 radial-glow" />
        <Container className="relative z-10 pt-32 pb-12">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-glass border border-border-glass text-text-secondary text-sm mb-6">
              <SignalPoint size="sm" />
              Get In Touch
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ maxWidth: 'var(--maxw-heading-display)' }}>
              We actually{' '}
              <span className="bg-gradient-to-r from-[#FFA833] via-[#FF8800] to-[#FF8800] bg-clip-text text-transparent">
                read every message
              </span>
            </h1>
            <p className="text-[color:var(--text-primary)] text-lg md:text-xl max-w-2xl leading-relaxed">
              We don&apos;t list a generic support inbox. Most agencies hide behind a hello@ queue where your message lines up with everyone else&apos;s. We don&apos;t run that way. Reach out through Cosmo or the audit form — your inquiry routes directly to the operator best matched to your stage, not a ticket pool. We answer from our personal accounts because we&apos;re personally accountable for what we ship.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* Contact Methods + Form */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left: Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <StaggerContainer className="space-y-4">
                {contactMethods.map((method) => (
                  <StaggerItem key={method.title}>
                    <a
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      onClick={
                        method.isCosmo
                          ? (e) => {
                              e.preventDefault();
                              window.dispatchEvent(new Event('cosmo:open'));
                            }
                          : undefined
                      }
                    >
                      <GlassCard className="p-5 group cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg" style={{ background: 'rgba(255, 168, 51, 0.15)' }}>
                            <method.icon className="w-5 h-5 text-[color:var(--accent-primary)]" />
                          </div>
                          <div>
                            <h3 className="font-display font-semibold text-white group-hover:text-[color:var(--accent-bright)] transition-colors">
                              {method.title}
                            </h3>
                            <p className="text-[color:var(--accent-primary)] text-sm mt-0.5">{method.value}</p>
                            <p className="text-[color:var(--text-muted)] text-xs mt-1">{method.description}</p>
                          </div>
                        </div>
                      </GlassCard>
                    </a>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <div className="space-y-3 pt-4">
                {officeDetails.map((detail) => (
                  <div key={detail.label} className="flex items-center gap-3 text-sm">
                    <detail.icon className="w-4 h-4 text-[color:var(--text-muted)]" />
                    <span className="text-[color:var(--text-muted)]">{detail.label}:</span>
                    <span className="text-[color:var(--text-primary)]">{detail.value}</span>
                  </div>
                ))}
              </div>

              {/* Quick audit CTA */}
              <FadeUp delay={0.3}>
                <div
                  className="p-5 rounded-xl mt-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 136, 0, 0.15), rgba(255, 136, 0, 0.1))',
                    border: '1px solid rgba(255, 168, 51, 0.2)',
                  }}
                >
                  <p className="text-white font-display font-semibold mb-2">Want a free growth audit instead?</p>
                  <p className="text-[color:var(--text-primary)] text-sm mb-3">Get a structured review of your marketing, systems, and team — in under 48 hours.</p>
                  <Link href="/free-growth-audit" className="inline-flex items-center gap-1 text-[color:var(--accent-primary)] hover:text-[color:var(--accent-bright)] text-sm font-medium transition-colors">
                    Start your audit <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeUp>
            </div>

            {/* Right: Contact form */}
            <div className="lg:col-span-3">
              <FadeUp delay={0.1}>
                <GlassCard className="p-6 md:p-8">
                  {status === 'success' ? (
                    <div className="text-center py-12">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      >
                        <CheckCircle className="w-16 h-16 text-[color:var(--accent-primary)] mx-auto mb-4" />
                      </motion.div>
                      <h3 className="font-display text-2xl font-bold text-white mb-2">Got it! We&apos;re on it.</h3>
                      <p className="text-[color:var(--text-primary)]">One of us (the founders, not a bot) will reply within 24 hours. Usually much sooner.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="font-display text-xl font-semibold text-white mb-2">Drop us a line</h3>
                      <p className="text-[color:var(--text-muted)] text-sm mb-6">No form letters, no auto-replies. A real human (probably Faizan, let&apos;s be honest) will get back to you within 24 hours.</p>

                      <div>
                        <label htmlFor="contact-name" className="block text-sm text-[color:var(--text-primary)] mb-1.5">Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder:text-[color:var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#FF8800]/50"
                          style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(255, 136, 0, 0.2)' }}
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-sm text-[color:var(--text-primary)] mb-1.5">Email</label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder:text-[color:var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#FF8800]/50"
                          style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(255, 136, 0, 0.2)' }}
                          placeholder="you@company.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-message" className="block text-sm text-[color:var(--text-primary)] mb-1.5">Message</label>
                        <textarea
                          id="contact-message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder:text-[color:var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#FF8800]/50 resize-none"
                          style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(255, 136, 0, 0.2)' }}
                          placeholder="Tell us about your project, challenges, or what you need help with..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99]"
                        style={{
                          background: 'linear-gradient(135deg, #C26800 0%, #C26800 100%)',
                          boxShadow: '0 4px 16px rgba(255, 136, 0, 0.3)',
                        }}
                      >
                        {status === 'submitting' ? (
                          <span className="flex items-center gap-2">
                            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                              ⟳
                            </motion.span>
                            Sending...
                          </span>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      {status === 'error' && (
                        <p className="text-[color:var(--accent-primary)] text-sm text-center">Something went wrong. Please try again or email us directly.</p>
                      )}
                    </form>
                  )}
                </GlassCard>
              </FadeUp>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

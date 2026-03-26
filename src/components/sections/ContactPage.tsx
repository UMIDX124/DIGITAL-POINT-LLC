'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';
import {
  Section, Container, FadeUp, GlassCard,
  StaggerContainer, StaggerItem, SignalPoint
} from '@/components/ui-dp/AnimatedElements';
import Link from 'next/link';

const contactMethods = [
  {
    icon: Mail,
    title: 'General Inquiries',
    value: 'info@digitalpointllc.com',
    href: 'mailto:info@digitalpointllc.com',
    description: 'Questions, ideas, or just want to say hi? We\'re all ears.',
  },
  {
    icon: Mail,
    title: 'Talk to the Founders',
    value: 'admin@digitalpointllc.com',
    href: 'mailto:admin@digitalpointllc.com',
    description: 'Faizan and Anwaar\'s inbox. For the big conversations.',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    value: 'Digital Point LLC',
    href: 'https://linkedin.com/company/digitalpointllc',
    description: 'Where we share what we\'re learning, building, and occasionally arguing about.',
  },
];

const officeDetails = [
  { icon: MapPin, label: 'Location', value: 'United States — Global Remote Operations' },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours on business days' },
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
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              We actually{' '}
              <span className="bg-gradient-to-r from-[#e0aaff] via-[#c77dff] to-[#ff6b9d] bg-clip-text text-transparent">
                read every message
              </span>
            </h1>
            <p className="text-[#b794c7] text-lg md:text-xl max-w-2xl leading-relaxed">
              No chatbots, no ticket queues, no &ldquo;someone from our team will reach out.&rdquo; When you write to us, Faizan or Anwaar will personally read it and reply — usually within a few hours, always within a day.
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
                    <a href={method.href} target={method.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                      <GlassCard className="p-5 group cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg" style={{ background: 'rgba(199, 125, 255, 0.15)' }}>
                            <method.icon className="w-5 h-5 text-[#c77dff]" />
                          </div>
                          <div>
                            <h3 className="font-display font-semibold text-white group-hover:text-[#e0aaff] transition-colors">
                              {method.title}
                            </h3>
                            <p className="text-[#c77dff] text-sm mt-0.5">{method.value}</p>
                            <p className="text-[#9080a0] text-xs mt-1">{method.description}</p>
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
                    <detail.icon className="w-4 h-4 text-[#9080a0]" />
                    <span className="text-[#9080a0]">{detail.label}:</span>
                    <span className="text-[#b794c7]">{detail.value}</span>
                  </div>
                ))}
              </div>

              {/* Quick audit CTA */}
              <FadeUp delay={0.3}>
                <div
                  className="p-5 rounded-xl mt-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(123, 44, 191, 0.15), rgba(157, 78, 221, 0.1))',
                    border: '1px solid rgba(199, 125, 255, 0.2)',
                  }}
                >
                  <p className="text-white font-display font-semibold mb-2">Want a free growth audit instead?</p>
                  <p className="text-[#b794c7] text-sm mb-3">Get a structured review of your marketing, systems, and team — in under 48 hours.</p>
                  <Link href="/free-growth-audit" className="inline-flex items-center gap-1 text-[#c77dff] hover:text-[#e0aaff] text-sm font-medium transition-colors">
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
                        <CheckCircle className="w-16 h-16 text-[#c77dff] mx-auto mb-4" />
                      </motion.div>
                      <h3 className="font-display text-2xl font-bold text-white mb-2">Got it! We&apos;re on it.</h3>
                      <p className="text-[#b794c7]">One of us (the founders, not a bot) will reply within 24 hours. Usually much sooner.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="font-display text-xl font-semibold text-white mb-2">Drop us a line</h3>
                      <p className="text-[#9080a0] text-sm mb-6">No form letters, no auto-replies. A real human (probably Faizan, let&apos;s be honest) will get back to you within 24 hours.</p>

                      <div>
                        <label htmlFor="contact-name" className="block text-sm text-[#b794c7] mb-1.5">Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                          style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }}
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-sm text-[#b794c7] mb-1.5">Email</label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                          style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }}
                          placeholder="you@company.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-message" className="block text-sm text-[#b794c7] mb-1.5">Message</label>
                        <textarea
                          id="contact-message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50 resize-none"
                          style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }}
                          placeholder="Tell us about your project, challenges, or what you need help with..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99]"
                        style={{
                          background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%)',
                          boxShadow: '0 4px 16px rgba(123, 44, 191, 0.3)',
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
                        <p className="text-[#ff6b9d] text-sm text-center">Something went wrong. Please try again or email us directly.</p>
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

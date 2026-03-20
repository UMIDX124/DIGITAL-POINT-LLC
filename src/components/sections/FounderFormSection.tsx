'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CheckCircle, Mail, Linkedin, Send, Loader2,
  Search, MessageSquare, Clock, Shield, Sparkles
} from 'lucide-react';
import {
  Section, Container, FadeUp, GlassCard, SectionHeader, SignalPoint
} from '@/components/ui-dp/AnimatedElements';
import {
  trackFormStart, trackFormSubmit, trackFormSuccess, trackFormError
} from '@/lib/analytics';

const bottlenecks = [
  'Inconsistent leads',
  'Poor tracking/reporting',
  'Ads not performing',
  'Team/execution issues',
  'Not sure yet',
];

// ─── Audit Form ───────────────────────────────────────────────

interface AuditFormData {
  name: string;
  email: string;
  company: string;
  bottleneck: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

function AuditForm() {
  const [formData, setFormData] = useState<AuditFormData>({
    name: '', email: '', company: '', bottleneck: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<AuditFormData>>({});
  const [formStarted, setFormStarted] = useState(false);

  useEffect(() => {
    if (!formStarted && (formData.name || formData.email)) {
      setFormStarted(true);
      trackFormStart('free_audit');
    }
  }, [formData, formStarted]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormData(prev => ({
      ...prev,
      utmSource: params.get('utm_source') || undefined,
      utmMedium: params.get('utm_medium') || undefined,
      utmCampaign: params.get('utm_campaign') || undefined,
    }));
  }, []);

  const validate = () => {
    const e: Partial<AuditFormData> = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = 'Please enter a valid email';
    }
    if (!formData.bottleneck) e.bottleneck = 'Please select your challenge';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) { trackFormError('free_audit', 'validation'); return; }

    setIsSubmitting(true);
    trackFormSubmit('free_audit');

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        trackFormSuccess('free_audit');
        setIsSubmitted(true);
      } else {
        trackFormError('free_audit', 'server');
        setErrors({ email: 'Something went wrong. Please try again.' });
      }
    } catch {
      trackFormError('free_audit', 'network');
      setErrors({ email: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mb-5"
        >
          <CheckCircle className="w-7 h-7 text-green-400" />
        </motion.div>
        <h3 className="font-display text-xl font-bold text-white mb-2">Audit Requested!</h3>
        <p className="text-[#b794c7] text-sm">We&apos;ll review your setup and respond within 24–48 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="audit-name" className="text-white mb-2 block text-sm">
          Name <span className="text-red-400">*</span>
        </Label>
        <Input
          id="audit-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your name"
          className="bg-[#1a0a2e]/50 border-[#3d1a5e] focus:border-[#c77dff] text-white placeholder:text-[#7c5a8a]"
        />
        {errors.name && <p aria-live="polite" className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <Label htmlFor="audit-email" className="text-white mb-2 block text-sm">
          Email <span className="text-red-400">*</span>
        </Label>
        <Input
          id="audit-email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@company.com"
          className="bg-[#1a0a2e]/50 border-[#3d1a5e] focus:border-[#c77dff] text-white placeholder:text-[#7c5a8a]"
        />
        {errors.email && <p aria-live="polite" className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="audit-company" className="text-white mb-2 block text-sm">
          Company
        </Label>
        <Input
          id="audit-company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          placeholder="Company name (optional)"
          className="bg-[#1a0a2e]/50 border-[#3d1a5e] focus:border-[#c77dff] text-white placeholder:text-[#7c5a8a]"
        />
      </div>

      <div>
        <Label className="text-white mb-2 block text-sm">
          Biggest Challenge <span className="text-red-400">*</span>
        </Label>
        <Select
          value={formData.bottleneck}
          onValueChange={(v) => setFormData({ ...formData, bottleneck: v })}
        >
          <SelectTrigger className="bg-[#1a0a2e]/50 border-[#3d1a5e] text-white">
            <SelectValue placeholder="Select your biggest challenge" />
          </SelectTrigger>
          <SelectContent>
            {bottlenecks.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.bottleneck && <p aria-live="polite" className="text-red-400 text-xs mt-1">{errors.bottleneck}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-5 text-base font-semibold group cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 50%, #c77dff 100%)',
        }}
      >
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</>
        ) : (
          <>Get Free Audit<Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>
        )}
      </Button>
    </form>
  );
}

// ─── Founder Contact Form ─────────────────────────────────────

interface FounderFormData {
  name: string;
  email: string;
  message: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

function FounderContactForm() {
  const [formData, setFormData] = useState<FounderFormData>({
    name: '', email: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FounderFormData>>({});
  const [formStarted, setFormStarted] = useState(false);

  useEffect(() => {
    if (!formStarted && (formData.name || formData.email || formData.message)) {
      setFormStarted(true);
      trackFormStart('founder_contact');
    }
  }, [formData, formStarted]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormData(prev => ({
      ...prev,
      utmSource: params.get('utm_source') || undefined,
      utmMedium: params.get('utm_medium') || undefined,
      utmCampaign: params.get('utm_campaign') || undefined,
    }));
  }, []);

  const validate = () => {
    const e: Partial<FounderFormData> = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      e.message = 'Message is required';
    } else if (formData.message.length < 10) {
      e.message = 'Please tell us a bit more';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) { trackFormError('founder_contact', 'validation'); return; }

    setIsSubmitting(true);
    trackFormSubmit('founder_contact');

    try {
      const res = await fetch('/api/founder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        trackFormSuccess('founder_contact');
        setIsSubmitted(true);
      } else {
        trackFormError('founder_contact', 'server');
        setErrors({ message: 'Something went wrong. Please try again.' });
      }
    } catch {
      trackFormError('founder_contact', 'network');
      setErrors({ message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mb-5"
        >
          <CheckCircle className="w-7 h-7 text-green-400" />
        </motion.div>
        <h3 className="font-display text-xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-[#b794c7] text-sm">A founder will get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="founder-name" className="text-white mb-2 block text-sm">
          Name <span className="text-red-400">*</span>
        </Label>
        <Input
          id="founder-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your name"
          className="bg-[#1a0a2e]/50 border-[#3d1a5e] focus:border-[#ff6b9d] text-white placeholder:text-[#7c5a8a]"
        />
        {errors.name && <p aria-live="polite" className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <Label htmlFor="founder-email" className="text-white mb-2 block text-sm">
          Email <span className="text-red-400">*</span>
        </Label>
        <Input
          id="founder-email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@company.com"
          className="bg-[#1a0a2e]/50 border-[#3d1a5e] focus:border-[#ff6b9d] text-white placeholder:text-[#7c5a8a]"
        />
        {errors.email && <p aria-live="polite" className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="founder-message" className="text-white mb-2 block text-sm">
          Message <span className="text-red-400">*</span>
        </Label>
        <Textarea
          id="founder-message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="What's on your mind?"
          rows={4}
          className="bg-[#1a0a2e]/50 border-[#3d1a5e] focus:border-[#ff6b9d] text-white resize-none placeholder:text-[#7c5a8a]"
        />
        {errors.message && <p aria-live="polite" className="text-red-400 text-xs mt-1">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-5 text-base font-semibold group cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #9d4edd 0%, #ff6b9d 100%)',
        }}
      >
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</>
        ) : (
          <>Send Message<Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>
        )}
      </Button>

      <div className="flex items-center justify-center gap-4 pt-2">
        <a
          href="mailto:info@digitalpointllc.com"
          className="flex items-center gap-1.5 text-[#c77dff] hover:text-[#e0aaff] transition-colors text-xs"
        >
          <Mail className="w-3.5 h-3.5" />
          info@digitalpointllc.com
        </a>
        <a
          href="https://linkedin.com/company/digitalpointllc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#c77dff] hover:text-[#e0aaff] transition-colors text-xs"
        >
          <Linkedin className="w-3.5 h-3.5" />
          LinkedIn
        </a>
      </div>
    </form>
  );
}

// ─── Main Section ─────────────────────────────────────────────

export function FounderFormSection() {
  return (
    <Section className="relative overflow-hidden">
      {/* Cosmic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#13091e] via-[#1a0a2e] to-[#0d0815]" />

      {/* Glow effect */}
      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(157, 78, 221, 0.25) 0%, transparent 70%)',
        }}
      />

      <Container className="relative z-10">
        <SectionHeader
          eyebrow="Get Started"
          title="Two ways to connect"
          description="Whether you want a structured audit or a direct conversation — we're here."
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Left — Free Growth Audit */}
          <FadeUp>
            <div
              className="relative rounded-2xl overflow-hidden h-full flex flex-col"
              style={{
                background: 'rgba(26, 15, 46, 0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(157, 78, 221, 0.25)',
              }}
            >
              {/* Inner glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(199, 125, 255, 0.08) 0%, transparent 50%)',
                }}
              />

              <div className="relative z-10 p-6 md:p-8 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: 'rgba(157, 78, 221, 0.2)',
                      border: '1px solid rgba(199, 125, 255, 0.3)',
                    }}
                  >
                    <Search className="w-5 h-5 text-[#c77dff]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Free Growth Audit</h3>
                  </div>
                </div>
                <p className="text-[#b794c7] text-sm mb-5">
                  Get a clear picture of what&apos;s working and what to fix next.
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    { icon: Sparkles, text: 'Free. No pitch.' },
                    { icon: Clock, text: '24–48hr response' },
                    { icon: Shield, text: 'Founder-reviewed' },
                  ].map(({ icon: Icon, text }) => (
                    <span
                      key={text}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                      style={{
                        background: 'rgba(157, 78, 221, 0.1)',
                        border: '1px solid rgba(199, 125, 255, 0.15)',
                        color: '#c77dff',
                      }}
                    >
                      <Icon className="w-3 h-3" />
                      {text}
                    </span>
                  ))}
                </div>

                {/* Form */}
                <div className="flex-1">
                  <AuditForm />
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Right — Talk to a Founder */}
          <FadeUp delay={0.15}>
            <div
              className="relative rounded-2xl overflow-hidden h-full flex flex-col"
              style={{
                background: 'rgba(26, 15, 46, 0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 107, 157, 0.2)',
              }}
            >
              {/* Inner glow — pink accent */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.06) 0%, transparent 50%)',
                }}
              />

              <div className="relative z-10 p-6 md:p-8 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: 'rgba(255, 107, 157, 0.15)',
                      border: '1px solid rgba(255, 107, 157, 0.3)',
                    }}
                  >
                    <MessageSquare className="w-5 h-5 text-[#ff6b9d]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Talk to M Faizan Rafiq</h3>
                  </div>
                </div>
                <p className="text-[#b794c7] text-sm mb-5">
                  No sales team. No handoffs. Just a direct conversation.
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    { icon: Shield, text: 'No sales team' },
                    { icon: Clock, text: '24hr response' },
                  ].map(({ icon: Icon, text }) => (
                    <span
                      key={text}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                      style={{
                        background: 'rgba(255, 107, 157, 0.1)',
                        border: '1px solid rgba(255, 107, 157, 0.15)',
                        color: '#ff6b9d',
                      }}
                    >
                      <Icon className="w-3 h-3" />
                      {text}
                    </span>
                  ))}
                </div>

                {/* Form */}
                <div className="flex-1">
                  <FounderContactForm />
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}

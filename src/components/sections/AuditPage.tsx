'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ArrowRight, CheckCircle, Clock, User, Shield, 
  Mail, Linkedin, Send, Loader2 
} from 'lucide-react';
import { 
  Section, Container, FadeUp, GlassCard, SignalPoint 
} from '@/components/ui-dp/AnimatedElements';
import { trackFormStart, trackFormSubmit, trackFormSuccess, trackFormError } from '@/lib/analytics';

const bottlenecks = [
  'Inconsistent leads',
  'Poor tracking/reporting',
  'Ads not performing',
  'Team/execution issues',
  'Not sure yet',
];

interface FormData {
  name: string;
  email: string;
  company: string;
  bottleneck: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export function AuditPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    bottleneck: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formStarted, setFormStarted] = useState(false);

  // Track form start
  useEffect(() => {
    if (!formStarted) {
      const hasData = formData.name || formData.email;
      if (hasData) {
        setFormStarted(true);
        trackFormStart('free_audit');
      }
    }
  }, [formData, formStarted]);

  // Get UTM params from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormData(prev => ({
      ...prev,
      utmSource: params.get('utm_source') || undefined,
      utmMedium: params.get('utm_medium') || undefined,
      utmCampaign: params.get('utm_campaign') || undefined,
    }));
  }, []);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.bottleneck) newErrors.bottleneck = 'Please select your challenge';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      trackFormError('free_audit', 'validation');
      return;
    }
    
    setIsSubmitting(true);
    trackFormSubmit('free_audit');
    
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        trackFormSuccess('free_audit');
        setIsSubmitted(true);
      } else {
        trackFormError('free_audit', 'server');
        setErrors({ email: 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      trackFormError('free_audit', 'network');
      setErrors({ email: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0815] via-[#1a0a2e] to-[#13091e]" />
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                top: `${((i * 17 + 7) % 100)}%`,
                left: `${((i * 23 + 13) % 100)}%`,
                animationDelay: `${(i % 5) * 0.6}s`,
              }}
            />
          ))}
        </div>
        
        <Container className="relative z-10 py-32">
          <FadeUp>
            <GlassCard className="max-w-xl mx-auto p-8 md:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              
              <h1 className="font-display text-3xl font-bold text-white mb-4">
                Request Received!
              </h1>
              
              <p className="text-[#b794c7] mb-8">
                Thank you! A founder will review your submission and reach out within 24-48 hours.
              </p>

              <div className="flex items-center justify-center gap-4 text-sm">
                <a 
                  href="mailto:hello@digitalpointllc.com"
                  className="flex items-center gap-2 text-[#c77dff] hover:text-[#e0aaff] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hello@digitalpointllc.com
                </a>
              </div>
            </GlassCard>
          </FadeUp>
        </Container>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0815] via-[#1a0a2e] to-[#13091e]" />
        
        <Container className="relative z-10 pt-32 pb-8">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
              style={{
                background: 'rgba(157, 78, 221, 0.15)',
                border: '1px solid rgba(199, 125, 255, 0.2)',
                color: '#c77dff',
              }}
            >
              <SignalPoint size="sm" />
              Free Audit
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-[1.1] tracking-tight max-w-3xl">
              Get a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e0aaff] to-[#ff6b9d]">free growth audit</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-[#b794c7] text-lg mt-4 max-w-2xl">
              No pressure. No generic advice. Just clarity on what's working and what to fix next.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* Form Section */}
      <Section className="pt-0 pb-20">
        <Container>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <FadeUp className="lg:col-span-3">
              <GlassCard className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">
                      Name <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="bg-[#1a0a2e]/50 border-[#3d1a5e] focus:border-[#c77dff] text-white"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">
                      Email <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className="bg-[#1a0a2e]/50 border-[#3d1a5e] focus:border-[#c77dff] text-white"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <Label htmlFor="company" className="text-white mb-2 block">
                      Company
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company name (optional)"
                      className="bg-[#1a0a2e]/50 border-[#3d1a5e] focus:border-[#c77dff] text-white"
                    />
                  </div>

                  {/* Primary Challenge */}
                  <div>
                    <Label className="text-white mb-2 block">
                      Biggest Challenge <span className="text-red-400">*</span>
                    </Label>
                    <Select
                      value={formData.bottleneck}
                      onValueChange={(value) => setFormData({ ...formData, bottleneck: value })}
                    >
                      <SelectTrigger className="bg-[#1a0a2e]/50 border-[#3d1a5e] text-white">
                        <SelectValue placeholder="Select your biggest challenge" />
                      </SelectTrigger>
                      <SelectContent>
                        {bottlenecks.map((bottleneck) => (
                          <SelectItem key={bottleneck} value={bottleneck}>
                            {bottleneck}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.bottleneck && (
                      <p className="text-red-400 text-xs mt-1">{errors.bottleneck}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 text-lg font-semibold group"
                    style={{
                      background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 50%, #c77dff 100%)',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Get Free Audit
                        <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </GlassCard>
            </FadeUp>

            {/* Sidebar Info */}
            <FadeUp delay={0.2} className="lg:col-span-2 space-y-4">
              {/* What's Included */}
              <GlassCard className="p-6">
                <h3 className="font-display font-semibold text-white mb-4">
                  What You'll Get
                </h3>
                <ul className="space-y-3">
                  {[
                    'Quick audit of your setup',
                    'Key gaps identified',
                    'Clear next steps',
                    'No sales pressure',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[#b794c7] text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              {/* Timeline */}
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-[#c77dff]" />
                  <h3 className="font-display font-semibold text-white">
                    Response Time
                  </h3>
                </div>
                <p className="text-[#b794c7] text-sm">
                  Founder review within 24-48 hours.
                </p>
              </GlassCard>

              {/* Contact */}
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-5 h-5 text-[#c77dff]" />
                  <h3 className="font-display font-semibold text-white">
                    Founder-Led
                  </h3>
                </div>
                <p className="text-[#b794c7] text-sm mb-4">
                  Every audit is reviewed by a founder.
                </p>
                <a
                  href="mailto:hello@digitalpointllc.com"
                  className="flex items-center gap-2 text-[#c77dff] hover:text-[#e0aaff] transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  hello@digitalpointllc.com
                </a>
              </GlassCard>
            </FadeUp>
          </div>
        </Container>
      </Section>
    </>
  );
}

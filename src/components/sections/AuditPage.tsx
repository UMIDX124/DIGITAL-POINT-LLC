'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ArrowRight, ArrowLeft, CheckCircle, Clock, User, Shield,
  Mail, Linkedin, Send, Loader2, TrendingUp, BarChart3, Users, HelpCircle
} from 'lucide-react';
import {
  Section, Container, FadeUp, GlassCard, SignalPoint
} from '@/components/ui-dp/AnimatedElements';
import { trackFormStart, trackFormSubmit, trackFormSuccess, trackFormError, trackEvent } from '@/lib/analytics';

const challenges = [
  { id: 'inconsistent-leads', label: 'Inconsistent leads', icon: TrendingUp, description: 'Lead flow is unpredictable month to month' },
  { id: 'poor-tracking', label: 'Poor tracking/reporting', icon: BarChart3, description: "Can't tell what's actually driving results" },
  { id: 'ads-not-performing', label: 'Ads not performing', icon: TrendingUp, description: 'Spending on ads but not seeing returns' },
  { id: 'team-issues', label: 'Team/execution issues', icon: Users, description: 'Need better execution or bandwidth' },
  { id: 'not-sure', label: 'Not sure yet', icon: HelpCircle, description: 'I know something is off but not what' },
];

const spendRanges = [
  { id: 'under-10k', label: 'Under $10k/mo' },
  { id: '10k-50k', label: '$10k – $50k/mo' },
  { id: '50k-200k', label: '$50k – $200k/mo' },
  { id: 'over-200k', label: '$200k+/mo' },
];

interface FormData {
  name: string;
  email: string;
  company: string;
  bottleneck: string;
  adSpend: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

const TOTAL_STEPS = 4;

export function AuditPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    bottleneck: '',
    adSpend: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formStarted, setFormStarted] = useState(false);

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

  const trackStep = (stepNumber: number) => {
    trackEvent('form_step', { step: stepNumber, form: 'free_audit' });
  };

  const handleChallengeSelect = (challengeId: string) => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart('free_audit');
    }
    setFormData(prev => ({ ...prev, bottleneck: challengeId }));
    trackStep(1);
    setStep(2);
  };

  const handleSpendSelect = (spendId: string) => {
    setFormData(prev => ({ ...prev, adSpend: spendId }));
    trackStep(2);
    setStep(3);
  };

  const validateStep3 = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep3()) {
      trackFormError('free_audit', 'validation');
      return;
    }

    setIsSubmitting(true);
    trackStep(3);
    trackFormSubmit('free_audit');

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          bottleneck: challenges.find(c => c.id === formData.bottleneck)?.label || formData.bottleneck,
          adSpend: spendRanges.find(s => s.id === formData.adSpend)?.label || formData.adSpend,
        }),
      });

      const data = await response.json();

      if (data.success) {
        trackFormSuccess('free_audit');
        setStep(4);
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

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const progressPercent = step === 4 ? 100 : ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[30vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0815] via-[#1a0a2e] to-[#13091e]" />

        <Container className="relative z-10 pt-32 pb-4">
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
              No pressure. No generic advice. Just clarity on what&apos;s working and what to fix next.
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
                {/* Progress Bar */}
                {step < 4 && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#b794c7] text-sm">Step {step} of 3</span>
                      {step > 1 && (
                        <button
                          onClick={goBack}
                          className="flex items-center gap-1 text-[#c77dff] hover:text-[#e0aaff] text-sm transition-colors"
                        >
                          <ArrowLeft className="w-3 h-3" />
                          Back
                        </button>
                      )}
                    </div>
                    <div className="h-1 bg-[#1a0a2e] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #7b2cbf, #c77dff, #ff6b9d)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                )}

                <AnimatePresence mode="popLayout">
                  {/* Step 1: Challenge Selection */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="font-display text-xl font-bold text-white mb-2">
                        What&apos;s your biggest challenge?
                      </h2>
                      <p className="text-[#b794c7] text-sm mb-6">
                        Pick the one that resonates most. We&apos;ll tailor your audit around it.
                      </p>

                      <div className="space-y-3">
                        {challenges.map((challenge) => (
                          <button
                            key={challenge.id}
                            onClick={() => handleChallengeSelect(challenge.id)}
                            className="w-full text-left p-4 rounded-xl transition-all duration-200 group flex items-center gap-4"
                            style={{
                              background: formData.bottleneck === challenge.id
                                ? 'rgba(157, 78, 221, 0.2)'
                                : 'rgba(157, 78, 221, 0.05)',
                              border: formData.bottleneck === challenge.id
                                ? '1px solid rgba(199, 125, 255, 0.4)'
                                : '1px solid rgba(199, 125, 255, 0.1)',
                            }}
                          >
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                              style={{
                                background: 'rgba(157, 78, 221, 0.15)',
                                border: '1px solid rgba(199, 125, 255, 0.2)',
                              }}
                            >
                              <challenge.icon className="w-5 h-5 text-[#c77dff]" />
                            </div>
                            <div>
                              <div className="text-white font-medium text-sm">{challenge.label}</div>
                              <div className="text-[#9080a0] text-xs mt-0.5">{challenge.description}</div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#c77dff] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Ad Spend */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="font-display text-xl font-bold text-white mb-2">
                        Monthly ad spend?
                      </h2>
                      <p className="text-[#b794c7] text-sm mb-6">
                        This helps us calibrate our recommendations to your scale.
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {spendRanges.map((range) => (
                          <button
                            key={range.id}
                            onClick={() => handleSpendSelect(range.id)}
                            className="p-4 rounded-xl text-center transition-all duration-200 group"
                            style={{
                              background: formData.adSpend === range.id
                                ? 'rgba(157, 78, 221, 0.2)'
                                : 'rgba(157, 78, 221, 0.05)',
                              border: formData.adSpend === range.id
                                ? '1px solid rgba(199, 125, 255, 0.4)'
                                : '1px solid rgba(199, 125, 255, 0.1)',
                            }}
                          >
                            <div className="text-white font-medium text-sm group-hover:text-[#e0aaff] transition-colors">
                              {range.label}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact Details */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="font-display text-xl font-bold text-white mb-2">
                        Where should we send your audit?
                      </h2>
                      <p className="text-[#b794c7] text-sm mb-6">
                        A co-founder will personally review your setup.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-5">
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
                    </motion.div>
                  )}

                  {/* Step 4: Success */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>

                      <h2 className="font-display text-2xl font-bold text-white mb-3">
                        Request Received!
                      </h2>

                      <p className="text-[#b794c7] mb-6 max-w-sm mx-auto">
                        Thank you, {formData.name.split(' ')[0]}! A co-founder will review your submission and reach out within 24-48 hours.
                      </p>

                      <div className="flex items-center justify-center gap-4 text-sm">
                        <a
                          href="mailto:info@digitalpointllc.com"
                          className="flex items-center gap-2 text-[#c77dff] hover:text-[#e0aaff] transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          info@digitalpointllc.com
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </FadeUp>

            {/* Sidebar Info */}
            <FadeUp delay={0.2} className="lg:col-span-2 space-y-4">
              <GlassCard className="p-6">
                <h3 className="font-display font-semibold text-white mb-4">
                  What You&apos;ll Get
                </h3>
                <ul className="space-y-3">
                  {[
                    'Quick audit of your setup',
                    'Key gaps identified',
                    'Clear next steps',
                    'No sales pressure',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[#b794c7] text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-[#c77dff]" />
                  <h3 className="font-display font-semibold text-white">
                    Response Time
                  </h3>
                </div>
                <p className="text-[#b794c7] text-sm">
                  Co-Founder review within 24-48 hours.
                </p>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-5 h-5 text-[#c77dff]" />
                  <h3 className="font-display font-semibold text-white">
                    Co-Founder Led
                  </h3>
                </div>
                <p className="text-[#b794c7] text-sm mb-4">
                  Every audit is reviewed by a co-founder.
                </p>
                <a
                  href="mailto:info@digitalpointllc.com"
                  className="flex items-center gap-2 text-[#c77dff] hover:text-[#e0aaff] transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  info@digitalpointllc.com
                </a>
              </GlassCard>
            </FadeUp>
          </div>
        </Container>
      </Section>
    </>
  );
}

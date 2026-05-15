'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/framer-compat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ArrowRight, ArrowLeft, CheckCircle, Clock, User, Shield,
  Linkedin, Send, Loader2, TrendingUp, BarChart3, Users, HelpCircle
} from 'lucide-react';
import {
  Section, Container, FadeUp, GlassCard, SignalPoint
} from '@/components/ui-dp/AnimatedElements';
import { FlowDiagram } from '@/components/brand/FlowDiagram';

const challenges = [
  { id: 'inconsistent-leads', label: 'Inconsistent leads', icon: TrendingUp, description: 'Lead flow is unpredictable month to month' },
  { id: 'poor-tracking', label: 'Poor tracking/reporting', icon: BarChart3, description: "Can't tell what's driving results" },
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
  website?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

const TOTAL_STEPS = 4;

export function AuditPage() {
  const [step, setStep] = useState(1);
  // Phase 8. UTM params read via lazy initializer so client-side state
  // hydrates with URL data without an effect (root-cause fix for the
  // react-hooks/set-state-in-effect lint that previously had a suppression).
  const [formData, setFormData] = useState<FormData>(() => {
    const base = { name: '', email: '', company: '', bottleneck: '', adSpend: '' };
    if (typeof window === 'undefined') return base;
    const p = new URLSearchParams(window.location.search);
    return {
      ...base,
      utmSource: p.get('utm_source') || undefined,
      utmMedium: p.get('utm_medium') || undefined,
      utmCampaign: p.get('utm_campaign') || undefined,
    };
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChallengeSelect = (challengeId: string) => {
    setFormData(prev => ({ ...prev, bottleneck: challengeId }));
    setStep(2);
  };

  const handleSpendSelect = (spendId: string) => {
    setFormData(prev => ({ ...prev, adSpend: spendId }));
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

    if (!validateStep3()) return;

    setIsSubmitting(true);

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
        setStep(4);
      } else {
        setErrors({ email: 'Something went wrong. Please try again.' });
      }
    } catch {
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
      {/*
        F·01 fallback. The interactive wizard above is the primary path,
        but it depends on hydration. A no-JS visitor (slow network, CSP
        block, ad-blocker breaking the bundle) needs a working submit
        path too. This <noscript> block ships a fully server-rendered
        form that posts directly to /api/audit. The honeypot input
        matches the wizard's. The CSS class .audit-fallback shows it
        only when JS is disabled; the wizard never renders for those
        users so the surfaces do not collide.
      */}
      <noscript>
        <section className="audit-fallback">
          <div className="audit-fallback__inner">
            <h2 className="audit-fallback__h2">Submit your audit request</h2>
            <p className="audit-fallback__lead">
              JavaScript looks turned off. The full wizard needs it. Use this
              shorter form and a co-founder will reply inside 24 to 48 hours.
            </p>
            <form action="/api/audit" method="POST" className="audit-fallback__form">
              <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                <label htmlFor="audit-fallback-website">Website (leave blank)</label>
                <input id="audit-fallback-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <label htmlFor="audit-fallback-name">Name <span aria-hidden="true">*</span></label>
              <input id="audit-fallback-name" type="text" name="name" required autoComplete="name" />
              <label htmlFor="audit-fallback-email">Work email <span aria-hidden="true">*</span></label>
              <input id="audit-fallback-email" type="email" name="email" required autoComplete="email" />
              <label htmlFor="audit-fallback-company">Company</label>
              <input id="audit-fallback-company" type="text" name="company" autoComplete="organization" />
              <label htmlFor="audit-fallback-bottleneck">Tell us where you&rsquo;re stuck <span aria-hidden="true">*</span></label>
              <textarea id="audit-fallback-bottleneck" name="bottleneck" rows={4} required />
              <button type="submit">Submit audit request</button>
            </form>
          </div>
        </section>
      </noscript>

      {/* Hero */}
      <section className="relative min-h-[30vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-canvas-dark)] via-[var(--color-canvas-dark-elevated)] to-[var(--color-canvas-dark-elevated)]" />

        <Container className="relative z-10 pt-32 pb-4">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
              style={{
                background: 'rgba(255, 136, 0, 0.15)',
                border: '1px solid rgba(255, 168, 51, 0.2)',
                color: 'var(--color-accent)',
              }}
            >
              <SignalPoint size="sm" />
              Free Audit
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-[1.1] tracking-tight" style={{ maxWidth: 'var(--maxw-heading-display)' }}>
              Get a <span style={{ color: 'var(--accent-bright)' }}>free growth audit</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-[color:var(--text-primary)] text-lg mt-4 max-w-2xl">
              Forty-five minutes. We map where AI agents could be running your repeatable work, where automation could remove handoffs, and where operators are still earning their seat. You leave with a deployment-ready blueprint, no agency retainer attached.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* Form Section */}
      <Section className="pt-0 pb-20">
        <Container>
          <div style={{ marginBlockEnd: '2.5rem' }}>
            <FlowDiagram
              steps={[
                {
                  label: 'Bottleneck',
                  sublabel: "what's broken",
                  status: step > 1 ? 'done' : 'active',
                },
                {
                  label: 'Stack',
                  sublabel: 'what you run',
                  status: step > 2 ? 'done' : step === 2 ? 'active' : 'pending',
                },
                {
                  label: 'Contact',
                  sublabel: 'how we reply',
                  status: step > 3 ? 'done' : step === 3 ? 'active' : 'pending',
                },
              ]}
            />
          </div>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <FadeUp className="lg:col-span-3">
              <GlassCard className="p-6 md:p-8">
                {/* Progress Bar */}
                {step < 4 && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[color:var(--text-primary)] text-sm">Step {step} of 3</span>
                      {step > 1 && (
                        <button
                          onClick={goBack}
                          className="flex items-center gap-1 text-[color:var(--accent-primary)] hover:text-[color:var(--accent-bright)] text-sm transition-colors"
                        >
                          <ArrowLeft className="w-3 h-3" />
                          Back
                        </button>
                      )}
                    </div>
                    <div className="h-1 bg-[var(--color-canvas-dark-elevated)] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'var(--color-accent)' }}
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
                      <h2 className="font-display text-xl font-bold text-white mb-2" style={{ maxWidth: 'var(--maxw-heading-section)' }}>
                        Tell us where you&rsquo;re stuck.
                      </h2>
                      <p className="text-[color:var(--text-primary)] text-sm mb-6">
                        Pick the one closest to your day-to-day. The audit gets shaped around it.
                      </p>

                      <div className="space-y-3">
                        {challenges.map((challenge) => (
                          <button
                            key={challenge.id}
                            onClick={() => handleChallengeSelect(challenge.id)}
                            className="w-full text-left p-4 rounded-xl transition-all duration-200 group flex items-center gap-4"
                            style={{
                              background: formData.bottleneck === challenge.id
                                ? 'rgba(255, 136, 0, 0.2)'
                                : 'rgba(255, 136, 0, 0.05)',
                              border: formData.bottleneck === challenge.id
                                ? '1px solid rgba(255, 168, 51, 0.4)'
                                : '1px solid rgba(255, 168, 51, 0.1)',
                            }}
                          >
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                              style={{
                                background: 'rgba(255, 136, 0, 0.15)',
                                border: '1px solid rgba(255, 168, 51, 0.2)',
                              }}
                            >
                              <challenge.icon className="w-5 h-5 text-[color:var(--accent-primary)]" />
                            </div>
                            <div>
                              <div className="text-[color:var(--color-text-primary)] font-medium text-sm">{challenge.label}</div>
                              <div className="text-[color:var(--text-muted)] text-xs mt-0.5">{challenge.description}</div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[color:var(--accent-primary)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Operations Scale */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="font-display text-xl font-bold text-white mb-2" style={{ maxWidth: 'var(--maxw-heading-section)' }}>
                        Monthly ops budget?
                      </h2>
                      <p className="text-[color:var(--text-primary)] text-sm mb-6">
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
                                ? 'rgba(255, 136, 0, 0.2)'
                                : 'rgba(255, 136, 0, 0.05)',
                              border: formData.adSpend === range.id
                                ? '1px solid rgba(255, 168, 51, 0.4)'
                                : '1px solid rgba(255, 168, 51, 0.1)',
                            }}
                          >
                            <div className="text-[color:var(--color-text-primary)] font-medium text-sm group-hover:text-[color:var(--accent-bright)] transition-colors">
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
                      <h2 className="font-display text-xl font-bold mb-2" style={{ maxWidth: 'var(--maxw-heading-section)', color: '#0A0A0B' }}>
                        Where should we send your audit?
                      </h2>
                      <p className="text-sm mb-6" style={{ color: '#52525B' }}>
                        A co-founder reviews your setup.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                          <label htmlFor="audit-website-hp">Website (leave blank)</label>
                          <input
                            id="audit-website-hp"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={formData.website ?? ''}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="name" className="mb-2 block" style={{ color: '#0A0A0B' }}>
                            Name <span style={{ color: '#dc2626' }}>*</span>
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your name"
                            className="bg-white focus:border-[color:var(--color-accent)] placeholder:text-[#8A8A93]"
                            style={{ borderColor: 'rgba(10, 10, 11, 0.18)', color: '#0A0A0B' }}
                          />
                          {errors.name && (
                            <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.name}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="email" className="mb-2 block" style={{ color: '#0A0A0B' }}>
                            Email <span style={{ color: '#dc2626' }}>*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@company.com"
                            className="bg-white focus:border-[color:var(--color-accent)] placeholder:text-[#8A8A93]"
                            style={{ borderColor: 'rgba(10, 10, 11, 0.18)', color: '#0A0A0B' }}
                          />
                          {errors.email && (
                            <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.email}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="company" className="mb-2 block" style={{ color: '#0A0A0B' }}>
                            Company
                          </Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Company name (optional)"
                            className="bg-white focus:border-[color:var(--color-accent)] placeholder:text-[#8A8A93]"
                            style={{ borderColor: 'rgba(10, 10, 11, 0.18)', color: '#0A0A0B' }}
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-6 text-lg font-semibold group transition-colors"
                          style={{ background: 'var(--color-accent)', color: '#FFFFFF' }}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit audit request
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

                      <h2 className="font-display text-2xl font-bold text-white mb-3" style={{ maxWidth: 'var(--maxw-heading-section)' }}>
                        Request Received!
                      </h2>

                      <p className="text-[color:var(--text-primary)] mb-6 max-w-sm mx-auto">
                        Thank you, {formData.name.split(' ')[0]}! A co-founder will review your submission and reach out within 24-48 hours.
                      </p>

                      <div className="flex items-center justify-center gap-4 text-sm">
                        <button
                          type="button"
                          onClick={() => window.dispatchEvent(new Event('cosmo:open'))}
                          className="flex items-center gap-2 text-[color:var(--accent-primary)] hover:text-[color:var(--accent-bright)] transition-colors"
                        >
                          Need a faster reply? Talk to Cosmo
                          <span aria-hidden="true">→</span>
                        </button>
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
                  Inside the deliverable
                </h3>
                <ul className="space-y-3">
                  {[
                    'Quick audit of your setup',
                    'Key gaps identified',
                    'Clear next steps',
                    'No sales pressure',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[color:var(--text-primary)] text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-[color:var(--accent-primary)]" />
                  <h3 className="font-display font-semibold text-white">
                    Response Time
                  </h3>
                </div>
                <p className="text-[color:var(--text-primary)] text-sm">
                  Co-Founder review within 24-48 hours.
                </p>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-5 h-5 text-[color:var(--accent-primary)]" />
                  <h3 className="font-display font-semibold text-white">
                    Co-Founder Led
                  </h3>
                </div>
                <p className="text-[color:var(--text-primary)] text-sm mb-4">
                  Every audit is reviewed by a co-founder.
                </p>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event('cosmo:open'))}
                  className="flex items-center gap-2 text-[color:var(--accent-primary)] hover:text-[color:var(--accent-bright)] transition-colors text-sm"
                >
                  Or chat with us first &rarr;
                </button>
              </GlassCard>
            </FadeUp>
          </div>
        </Container>
      </Section>
    </>
  );
}

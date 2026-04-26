'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle, Mail } from 'lucide-react';

interface NewsletterOptInProps {
  variant?: 'inline' | 'sidebar';
  title?: string;
  description?: string;
  className?: string;
}

export function NewsletterOptIn({
  variant = 'inline',
  title = 'Growth insights, delivered.',
  description = 'Frameworks, benchmarks, and case studies from $50M+ in managed ad spend. No spam.',
  className = '',
}: NewsletterOptInProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        className={`rounded-xl p-6 text-center ${className}`}
        style={{
          background: 'rgba(180,83,9, 0.1)',
          border: '1px solid rgba(196,181,253, 0.2)',
        }}
      >
        <CheckCircle className="w-8 h-8 text-[#A78BFA] mx-auto mb-2" />
        <p className="text-white font-medium text-sm">You&apos;re in!</p>
        <p className="text-[#71717A] text-xs mt-1">Watch your inbox for growth insights.</p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl p-6 ${className}`}
      style={{
        background: variant === 'sidebar'
          ? 'rgba(13, 8, 21, 0.6)'
          : 'linear-gradient(135deg, rgba(180,83,9, 0.12), rgba(167,139,250, 0.06))',
        border: '1px solid rgba(196,181,253, 0.2)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-4 h-4 text-[#A78BFA]" />
        <h3 className="text-white font-medium text-sm">{title}</h3>
      </div>
      <p className="text-[#71717A] text-xs mb-4">{description}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="flex-1 px-3 py-2 rounded-lg text-white text-sm placeholder:text-[#71717A] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/50"
          style={{
            background: 'rgba(13, 8, 21, 0.6)',
            border: '1px solid rgba(167,139,250, 0.2)',
          }}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shrink-0"
          style={{
            background: 'linear-gradient(135deg, #4338CA 0%, #7C3AED 100%)',
          }}
        >
          {status === 'submitting' ? '...' : <ArrowRight className="w-4 h-4" />}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-[#A78BFA] text-xs mt-2">Something went wrong. Try again.</p>
      )}
    </div>
  );
}

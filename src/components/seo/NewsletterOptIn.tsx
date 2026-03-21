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
          background: 'rgba(123, 44, 191, 0.1)',
          border: '1px solid rgba(199, 125, 255, 0.2)',
        }}
      >
        <CheckCircle className="w-8 h-8 text-[#c77dff] mx-auto mb-2" />
        <p className="text-white font-medium text-sm">You&apos;re in!</p>
        <p className="text-[#9080a0] text-xs mt-1">Watch your inbox for growth insights.</p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl p-6 ${className}`}
      style={{
        background: variant === 'sidebar'
          ? 'rgba(13, 8, 21, 0.6)'
          : 'linear-gradient(135deg, rgba(123, 44, 191, 0.12), rgba(157, 78, 221, 0.06))',
        border: '1px solid rgba(199, 125, 255, 0.2)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-4 h-4 text-[#c77dff]" />
        <h3 className="text-white font-medium text-sm">{title}</h3>
      </div>
      <p className="text-[#9080a0] text-xs mb-4">{description}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="flex-1 px-3 py-2 rounded-lg text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
          style={{
            background: 'rgba(13, 8, 21, 0.6)',
            border: '1px solid rgba(157, 78, 221, 0.2)',
          }}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shrink-0"
          style={{
            background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%)',
          }}
        >
          {status === 'submitting' ? '...' : <ArrowRight className="w-4 h-4" />}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-[#ff6b9d] text-xs mt-2">Something went wrong. Try again.</p>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';

export type HandoffMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
};

type Props = {
  messages: HandoffMessage[];
  currentPath: string;
  operator?: string;
  onSuccess: () => void;
};

export function HandoffButton({
  messages,
  currentPath,
  operator = 'Faizan',
  onSuccess,
}: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!email.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/chat-handoff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
          currentPath,
          messages: messages.slice(-50),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.message ?? 'Could not send. Please retry.');
        return;
      }
      onSuccess();
      setOpen(false);
    } catch {
      setError('Network error. Please retry.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cosmo-handoff__trigger"
      >
        Hand off to {operator}
      </button>
    );
  }

  return (
    <div className="cosmo-handoff__form" role="group" aria-label="Hand off to founder">
      <div className="cosmo-handoff__label">
        Faizan or Anwaar replies within 6 hours.
      </div>
      <input
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="cosmo-handoff__input"
        aria-label="Your email"
        required
      />
      <input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="cosmo-handoff__input"
        aria-label="Your name"
      />
      {error ? <div className="cosmo-handoff__error">{error}</div> : null}
      <div className="cosmo-handoff__row">
        <button
          type="button"
          onClick={submit}
          disabled={submitting || !email.trim()}
          className="cosmo-handoff__send"
        >
          {submitting ? 'Sending' : 'Send transcript'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="cosmo-handoff__cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default HandoffButton;

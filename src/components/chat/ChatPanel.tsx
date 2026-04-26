'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Send } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

type Props = {
  open: boolean;
  onClose: () => void;
};

const GREETING: Message = {
  role: 'assistant',
  content: "Hey, I'm Cosmo. What can I help with?",
};

// Phase 17b 3-restructured G4 — quick-reply pills shown alongside the
// initial greeting until the user sends their first message.
const QUICK_REPLIES: readonly string[] = [
  'What do you do?',
  'How does pricing work?',
  'Book an audit',
] as const;

export default function ChatPanel({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Phase 17b 3-restructured G3 — skeleton mount state. Shown for ≥300ms
  // when panel opens before the actual greeting + quick-reply pills surface.
  const [showSkeleton, setShowSkeleton] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setShowSkeleton(true);
    const t1 = setTimeout(() => setShowSkeleton(false), 350);
    const t2 = setTimeout(() => inputRef.current?.focus(), 450);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const send = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;

    setError(null);
    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const payload = newMessages
        .filter((m) => m !== GREETING)
        .map(({ role, content }) => ({ role, content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || 'Something went wrong. Try again.');
        setLoading(false);
        return;
      }

      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (e) {
      console.error('Chat send error:', e);
      setError('Network error. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  if (!open) return null;

  // Phase 17b 3-restructured G4 — quick-reply pills shown until the user
  // has sent any message (i.e. messages array still equals the GREETING).
  const showQuickReplies = !showSkeleton && messages.length === 1 && messages[0] === GREETING && !loading;

  return (
    <div
      className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-8rem)] flex flex-col rounded-2xl shadow-2xl chat-panel chat-panel-enter"
      style={{
        background: 'color-mix(in srgb, var(--bg-canvas) 95%, transparent)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border-default)',
      }}
      role="dialog"
      aria-label="DPL AI chat"
    >
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid var(--border-default)' }}
      >
        <div>
          <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            DPL AI Agent
          </div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
            DPL AI Agent · Cosmo
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="p-1 transition-colors"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <X size={18} />
        </button>
      </div>

      <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {/* Phase 17b 3-restructured G3 — skeleton state shown for ~350ms
            while panel slides in. Three pulsing placeholder bubbles in
            bot-bubble style. Suppressed once skeleton timer expires. */}
        {showSkeleton && (
          <div className="space-y-3" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex justify-start">
                <div
                  className="px-4 py-2.5 rounded-2xl chat-skeleton-pulse"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-default)',
                    width: ['72%', '60%', '48%'][i],
                    height: '32px',
                  }}
                />
              </div>
            ))}
          </div>
        )}
        {!showSkeleton && messages.map((m, i) => (
          <div
            key={i}
            data-chat-message
            data-role={m.role}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className="max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
              style={
                m.role === 'user'
                  ? {
                      background: 'color-mix(in srgb, var(--accent-primary) 15%, transparent)',
                      color: 'var(--text-primary)',
                      border: '1px solid color-mix(in srgb, var(--accent-primary) 30%, transparent)',
                    }
                  : {
                      background: 'var(--bg-elevated)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-default)',
                    }
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        {/* Phase 17b 3-restructured G4 — quick-reply pills below greeting. */}
        {showQuickReplies && (
          <div className="flex flex-wrap gap-2 pt-1">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="px-3 py-1.5 text-xs rounded-full transition-colors"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--ring-stroke)',
                  color: 'var(--text-primary)',
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}
        {loading && (
          <div className="flex justify-start">
            <div
              className="px-4 py-2.5 rounded-2xl"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
            >
              <span className="inline-flex gap-1">
                <span
                  className="h-1.5 w-1.5 rounded-full chat-dot"
                  style={{ background: 'var(--text-tertiary)' }}
                />
                <span
                  className="h-1.5 w-1.5 rounded-full chat-dot"
                  style={{ background: 'var(--text-tertiary)', animationDelay: '0.15s' }}
                />
                <span
                  className="h-1.5 w-1.5 rounded-full chat-dot"
                  style={{ background: 'var(--text-tertiary)', animationDelay: '0.3s' }}
                />
              </span>
            </div>
          </div>
        )}
        {error && (
          <div className="text-xs px-2" style={{ color: 'var(--text-error)' }}>
            {error}
          </div>
        )}
      </div>

      <div className="p-3" style={{ borderTop: '1px solid var(--border-default)' }}>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            data-chat-input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything about DPL..."
            disabled={loading}
            className="flex-1 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none disabled:opacity-50"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
            }}
            maxLength={500}
          />
          <button
            data-chat-send
            onClick={() => send()}
            disabled={!input.trim() || loading}
            aria-label="Send message"
            className="h-11 w-11 rounded-xl flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: 'var(--accent-bright)',
              color: 'var(--cta-text-on-amber)',
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

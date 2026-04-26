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
  content:
    "Hi — I'm the DPL AI agent. Ask me about our services, how we work, or what we can run for you. What's on your mind?",
};

export default function ChatPanel({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
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

  const send = async () => {
    const text = input.trim();
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

  return (
    <div
      className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-8rem)] flex flex-col rounded-2xl shadow-2xl chat-panel"
      style={{
        background: 'rgba(13, 13, 13, 0.95)',
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
            Powered by Groq · llama-3.3-70b
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
        {messages.map((m, i) => (
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
                      background: 'rgba(196, 181, 253, 0.15)',
                      color: 'var(--text-primary)',
                      border: '1px solid rgba(196, 181, 253, 0.3)',
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
          <div className="text-xs px-2" style={{ color: '#F87171' }}>
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
            onClick={send}
            disabled={!input.trim() || loading}
            aria-label="Send message"
            className="h-11 w-11 rounded-xl flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: 'var(--accent-bright)',
              color: '#ffffff',
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

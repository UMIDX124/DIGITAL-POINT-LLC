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

// Phase 17b 3-restructured G4. quick-reply pills shown alongside the
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
  // Phase 17b 3-restructured G3. skeleton mount state. Shown for ≥300ms
  // when panel opens before the actual greeting + quick-reply pills surface.
  const [showSkeleton, setShowSkeleton] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    // 350ms skeleton flash, then auto-focus the input. This is a
    // panel-open side-effect-driven animation, not derived state, so the
    // initial setShowSkeleton(true) is intentional rather than a
    // cascading-render anti-pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // Phase 17b 3-restructured G4. quick-reply pills shown until the user
  // has sent any message (i.e. messages array still equals the GREETING).
  const showQuickReplies = !showSkeleton && messages.length === 1 && messages[0] === GREETING && !loading;

  return (
    <div
      className="chat-panel-shell fixed bottom-24 right-6 z-50 w-[min(380px,calc(100vw-3rem))] h-[520px] max-h-[calc(100vh-8rem)] flex flex-col rounded-2xl shadow-2xl chat-panel chat-panel-enter"
      role="dialog"
      aria-label="DPL AI chat"
    >
      <div className="chat-panel-header flex items-center justify-between px-5 py-4">
        <div>
          <div className="chat-panel-title text-sm font-medium">
            DPL AI Agent
          </div>
          <div className="chat-panel-subtitle text-xs mt-0.5">
            DPL AI Agent · Cosmo
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="chat-panel-close p-1 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {/* Phase 17b 3-restructured G3. skeleton state shown for ~350ms
            while panel slides in. Three pulsing placeholder bubbles in
            bot-bubble style. Suppressed once skeleton timer expires. */}
        {showSkeleton && (
          <div className="space-y-3" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex justify-start">
                <div
                  className="chat-skeleton-bubble px-4 py-2.5 rounded-2xl chat-skeleton-pulse"
                  data-w={i + 1}
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
            <div className="chat-bubble max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed">
              {m.content}
            </div>
          </div>
        ))}
        {/* Phase 17b 3-restructured G4. quick-reply pills below greeting. */}
        {showQuickReplies && (
          <div className="flex flex-wrap gap-2 pt-1">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="chat-quick-reply px-3 py-1.5 text-xs rounded-full transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="chat-loading-bubble px-4 py-2.5 rounded-2xl">
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full chat-dot" />
                <span className="h-1.5 w-1.5 rounded-full chat-dot" />
                <span className="h-1.5 w-1.5 rounded-full chat-dot" />
              </span>
            </div>
          </div>
        )}
        {error && (
          <div className="chat-error text-xs px-2">
            {error}
          </div>
        )}
      </div>

      <div className="chat-input-bar p-3">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            data-chat-input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything about DPL..."
            disabled={loading}
            className="chat-input flex-1 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none disabled:opacity-50"
            maxLength={500}
          />
          <button
            data-chat-send
            onClick={() => send()}
            disabled={!input.trim() || loading}
            aria-label="Send message"
            className="chat-send-btn h-11 w-11 rounded-xl flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

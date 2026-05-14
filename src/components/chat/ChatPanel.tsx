'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X, Send } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';

import { OperatorStatus } from './OperatorStatus';
import { MessageBubble } from './MessageBubble';
import { SuggestedFollowups } from './SuggestedFollowups';
import { parseFollowups } from '@/lib/cosmo-system-prompt';

type Props = {
  open: boolean;
  onClose: () => void;
};

type StoredSession = {
  ts: number;
  messages: UIMessage[];
};

const STORAGE_KEY = 'cosmo-session-v1';
const MAX_AGE_MS = 24 * 60 * 60 * 1000;
const ON_CALL_OPERATOR = 'Faizan';

function greetingFor(path: string): string {
  if (path.startsWith('/pricing')) {
    return 'Questions about pricing? Or ready to book an audit? Faizan can pick up from here anytime.';
  }
  if (path.startsWith('/recovery')) {
    return "AI agent broken? Tell me what's drifting and I can scope the recovery. Or hand off to Faizan to start a real diagnosis.";
  }
  if (path.startsWith('/audit')) {
    return "Mid-form? I can clarify anything before you submit. Or hand off and Faizan will follow up on whatever you've drafted.";
  }
  return "Hi. I'm Cosmo, a trained agent for DPL. Ask about agents, automation, pricing, or recovery. Or hand off to Faizan for a founder-direct reply.";
}

function readMessageText(m: UIMessage): string {
  if (!m.parts) return '';
  return m.parts
    .map((p) => (p.type === 'text' ? p.text : ''))
    .filter(Boolean)
    .join('');
}

function loadSession(): UIMessage[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSession;
    if (!parsed?.ts || Date.now() - parsed.ts > MAX_AGE_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed.messages ?? null;
  } catch {
    return null;
  }
}

function saveSession(messages: UIMessage[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ts: Date.now(), messages }),
    );
  } catch {
    // ignore (quota / private browsing)
  }
}

export default function ChatPanel({ open, onClose }: Props) {
  const pathname = usePathname() ?? '/';
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [hydrated, setHydrated] = useState(false);

  const initialMessages = useMemo<UIMessage[]>(() => {
    if (typeof window === 'undefined') return [];
    return loadSession() ?? [];
  }, []);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/chat',
        body: { currentPath: pathname },
      }),
    [pathname],
  );

  const { messages, sendMessage, status, error, setMessages, stop } = useChat({
    transport,
    messages: initialMessages,
  });

  const isStreaming = status === 'submitted' || status === 'streaming';

  // Inject the page-aware greeting once if the session is empty. The
  // hydrated flag flips inside the effect so the greeting writes exactly
  // once per panel-open per pathname. set-state-in-effect is intentional
  // here (open-side-effect-driven hydration), not derived state.
  useEffect(() => {
    if (!open) return;
    if (hydrated) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
    if (messages.length === 0) {
      setMessages([
        {
          id: 'greet',
          role: 'assistant',
          parts: [{ type: 'text', text: greetingFor(pathname) }],
        } as UIMessage,
      ]);
    }
  }, [open, hydrated, messages.length, pathname, setMessages]);

  // Persist messages on change.
  useEffect(() => {
    if (!hydrated) return;
    saveSession(messages);
  }, [messages, hydrated]);

  // Scroll to bottom on new content.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isStreaming]);

  // Focus input on open.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 200);
    return () => clearTimeout(t);
  }, [open]);

  // Escape closes panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const submit = useCallback(
    (overrideText?: string) => {
      const text = (overrideText ?? input).trim();
      if (!text || isStreaming) return;
      sendMessage({ text });
      setInput('');
    },
    [input, isStreaming, sendMessage],
  );

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' && (e.metaKey || e.ctrlKey)) || (e.key === 'Enter' && !e.shiftKey)) {
      e.preventDefault();
      submit();
    }
  };

  const clearConversation = useCallback(() => {
    setMessages([]);
    setHydrated(false);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  }, [setMessages]);

  // Parse [FOLLOWUPS] off the last assistant message.
  const { displayMessages, followups } = useMemo(() => {
    if (messages.length === 0) return { displayMessages: [], followups: [] as string[] };
    const lastIdx = messages.length - 1;
    const last = messages[lastIdx];
    if (last.role !== 'assistant') {
      return { displayMessages: messages, followups: [] };
    }
    const raw = readMessageText(last);
    const { cleanContent, followups } = parseFollowups(raw);
    const cleaned: UIMessage = {
      ...last,
      parts: [{ type: 'text', text: cleanContent }],
    } as UIMessage;
    return {
      displayMessages: [...messages.slice(0, lastIdx), cleaned],
      followups,
    };
  }, [messages]);

  if (!open) return null;

  const assistantIndexByMessageId = new Map<string, number>();
  let assistantCounter = 0;
  for (const m of displayMessages) {
    if (m.role === 'assistant') {
      assistantCounter += 1;
      assistantIndexByMessageId.set(m.id, assistantCounter);
    }
  }

  return (
    <div
      className="cosmo-panel"
      role="dialog"
      aria-label="Cosmo chat — DPL trained agent"
    >
      <header className="cosmo-panel__head">
        <div className="cosmo-panel__title">
          <span className="cosmo-panel__title-line">DPL · Cosmo</span>
          <span className="cosmo-panel__title-sub">Trained AI agent · Live on this site</span>
        </div>
        <div className="cosmo-panel__head-actions">
          {messages.length > 0 ? (
            <button
              type="button"
              onClick={clearConversation}
              className="cosmo-panel__clear"
            >
              Clear
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="cosmo-panel__close"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      <OperatorStatus operator={ON_CALL_OPERATOR} />

      <div ref={listRef} className="cosmo-panel__body">
        {displayMessages.map((m) => {
          const text = readMessageText(m);
          return (
            <MessageBubble
              key={m.id}
              role={m.role as 'user' | 'assistant' | 'system'}
              content={text}
              index={
                m.role === 'assistant' ? assistantIndexByMessageId.get(m.id) : undefined
              }
            />
          );
        })}

        {isStreaming &&
        displayMessages.length > 0 &&
        displayMessages[displayMessages.length - 1].role === 'user' ? (
          <div className="cosmo-panel__typing" aria-label="Cosmo is replying">
            <span className="cosmo-dot" />
            <span className="cosmo-dot" />
            <span className="cosmo-dot" />
          </div>
        ) : null}

        {error ? (
          <div className="cosmo-panel__error" role="alert">
            Something broke. Try again, or hand off to {ON_CALL_OPERATOR}.
          </div>
        ) : null}
      </div>

      {followups.length > 0 && !isStreaming ? (
        <SuggestedFollowups suggestions={followups} onPick={submit} />
      ) : null}

      <footer className="cosmo-panel__foot">
        <div className="cosmo-panel__input-row">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything about DPL"
            disabled={isStreaming}
            className="cosmo-panel__input"
            maxLength={2000}
            aria-label="Message Cosmo"
          />
          {isStreaming ? (
            <button
              type="button"
              onClick={() => stop()}
              aria-label="Stop response"
              className="cosmo-panel__send"
              data-state="stop"
            >
              <span className="cosmo-panel__send-stop" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => submit()}
              disabled={!input.trim()}
              aria-label="Send message"
              className="cosmo-panel__send"
            >
              <Send size={14} />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

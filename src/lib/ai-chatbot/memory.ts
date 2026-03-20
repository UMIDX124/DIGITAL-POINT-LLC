import type { AgentType } from './agents';

export interface ConversationSession {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  leadData: {
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
    interest?: string;
  };
  currentAgent: AgentType;
  qualityScore: number;
  lastActivity: number;
}

// Survive hot reloads in development
const globalSessions = globalThis as unknown as {
  __chatSessions?: Map<string, ConversationSession>;
};

if (!globalSessions.__chatSessions) {
  globalSessions.__chatSessions = new Map();
}

const sessions = globalSessions.__chatSessions;

const SESSION_TTL = 60 * 60 * 1000; // 1 hour

export function getSession(sessionId: string): ConversationSession {
  const existing = sessions.get(sessionId);
  if (existing) {
    existing.lastActivity = Date.now();
    return existing;
  }

  const session: ConversationSession = {
    messages: [],
    leadData: {},
    currentAgent: 'conversation',
    qualityScore: 0,
    lastActivity: Date.now(),
  };
  sessions.set(sessionId, session);
  return session;
}

export function addMessage(sessionId: string, role: 'user' | 'assistant', content: string): void {
  const session = getSession(sessionId);
  session.messages.push({ role, content });
  // Keep last 20 messages to avoid token overflow
  if (session.messages.length > 20) {
    session.messages = session.messages.slice(-20);
  }
}

export function updateLeadData(sessionId: string, data: Partial<ConversationSession['leadData']>): void {
  const session = getSession(sessionId);
  Object.assign(session.leadData, data);
}

export function updateQualityScore(sessionId: string, delta: number): void {
  const session = getSession(sessionId);
  session.qualityScore = Math.min(100, Math.max(0, session.qualityScore + delta));
}

export function cleanupSessions(): void {
  const now = Date.now();
  for (const [id, session] of sessions) {
    if (now - session.lastActivity > SESSION_TTL) {
      sessions.delete(id);
    }
  }
}

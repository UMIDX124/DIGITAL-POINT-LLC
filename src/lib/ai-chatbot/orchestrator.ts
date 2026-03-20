import { generateText, streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { type Intent, INTENT_CLASSIFICATION_PROMPT, selectAgent, getAgentConfig } from './agents';
import { getSession, addMessage, updateQualityScore, cleanupSessions } from './memory';

const CHAT_MODEL = process.env.CHAT_MODEL || 'llama-3.3-70b-versatile';

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

export function isAIEnabled(): boolean {
  return !!process.env.GROQ_API_KEY;
}

// Classify user intent with a fast, non-streaming call
async function classifyIntent(userMessage: string): Promise<Intent> {
  try {
    const { text } = await generateText({
      model: groq(CHAT_MODEL),
      system: INTENT_CLASSIFICATION_PROMPT,
      prompt: userMessage,
      temperature: 0,
      maxOutputTokens: 20,
    });

    const cleaned = text.trim().toLowerCase().replace(/[^a-z_]/g, '') as Intent;
    const validIntents: Intent[] = [
      'greeting', 'service_question', 'pricing_question', 'process_question',
      'lead_signal', 'contact_request', 'ticket_request', 'general_chat',
    ];
    return validIntents.includes(cleaned) ? cleaned : 'general_chat';
  } catch {
    return 'general_chat';
  }
}

// Score lead signals from user messages
function scoreLead(message: string): number {
  const lower = message.toLowerCase();
  let score = 0;

  const signals = [
    { pattern: /budget|spend|invest/i, points: 15 },
    { pattern: /\$\d+|\d+k|\d+ ?thousand/i, points: 20 },
    { pattern: /timeline|deadline|asap|urgent|soon/i, points: 10 },
    { pattern: /roas|cac|conversion|funnel|roi/i, points: 15 },
    { pattern: /struggling|challenge|problem|issue|pain/i, points: 10 },
    { pattern: /company|business|startup|agency/i, points: 5 },
    { pattern: /scale|grow|expand|increase/i, points: 10 },
    { pattern: /proposal|quote|estimate|work together/i, points: 20 },
    { pattern: /currently running|already spending/i, points: 15 },
  ];

  for (const { pattern, points } of signals) {
    if (pattern.test(lower)) score += points;
  }

  return score;
}

// Extract contact info from messages
function extractContactInfo(message: string): { email?: string; name?: string } {
  const result: { email?: string; name?: string } = {};

  const emailMatch = message.match(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/);
  if (emailMatch) result.email = emailMatch[0];

  const nameMatch = message.match(/(?:my name is|i'm|i am|name:?)\s+([A-Z][a-z]+ ?[A-Z]?[a-z]*)/i);
  if (nameMatch) result.name = nameMatch[1].trim();

  return result;
}

export async function handleMessage(sessionId: string, userMessage: string) {
  // Periodic cleanup
  if (Math.random() < 0.05) cleanupSessions();

  const session = getSession(sessionId);
  addMessage(sessionId, 'user', userMessage);

  // Classify intent
  const intent = await classifyIntent(userMessage);

  // Update lead score
  const leadDelta = scoreLead(userMessage);
  if (leadDelta > 0) updateQualityScore(sessionId, leadDelta);

  // Extract any contact info from message
  const contactInfo = extractContactInfo(userMessage);
  if (contactInfo.email) session.leadData.email = contactInfo.email;
  if (contactInfo.name) session.leadData.name = contactInfo.name;

  // Select agent
  const hasContactInfo = !!(session.leadData.email && session.leadData.name);
  const agentType = selectAgent(intent, session.qualityScore, hasContactInfo);
  session.currentAgent = agentType;

  // Get agent config
  const config = getAgentConfig(agentType);

  // Build messages for the AI
  const aiMessages = session.messages.map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }));

  // Stream response
  const result = streamText({
    model: groq(CHAT_MODEL),
    system: config.systemPrompt,
    messages: aiMessages,
    temperature: config.temperature,
    maxOutputTokens: config.maxOutputTokens,
    onFinish: async ({ text }) => {
      addMessage(sessionId, 'assistant', text);
    },
  });

  return { result, intent, agentType, qualityScore: session.qualityScore, leadData: session.leadData };
}

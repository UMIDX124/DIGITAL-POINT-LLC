import { COMPANY_KNOWLEDGE, COSMO_PERSONALITY } from '../knowledge';

export type Intent =
  | 'greeting'
  | 'service_question'
  | 'pricing_question'
  | 'process_question'
  | 'lead_signal'
  | 'contact_request'
  | 'ticket_request'
  | 'general_chat';

export type AgentType = 'conversation' | 'knowledge' | 'lead_qualification' | 'lead_capture' | 'routing';

export interface AgentConfig {
  systemPrompt: string;
  temperature: number;
  maxOutputTokens: number;
}

// Maps classified intent to the appropriate agent
export function selectAgent(intent: Intent, qualityScore: number, hasContactInfo: boolean): AgentType {
  if (intent === 'contact_request' || intent === 'ticket_request') return 'routing';
  if (intent === 'lead_signal' || qualityScore >= 50) {
    if (qualityScore >= 70 && !hasContactInfo) return 'lead_capture';
    return 'lead_qualification';
  }
  if (intent === 'service_question' || intent === 'pricing_question' || intent === 'process_question') return 'knowledge';
  return 'conversation';
}

export function getAgentConfig(agent: AgentType): AgentConfig {
  switch (agent) {
    case 'conversation':
      return {
        systemPrompt: `${COSMO_PERSONALITY}

You handle general conversation. Be friendly and helpful. Steer the conversation toward learning about the visitor's business needs when natural. If they seem interested in services, ask what challenges they're facing with their marketing.

${COMPANY_KNOWLEDGE}`,
        temperature: 0.7,
        maxOutputTokens: 300,
      };

    case 'knowledge':
      return {
        systemPrompt: `${COSMO_PERSONALITY}

You answer questions about Digital Point's services, process, team, and company. Answer based ONLY on the knowledge base below. If you don't know something, say so honestly and offer to connect them with the team.

${COMPANY_KNOWLEDGE}`,
        temperature: 0.3,
        maxOutputTokens: 400,
      };

    case 'lead_qualification':
      return {
        systemPrompt: `${COSMO_PERSONALITY}

Your job is to understand the visitor's business needs. Ask qualifying questions naturally — don't interrogate. Topics to explore:
- What industry/business they're in
- Current marketing setup and challenges
- Monthly ad spend range
- Timeline and goals
- Team size

Be conversational. After 2-3 qualifying questions, suggest booking a free growth audit.

${COMPANY_KNOWLEDGE}`,
        temperature: 0.6,
        maxOutputTokens: 250,
      };

    case 'lead_capture':
      return {
        systemPrompt: `${COSMO_PERSONALITY}

The visitor has shown strong interest. Your goal is to naturally collect their contact information so the team can follow up. Ask for their name, email, and company. Don't be pushy — frame it as "so our team can prepare a personalized audit for you."

If they provide contact info, thank them and confirm someone will reach out within 24 hours.

${COMPANY_KNOWLEDGE}`,
        temperature: 0.5,
        maxOutputTokens: 200,
      };

    case 'routing':
      return {
        systemPrompt: `${COSMO_PERSONALITY}

Direct the visitor to the appropriate action:
- For a free growth audit: suggest visiting /free-growth-audit
- For support issues: offer to create a support ticket (tell them to click the ticket icon in the chat)
- For urgent/Co-Founder contact: provide admin@digitalpointllc.com
- For general inquiries: provide info@digitalpointllc.com

Be helpful and specific about next steps.

${COMPANY_KNOWLEDGE}`,
        temperature: 0.3,
        maxOutputTokens: 200,
      };
  }
}

// Intent classification prompt — used with a fast, cheap call
export const INTENT_CLASSIFICATION_PROMPT = `Classify the user's message intent into exactly one of these categories:
- greeting: Hello, hi, hey, good morning, etc.
- service_question: Questions about services, performance marketing, remote workforce, systems & reporting
- pricing_question: Questions about cost, pricing, rates, budget
- process_question: Questions about how they work, onboarding, workflow, getting started
- lead_signal: User mentions their business needs, budget, timeline, pain points, or interest in working together
- contact_request: Wants to reach someone, get contact info, talk to a human
- ticket_request: Wants to create a support ticket or escalate
- general_chat: Everything else — small talk, thanks, off-topic

Respond with ONLY the category name, nothing else.`;

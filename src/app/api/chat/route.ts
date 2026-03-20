import { NextRequest, NextResponse } from 'next/server';
import { isAIEnabled, handleMessage } from '@/lib/ai-chatbot/orchestrator';
import { matchFAQ } from '@/lib/ai-chatbot/faq';

export const maxDuration = 30;

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30; // 30 messages per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many messages. Please slow down.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { messages, sessionId } = body;

    if (!messages || !Array.isArray(messages) || !sessionId) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
      return NextResponse.json({ error: 'No user message found' }, { status: 400 });
    }

    // Support both v6 UIMessage format (parts) and legacy format (content)
    let userText = '';
    if (typeof lastMessage.content === 'string') {
      userText = lastMessage.content;
    } else if (Array.isArray(lastMessage.content)) {
      userText = lastMessage.content.map((p: { text?: string }) => p.text || '').join('');
    } else if (Array.isArray(lastMessage.parts)) {
      userText = lastMessage.parts
        .filter((p: { type: string }) => p.type === 'text')
        .map((p: { text?: string }) => p.text || '')
        .join('');
    }

    if (!userText) {
      return NextResponse.json({ error: 'No user message found' }, { status: 400 });
    }

    // Fallback mode: no AI API key configured
    if (!isAIEnabled()) {
      const faqAnswer = matchFAQ(userText);
      return NextResponse.json({
        role: 'assistant',
        content: faqAnswer,
        fallback: true,
      });
    }

    // AI mode: stream response
    const { result } = await handleMessage(sessionId, userText);
    return result.toUIMessageStreamResponse();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Chat API error:', error);
    }
    return NextResponse.json(
      { error: 'An error occurred processing your message' },
      { status: 500 }
    );
  }
}

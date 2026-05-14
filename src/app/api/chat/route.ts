import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { buildCosmoSystemPrompt } from '@/lib/cosmo-system-prompt';
import { ChatRequestSchema } from '@/lib/schemas';
import { chatLimiter, getClientIp } from '@/lib/ratelimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

type LegacyMessage = {
  id?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
};
type PartsMessage = {
  id?: string;
  role: 'user' | 'assistant' | 'system';
  parts: Array<{ type: 'text'; text: string }>;
};
type InputMessage = LegacyMessage | PartsMessage;

function toUIMessage(m: InputMessage, idx: number): UIMessage {
  const id = m.id ?? `m-${idx}`;
  if ('parts' in m) {
    return { id, role: m.role, parts: m.parts } as UIMessage;
  }
  return {
    id,
    role: m.role,
    parts: [{ type: 'text', text: m.content }],
  } as UIMessage;
}

export async function POST(req: NextRequest) {
  const hasKey = !!process.env.GROQ_API_KEY;
  const keyLen = process.env.GROQ_API_KEY?.length ?? 0;
  console.log(`[chat] req hasKey=${hasKey} keyLen=${keyLen}`);

  try {
    const verification = await checkBotId();
    if (verification.isBot && !verification.isVerifiedBot) {
      return NextResponse.json({ error: 'Request blocked.' }, { status: 403 });
    }

    const ip = getClientIp(req.headers);
    const { success } = await chatLimiter.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: 'Too many messages. Try again in a minute.' },
        { status: 429 },
      );
    }

    const body = await req.json();
    const parsed = ChatRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('[chat] GROQ_API_KEY not configured');
      return NextResponse.json(
        { error: 'AI service not configured. Try again in a minute.' },
        { status: 503 },
      );
    }

    const { messages: input, currentPath } = parsed.data;
    const uiMessages: UIMessage[] = input
      .slice(-12)
      .map((m, i) => toUIMessage(m as InputMessage, i));

    const modelMessages = await convertToModelMessages(uiMessages);

    const groq = createGroq({ apiKey });
    const modelId = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

    const result = streamText({
      model: groq(modelId),
      system: buildCosmoSystemPrompt({
        currentPath,
        onCallOperator: 'Faizan',
      }),
      messages: modelMessages,
      temperature: 0,
      seed: 0,
      abortSignal: AbortSignal.timeout(25_000),
    });

    return result.toUIMessageStreamResponse();
  } catch (e: unknown) {
    const err = e as { name?: string; message?: string };
    console.error(`[chat] exception name=${err?.name} msg=${err?.message ?? String(e)}`);
    if (err?.name === 'TimeoutError' || err?.name === 'AbortError') {
      return NextResponse.json(
        { error: 'AI request timed out. Try a shorter message.', code: 'groq_timeout' },
        { status: 504 },
      );
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { COSMO_SYSTEM_PROMPT as SYSTEM_PROMPT } from '@/lib/cosmo-system-prompt';
import { ChatRequestSchema } from '@/lib/schemas';
import { chatLimiter, getClientIp } from '@/lib/ratelimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const reqStart = Date.now();
  // Phase 7. Diagnostic instrumentation (visible in Vercel runtime logs).
  // Helps diagnose env propagation issues quickly: hasKey + length is
  // enough to confirm the runtime sees the key without leaking it.
  const hasKey = !!process.env.GROQ_API_KEY;
  const keyLen = process.env.GROQ_API_KEY?.length ?? 0;
  console.log(`[chat] req hasKey=${hasKey} keyLen=${keyLen}`);

  try {
    const ip = getClientIp(req.headers);
    const { success } = await chatLimiter.limit(ip);
    if (!success) {
      return NextResponse.json({ error: 'Too many messages. Try again in a minute.' }, { status: 429 });
    }

    const body = await req.json();
    const parsed = ChatRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const sanitized = parsed.data.messages.slice(-12);

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('[chat] GROQ_API_KEY not configured');
      return NextResponse.json(
        { error: 'AI service not configured. Try again in a minute. Admin is fixing this now.' },
        { status: 503 },
      );
    }

    const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

    // Phase 8. Single retry on 502/503/504 (transient Groq edge errors).
    // Most live failures are momentary; one immediate retry usually wins.
    const callGroq = async () =>
      fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...sanitized],
          max_tokens: 350,
          temperature: 0.6,
          top_p: 0.9,
        }),
        signal: AbortSignal.timeout(20_000),
      });

    let groqRes = await callGroq();
    if ([502, 503, 504].includes(groqRes.status)) {
      console.warn(`[chat] groq ${groqRes.status}: retrying once`);
      groqRes = await callGroq();
    }

    if (!groqRes.ok) {
      const errText = await groqRes.text().catch(() => '');
      console.error(`[chat] groq ${groqRes.status} body=${errText.slice(0, 300)}`);

      // Map Groq errors to user-facing messages.
      if (groqRes.status === 401 || groqRes.status === 403) {
        return NextResponse.json(
          { error: 'AI service authentication failed. Admin has been notified.' },
          { status: 503 },
        );
      }
      if (groqRes.status === 429) {
        return NextResponse.json(
          { error: 'AI service is busy. Try again in a few seconds.' },
          { status: 429 },
        );
      }
      return NextResponse.json(
        { error: 'AI service temporarily unavailable. Please try again.' },
        { status: 502 },
      );
    }

    const data = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() ?? '';
    if (!reply) {
      console.error('[chat] empty reply from groq');
      return NextResponse.json({ error: 'Got an empty reply. Try rephrasing the question.' }, { status: 502 });
    }

    console.log(`[chat] success duration=${Date.now() - reqStart}ms replyLen=${reply.length}`);
    return NextResponse.json({ reply });
  } catch (e: unknown) {
    const err = e as { name?: string; message?: string };
    console.error(`[chat] exception name=${err?.name} msg=${err?.message ?? String(e)}`);
    if (err?.name === 'TimeoutError' || err?.name === 'AbortError') {
      return NextResponse.json({ error: 'AI request timed out. Try a shorter message.' }, { status: 504 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

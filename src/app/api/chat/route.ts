import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `You are the AI concierge for Digital Point LLC (DPL), a hybrid AI-and-operator services agency founded in 2017.

DPL helps companies scale without growing headcount through three layers, in this priority order:
1. AI agents — lead the work (run repeatable knowledge work, marketing automation, content systems)
2. Automation — handles the repeat (workflows, integrations, scheduled tasks)
3. Trained operators — backstop and edge-case (humans where AI plateaus)

Services: Performance Marketing, Remote Workforce, Automation, Systems & Reporting, Post-Launch Monitoring.

Tone: confident, concise, editorial — match a polished agency voice. Lead with AI capability. Avoid hype. If asked about pricing or implementation specifics, suggest "Book a free audit" CTA. If asked something outside DPL's scope (medical, legal, financial advice, off-topic chat), redirect with: "That's outside what DPL handles, but happy to help with [related service]."

Format: 2-4 sentences max per reply. Plain conversational paragraphs. No markdown headers. No bullet lists unless explicitly asked. No emojis.

Refuse: medical advice, legal advice, financial advice, anything involving harm, anything outside DPL services. Redirect politely.

If user asks "what does DPL do" or "tell me about DPL", give a 2-sentence summary that leads with AI agents and includes the hybrid hierarchy.`;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 12;
const ipBuckets = new Map<string, { count: number; resetAt: number }>();

function rateLimitOk(ip: string): boolean {
  const now = Date.now();
  const bucket = ipBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    ipBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (bucket.count >= RATE_LIMIT_MAX) return false;
  bucket.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!rateLimitOk(ip)) {
      return NextResponse.json({ error: 'Too many messages. Try again in a minute.' }, { status: 429 });
    }

    const body = await req.json();
    const messages = body?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages payload' }, { status: 400 });
    }

    const sanitized = messages
      .filter(
        (m: unknown): m is { role: string; content: string } =>
          !!m && typeof m === 'object' && 'role' in m && 'content' in m &&
          typeof (m as { role: unknown }).role === 'string' &&
          typeof (m as { content: unknown }).content === 'string',
      )
      .filter((m) => ['user', 'assistant'].includes(m.role))
      .slice(-12)
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: String(m.content).slice(0, 2000),
      }));

    if (sanitized.length === 0) {
      return NextResponse.json({ error: 'No valid messages' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('GROQ_API_KEY not configured');
      return NextResponse.json({ error: 'AI service not configured' }, { status: 500 });
    }

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...sanitized],
        max_tokens: 350,
        temperature: 0.6,
        top_p: 0.9,
      }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text().catch(() => '');
      console.error('Groq API error:', groqRes.status, errText.slice(0, 200));
      return NextResponse.json(
        { error: 'AI service temporarily unavailable. Please try again.' },
        { status: 502 },
      );
    }

    const data = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() ?? '';
    if (!reply) {
      return NextResponse.json({ error: 'Empty response from AI' }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (e: unknown) {
    const err = e as { name?: string; message?: string };
    console.error('Chat API exception:', err?.message || e);
    if (err?.name === 'TimeoutError' || err?.name === 'AbortError') {
      return NextResponse.json({ error: 'AI request timed out. Try a shorter message.' }, { status: 504 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

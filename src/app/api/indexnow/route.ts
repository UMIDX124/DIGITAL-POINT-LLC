import { NextRequest, NextResponse } from 'next/server';
import { IndexNowRequestSchema } from '@/lib/schemas';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '';
const HOST = 'digitalpointllc.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = IndexNowRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const { urls } = parsed.data;

    if (!INDEXNOW_KEY) {
      return NextResponse.json({ error: 'IndexNow key not configured' }, { status: 500 });
    }

    // Validate that all URLs belong to the host
    const invalidUrls = urls.filter(
      (url) => !url.startsWith(`https://${HOST}`)
    );
    if (invalidUrls.length > 0) {
      return NextResponse.json(
        { error: `All URLs must belong to ${HOST}.`, invalidUrls },
        { status: 400 }
      );
    }

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: 'IndexNow API returned an error.', status: response.status, details: text },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      submitted: urls.length,
      message: `Successfully submitted ${urls.length} URL(s) to IndexNow.`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process IndexNow request.', details: String(error) },
      { status: 500 }
    );
  }
}

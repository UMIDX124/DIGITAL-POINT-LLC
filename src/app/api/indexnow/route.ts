import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = 'a4ba6cf90e363e1de7820d3ddc85b296';
const HOST = 'digitalpointllc.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body as { urls: string[] };

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'Request body must include a non-empty "urls" array.' },
        { status: 400 }
      );
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

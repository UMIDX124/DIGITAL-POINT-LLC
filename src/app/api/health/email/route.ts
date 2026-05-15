import { NextResponse } from 'next/server';
import { verifySmtp } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const auth = req.headers.get('authorization');
  if (process.env.ADMIN_KEY && auth !== `Bearer ${process.env.ADMIN_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const result = await verifySmtp();
  return NextResponse.json(result, { status: result.ok ? 200 : 503 });
}

import { NextResponse } from 'next/server';
import { pingDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const auth = req.headers.get('authorization');
  if (process.env.ADMIN_KEY && auth !== `Bearer ${process.env.ADMIN_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const result = await pingDb();
  return NextResponse.json(result, { status: result.ok ? 200 : 503 });
}

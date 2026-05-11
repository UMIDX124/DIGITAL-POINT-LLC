import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { SubmissionsQuerySchema } from '@/lib/schemas';

export async function GET(request: NextRequest) {
  try {
    const adminKey = process.env.ADMIN_KEY;

    if (!adminKey) {
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Auth via Authorization header (Bearer token)
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (token !== adminKey) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const query = SubmissionsQuerySchema.safeParse(Object.fromEntries(url.searchParams));
    if (!query.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid query parameters', issues: query.error.flatten() },
        { status: 400 }
      );
    }
    const { page, limit } = query.data;
    const skip = (page - 1) * limit;

    const [auditSubmissions, founderSubmissions, auditCount, founderCount] = await Promise.all([
      db.auditSubmission.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      db.founderSubmission.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      db.auditSubmission.count(),
      db.founderSubmission.count(),
    ]);

    return NextResponse.json({
      success: true,
      page,
      limit,
      auditSubmissions: {
        total: auditCount,
        data: auditSubmissions,
      },
      founderSubmissions: {
        total: founderCount,
        data: founderSubmissions,
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching submissions:', error);
    }

    return NextResponse.json(
      { success: false, message: 'Error fetching submissions' },
      { status: 500 }
    );
  }
}

let _db: any = null;

async function getDb() {
  if (_db) return _db;
  try {
    const { PrismaClient } = await import('@prisma/client');
    const globalForPrisma = globalThis as unknown as { prisma: any };
    _db = globalForPrisma.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query'] : [],
    });
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = _db;
    }
    return _db;
  } catch {
    return null;
  }
}

// Helper to safely run db operations — returns null if DB unavailable
export async function withDb<T>(fn: (prisma: any) => Promise<T>): Promise<T | null> {
  const client = await getDb();
  if (!client) return null;
  try {
    return await fn(client);
  } catch {
    return null;
  }
}

// Keep backward-compatible export for existing code
// This will be a lazy proxy that delegates to the real client
export const db = new Proxy({} as any, {
  get(_target, prop) {
    // Return a proxy for each model that makes all operations async-safe
    return new Proxy({} as any, {
      get(_modelTarget, method) {
        return async (...args: any[]) => {
          const client = await getDb();
          if (!client) throw new Error('Database unavailable');
          return (client as any)[prop][method](...args);
        };
      },
    });
  },
});

 
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
  } catch (e) {
    console.error('[db] PrismaClient init failed', e);
    return null;
  }
}

// Returns null if the DB is unavailable. Underlying errors are logged.
 
export async function withDb<T>(fn: (prisma: any) => Promise<T>): Promise<T | null> {
  const client = await getDb();
  if (!client) return null;
  try {
    return await fn(client);
  } catch (e) {
    console.error('[db] query failed', e);
    return null;
  }
}

// Lazy proxy for legacy call sites. Throws on init failure so the route
// can choose to 500. Query errors are logged before re-throw.
 
export const db = new Proxy({} as any, {
  get(_target, prop) {
     
    return new Proxy({} as any, {
      get(_modelTarget, method) {
         
        return async (...args: any[]) => {
          const client = await getDb();
          if (!client) throw new Error('Database unavailable');
          try {
             
            return await (client as any)[prop][method](...args);
          } catch (e) {
            console.error(`[db] ${String(prop)}.${String(method)} failed`, e);
            throw e;
          }
        };
      },
    });
  },
});

export async function pingDb(): Promise<{ ok: boolean; error?: string }> {
  const client = await getDb();
  if (!client) return { ok: false, error: 'init failed' };
  try {
    await client.$queryRawUnsafe('SELECT 1');
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'ping failed' };
  }
}

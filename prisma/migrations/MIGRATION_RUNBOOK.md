# Prisma migration runbook

The schema moved from SQLite to PostgreSQL. There is no migrations folder
yet because the SQLite shim never produced one. First-time deploy steps:

## 1. Provision Postgres

Use the Vercel Marketplace Neon integration:

```
vercel integrations add neon
```

That auto-injects `DATABASE_URL` (pooled) and `DATABASE_URL_UNPOOLED`
into the project's environment variables.

## 2. Generate initial migration locally

Point your local `.env.local` at the Neon `DATABASE_URL_UNPOOLED`:

```
DATABASE_URL="postgresql://<user>:<pwd>@<host>.neon.tech/<db>?sslmode=require"
```

Then:

```
pnpm prisma migrate dev --name init
```

This creates `prisma/migrations/<timestamp>_init/migration.sql` and
applies it. Commit the migration folder.

## 3. Production deploy

In Vercel project settings, add `prisma migrate deploy` to the build
command, or run it once via:

```
DATABASE_URL="<unpooled-neon-url>" pnpm prisma migrate deploy
```

## 4. Verify

```
curl -H "Authorization: Bearer $ADMIN_KEY" https://www.digitalpointllc.com/api/health/db
```

Should return `{"ok":true}`.

## Notes

- `dev.db` is no longer used. Keep it for one release as rollback safety,
  then delete.
- Local dev with `pnpm dev` requires `DATABASE_URL` set to a Postgres URL
  (Neon dev branch or a local docker postgres).

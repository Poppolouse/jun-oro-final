# PR: DB schema & API contract (Phase‑1)

Branch: feature/db-and-api-contract

Summary:
- Add prisma/schema.prisma
- Add migrations/initial.sql
- Add OpenAPI spec at docs/openapi.yaml
- Add package.json migrate scripts

Runbook

Preconditions
- Set DATABASE_URL in environment (Render service or local .env for dev).
- Do NOT commit secrets; use placeholders in .env.example and render.yaml.

Local quick test (psql against Render DB)
1. Ensure you have Render CLI authenticated.
2. Run the SQL migration directly against the managed Postgres:
   render psql dpg-d44upfeuk2gs73foc5v0-a -f migrations/initial.sql
   (Or use `npm run migrate:psql` which calls the same command.)
3. Verify the migration completed successfully (psql exit code 0).

CI migration (recommended)
- CI should run with DATABASE_URL set to the managed DB.
- Recommended CI steps:
  npm ci
  npm run prisma:generate
  npm run migrate:deploy
- This uses Prisma's deploy flow which applies migrations in order.

One-off migration using Prisma (alternative)
- From a machine with DATABASE_URL set:
  npx prisma migrate deploy --schema=prisma/schema.prisma
- Ensure the DATABASE_URL points to the intended environment.

Verification steps
- Confirm expected tables exist:
  SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public';
- Basic counts:
  SELECT COUNT(*) FROM users;
  SELECT COUNT(*) FROM apps;
  SELECT COUNT(*) FROM deployments;
  SELECT COUNT(*) FROM analytics_events;

Smoke test (API)
- Start the server locally with DATABASE_URL set.
- Register a user: POST /api/v1/auth/register
- Login to receive JWT: POST /api/v1/auth/login
- Create an app: POST /api/v1/apps (Authorization: Bearer <token>)
- List apps: GET /api/v1/apps

Rollback & recovery notes
- Prisma migrate has no automatic "down" for deployed migrations.
- Recommended rollback approaches:
  1) Restore the DB from a backup/snapshot taken before the migration (preferred).
  2) If absolutely necessary, manually DROP created objects (risky) and re-apply a corrected migration.
- Always take a DB snapshot before running production migrations.

Pull Request contents
- Changed files:
  - prisma/schema.prisma
  - migrations/initial.sql
  - docs/openapi.yaml
  - package.json
- PR description should include this runbook, a short summary of schema decisions, and verification steps.

Post-merge TODO
- Ensure CI runs `npx prisma generate` so Prisma Client is available.
- Add additional indexes or optimize queries as requested by DB Architect.
- Add migration versioning if future complex migrations are expected.

References
- Render psql command: render psql dpg-d44upfeuk2gs73foc5v0-a
- See .env.example and render.yaml for environment variable names and placeholders.

Author: automation (review required prior to merge)
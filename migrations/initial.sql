-- Initial migration for jun-oro Phase 1
-- Creates users, apps, deployments, analytics_events tables
-- Do not store secrets in repo; use env vars (see .env.example and render.yaml)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
CREATE TYPE role AS ENUM ('USER','ADMIN');
CREATE TYPE deployment_status AS ENUM ('PENDING','RUNNING','SUCCESS','FAILED','CANCELLED');

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  role role NOT NULL DEFAULT 'USER',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Apps
CREATE TABLE apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  repo_url TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  settings JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_apps_owner_id ON apps(owner_id);
CREATE INDEX idx_apps_created_at ON apps(created_at);

-- Deployments
CREATE TABLE deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id UUID NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  version TEXT,
  status deployment_status NOT NULL DEFAULT 'PENDING',
  log_url TEXT,
  created_by TEXT,
  deployed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_deployments_app_id ON deployments(app_id);
CREATE INDEX idx_deployments_status ON deployments(status);
CREATE INDEX idx_deployments_created_at ON deployments(created_at);

-- Analytics events
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id UUID REFERENCES apps(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  source TEXT,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_app_occurred ON analytics_events(app_id, occurred_at);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);

-- Notes:
-- - Add triggers or application logic to maintain updated_at fields.
-- - Use `npx prisma migrate deploy` or run this SQL directly against the Render DB:
--   render psql dpg-d44upfeuk2gs73foc5v0-a -f migrations/initial.sql

COMMIT;
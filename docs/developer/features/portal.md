# Developer Docs: Portal

## Overview
Root domain üzerinde uygulama kartları listesi, Render API sağlık kontrolü.

## Architecture
Monorepo → apps/portal (Vite/React), Cloudflare Pages’a deploy + Custom Domain (jun-oro.com).

## API Reference
- Backend: `https://api.jun-oro.com`
- Health: `GET /health` (örnek)

## Frontend Components
- App (apps/portal/src/App.tsx): ERS 1.3, AppGrid 1.3.1
- AppCard (apps/portal/src/components/AppCard.tsx): ERS 1.3.1.i

## Testing
- Komut: `npm run build` ve `vite preview` ile smoke test (lokalde).

## ERS Mapping
- 1.3.1: AppGrid
- 1.3.1.i: AppCard
# Inventory App

A React inventory interface backed by a Node API, with synthetic products, stock adjustments, searchable inventory, and low-stock warnings.

## Run & Operate

- `PORT=5000 pnpm --filter @workspace/api-server run dev` — run the API server locally
- `PORT=5173 BASE_PATH=/ pnpm --filter @workspace/inventory-app run dev` — run the web app locally
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Local Vite development forwards `/api` to `http://localhost:5000` by default; override with `API_PROXY_TARGET`
- No database or required secrets

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- Inventory storage: in-memory Node Map (resets when the API restarts)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/api-server/src/routes/inventory.ts` — inventory endpoints and synthetic in-memory records
- `lib/api-spec/openapi.yaml` — source of truth for the inventory API contract
- `artifacts/inventory-app` — React + Vite user interface
- `README.md` — local setup and feature notes

## Architecture decisions

- Inventory stays in server memory; no Postgres access or schema was added.
- Synthetic product data is seeded on API process startup and resets after a restart.
- Replit's `/api` service routing is used in the app; a Vite proxy is enabled only for local development outside Replit.

## Product

Users can find products, check stock against low-stock thresholds, and record positive or negative stock adjustments.

## User preferences

- Use synthetic product records only; do not add authentication, permissions, or real company data.
- Do not connect Postgres or deploy this app unless the user asks.

## Gotchas

- API process restarts reset inventory quantities to the original synthetic values.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

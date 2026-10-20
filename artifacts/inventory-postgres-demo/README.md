# Fieldnote Inventory — PostgreSQL Migration Demo

This is a separate React and Node.js migration-demo variant of the in-memory inventory app. It keeps the same 20 synthetic products and stable IDs (`prod-001` through `prod-020`), and stores product quantities and stock-adjustment history in PostgreSQL.

This app was generated in Replit. It has no authentication or permissions, contains no real company data or Retool code, and has not been deployed.

## Requirements

- Node.js and pnpm
- PostgreSQL
- `DATABASE_URL` set in the runtime environment

Keep the connection string in Replit Secrets or another environment-variable manager. Never put it in source code, this README, or a committed `.env` file.

## Local setup

Run commands from the repository root:

```sh
pnpm install
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f artifacts/inventory-postgres-demo/sql/schema.sql
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f artifacts/inventory-postgres-demo/sql/seed.sql
```

The SQL uses a separate `migration_demo` schema. Both scripts are safe to rerun: the schema uses `IF NOT EXISTS`, and the seed leaves existing product rows unchanged.

Start the Node API in one terminal:

```sh
PORT=5000 pnpm --filter @workspace/api-server run dev
```

Start the React app in another terminal:

```sh
PORT=5173 BASE_PATH=/inventory-postgres-demo/ pnpm --filter @workspace/inventory-postgres-demo run dev
```

The local Vite server forwards `/api` requests to `http://localhost:5000`. Set `API_PROXY_TARGET` if the API is running elsewhere.

## API

The API is served under `/api`:

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/migration-demo/products?search=mouse` | List products; search matches product name, SKU, and category |
| `GET` | `/api/migration-demo/summary` | Product, unit, low-stock totals, and active storage mode |
| `POST` | `/api/migration-demo/products/{productId}/adjust` | Adjust stock and record the reason and before/after quantities |
| `GET` | `/api/migration-demo/products/{productId}/history` | Read a product's stock-adjustment history |

Example adjustment:

```sh
curl -X POST "http://localhost:5000/api/migration-demo/products/prod-001/adjust" \
  -H "Content-Type: application/json" \
  -d '{"delta":3,"reason":"Receiving"}'
```

Adjustments must be non-zero whole numbers with a reason; stock cannot go below zero. Each adjustment and quantity update are committed together in PostgreSQL.

## Storage and fallback

The API checks `DATABASE_URL` and the migration-demo tables at startup. When they are ready, the app uses PostgreSQL. The summary endpoint reports `storageMode: "postgres"` and the UI shows that status.

If `DATABASE_URL` is missing, the database cannot be reached, or the schema/seed is not ready, the API uses an in-memory fallback and reports `storageMode: "memory"`. Product changes and history in that mode reset when the API process restarts; they are not written to PostgreSQL. The UI displays a fallback warning. Check the database connection and apply both SQL files to enable persistence.

The PostgreSQL schema and seed are in `sql/schema.sql` and `sql/seed.sql`. They target PostgreSQL and do not depend on an ORM-specific migration format.

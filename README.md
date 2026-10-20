# Inventory App

A small React inventory app with a Node API, searchable synthetic products, stock adjustments, and low-stock warnings.

> This app was generated in Replit.

## Run locally

Requires Node.js 20 or newer and pnpm.

1. Install dependencies:

   ```sh
   pnpm install
   ```

2. Start the API in one terminal:

   ```sh
   PORT=5000 pnpm --filter @workspace/api-server run dev
   ```

3. Start the web app in a second terminal:

   ```sh
   PORT=5173 BASE_PATH=/ pnpm --filter @workspace/inventory-app run dev
   ```

4. Open the local URL printed by Vite (normally `http://localhost:5173`).

The local Vite server forwards `/api` requests to `http://localhost:5000`. Set `API_PROXY_TARGET` if the API runs at a different address.

## Inventory behavior

- The API starts with 20 synthetic products.
- Search matches product name, SKU, and category.
- Stock adjustments accept a positive or negative whole-number change and a reason.
- Stock cannot be reduced below zero. A product is low-stock when its quantity is at or below its threshold.
- Inventory is held in Node server memory. Changes are lost when the API process restarts.
- There is no authentication, permissions system, PostgreSQL connection, or real company data.

## API

- `GET /api/products?search=<term>` — list and search products
- `GET /api/inventory/summary` — product count, unit count, and low-stock count
- `POST /api/products/:productId/adjust` — adjust stock with a JSON body such as `{"delta": 4, "reason": "Restock"}`

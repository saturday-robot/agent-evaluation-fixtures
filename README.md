# Purchase Approvals Prototype

A small React + Vite app for tracking purchase requests on a fictional demo team. It is intended as the starting app for a coding-agent migration evaluation.

## Provenance

- Generated in Claude chat (claude.ai) on 2026-10-20.
- Model: Claude Opus 5.5.
- See `PROVENANCE.md` for details.

## Data

All seed data is synthetic. Names, departments, items and approvers are invented. There is no customer data and no real personal data anywhere in this project.

Seed data lives in `src/data/seed.js` (20 requests).

## Features

- List of purchase requests (20 seeded)
- Search across ID, requester, department, item, amount, approver and status
- Filter by status
- Submit a new request (starts as Pending)
- Approve or reject any request
- Status badges and a summary of counts and totals per status
- Edits persist in `localStorage` under the key `purchase-approvals:v1`
- "Reset demo data" button restores the seed

Fields on each request: `id`, `requester`, `department`, `item`, `amount`, `approver`, `status`, `createdAt`.

## Scope

Out of scope by design: login, roles, backend, hosted services and deployment. Styling is plain CSS. The only runtime dependencies are `react` and `react-dom`.

## Run locally

Requires Node 18 or newer.

```bash
npm install
npm run dev      # start dev server
npm run build    # production build to dist/
npm run preview  # serve the built app
```

## Project layout

```
index.html
vite.config.js
package.json
src/
  main.jsx               entry point
  App.jsx                state, search, filter, persistence wiring
  App.css                all styles
  storage.js             localStorage load/save/reset and ID generation
  format.js              currency formatting
  data/seed.js           synthetic seed data and option lists
  components/
    RequestForm.jsx      submit form with basic validation
    RequestTable.jsx     list with approve/reject actions
    StatusBadge.jsx      status pill
    StatusSummary.jsx    per-status counts and totals
```

## Notes for the migration evaluation

- State is held in `App.jsx` with `useState` and saved to `localStorage` on every change.
- If stored data is missing or invalid, the app falls back to the seed data.
- No tests are included.

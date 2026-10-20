# Dispatch Board — Synthetic Demo

This project was generated in [Bolt](https://bolt.new). It is a small React + TypeScript dispatch board for a fictional demo delivery company.

## Starting State

- **20 sample delivery jobs** seeded on first load, each with a customer, pickup location, destination, assigned driver, scheduled date, and status.
- Jobs persist in the browser via `localStorage` (key: `dispatch_jobs_v1`). No login, no database, no server calls.
- Features:
  - Search jobs by ID, customer, location, or driver.
  - Filter by status (clickable summary chips) and by driver.
  - Add a new job via a modal form (auto-incrementing ID).
  - Edit a job's details or delete it.
  - Assign or reassign a driver inline from the table.
  - Update a job's status inline from the table.
  - Reset all data back to the original 20 sample jobs.

This is the **starting project for a migration test**. It intentionally has:
- No authentication or user roles.
- No live database (uses local sample data + `localStorage`).
- No external integrations, billing, or deployment configuration.

## Local Run Instructions

Requirements: Node.js 18+.

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:5173`).

### Other scripts

```bash
npm run build      # production build
npm run preview    # preview the production build
npm run typecheck  # type-check without emitting
npm run lint       # run ESLint
```

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- lucide-react (icons)
- localStorage for persistence

# Purchase Requests (Demo)

> This app was generated in [Lovable](https://lovable.dev). It is a migration-evaluation starter project, **not a production app**. All people, items and amounts are synthetic.

Features: search requests, submit a new request, approve/reject pending requests, see status counts.
Out of scope: SSO, user roles, billing, real company data, deployment.

## Run locally

```bash
bun install        # or npm install
bun run dev        # or npm run dev
```

Open http://localhost:8080. With no database configured the app runs in **local demo mode**: the 20 seed requests (`src/lib/seed.ts`) are stored in your browser's localStorage. Use "Reset demo data" to restore them.

## Connect a sandbox Supabase database

1. Create a sandbox Supabase project (never production).
2. In the SQL editor run `supabase/schema.sql`, then `supabase/seed.sql`.
3. Create `.env.local` in the project root:

   ```
   VITE_SUPABASE_URL=https://<your-sandbox>.supabase.co
   VITE_SUPABASE_ANON_KEY=<anon/publishable key>
   ```

4. Restart the dev server. The header badge switches to "Supabase connected".

Note: the demo RLS policies let anyone with the anon key read, insert and update rows. That's fine for a sandbox, not for real data.

## Layout

- `src/routes/index.tsx` — the single page UI
- `src/lib/repository.ts` — data access (demo localStorage or Supabase)
- `src/lib/seed.ts`, `supabase/seed.sql` — the same 20 synthetic rows
- `supabase/schema.sql` — table, grants, RLS

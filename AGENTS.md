<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All data access goes through `src/lib/repository.ts`; it uses Supabase when VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY are set, else localStorage demo mode — keeps the app runnable without a backend.
- `supabase/schema.sql` + `supabase/seed.sql` are the source of truth for the DB; keep `src/lib/seed.ts` in sync with the seed file.

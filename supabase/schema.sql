-- Purchase requests demo schema (Supabase / Postgres compatible).
-- Demo only: open policies, no auth. Do not use for real data.

create extension if not exists pgcrypto;

create table if not exists public.purchase_requests (
  id uuid primary key default gen_random_uuid(),
  requester text not null,
  department text not null,
  item text not null,
  amount numeric(12,2) not null check (amount > 0),
  approver text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

grant select, insert, update on public.purchase_requests to anon, authenticated;
grant all on public.purchase_requests to service_role;

alter table public.purchase_requests enable row level security;

drop policy if exists "demo read" on public.purchase_requests;
drop policy if exists "demo insert" on public.purchase_requests;
drop policy if exists "demo update" on public.purchase_requests;
create policy "demo read" on public.purchase_requests for select to anon, authenticated using (true);
create policy "demo insert" on public.purchase_requests for insert to anon, authenticated with check (true);
create policy "demo update" on public.purchase_requests for update to anon, authenticated using (true) with check (true);

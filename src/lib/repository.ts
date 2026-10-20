import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SEED } from "./seed";
import type { NewPurchaseRequest, PurchaseRequest, Status } from "./types";

export interface Repository {
  mode: "demo" | "supabase";
  list(): Promise<PurchaseRequest[]>;
  create(input: NewPurchaseRequest): Promise<PurchaseRequest>;
  setStatus(id: string, status: Status): Promise<void>;
}

const KEY = "purchase-requests-demo";

function demoRepo(): Repository {
  const read = (): PurchaseRequest[] => {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : SEED;
  };
  const write = (rows: PurchaseRequest[]) => localStorage.setItem(KEY, JSON.stringify(rows));
  return {
    mode: "demo",
    async list() {
      return read().sort((a, b) => b.created_at.localeCompare(a.created_at));
    },
    async create(input) {
      const row: PurchaseRequest = { ...input, id: crypto.randomUUID(), status: "pending", created_at: new Date().toISOString() };
      write([row, ...read()]);
      return row;
    },
    async setStatus(id, status) {
      write(read().map((r) => (r.id === id ? { ...r, status } : r)));
    },
  };
}

function supabaseRepo(client: SupabaseClient): Repository {
  const table = () => client.from("purchase_requests");
  return {
    mode: "supabase",
    async list() {
      const { data, error } = await table().select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((r) => ({ ...r, amount: Number(r.amount) }));
    },
    async create(input) {
      const { data, error } = await table().insert(input).select().single();
      if (error) throw error;
      return { ...data, amount: Number(data.amount) };
    },
    async setStatus(id, status) {
      const { error } = await table().update({ status }).eq("id", id);
      if (error) throw error;
    },
  };
}

let repo: Repository | null = null;

export function getRepository(): Repository {
  if (repo) return repo;
  const url = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
  const key = import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined;
  repo = url && key ? supabaseRepo(createClient(url, key)) : demoRepo();
  return repo;
}

export function resetDemoData() {
  localStorage.removeItem(KEY);
}

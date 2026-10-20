import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { getRepository, resetDemoData } from "@/lib/repository";
import type { PurchaseRequest, Status } from "@/lib/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Purchase Requests — Demo Team" },
      { name: "description", content: "Search, submit and approve purchase requests for a synthetic demo team." },
      { property: "og:title", content: "Purchase Requests — Demo Team" },
      { property: "og:description", content: "Search, submit and approve purchase requests for a synthetic demo team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
const empty = { requester: "", department: "", item: "", amount: "", approver: "" };

function Index() {
  const [rows, setRows] = useState<PurchaseRequest[]>([]);
  const [mode, setMode] = useState<"demo" | "supabase">("demo");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Status | "all">("all");
  const [form, setForm] = useState(empty);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    const repo = getRepository();
    setMode(repo.mode);
    try {
      setRows(await repo.list());
    } catch (e) {
      setError((e as Error).message);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const visible = useMemo(() => {
    const q = query.toLowerCase();
    return rows.filter(
      (r) =>
        (filter === "all" || r.status === filter) &&
        [r.requester, r.department, r.item, r.approver].some((v) => v.toLowerCase().includes(q)),
    );
  }, [rows, query, filter]);

  const counts = useMemo(
    () => ({
      pending: rows.filter((r) => r.status === "pending").length,
      approved: rows.filter((r) => r.status === "approved").length,
      rejected: rows.filter((r) => r.status === "rejected").length,
    }),
    [rows],
  );

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if (Object.values(form).some((v) => !v.trim()) || !(amount > 0)) {
      setError("Fill every field with a positive amount.");
      return;
    }
    setError(null);
    await getRepository().create({ ...form, amount });
    setForm(empty);
    load();
  };

  const decide = async (id: string, status: Status) => {
    await getRepository().setStatus(id, status);
    load();
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-foreground pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Demo Team · Procurement</p>
          <h1 className="font-display text-5xl">Purchase Requests</h1>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="rounded-full border border-foreground px-3 py-1">
            {mode === "demo" ? "Local demo mode" : "Supabase connected"}
          </span>
          {mode === "demo" && (
            <button className="underline" onClick={() => { resetDemoData(); load(); }}>
              Reset demo data
            </button>
          )}
        </div>
      </header>

      <section className="mt-6 grid grid-cols-3 gap-4">
        {(["pending", "approved", "rejected"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(filter === s ? "all" : s)}
            className={`status-card status-${s} ${filter === s ? "ring-2 ring-foreground" : ""}`}
          >
            <span className="font-mono text-xs uppercase tracking-widest">{s}</span>
            <span className="font-display text-4xl">{counts[s]}</span>
          </button>
        ))}
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <section>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search requester, department, item, approver…"
            className="field w-full"
          />
          <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="p-3">Item</th>
                  <th className="p-3">Requester</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3">Approver</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => (
                  <tr key={r.id} className="border-t border-border">
                    <td className="p-3 font-medium">{r.item}</td>
                    <td className="p-3">
                      {r.requester}
                      <div className="text-xs text-muted-foreground">{r.department}</div>
                    </td>
                    <td className="p-3 text-right font-mono">{money(r.amount)}</td>
                    <td className="p-3">{r.approver}</td>
                    <td className="p-3">
                      {r.status === "pending" ? (
                        <div className="flex gap-2">
                          <button className="btn-approve" onClick={() => decide(r.id, "approved")}>Approve</button>
                          <button className="btn-reject" onClick={() => decide(r.id, "rejected")}>Reject</button>
                        </div>
                      ) : (
                        <span className={`pill status-${r.status}`}>{r.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
                {visible.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-muted-foreground">No matching requests.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <aside>
          <form onSubmit={submit} className="space-y-3 rounded-lg border-2 border-foreground bg-card p-5">
            <h2 className="font-display text-2xl">New request</h2>
            {(["requester", "department", "item", "amount", "approver"] as const).map((f) => (
              <label key={f} className="block">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{f}</span>
                <input
                  type={f === "amount" ? "number" : "text"}
                  step="0.01"
                  value={form[f]}
                  onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                  className="field mt-1 w-full"
                />
              </label>
            ))}
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button type="submit" className="btn-primary w-full">Submit request</button>
          </form>
        </aside>
      </div>

      <footer className="mt-10 border-t border-border pt-4 text-xs text-muted-foreground">
        <a href="/demo-source.zip" download className="underline">
          Download demo source
        </a>
      </footer>
    </main>
  );
}

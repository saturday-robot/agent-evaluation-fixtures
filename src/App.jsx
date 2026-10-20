import { useEffect, useMemo, useState } from 'react';
import { loadRequests, saveRequests, clearRequests, nextId } from './storage.js';
import { SEED_REQUESTS, STATUSES } from './data/seed.js';
import RequestForm from './components/RequestForm.jsx';
import RequestTable from './components/RequestTable.jsx';
import StatusSummary from './components/StatusSummary.jsx';

export default function App() {
  const [requests, setRequests] = useState(loadRequests);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    saveRequests(requests);
  }, [requests]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return requests.filter((r) => {
      if (statusFilter !== 'All' && r.status !== statusFilter) return false;
      if (!q) return true;
      return [r.id, r.requester, r.department, r.item, r.approver, r.status, String(r.amount)]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [requests, query, statusFilter]);

  function handleSubmit(data) {
    setRequests((prev) => [
      {
        id: nextId(prev),
        ...data,
        status: 'Pending',
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
  }

  function setStatus(id, status) {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  function handleReset() {
    if (!window.confirm('Reset all requests to the original seed data?')) return;
    clearRequests();
    setRequests(SEED_REQUESTS.map((r) => ({ ...r })));
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Purchase Approvals</h1>
          <p className="subtitle">Demo team prototype. Synthetic data only.</p>
        </div>
        <button type="button" className="btn btn-ghost" onClick={handleReset}>
          Reset demo data
        </button>
      </header>

      <StatusSummary requests={requests} />

      <main className="layout">
        <section className="panel">
          <h2>New request</h2>
          <RequestForm onSubmit={handleSubmit} />
        </section>

        <section className="panel panel-wide">
          <div className="toolbar">
            <h2>Requests</h2>
            <div className="toolbar-controls">
              <input
                type="search"
                className="input"
                placeholder="Search requester, item, department..."
                aria-label="Search requests"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <select
                className="input"
                aria-label="Filter by status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All statuses</option>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="result-count">
            Showing {filtered.length} of {requests.length}
          </p>
          <RequestTable
            requests={filtered}
            onApprove={(id) => setStatus(id, 'Approved')}
            onReject={(id) => setStatus(id, 'Rejected')}
          />
        </section>
      </main>

      <footer className="app-footer">Generated in Claude chat as a starting app for a migration evaluation.</footer>
    </div>
  );
}

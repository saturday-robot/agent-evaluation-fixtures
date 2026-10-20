import { useMemo, useState } from 'react';
import { Job, JobStatus, DRIVERS, STATUSES } from '../types';
import { useJobs } from '../useJobs';
import { StatusSelect } from './Status';
import { JobFormModal } from './JobFormModal';
import { Search, Plus, RotateCcw, Trash2, Pencil, Truck, MapPin } from 'lucide-react';

export function DispatchBoard() {
  const { jobs, addJob, updateJob, deleteJob, resetJobs } = useJobs();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'All'>('All');
  const [driverFilter, setDriverFilter] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Job | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((j) => {
      if (statusFilter !== 'All' && j.status !== statusFilter) return false;
      if (driverFilter !== 'All' && j.driver !== driverFilter) return false;
      if (!q) return true;
      return (
        j.id.toLowerCase().includes(q) ||
        j.customer.toLowerCase().includes(q) ||
        j.pickup.toLowerCase().includes(q) ||
        j.destination.toLowerCase().includes(q) ||
        j.driver.toLowerCase().includes(q)
      );
    });
  }, [jobs, query, statusFilter, driverFilter]);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (job: Job) => {
    setEditing(job);
    setModalOpen(true);
  };
  const handleSave = (job: Job) => {
    if (editing) {
      updateJob(job.id, job);
    } else {
      addJob(job);
    }
    setModalOpen(false);
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: jobs.length };
    STATUSES.forEach((s) => (c[s] = jobs.filter((j) => j.status === s).length));
    return c;
  }, [jobs]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
                <Truck size={20} />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Dispatch Board</h1>
                <p className="text-xs text-slate-500">Synthetic demo · 20 sample jobs</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={openAdd}
                className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                <Plus size={16} /> Add Job
              </button>
              <button
                onClick={resetJobs}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                title="Reset to sample data"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Status summary chips */}
        <div className="mb-5 flex flex-wrap gap-2">
          {(['All', ...STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                statusFilter === s
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {s} · {counts[s] ?? 0}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by ID, customer, location, or driver..."
              className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
          </div>
          <select
            value={driverFilter}
            onChange={(e) => setDriverFilter(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
          >
            <option value="All">All Drivers</option>
            {DRIVERS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Job ID</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Route</th>
                  <th className="px-4 py-3 font-medium">Driver</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                      No jobs match your filters.
                    </td>
                  </tr>
                )}
                {filtered.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/70">
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">{job.id}</td>
                    <td className="px-4 py-3 text-slate-700">{job.customer}</td>
                    <td className="px-4 py-3 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-slate-400" />
                        <span>{job.pickup}</span>
                        <span className="text-slate-300">→</span>
                        <span>{job.destination}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={job.driver}
                        onChange={(e) => updateJob(job.id, { driver: e.target.value })}
                        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      >
                        {DRIVERS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">{job.scheduledDate}</td>
                    <td className="px-4 py-3">
                      <StatusSelect
                        value={job.status}
                        onChange={(s) => updateJob(job.id, { status: s })}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(job)}
                          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          aria-label="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Showing {filtered.length} of {jobs.length} jobs · Data is stored locally in your browser.
        </p>
      </main>

      <JobFormModal
        open={modalOpen}
        initial={editing}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        existingIds={jobs.map((j) => j.id)}
      />
    </div>
  );
}

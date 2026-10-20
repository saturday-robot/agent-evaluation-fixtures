import { useEffect, useState } from 'react';
import { DRIVERS, Job, JobStatus, STATUSES } from '../types';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  initial?: Job | null;
  onClose: () => void;
  onSave: (job: Job) => void;
  existingIds: string[];
}

function nextId(existing: string[]): string {
  const nums = existing
    .map((id) => parseInt(id.replace('DJ-', ''), 10))
    .filter((n) => !isNaN(n));
  const max = nums.length ? Math.max(...nums) : 1000;
  return `DJ-${max + 1}`;
}

export function JobFormModal({ open, initial, onClose, onSave, existingIds }: Props) {
  const [form, setForm] = useState<Job>({
    id: '',
    customer: '',
    pickup: '',
    destination: '',
    driver: 'Unassigned',
    scheduledDate: new Date().toISOString().slice(0, 10),
    status: 'Pending',
  });

  useEffect(() => {
    if (initial) {
      setForm(initial);
    } else {
      setForm({
        id: nextId(existingIds),
        customer: '',
        pickup: '',
        destination: '',
        driver: 'Unassigned',
        scheduledDate: new Date().toISOString().slice(0, 10),
        status: 'Pending',
      });
    }
  }, [initial, existingIds, open]);

  if (!open) return null;

  const set = (field: keyof Job, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customer.trim() || !form.pickup.trim() || !form.destination.trim()) return;
    onSave(form);
  };

  const fieldCls =
    'w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            {initial ? 'Edit Job' : 'Add Delivery Job'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4 px-5 py-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-600">Job ID</label>
              <input value={form.id} disabled className={`${fieldCls} bg-slate-100 text-slate-500`} />
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-600">Customer</label>
              <input
                value={form.customer}
                onChange={(e) => set('customer', e.target.value)}
                className={fieldCls}
                placeholder="Customer name"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Pickup</label>
              <input
                value={form.pickup}
                onChange={(e) => set('pickup', e.target.value)}
                className={fieldCls}
                placeholder="City, ST"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Destination</label>
              <input
                value={form.destination}
                onChange={(e) => set('destination', e.target.value)}
                className={fieldCls}
                placeholder="City, ST"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Driver</label>
              <select
                value={form.driver}
                onChange={(e) => set('driver', e.target.value)}
                className={fieldCls}
              >
                {DRIVERS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Scheduled Date</label>
              <input
                type="date"
                value={form.scheduledDate}
                onChange={(e) => set('scheduledDate', e.target.value)}
                className={fieldCls}
              />
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-600">Status</label>
              <select
                value={form.status}
                onChange={(e) => set('status', e.target.value as JobStatus)}
                className={fieldCls}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              {initial ? 'Save Changes' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

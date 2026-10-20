import { useState } from 'react';
import { DEPARTMENTS, APPROVERS } from '../data/seed.js';

const EMPTY = { requester: '', department: DEPARTMENTS[0], item: '', amount: '', approver: APPROVERS[0] };

export default function RequestForm({ onSubmit }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!form.requester.trim() || !form.item.trim()) {
      setError('Requester and item are required.');
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Amount must be a number greater than 0.');
      return;
    }
    onSubmit({
      requester: form.requester.trim(),
      department: form.department,
      item: form.item.trim(),
      amount: Math.round(amount * 100) / 100,
      approver: form.approver,
    });
    setForm(EMPTY);
    setError('');
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label>
        Requester
        <input className="input" value={form.requester} onChange={update('requester')} placeholder="Full name" />
      </label>
      <label>
        Department
        <select className="input" value={form.department} onChange={update('department')}>
          {DEPARTMENTS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </label>
      <label>
        Item
        <input className="input" value={form.item} onChange={update('item')} placeholder="What are you buying?" />
      </label>
      <label>
        Amount (USD)
        <input
          className="input"
          type="number"
          min="0.01"
          step="0.01"
          value={form.amount}
          onChange={update('amount')}
          placeholder="0.00"
        />
      </label>
      <label>
        Approver
        <select className="input" value={form.approver} onChange={update('approver')}>
          {APPROVERS.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-primary">
        Submit request
      </button>
    </form>
  );
}

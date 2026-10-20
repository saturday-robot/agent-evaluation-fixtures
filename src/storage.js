import { SEED_REQUESTS } from './data/seed.js';

export const STORAGE_KEY = 'purchase-approvals:v1';

export function loadRequests() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_REQUESTS.map((r) => ({ ...r }));
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('Stored value is not an array');
    return parsed;
  } catch {
    return SEED_REQUESTS.map((r) => ({ ...r }));
  }
}

export function saveRequests(requests) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  } catch {
    // Storage may be unavailable (private mode, quota). The app keeps working in memory.
  }
}

export function clearRequests() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function nextId(requests) {
  const max = requests.reduce((m, r) => {
    const n = parseInt(String(r.id).replace(/\D/g, ''), 10);
    return Number.isFinite(n) && n > m ? n : m;
  }, 1000);
  return `PR-${max + 1}`;
}

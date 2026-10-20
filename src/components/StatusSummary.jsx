import { STATUSES } from '../data/seed.js';
import { formatAmount } from '../format.js';

export default function StatusSummary({ requests }) {
  return (
    <div className="summary">
      {STATUSES.map((status) => {
        const items = requests.filter((r) => r.status === status);
        const total = items.reduce((sum, r) => sum + Number(r.amount), 0);
        return (
          <div key={status} className={`summary-card summary-${status.toLowerCase()}`}>
            <span className="summary-label">{status}</span>
            <span className="summary-count">{items.length}</span>
            <span className="summary-total">{formatAmount(total)}</span>
          </div>
        );
      })}
    </div>
  );
}

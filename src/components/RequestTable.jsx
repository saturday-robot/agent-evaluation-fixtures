import StatusBadge from './StatusBadge.jsx';
import { formatAmount } from '../format.js';

export default function RequestTable({ requests, onApprove, onReject }) {
  if (requests.length === 0) {
    return <p className="empty">No requests match your search.</p>;
  }

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Requester</th>
            <th>Department</th>
            <th>Item</th>
            <th className="num">Amount</th>
            <th>Approver</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td className="mono">{r.id}</td>
              <td>{r.requester}</td>
              <td>{r.department}</td>
              <td>{r.item}</td>
              <td className="num">{formatAmount(r.amount)}</td>
              <td>{r.approver}</td>
              <td>
                <StatusBadge status={r.status} />
              </td>
              <td className="actions">
                <button
                  type="button"
                  className="btn btn-approve"
                  disabled={r.status === 'Approved'}
                  onClick={() => onApprove(r.id)}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="btn btn-reject"
                  disabled={r.status === 'Rejected'}
                  onClick={() => onReject(r.id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

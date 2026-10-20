export type Status = "pending" | "approved" | "rejected";

export interface PurchaseRequest {
  id: string;
  requester: string;
  department: string;
  item: string;
  amount: number;
  approver: string;
  status: Status;
  created_at: string;
}

export type NewPurchaseRequest = Pick<PurchaseRequest, "requester" | "department" | "item" | "amount" | "approver">;

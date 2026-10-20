import type { PurchaseRequest } from "./types";

// Synthetic demo data. Keep in sync with supabase/seed.sql.
const rows: [string, string, string, number, string, PurchaseRequest["status"]][] = [
  ["Avery Lin", "Engineering", "Mechanical keyboards (x4)", 520, "Morgan Reyes", "pending"],
  ["Jordan Park", "Marketing", "Conference booth banner", 1250, "Casey Doyle", "approved"],
  ["Riley Chen", "Design", "Drawing tablet", 389.99, "Morgan Reyes", "pending"],
  ["Sam Patel", "Operations", "Office chairs (x6)", 2100, "Taylor Brooks", "rejected"],
  ["Quinn Alvarez", "Engineering", "Cloud credits top-up", 3000, "Morgan Reyes", "approved"],
  ["Drew Kim", "Sales", "CRM add-on licenses", 840, "Casey Doyle", "pending"],
  ["Harper Nguyen", "Finance", "Accounting reference books", 145.5, "Taylor Brooks", "approved"],
  ["Rowan Silva", "Engineering", "4K monitors (x2)", 798, "Morgan Reyes", "pending"],
  ["Emerson Ito", "People", "Team offsite catering", 1600, "Taylor Brooks", "pending"],
  ["Skyler Moss", "Marketing", "Stock photo subscription", 299, "Casey Doyle", "rejected"],
  ["Parker Diaz", "Design", "Font license", 420, "Morgan Reyes", "approved"],
  ["Reese Okafor", "Operations", "Label printer", 189, "Taylor Brooks", "approved"],
  ["Finley Ross", "Sales", "Demo laptop", 1450, "Casey Doyle", "pending"],
  ["Hayden Cruz", "Engineering", "USB-C docks (x5)", 625, "Morgan Reyes", "rejected"],
  ["Logan Weiss", "Finance", "Shredder", 230, "Taylor Brooks", "pending"],
  ["Kendall Shah", "People", "Onboarding swag kits", 900, "Taylor Brooks", "approved"],
  ["Blake Ortiz", "Marketing", "Video editing software", 599, "Casey Doyle", "pending"],
  ["Cameron Wu", "Engineering", "Test devices (phones)", 2400, "Morgan Reyes", "pending"],
  ["Dakota Hale", "Design", "Usability testing panel", 750, "Morgan Reyes", "approved"],
  ["Jamie Fox", "Operations", "Whiteboards (x3)", 360, "Taylor Brooks", "rejected"],
];

export const SEED: PurchaseRequest[] = rows.map(([requester, department, item, amount, approver, status], i) => ({
  id: `demo-${i + 1}`,
  requester,
  department,
  item,
  amount,
  approver,
  status,
  created_at: new Date(Date.UTC(2026, 8, 1 + i)).toISOString(),
}));

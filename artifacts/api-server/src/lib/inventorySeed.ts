export type InventorySeedProduct = {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  lowStockThreshold: number;
  unit: string;
  updatedAt: string;
};

export const syntheticInventoryProducts: InventorySeedProduct[] = [
  { id: "prod-001", name: "Wireless Mouse", sku: "ELC-1042", category: "Electronics", quantity: 34, lowStockThreshold: 10, unit: "units", updatedAt: "2026-10-20T08:15:00.000Z" },
  { id: "prod-002", name: "USB-C Hub", sku: "ELC-1088", category: "Electronics", quantity: 8, lowStockThreshold: 12, unit: "units", updatedAt: "2026-10-20T08:12:00.000Z" },
  { id: "prod-003", name: "Mechanical Keyboard", sku: "ELC-1120", category: "Electronics", quantity: 21, lowStockThreshold: 8, unit: "units", updatedAt: "2026-10-19T16:40:00.000Z" },
  { id: "prod-004", name: "Laptop Stand", sku: "OFF-2031", category: "Office", quantity: 5, lowStockThreshold: 10, unit: "units", updatedAt: "2026-10-20T07:50:00.000Z" },
  { id: "prod-005", name: "Notebook Set", sku: "OFF-2074", category: "Office", quantity: 62, lowStockThreshold: 20, unit: "sets", updatedAt: "2026-10-18T11:05:00.000Z" },
  { id: "prod-006", name: "Gel Pens (12 pack)", sku: "OFF-2116", category: "Office", quantity: 17, lowStockThreshold: 15, unit: "packs", updatedAt: "2026-10-20T06:30:00.000Z" },
  { id: "prod-007", name: "Desk Organizer", sku: "OFF-2183", category: "Office", quantity: 0, lowStockThreshold: 6, unit: "units", updatedAt: "2026-10-20T08:02:00.000Z" },
  { id: "prod-008", name: "Monitor Arm", sku: "FUR-3012", category: "Furniture", quantity: 13, lowStockThreshold: 5, unit: "units", updatedAt: "2026-10-17T14:22:00.000Z" },
  { id: "prod-009", name: "Ergonomic Chair", sku: "FUR-3077", category: "Furniture", quantity: 4, lowStockThreshold: 5, unit: "units", updatedAt: "2026-10-20T08:22:00.000Z" },
  { id: "prod-010", name: "Standing Desk Mat", sku: "FUR-3124", category: "Furniture", quantity: 19, lowStockThreshold: 8, unit: "units", updatedAt: "2026-10-16T10:18:00.000Z" },
  { id: "prod-011", name: "HDMI Cable 2m", sku: "CAB-4003", category: "Cables", quantity: 47, lowStockThreshold: 15, unit: "units", updatedAt: "2026-10-19T09:30:00.000Z" },
  { id: "prod-012", name: "USB-C Cable 1m", sku: "CAB-4045", category: "Cables", quantity: 9, lowStockThreshold: 18, unit: "units", updatedAt: "2026-10-20T05:45:00.000Z" },
  { id: "prod-013", name: "Ethernet Cable 5m", sku: "CAB-4108", category: "Cables", quantity: 26, lowStockThreshold: 10, unit: "units", updatedAt: "2026-10-15T13:10:00.000Z" },
  { id: "prod-014", name: "Webcam 1080p", sku: "ELC-1193", category: "Electronics", quantity: 11, lowStockThreshold: 6, unit: "units", updatedAt: "2026-10-20T07:18:00.000Z" },
  { id: "prod-015", name: "Noise-canceling Headphones", sku: "ELC-1241", category: "Electronics", quantity: 6, lowStockThreshold: 8, unit: "units", updatedAt: "2026-10-20T08:10:00.000Z" },
  { id: "prod-016", name: "Whiteboard Markers", sku: "OFF-2250", category: "Office", quantity: 33, lowStockThreshold: 12, unit: "packs", updatedAt: "2026-10-14T15:00:00.000Z" },
  { id: "prod-017", name: "Shipping Boxes (Small)", sku: "PKG-5006", category: "Packing", quantity: 120, lowStockThreshold: 30, unit: "boxes", updatedAt: "2026-10-13T12:45:00.000Z" },
  { id: "prod-018", name: "Bubble Mailers", sku: "PKG-5059", category: "Packing", quantity: 23, lowStockThreshold: 25, unit: "packs", updatedAt: "2026-10-20T04:55:00.000Z" },
  { id: "prod-019", name: "Thermal Label Roll", sku: "PKG-5112", category: "Packing", quantity: 15, lowStockThreshold: 10, unit: "rolls", updatedAt: "2026-10-12T08:30:00.000Z" },
  { id: "prod-020", name: "Reusable Water Bottle", sku: "SUP-6018", category: "Supplies", quantity: 3, lowStockThreshold: 8, unit: "units", updatedAt: "2026-10-20T08:19:00.000Z" },
];

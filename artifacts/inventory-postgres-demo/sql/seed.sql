INSERT INTO migration_demo.products
  (id, name, sku, category, quantity, low_stock_threshold, unit, updated_at)
VALUES
  ('prod-001', 'Wireless Mouse', 'ELC-1042', 'Electronics', 34, 10, 'units', '2026-10-20T08:15:00.000Z'),
  ('prod-002', 'USB-C Hub', 'ELC-1088', 'Electronics', 8, 12, 'units', '2026-10-20T08:12:00.000Z'),
  ('prod-003', 'Mechanical Keyboard', 'ELC-1120', 'Electronics', 21, 8, 'units', '2026-10-19T16:40:00.000Z'),
  ('prod-004', 'Laptop Stand', 'OFF-2031', 'Office', 5, 10, 'units', '2026-10-20T07:50:00.000Z'),
  ('prod-005', 'Notebook Set', 'OFF-2074', 'Office', 62, 20, 'sets', '2026-10-18T11:05:00.000Z'),
  ('prod-006', 'Gel Pens (12 pack)', 'OFF-2116', 'Office', 17, 15, 'packs', '2026-10-20T06:30:00.000Z'),
  ('prod-007', 'Desk Organizer', 'OFF-2183', 'Office', 0, 6, 'units', '2026-10-20T08:02:00.000Z'),
  ('prod-008', 'Monitor Arm', 'FUR-3012', 'Furniture', 13, 5, 'units', '2026-10-17T14:22:00.000Z'),
  ('prod-009', 'Ergonomic Chair', 'FUR-3077', 'Furniture', 4, 5, 'units', '2026-10-20T08:22:00.000Z'),
  ('prod-010', 'Standing Desk Mat', 'FUR-3124', 'Furniture', 19, 8, 'units', '2026-10-16T10:18:00.000Z'),
  ('prod-011', 'HDMI Cable 2m', 'CAB-4003', 'Cables', 47, 15, 'units', '2026-10-19T09:30:00.000Z'),
  ('prod-012', 'USB-C Cable 1m', 'CAB-4045', 'Cables', 9, 18, 'units', '2026-10-20T05:45:00.000Z'),
  ('prod-013', 'Ethernet Cable 5m', 'CAB-4108', 'Cables', 26, 10, 'units', '2026-10-15T13:10:00.000Z'),
  ('prod-014', 'Webcam 1080p', 'ELC-1193', 'Electronics', 11, 6, 'units', '2026-10-20T07:18:00.000Z'),
  ('prod-015', 'Noise-canceling Headphones', 'ELC-1241', 'Electronics', 6, 8, 'units', '2026-10-20T08:10:00.000Z'),
  ('prod-016', 'Whiteboard Markers', 'OFF-2250', 'Office', 33, 12, 'packs', '2026-10-14T15:00:00.000Z'),
  ('prod-017', 'Shipping Boxes (Small)', 'PKG-5006', 'Packing', 120, 30, 'boxes', '2026-10-13T12:45:00.000Z'),
  ('prod-018', 'Bubble Mailers', 'PKG-5059', 'Packing', 23, 25, 'packs', '2026-10-20T04:55:00.000Z'),
  ('prod-019', 'Thermal Label Roll', 'PKG-5112', 'Packing', 15, 10, 'rolls', '2026-10-12T08:30:00.000Z'),
  ('prod-020', 'Reusable Water Bottle', 'SUP-6018', 'Supplies', 3, 8, 'units', '2026-10-20T08:19:00.000Z')
ON CONFLICT (id) DO NOTHING;

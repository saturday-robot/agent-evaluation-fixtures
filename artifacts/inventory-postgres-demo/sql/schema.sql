CREATE SCHEMA IF NOT EXISTS migration_demo;

CREATE TABLE IF NOT EXISTS migration_demo.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity >= 0),
  low_stock_threshold INTEGER NOT NULL CHECK (low_stock_threshold >= 0),
  unit TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS migration_demo.stock_adjustments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES migration_demo.products (id) ON DELETE RESTRICT,
  delta INTEGER NOT NULL CHECK (delta <> 0),
  reason TEXT NOT NULL CHECK (LENGTH(TRIM(reason)) > 0),
  quantity_before INTEGER NOT NULL CHECK (quantity_before >= 0),
  quantity_after INTEGER NOT NULL CHECK (quantity_after >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT stock_adjustment_quantity_matches
    CHECK (quantity_after = quantity_before + delta)
);

CREATE INDEX IF NOT EXISTS stock_adjustments_product_created_idx
  ON migration_demo.stock_adjustments (product_id, created_at DESC, id DESC);

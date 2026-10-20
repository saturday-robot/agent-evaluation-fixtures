import type { InventoryProduct, MigrationDemoSummary, StockAdjustmentRecord } from "@workspace/api-zod";
import { syntheticInventoryProducts } from "./inventorySeed";

type DatabasePool = typeof import("@workspace/db").pool;

type ProductRow = {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  lowStockThreshold: number;
  unit: string;
  updatedAt: Date | string;
};

type HistoryRow = {
  id: number | string;
  productId: string;
  delta: number;
  reason: string;
  quantityBefore: number;
  quantityAfter: number;
  createdAt: Date | string;
};

export class MigrationDemoProductNotFoundError extends Error {}
export class MigrationDemoInvalidAdjustmentError extends Error {}

let databasePool: DatabasePool | undefined;
let storageMode: MigrationDemoSummary["storageMode"] = "memory";
const memoryProducts = new Map<string, InventoryProduct>(
  syntheticInventoryProducts.map((product) => [product.id, { ...product }]),
);
const memoryHistory: StockAdjustmentRecord[] = [];
let nextMemoryHistoryId = 1;

function toIsoString(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function mapProduct(row: ProductRow): InventoryProduct {
  return {
    id: row.id,
    name: row.name,
    sku: row.sku,
    category: row.category,
    quantity: Number(row.quantity),
    lowStockThreshold: Number(row.lowStockThreshold),
    unit: row.unit,
    updatedAt: toIsoString(row.updatedAt),
  };
}

function mapHistoryRecord(row: HistoryRow): StockAdjustmentRecord {
  return {
    id: Number(row.id),
    productId: row.productId,
    delta: Number(row.delta),
    reason: row.reason,
    quantityBefore: Number(row.quantityBefore),
    quantityAfter: Number(row.quantityAfter),
    createdAt: toIsoString(row.createdAt),
  };
}

export function getMigrationDemoStorageMode(): MigrationDemoSummary["storageMode"] {
  return storageMode;
}

export async function initializeMigrationDemoStore(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    storageMode = "memory";
    console.warn("Migration demo: DATABASE_URL is not configured; using in-memory fallback.");
    return;
  }

  try {
    const database = await import("@workspace/db");
    const tables = await database.pool.query<{
      productsTable: string | null;
      historyTable: string | null;
    }>(`
      SELECT
        to_regclass('migration_demo.products') AS "productsTable",
        to_regclass('migration_demo.stock_adjustments') AS "historyTable"
    `);
    const tablesReady = Boolean(tables.rows[0]?.productsTable && tables.rows[0]?.historyTable);
    if (!tablesReady) {
      throw new Error("Migration demo tables are not installed.");
    }

    const seededProducts = await database.pool.query<{ count: string }>(
      `SELECT COUNT(*)::text AS count
       FROM migration_demo.products
       WHERE id = ANY($1::text[])`,
      [syntheticInventoryProducts.map((product) => product.id)],
    );
    if (Number(seededProducts.rows[0]?.count ?? 0) !== syntheticInventoryProducts.length) {
      throw new Error("The expected synthetic products are not seeded.");
    }

    databasePool = database.pool;
    storageMode = "postgres";
    console.info("Migration demo: PostgreSQL is ready.");
  } catch {
    databasePool = undefined;
    storageMode = "memory";
    console.warn("Migration demo: PostgreSQL is unavailable or its schema/seed is not ready; using in-memory fallback.");
  }
}

export async function listMigrationDemoProducts(search?: string): Promise<InventoryProduct[]> {
  const trimmedSearch = search?.trim();
  if (databasePool) {
    const searchPattern = trimmedSearch ? `%${trimmedSearch}%` : null;
    const result = await databasePool.query<ProductRow>(
      `SELECT id, name, sku, category, quantity,
              low_stock_threshold AS "lowStockThreshold",
              unit, updated_at AS "updatedAt"
       FROM migration_demo.products
       WHERE $1::text IS NULL
          OR name ILIKE $1
          OR sku ILIKE $1
          OR category ILIKE $1
       ORDER BY id`,
      [searchPattern],
    );
    return result.rows.map(mapProduct);
  }

  const normalizedSearch = trimmedSearch?.toLocaleLowerCase();
  return [...memoryProducts.values()]
    .filter((product) => !normalizedSearch
      || `${product.name} ${product.sku} ${product.category}`.toLocaleLowerCase().includes(normalizedSearch))
    .sort((left, right) => left.id.localeCompare(right.id))
    .map((product) => ({ ...product }));
}

export async function getMigrationDemoSummary(): Promise<MigrationDemoSummary> {
  if (databasePool) {
    const result = await databasePool.query<{
      totalProducts: string;
      totalUnits: string;
      lowStockCount: string;
    }>(`
      SELECT COUNT(*)::text AS "totalProducts",
             COALESCE(SUM(quantity), 0)::text AS "totalUnits",
             COUNT(*) FILTER (WHERE quantity <= low_stock_threshold)::text AS "lowStockCount"
      FROM migration_demo.products
    `);
    const summary = result.rows[0];
    return {
      totalProducts: Number(summary?.totalProducts ?? 0),
      totalUnits: Number(summary?.totalUnits ?? 0),
      lowStockCount: Number(summary?.lowStockCount ?? 0),
      storageMode,
    };
  }

  const products = [...memoryProducts.values()];
  return {
    totalProducts: products.length,
    totalUnits: products.reduce((total, product) => total + product.quantity, 0),
    lowStockCount: products.filter((product) => product.quantity <= product.lowStockThreshold).length,
    storageMode,
  };
}

export async function getMigrationDemoProductHistory(
  productId: string,
): Promise<StockAdjustmentRecord[] | null> {
  if (databasePool) {
    const product = await databasePool.query<{ exists: boolean }>(
      `SELECT EXISTS (
         SELECT 1 FROM migration_demo.products WHERE id = $1
       ) AS exists`,
      [productId],
    );
    if (!product.rows[0]?.exists) return null;

    const result = await databasePool.query<HistoryRow>(
      `SELECT id, product_id AS "productId", delta, reason,
              quantity_before AS "quantityBefore",
              quantity_after AS "quantityAfter",
              created_at AS "createdAt"
       FROM migration_demo.stock_adjustments
       WHERE product_id = $1
       ORDER BY created_at DESC, id DESC`,
      [productId],
    );
    return result.rows.map(mapHistoryRecord);
  }

  if (!memoryProducts.has(productId)) return null;
  return memoryHistory
    .filter((record) => record.productId === productId)
    .map((record) => ({ ...record }));
}

export async function adjustMigrationDemoStock(
  productId: string,
  delta: number,
  reason: string,
): Promise<InventoryProduct> {
  if (!Number.isInteger(delta) || delta === 0 || !reason.trim()) {
    throw new MigrationDemoInvalidAdjustmentError("Enter a non-zero whole-number adjustment and a reason.");
  }

  if (databasePool) {
    const client = await databasePool.connect();
    try {
      await client.query("BEGIN");
      const currentResult = await client.query<ProductRow>(
        `SELECT id, name, sku, category, quantity,
                low_stock_threshold AS "lowStockThreshold",
                unit, updated_at AS "updatedAt"
         FROM migration_demo.products
         WHERE id = $1
         FOR UPDATE`,
        [productId],
      );
      const current = currentResult.rows[0];
      if (!current) throw new MigrationDemoProductNotFoundError("Product not found.");

      const quantityBefore = Number(current.quantity);
      const quantityAfter = quantityBefore + delta;
      if (quantityAfter < 0) {
        throw new MigrationDemoInvalidAdjustmentError("Stock cannot be reduced below zero.");
      }

      const updatedResult = await client.query<ProductRow>(
        `UPDATE migration_demo.products
         SET quantity = $2, updated_at = NOW()
         WHERE id = $1
         RETURNING id, name, sku, category, quantity,
                   low_stock_threshold AS "lowStockThreshold",
                   unit, updated_at AS "updatedAt"`,
        [productId, quantityAfter],
      );
      await client.query(
        `INSERT INTO migration_demo.stock_adjustments
           (product_id, delta, reason, quantity_before, quantity_after)
         VALUES ($1, $2, $3, $4, $5)`,
        [productId, delta, reason.trim(), quantityBefore, quantityAfter],
      );
      await client.query("COMMIT");
      return mapProduct(updatedResult.rows[0]!);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  const current = memoryProducts.get(productId);
  if (!current) throw new MigrationDemoProductNotFoundError("Product not found.");
  const quantityAfter = current.quantity + delta;
  if (quantityAfter < 0) {
    throw new MigrationDemoInvalidAdjustmentError("Stock cannot be reduced below zero.");
  }

  const updatedProduct: InventoryProduct = {
    ...current,
    quantity: quantityAfter,
    updatedAt: new Date().toISOString(),
  };
  memoryProducts.set(productId, updatedProduct);
  memoryHistory.unshift({
    id: nextMemoryHistoryId++,
    productId,
    delta,
    reason: reason.trim(),
    quantityBefore: current.quantity,
    quantityAfter,
    createdAt: updatedProduct.updatedAt,
  });
  return { ...updatedProduct };
}

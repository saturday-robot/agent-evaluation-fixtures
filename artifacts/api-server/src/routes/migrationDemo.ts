import { Router, type IRouter } from "express";
import {
  AdjustMigrationDemoStockBody,
  AdjustMigrationDemoStockParams,
  AdjustMigrationDemoStockResponse,
  GetMigrationDemoProductHistoryParams,
  GetMigrationDemoProductHistoryResponse,
  GetMigrationDemoSummaryResponse,
  ListMigrationDemoProductsQueryParams,
  ListMigrationDemoProductsResponse,
} from "@workspace/api-zod";
import {
  adjustMigrationDemoStock,
  getMigrationDemoProductHistory,
  getMigrationDemoSummary,
  listMigrationDemoProducts,
  MigrationDemoInvalidAdjustmentError,
  MigrationDemoProductNotFoundError,
} from "../lib/migrationDemoStore";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.get("/migration-demo/products", async (req, res) => {
  const query = ListMigrationDemoProductsQueryParams.parse(req.query);
  const products = await listMigrationDemoProducts(query.search);
  return res.json(ListMigrationDemoProductsResponse.parse(products));
});

router.get("/migration-demo/summary", async (_req, res) => {
  const summary = await getMigrationDemoSummary();
  return res.json(GetMigrationDemoSummaryResponse.parse(summary));
});

router.post("/migration-demo/products/:productId/adjust", async (req, res) => {
  const { productId } = AdjustMigrationDemoStockParams.parse(req.params);
  const body = AdjustMigrationDemoStockBody.parse(req.body);

  try {
    const product = await adjustMigrationDemoStock(productId, body.delta, body.reason);
    return res.json(AdjustMigrationDemoStockResponse.parse(product));
  } catch (error) {
    if (error instanceof MigrationDemoProductNotFoundError) {
      return res.status(404).json({ error: "Product not found." });
    }
    if (error instanceof MigrationDemoInvalidAdjustmentError) {
      return res.status(400).json({ error: error.message });
    }

    logger.error(
      { errorName: error instanceof Error ? error.name : "UnknownError" },
      "Migration demo stock adjustment failed",
    );
    return res.status(500).json({ error: "Stock adjustment could not be saved." });
  }
});

router.get("/migration-demo/products/:productId/history", async (req, res) => {
  const { productId } = GetMigrationDemoProductHistoryParams.parse(req.params);
  const history = await getMigrationDemoProductHistory(productId);
  if (history === null) {
    return res.status(404).json({ error: "Product not found." });
  }
  return res.json(GetMigrationDemoProductHistoryResponse.parse(history));
});

export default router;

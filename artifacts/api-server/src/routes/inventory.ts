import { Router, type IRouter } from "express";
import {
  AdjustStockBody,
  AdjustStockParams,
  AdjustStockResponse,
  GetInventorySummaryResponse,
  GetProductsQueryParams,
  GetProductsResponse,
} from "@workspace/api-zod";
import { syntheticInventoryProducts } from "../lib/inventorySeed";

const products = new Map(syntheticInventoryProducts.map((product) => [product.id, { ...product }]));
const router: IRouter = Router();

router.get("/products", (req, res): void => {
  const query = GetProductsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const search = query.data.search?.trim().toLowerCase();
  const result = Array.from(products.values()).filter((product) => {
    if (!search) return true;
    return [product.name, product.sku, product.category]
      .some((value) => value.toLowerCase().includes(search));
  });

  res.json(GetProductsResponse.parse(result));
});

router.get("/inventory/summary", (_req, res): void => {
  const values = Array.from(products.values());
  const result = {
    totalProducts: values.length,
    totalUnits: values.reduce((total, product) => total + product.quantity, 0),
    lowStockCount: values.filter((product) => product.quantity <= product.lowStockThreshold).length,
  };
  res.json(GetInventorySummaryResponse.parse(result));
});

router.post("/products/:productId/adjust", (req, res): void => {
  const params = AdjustStockParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const adjustment = AdjustStockBody.safeParse(req.body);
  if (!adjustment.success) {
    res.status(400).json({ error: adjustment.error.message });
    return;
  }

  if (adjustment.data.delta === 0) {
    res.status(400).json({ error: "Adjustment must be at least one unit." });
    return;
  }

  const product = products.get(params.data.productId);
  if (!product) {
    res.status(404).json({ error: "Product not found." });
    return;
  }

  const nextQuantity = product.quantity + adjustment.data.delta;
  if (nextQuantity < 0) {
    res.status(400).json({ error: "Stock cannot be adjusted below zero." });
    return;
  }

  const updatedProduct = {
    ...product,
    quantity: nextQuantity,
    updatedAt: new Date().toISOString(),
  };
  products.set(updatedProduct.id, updatedProduct);

  req.log.info(
    { productId: updatedProduct.id, delta: adjustment.data.delta, reason: adjustment.data.reason },
    "Inventory stock adjusted",
  );
  res.json(AdjustStockResponse.parse(updatedProduct));
});

export default router;

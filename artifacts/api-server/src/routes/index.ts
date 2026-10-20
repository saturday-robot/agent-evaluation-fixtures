import { Router, type IRouter } from "express";
import healthRouter from "./health";
import inventoryRouter from "./inventory";
import migrationDemoRouter from "./migrationDemo";

const router: IRouter = Router();

router.use(healthRouter);
router.use(inventoryRouter);
router.use(migrationDemoRouter);

export default router;

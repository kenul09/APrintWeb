import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller";
import { authenticateToken, requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticateToken, requireAdmin);

router.get("/stats", dashboardController.getStats);

export default router;

import { Router } from "express";
import * as customerController from "../controllers/customer.controller";
import { authenticateToken, requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticateToken, requireAdmin);

router.get("/", customerController.getAll);
router.get("/:id", customerController.getOne);

export default router;

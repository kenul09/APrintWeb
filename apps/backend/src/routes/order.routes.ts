import { Router } from "express";
import * as orderController from "../controllers/order.controller";
import { authenticateToken, requireAdmin } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { createOrderSchema, updateOrderSchema, updateOrderStatusSchema } from "../validators/order.schema";

const router = Router();

// All order routes are admin-only — there's no public order form (the
// public client only has the contact form, which creates ContactMessages).
router.use(authenticateToken, requireAdmin);

router.get("/", orderController.getAll);
router.get("/:id", orderController.getOne);
router.post("/", validateBody(createOrderSchema), orderController.create);
router.put("/:id", validateBody(updateOrderSchema), orderController.update);
router.patch("/:id/status", validateBody(updateOrderStatusSchema), orderController.updateStatus);
router.delete("/:id", orderController.remove);

export default router;

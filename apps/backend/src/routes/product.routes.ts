import { Router } from "express";
import * as productController from "../controllers/product.controller";
import { authenticateToken, requireAdmin } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { createProductSchema, updateProductSchema } from "../validators/product.schema";

const router = Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.post("/", authenticateToken, requireAdmin, validateBody(createProductSchema), productController.create);
router.put("/:id", authenticateToken, requireAdmin, validateBody(updateProductSchema), productController.update);
router.delete("/:id", authenticateToken, requireAdmin, productController.remove);

export default router;

import { Router } from "express";
import * as portfolioController from "../controllers/portfolio.controller";
import { authenticateToken, requireAdmin } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { createPortfolioSchema, updatePortfolioSchema } from "../validators/portfolio.schema";

const router = Router();

router.get("/", portfolioController.getAll);
router.get("/:id", portfolioController.getOne);
router.post("/", authenticateToken, requireAdmin, validateBody(createPortfolioSchema), portfolioController.create);
router.put("/:id", authenticateToken, requireAdmin, validateBody(updatePortfolioSchema), portfolioController.update);
router.delete("/:id", authenticateToken, requireAdmin, portfolioController.remove);

export default router;

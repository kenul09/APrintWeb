import { Router } from "express";
import * as blogController from "../controllers/blog.controller";
import { authenticateToken, optionalAuth, requireAdmin } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { createBlogPostSchema, updateBlogPostSchema } from "../validators/blog.schema";

const router = Router();

router.get("/", optionalAuth, blogController.getAll);
router.get("/:id", blogController.getOne);
router.post("/", authenticateToken, requireAdmin, validateBody(createBlogPostSchema), blogController.create);
router.put("/:id", authenticateToken, requireAdmin, validateBody(updateBlogPostSchema), blogController.update);
router.delete("/:id", authenticateToken, requireAdmin, blogController.remove);

export default router;

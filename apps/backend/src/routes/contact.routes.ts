import { Router } from "express";
import * as contactController from "../controllers/contact.controller";
import { authenticateToken, requireAdmin } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { createContactMessageSchema } from "../validators/contact.schema";

const router = Router();

router.post("/", validateBody(createContactMessageSchema), contactController.create);
router.get("/", authenticateToken, requireAdmin, contactController.getAll);
router.patch("/:id/read", authenticateToken, requireAdmin, contactController.markRead);
router.patch("/:id/unread", authenticateToken, requireAdmin, contactController.markUnread);
router.delete("/:id", authenticateToken, requireAdmin, contactController.remove);

export default router;

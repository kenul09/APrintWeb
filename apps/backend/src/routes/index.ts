import { Router } from "express";
import authRoutes from "./auth.routes";
import productRoutes from "./product.routes";
import portfolioRoutes from "./portfolio.routes";
import contactRoutes from "./contact.routes";
import healthRoutes from "./health.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/contact", contactRoutes);

export default router;

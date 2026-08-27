import { Router } from "express";
import authRoutes from "./auth.routes";
import productRoutes from "./product.routes";
import portfolioRoutes from "./portfolio.routes";
import contactRoutes from "./contact.routes";
import healthRoutes from "./health.routes";
import orderRoutes from "./order.routes";
import customerRoutes from "./customer.routes";
import blogRoutes from "./blog.routes";
import dashboardRoutes from "./dashboard.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/contact", contactRoutes);
router.use("/orders", orderRoutes);
router.use("/customers", customerRoutes);
router.use("/blog", blogRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;

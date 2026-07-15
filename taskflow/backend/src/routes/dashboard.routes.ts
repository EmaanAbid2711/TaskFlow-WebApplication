import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import { dashboardStats } from "../controllers/dashboard.controller";

const router = Router();

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics fetched successfully
 */
router.get(
  "/stats",
  authMiddleware,
  dashboardStats
);

export default router;
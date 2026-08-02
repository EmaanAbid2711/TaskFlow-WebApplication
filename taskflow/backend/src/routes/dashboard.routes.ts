import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import { dashboardStats} from "../controllers/dashboard.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard statistics and overview APIs
 */

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     description:
 *       Retrieves dashboard overview statistics for the authenticated user.
 *       The response contains information about projects, tasks,
 *       task completion status, and activity summary.
 *
 *     tags:
 *       - Dashboard
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description:
 *           Dashboard statistics fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalProjects:
 *                       type: integer
 *                       example: 5
 *                     totalTasks:
 *                       type: integer
 *                       example: 32
 *                     completedTasks:
 *                       type: integer
 *                       example: 18
 *                     pendingTasks:
 *                       type: integer
 *                       example: 14
 *                     recentActivities:
 *                       type: integer
 *                       example: 20
 *
 *       401:
 *         description:
 *           Unauthorized. JWT token missing or invalid.
 *
 *       500:
 *         description:
 *           Internal server error.
 */
router.get(
  "/stats",
  authMiddleware,
  dashboardStats
);

export default router;
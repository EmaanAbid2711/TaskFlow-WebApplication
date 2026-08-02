import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import { getActivitiesController } from "../controllers/activity.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Activity
 *   description: Activity timeline and project activity tracking APIs
 */

/**
 * @swagger
 * /api/activity:
 *   get:
 *     summary: Get user activity timeline
 *     description:
 *       Returns all recent activities related to projects where the authenticated
 *       user is either the project owner or a project member.
 *       Activities include task actions such as task creation, updates,
 *       assignments, comments, and status changes.
 *     tags:
 *       - Activity
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Activities fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: cmrvqf0q4000gma0pgo0xlzun
 *                       type:
 *                         type: string
 *                         example: TASK_CREATED
 *                       message:
 *                         type: string
 *                         example: Created task "Design Login Page"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-08-02T10:30:00.000Z
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: cmdd4ab7k0002xyz987654
 *                           name:
 *                             type: string
 *                             example: Emaan Abid
 *                           avatar:
 *                             type: string
 *                             nullable: true
 *                             example: /uploads/profile-images/avatar.png
 *                       task:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: cmdd4efgh0005xyz123456
 *                           title:
 *                             type: string
 *                             example: Implement authentication
 *                       project:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: cmdd3l5lf0001abcxyz123
 *                           name:
 *                             type: string
 *                             example: TaskFlow
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.get("/", authMiddleware, getActivitiesController);

export default router;
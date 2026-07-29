import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";

import {
getActivitiesController,
}
from "../controllers/activity.controller";

const router = Router();

/**
 * @swagger
 * /api/activity:
 *   get:
 *     summary: Get all activities
 *     tags:
 *       - Activity
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Activities fetched successfully
 */

router.get(
"/",
authMiddleware,
getActivitiesController
);

export default router;
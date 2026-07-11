import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import {getNotifications, updateNotifications} from "../controllers/notification.controller";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get notification settings
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notification settings fetched successfully
 */
router.get("/", getNotifications);

/**
 * @swagger
 * /api/notifications:
 *   patch:
 *     summary: Update notification settings
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Notification settings updated successfully
 */
router.patch(
  "/",
  updateNotifications
);

export default router;
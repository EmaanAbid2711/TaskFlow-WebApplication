import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  getNotifications,
  updateNotifications,
} from "../controllers/notification.controller";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification preference management APIs
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get notification settings
 *     description:
 *       Retrieves notification preferences of the currently authenticated user.
 *       User authentication is required.
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notification settings fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example:
 *                     taskAssignedEmail: true
 *                     taskAssignedPush: false
 *                     commentsEmail: true
 *                     commentsPush: false
 *                     remindersEmail: true
 *                     remindersPush: false
 *                     completedEmail: false
 *                     completedPush: false
 *                     invitationEmail: true
 *                     invitationPush: true
 *       401:
 *         description: Unauthorized. JWT token missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.get("/", getNotifications);

/**
 * @swagger
 * /api/notifications:
 *   patch:
 *     summary: Update notification settings
 *     description:
 *       Updates notification preferences of the authenticated user.
 *       Only provided fields will be updated.
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskAssignedEmail:
 *                 type: boolean
 *                 example: true
 *               taskAssignedPush:
 *                 type: boolean
 *                 example: false
 *               commentsEmail:
 *                 type: boolean
 *                 example: true
 *               commentsPush:
 *                 type: boolean
 *                 example: false
 *               remindersEmail:
 *                 type: boolean
 *                 example: true
 *               remindersPush:
 *                 type: boolean
 *                 example: false
 *               completedEmail:
 *                 type: boolean
 *                 example: true
 *               completedPush:
 *                 type: boolean
 *                 example: false
 *               invitationEmail:
 *                 type: boolean
 *                 example: true
 *               invitationPush:
 *                 type: boolean
 *                 example: true
 *               statusEmail:
 *                 type: boolean
 *                 example: true
 *               statusPush:
 *                 type: boolean
 *                 example: false
 *               memberEmail:
 *                 type: boolean
 *                 example: true
 *               memberPush:
 *                 type: boolean
 *                 example: false
 *               securityEmail:
 *                 type: boolean
 *                 example: true
 *               securityPush:
 *                 type: boolean
 *                 example: false
 *               productEmail:
 *                 type: boolean
 *                 example: true
 *               productPush:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Notification settings updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Notification settings updated successfully
 *       400:
 *         description: Invalid notification data.
 *       401:
 *         description: Unauthorized. JWT token missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.patch("/", updateNotifications);

export default router;
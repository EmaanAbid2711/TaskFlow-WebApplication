import express from "express";
import {
  getNotificationBarController,
  getUnreadNotificationBarCountController,
  markNotificationBarReadController,
  markAllNotificationBarReadController,
  deleteNotificationBarController,
} from "../controllers/notificationBar.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Notification Bar
 *   description: APIs for managing user notification bar items
 */

/**
 * @swagger
 * /api/notification-bar:
 *   get:
 *     summary: Get notification bar items
 *     description:
 *       Retrieves all notifications available for the authenticated user.
 *       Notifications include task updates, project updates,
 *       and other system events.
 *     tags:
 *       - Notification Bar
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications fetched successfully.
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
 *                       title:
 *                         type: string
 *                         example: New task assigned
 *                       message:
 *                         type: string
 *                         example: You have been assigned a new task.
 *                       type:
 *                         type: string
 *                         example: TASK_ASSIGNED
 *                       isRead:
 *                         type: boolean
 *                         example: false
 *       401:
 *         description: Unauthorized. JWT token missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.get("/", getNotificationBarController);

/**
 * @swagger
 * /api/notification-bar/unread-count:
 *   get:
 *     summary: Get unread notification count
 *     description:
 *       Returns the total number of unread notifications
 *       for the authenticated user.
 *     tags:
 *       - Notification Bar
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unread notification count fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 5
 *       401:
 *         description: Unauthorized.
 */
router.get("/unread-count", getUnreadNotificationBarCountController);

/**
 * @swagger
 * /api/notification-bar/read-all:
 *   patch:
 *     summary: Mark all notifications as read
 *     description:
 *       Marks every unread notification of the authenticated user
 *       as read.
 *     tags:
 *       - Notification Bar
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read successfully.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.patch("/read-all", markAllNotificationBarReadController);

/**
 * @swagger
 * /api/notification-bar/{id}/read:
 *   patch:
 *     summary: Mark a notification as read
 *     description:
 *       Updates a specific notification and marks it as read.
 *     tags:
 *       - Notification Bar
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Notification ID
 *         schema:
 *           type: string
 *         example: cmrvqf0q4000gma0pgo0xlzun
 *     responses:
 *       200:
 *         description: Notification marked as read successfully.
 *       404:
 *         description: Notification not found.
 *       401:
 *         description: Unauthorized.
 */
router.patch("/:id/read", markNotificationBarReadController);

/**
 * @swagger
 * /api/notification-bar/{id}:
 *   delete:
 *     summary: Delete a notification
 *     description:
 *       Permanently deletes a notification from the user's notification bar.
 *     tags:
 *       - Notification Bar
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Notification ID
 *         schema:
 *           type: string
 *         example: cmrvqf0q4000gma0pgo0xlzun
 *     responses:
 *       200:
 *         description: Notification deleted successfully.
 *       404:
 *         description: Notification not found.
 *       401:
 *         description: Unauthorized.
 */
router.delete("/:id", deleteNotificationBarController);

export default router;
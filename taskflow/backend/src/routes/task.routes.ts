import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import { attachmentUpload } from "../config/multer";
import {createTaskController, getProjectTasksController, getTaskController, updateTaskController, deleteTaskController, uploadTaskAttachmentController} from "../controllers/task.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task Management APIs
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - projectId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Design Login Screen
 *               description:
 *                 type: string
 *                 example: Create responsive login UI
 *               status:
 *                 type: string
 *                 example: TODO
 *               priority:
 *                 type: string
 *                 example: HIGH
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               projectId:
 *                 type: string
 *                 example: cmdd3l5lf0001abcxyz123
 *               assigneeId:
 *                 type: string
 *                 example: cmdd4ab7k0002xyz987654
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post(
  "/",
  authMiddleware,
  createTaskController
);

/**
 * @swagger
 * /api/tasks/project/{projectId}:
 *   get:
 *     summary: Get all tasks of a project
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         example: cmdd3l5lf0001abcxyz123
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 */
router.get(
  "/project/:projectId",
  authMiddleware,
  getProjectTasksController
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cmdd4efgh0005xyz123456
 *     responses:
 *       200:
 *         description: Task fetched successfully
 */
router.get(
  "/:id",
  authMiddleware,
  getTaskController
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Update a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cmdd4efgh0005xyz123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               assigneeId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.patch(
  "/:id",
  authMiddleware,
  updateTaskController
);

/**
 * @swagger
 * /api/tasks/{id}/attachments:
 *   post:
 *     summary: Upload attachment to task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Attachment uploaded successfully
 */
router.post(
  "/:id/attachments",
  authMiddleware,
  attachmentUpload.single("file"),
  uploadTaskAttachmentController
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cmdd4efgh0005xyz123456
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.delete(
  "/:id",
  authMiddleware,
  deleteTaskController
);

export default router;
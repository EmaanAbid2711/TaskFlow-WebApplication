import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { attachmentUpload } from "../config/multer";
import {
  createTaskController,
  getProjectTasksController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
  uploadTaskAttachmentController,
  deleteTaskAttachmentController,
  createTaskCommentController,
} from "../controllers/task.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task creation, management, attachments and comments
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     description:
 *       Creates a task inside a project.
 *       The authenticated user must have permission
 *       to create tasks in the selected project.
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
 *                 example: Create responsive login interface
 *               status:
 *                 type: string
 *                 example: TODO
 *               priority:
 *                 type: string
 *                 example: HIGH
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-08-10T12:00:00Z
 *               projectId:
 *                 type: string
 *                 example: cmdd3l5lf0001abcxyz123
 *               assigneeId:
 *                 type: string
 *                 example: cmdd4ab7k0002xyz987654
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid task data
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: Project not found
 */
router.post("/", authMiddleware, createTaskController);

/**
 * @swagger
 * /api/tasks/project/{projectId}:
 *   get:
 *     summary: Get all tasks of a project
 *     description: Returns all tasks belonging to a specific project.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: Project unique identifier
 *         schema:
 *           type: string
 *           example: cmdd3l5lf0001abcxyz123
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 */
router.get("/project/:projectId", authMiddleware, getProjectTasksController);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task details
 *     description: Fetches complete information about a task.
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
 *           example: cmdd4efgh0005xyz123456
 *     responses:
 *       200:
 *         description: Task fetched successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.get("/:id", authMiddleware, getTaskController);

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Update task
 *     description:
 *       Updates task information including status,
 *       priority, due date and assignee.
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
 *           example: cmdd4efgh0005xyz123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated task title
 *               status:
 *                 type: string
 *                 example: COMPLETED
 *               priority:
 *                 type: string
 *                 example: MEDIUM
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid update data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.patch("/:id", authMiddleware, updateTaskController);

/**
 * @swagger
 * /api/tasks/{id}/attachments:
 *   post:
 *     summary: Upload task attachment
 *     description: Uploads a file and attaches it to a task.
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
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.post(
  "/:id/attachments",
  authMiddleware,
  attachmentUpload.single("file"),
  uploadTaskAttachmentController
);

/**
 * @swagger
 * /api/tasks/{id}/attachments/{attachmentId}:
 *   delete:
 *     summary: Delete task attachment
 *     description: Removes an uploaded file from a task.
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
 *       - in: path
 *         name: attachmentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attachment deleted successfully
 *       404:
 *         description: Attachment not found
 */
router.delete(
  "/:id/attachments/:attachmentId",
  authMiddleware,
  deleteTaskAttachmentController
);

/**
 * @swagger
 * /api/tasks/{id}/comments:
 *   post:
 *     summary: Add comment to task
 *     description: Creates a new comment on a task.
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
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: We should update the button design.
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Empty comment text
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.post("/:id/comments", authMiddleware, createTaskCommentController);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     description: Permanently deletes a task and related data.
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
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.delete("/:id", authMiddleware, deleteTaskController);

export default router;
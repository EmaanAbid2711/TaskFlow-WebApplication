import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import {createTaskController, getProjectTasksController, getTaskController, updateTaskController, deleteTaskController} from "../controllers/task.controller";

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
 *     summary: Create Task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
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
 *     summary: Get Project Tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
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
 *     summary: Get Task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
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
 *     summary: Update Task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  authMiddleware,
  updateTaskController
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete Task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  authMiddleware,
  deleteTaskController
);

export default router;
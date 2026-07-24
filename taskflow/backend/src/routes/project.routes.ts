import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";

import {
  createProjectController,
  getProjectsController,
  getProjectController,
  updateProjectController,
  deleteProjectController,
} from "../controllers/project.controller";

const router = Router();

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: TaskFlow
 *               description:
 *                 type: string
 *                 example: Main project for TaskFlow application
 *
 *     responses:
 *       201:
 *         description: Project created successfully
 *
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authMiddleware,
  createProjectController
);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects of the logged-in user
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Projects fetched successfully
 *
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  authMiddleware,
  getProjectsController
);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get a single project by ID
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cmdd3l5lf0001abcxyz123
 *
 *     responses:
 *       200:
 *         description: Project fetched successfully
 *
 *       404:
 *         description: Project not found
 *
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/:id",
  authMiddleware,
  getProjectController
);

/**
 * @swagger
 * /api/projects/{id}:
 *   patch:
 *     summary: Update a project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cmdd3l5lf0001abcxyz123
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated TaskFlow
 *               description:
 *                 type: string
 *                 example: Updated project description
 *
 *     responses:
 *       200:
 *         description: Project updated successfully
 *
 *       404:
 *         description: Project not found
 *
 *       401:
 *         description: Unauthorized
 */
router.patch(
  "/:id",
  authMiddleware,
  updateProjectController
);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cmdd3l5lf0001abcxyz123
 *
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *
 *       404:
 *         description: Project not found
 *
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/:id",
  authMiddleware,
  deleteProjectController
);

export default router;
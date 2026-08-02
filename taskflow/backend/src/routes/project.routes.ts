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
 * tags:
 *   name: Projects
 *   description: Project management endpoints
 */

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     description:
 *       Creates a new project for the authenticated user.
 *       The logged-in user automatically becomes the project owner.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
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
 *                 example: TaskFlow Application
 *               description:
 *                 type: string
 *                 example: Project management platform
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Invalid project data
 *       401:
 *         description: Authentication token missing or invalid
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, createProjectController);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     description:
 *       Returns all projects where the authenticated user
 *       is either owner or a project member.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Projects fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: cm123projectid
 *                   name: TaskFlow
 *                   description: Project management system
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, getProjectsController);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project details
 *     description: Fetches a single project using project ID.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique project ID
 *         schema:
 *           type: string
 *           example: cmdd3l5lf0001abcxyz123
 *     responses:
 *       200:
 *         description: Project fetched successfully
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware, getProjectController);

/**
 * @swagger
 * /api/projects/{id}:
 *   patch:
 *     summary: Update project information
 *     description:
 *       Updates project name or description.
 *       Only authorized users can update projects.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project identifier
 *         schema:
 *           type: string
 *           example: cmdd3l5lf0001abcxyz123
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
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Invalid update data
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: Project not found
 */
router.patch("/:id", authMiddleware, updateProjectController);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     description:
 *       Permanently deletes a project and
 *       all related tasks, members, and activities.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project identifier
 *         schema:
 *           type: string
 *           example: cmdd3l5lf0001abcxyz123
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, deleteProjectController);

export default router;
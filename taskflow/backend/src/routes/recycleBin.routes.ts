import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";

import {
  getRecycleBinController,
} from "../controllers/recycleBin.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Recycle Bin
 *   description: Recycle bin management endpoints
 */

/**
 * @swagger
 * /api/recycle-bin:
 *   get:
 *     summary: Get recycle bin
 *     description:
 *       Returns deleted projects owned by the authenticated user
 *       and individually deleted tasks from active projects the user
 *       has access to.
 *     tags:
 *       - Recycle Bin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recycle bin fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 projects:
 *                   - id: cm123projectid
 *                     name: TaskFlow
 *                     description: Project management system
 *                     deletedAt: "2026-08-12T10:30:00.000Z"
 *                     tasks:
 *                       - id: cm123taskid
 *                         title: Build dashboard
 *                         status: TODO
 *                         priority: HIGH
 *                         deletedAt: "2026-08-12T10:30:00.000Z"
 *                 tasks:
 *                   - id: cm456taskid
 *                     title: Fix login
 *                     status: PROGRESS
 *                     priority: MEDIUM
 *                     deletedAt: "2026-08-12T11:00:00.000Z"
 *                     project:
 *                       id: cm456projectid
 *                       name: TaskFlow
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */

router.get(
  "/",
  authMiddleware,
  getRecycleBinController
);

export default router;
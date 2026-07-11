import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import {profile, updateProfile} from "../controllers/user.controller";
import upload from "../config/multer";


const router = Router();



/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 */
router.get(
  "/profile",
  authMiddleware,
  profile
);





/**
 * @swagger
 * /api/users/profile:
 *   patch:
 *     summary: Update logged-in user's profile
 *
 *     tags:
 *       - Users
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         multipart/form-data:
 *
 *           schema:
 *             type: object
 *
 *             properties:
 *
 *               name:
 *                 type: string
 *
 *               username:
 *                 type: string
 *
 *               bio:
 *                 type: string
 *
 *               location:
 *                 type: string
 *
 *               website:
 *                 type: string
 *
 *               role:
 *                 type: string
 *
 *               timezone:
 *                 type: string
 *
 *               avatar:
 *                 type: string
 *                 format: binary
 *
 *
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.patch(
  "/profile",
  authMiddleware,
  upload.single("avatar"),
  updateProfile
);



export default router;
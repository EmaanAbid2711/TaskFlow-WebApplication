import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  profile,
  updateProfile,
  getAllUsersController,
  getUserByIdController,
} from "../controllers/user.controller";
import upload from "../config/multer";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile and user management APIs
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description:
 *       Returns a list of all TaskFlow users except the currently authenticated user.
 *       This endpoint is used for selecting users while assigning tasks.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
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
 *                         example: cmdd4ab7k0002xyz987654
 *                       name:
 *                         type: string
 *                         example: Ali Khan
 *                       avatar:
 *                         type: string
 *                         nullable: true
 *                         example: /uploads/profile-images/avatar.png
 *                       role:
 *                         type: string
 *                         nullable: true
 *                         example: Developer
 *       401:
 *         description: Unauthorized. JWT token missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.get("/", authMiddleware, getAllUsersController);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get authenticated user's profile
 *     description:
 *       Returns complete profile information of the currently logged-in user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
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
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: cmdd3l5lf0001abcxyz123
 *                     name:
 *                       type: string
 *                       example: Emaan Abid
 *                     email:
 *                       type: string
 *                       example: emaan@example.com
 *                     username:
 *                       type: string
 *                       example: emaan01
 *                     bio:
 *                       type: string
 *                       example: Computer Science Student
 *                     location:
 *                       type: string
 *                       example: Pakistan
 *                     role:
 *                       type: string
 *                       example: Developer
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User profile not found
 *       500:
 *         description: Internal server error
 */
router.get("/profile", authMiddleware, profile);

/**
 * @swagger
 * /api/users/profile:
 *   patch:
 *     summary: Update authenticated user's profile
 *     description:
 *       Updates user profile information.
 *       Supports profile image upload using multipart/form-data.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Emaan Abid
 *               username:
 *                 type: string
 *                 example: emaan01
 *               bio:
 *                 type: string
 *                 example: Full Stack Developer
 *               location:
 *                 type: string
 *                 example: Lahore
 *               website:
 *                 type: string
 *                 example: https://example.com
 *               role:
 *                 type: string
 *                 example: Software Engineer
 *               timezone:
 *                 type: string
 *                 example: Asia/Karachi
 *               removeAvatar:
 *                 type: boolean
 *                 example: false
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid profile data
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Username already exists
 *       500:
 *         description: Internal server error
 */
router.patch("/profile", authMiddleware, upload.single("avatar"), updateProfile);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description:
 *       Returns public profile information of a specific user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: cmdd4ab7k0002xyz987654
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware, getUserByIdController);

export default router;
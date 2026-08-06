import { Router } from "express";
import {signup, login, forgotPasswordController, resetPasswordController, logoutController} from "../controllers/auth.controller";
import validate from "../middleware/validate.middleware";
import { signupSchema, loginSchema} from "../validations/auth.validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and account access management
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Create a new user account
 *     description:
 *       Registers a new TaskFlow user and automatically creates
 *       a notification settings profile.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Emaan Abid
 *               email:
 *                 type: string
 *                 example: emaan@example.com
 *               password:
 *                 type: string
 *                 example: Password123@
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AuthResponse"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.post(
  "/signup",
  validate(signupSchema),
  signup
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user and returns a JWT access token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: emaan@example.com
 *               password:
 *                 type: string
 *                 example: Password123@
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AuthResponse"
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post(
  "/login",
  validate(loginSchema),
  login
);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Generate password reset token
 *     description: Generates a temporary password reset token for the provided email address.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: emaan@example.com
 *     responses:
 *       200:
 *         description: Reset token generated successfully
 *       404:
 *         description: User not found
 */
router.post("/forgot-password", forgotPasswordController);

/**
 * @swagger
 * /api/auth/reset-password/{token}:
 *   post:
 *     summary: Reset password
 *     description: Updates user password using a valid reset token.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: NewPassword123@
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired token
 */
router.post("/reset-password/:token", resetPasswordController);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout current user
 *     description: Invalidates the current JWT token and logs the user out.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Missing or invalid JWT token
 */
router.post("/logout", logoutController);

export default router;
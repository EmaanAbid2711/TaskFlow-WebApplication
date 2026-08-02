import { Router } from "express";
import { getAccount, updateEmail, updatePassword, deleteAccount, getSecurity, updateSecurity} from "../controllers/account.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Account
 *   description: Account management and security settings APIs
 */

/**
 * @swagger
 * /api/account:
 *   get:
 *     summary: Get logged-in user account details
 *     description:
 *       Returns account information of the currently authenticated user.
 *       Authentication is required using JWT bearer token.
 *     tags:
 *       - Account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account details fetched successfully
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
 *                   example:
 *                     id: cmdd4ab7k0002xyz987654
 *                     name: Emaan Abid
 *                     email: emaan@example.com
 *       401:
 *         description: Unauthorized. JWT token missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.get("/", getAccount);

/**
 * @swagger
 * /api/account/email:
 *   patch:
 *     summary: Update account email address
 *     description: Updates the email address of the authenticated user.
 *     tags:
 *       - Account
 *     security:
 *       - bearerAuth: []
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
 *                 example: newemail@example.com
 *     responses:
 *       200:
 *         description: Email updated successfully
 *       400:
 *         description: Invalid email format or email already exists.
 *       401:
 *         description: Unauthorized.
 */
router.patch("/email", updateEmail);

/**
 * @swagger
 * /api/account/password:
 *   patch:
 *     summary: Update account password
 *     description: Changes the password of the authenticated user.
 *     tags:
 *       - Account
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: OldPassword123!
 *               newPassword:
 *                 type: string
 *                 example: NewPassword123!
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Current password is incorrect or password validation failed.
 *       401:
 *         description: Unauthorized.
 */
router.patch("/password", updatePassword);

/**
 * @swagger
 * /api/account:
 *   delete:
 *     summary: Delete logged-in user account
 *     description:
 *       Permanently deletes the authenticated user's account and related data.
 *     tags:
 *       - Account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.delete("/", deleteAccount);

/**
 * @swagger
 * /api/account/security:
 *   get:
 *     summary: Get security settings
 *     description:
 *       Retrieves security-related settings of the authenticated user,
 *       including two-factor authentication configuration.
 *     tags:
 *       - Account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Security settings fetched successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get("/security", getSecurity);

/**
 * @swagger
 * /api/account/security:
 *   patch:
 *     summary: Update security settings
 *     description: Updates security preferences for the authenticated user.
 *     tags:
 *       - Account
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               twoFactorEnabled:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Security settings updated successfully.
 *       400:
 *         description: Invalid security settings.
 *       401:
 *         description: Unauthorized.
 */
router.patch("/security", updateSecurity);

export default router;
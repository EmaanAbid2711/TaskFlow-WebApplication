import { Router } from "express";

import {getAccount, updateEmail, updatePassword, deleteAccount, getSecurity, updateSecurity} from "../controllers/account.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();
router.use(authMiddleware);

/**
 * @swagger
 * /api/account:
 *   get:
 *     summary: Get account details
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account fetched successfully
 */
router.get("/", getAccount);


/**
 * @swagger
 * /api/account/email:
 *   patch:
 *     summary: Update email
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/email", updateEmail);


/**
 * @swagger
 * /api/account/password:
 *   patch:
 *     summary: Update password
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/password", updatePassword);


/**
 * @swagger
 * /api/account:
 *   delete:
 *     summary: Delete logged-in account
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 */
router.delete("/", deleteAccount);

/**
 * @swagger
 * /api/account/security:
 *   get:
 *     summary: Get security settings
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/security",
  getSecurity
);

/**
 * @swagger
 * /api/account/security:
 *   patch:
 *     summary: Update security settings
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  "/security",
  updateSecurity
);

export default router;
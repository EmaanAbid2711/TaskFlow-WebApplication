import { Router } from "express";

import {getAccount, updateEmail, updatePassword} from "../controllers/account.controller";
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

export default router;
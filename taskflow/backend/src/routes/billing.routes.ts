import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";

import {getBillingController, updatePlanController, updatePaymentController} from "../controllers/billing.controller";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/billing:
 *   get:
 *     summary: Get billing information
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Billing fetched successfully
 */
router.get("/", getBillingController);

/**
 * @swagger
 * /api/billing/plan:
 *   patch:
 *     summary: Update billing plan
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/plan", updatePlanController);

/**
 * @swagger
 * /api/billing/payment:
 *   patch:
 *     summary: Update payment method
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/payment", updatePaymentController);

export default router;
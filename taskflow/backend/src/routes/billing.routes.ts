import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";

import {
  getBillingController,
  updatePlanController,
  updatePaymentController,
} from "../controllers/billing.controller";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Billing
 *   description: User subscription and billing management APIs
 */

/**
 * @swagger
 * /api/billing:
 *   get:
 *     summary: Get billing information
 *     description: Retrieves billing information for the authenticated user.
 *     tags:
 *       - Billing
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Billing information fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/",
  getBillingController
);

/**
 * @swagger
 * /api/billing/plan:
 *   patch:
 *     summary: Update subscription plan
 *     description: Updates the subscription plan of the authenticated user. Paid plan changes create an invoice.
 *     tags:
 *       - Billing
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plan
 *             properties:
 *               plan:
 *                 type: string
 *                 enum:
 *                   - FREE
 *                   - PRO
 *                   - ENTERPRISE
 *                 example: PRO
 *     responses:
 *       200:
 *         description: Billing plan updated successfully.
 *       400:
 *         description: Invalid plan value.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.patch(
  "/plan",
  updatePlanController
);

/**
 * @swagger
 * /api/billing/payment:
 *   patch:
 *     summary: Update payment method
 *     description: Updates safe payment-card metadata. Full card numbers and CVV are never stored.
 *     tags:
 *       - Billing
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cardBrand
 *               - cardLast4
 *               - cardExpiry
 *             properties:
 *               cardBrand:
 *                 type: string
 *                 example: Visa
 *               cardLast4:
 *                 type: string
 *                 example: "4242"
 *               cardExpiry:
 *                 type: string
 *                 example: "12/28"
 *     responses:
 *       200:
 *         description: Payment method updated successfully.
 *       400:
 *         description: Invalid payment information.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.patch(
  "/payment",
  updatePaymentController
);

export default router;
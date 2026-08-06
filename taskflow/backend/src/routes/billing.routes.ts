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
 *     description: |
 *       Retrieves the billing details of the currently authenticated user.
 *       This includes the current subscription plan, billing cycle,
 *       payment information, and invoices.
 *     tags:
 *       - Billing
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Billing information fetched successfully.
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
 *                     plan: FREE
 *                     monthlyPrice: 0
 *                     billingCycle: Monthly
 *                     renewalDate: null
 *                     cardBrand: Visa
 *                     cardLast4: "4242"
 *                     cardExpiry: "12/28"
 *       401:
 *         description: Unauthorized. JWT token missing or invalid.
 *       404:
 *         description: Billing information not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/", getBillingController);

/**
 * @swagger
 * /api/billing/plan:
 *   patch:
 *     summary: Update subscription plan
 *     description: |
 *       Updates the current user's billing subscription plan.
 *       Available plans:
 *       - FREE
 *       - PRO
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
 *                 example: PRO
 *     responses:
 *       200:
 *         description: Billing plan updated successfully.
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
 *                     plan: PRO
 *                     monthlyPrice: 10
 *                     billingCycle: Monthly
 *       400:
 *         description: Invalid plan value.
 *       401:
 *         description: Unauthorized. JWT token missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.patch("/plan", updatePlanController);

/**
 * @swagger
 * /api/billing/payment:
 *   patch:
 *     summary: Update payment method
 *     description: Updates the payment card information associated with the user's billing account.
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Payment method updated successfully
 *       400:
 *         description: Invalid payment information.
 *       401:
 *         description: Unauthorized. JWT token missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.patch("/payment", updatePaymentController);

export default router;
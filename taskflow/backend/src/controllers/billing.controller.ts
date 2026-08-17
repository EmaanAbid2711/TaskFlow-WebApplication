import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import AppError from "../utils/AppError";
import { getBilling, updatePlan, updatePaymentMethod, type BillingPlan} from "../services/billing.service";
import { formatBilling } from "../utils/billingFormatter";

const VALID_PLANS: BillingPlan[] = [
  "FREE",
  "PRO",
  "ENTERPRISE",
];

export const getBillingController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const userId = req.user?.id;

      if (!userId) {
        throw new AppError(
          "Unauthorized",
          401
        );
      }

      const billing =
        await getBilling(userId);

      res.status(200).json({
        success: true,
        data: formatBilling(billing),
      });
    }
  );

export const updatePlanController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const userId = req.user?.id;

      if (!userId) {
        throw new AppError(
          "Unauthorized",
          401
        );
      }

      const { plan } = req.body;

      if (
        typeof plan !== "string" ||
        !VALID_PLANS.includes(
          plan as BillingPlan
        )
      ) {
        throw new AppError(
          "Invalid plan. Allowed plans are FREE, PRO, and ENTERPRISE.",
          400
        );
      }

      const billing =
        await updatePlan(
          userId,
          plan as BillingPlan
        );

      res.status(200).json({
        success: true,
        message:
          "Billing plan updated successfully.",
        data: formatBilling(billing),
      });
    }
  );

export const updatePaymentController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const userId = req.user?.id;

      if (!userId) {
        throw new AppError(
          "Unauthorized",
          401
        );
      }

      const {
        cardBrand,
        cardLast4,
        cardExpiry,
      } = req.body;

      if (
        typeof cardBrand !== "string" ||
        !cardBrand.trim()
      ) {
        throw new AppError(
          "Card brand is required.",
          400
        );
      }

      if (
        typeof cardLast4 !== "string" ||
        !/^\d{4}$/.test(cardLast4)
      ) {
        throw new AppError(
          "Card last four digits must contain exactly 4 digits.",
          400
        );
      }

      if (
        typeof cardExpiry !== "string" ||
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(
          cardExpiry
        )
      ) {
        throw new AppError(
          "Card expiry must use MM/YY format.",
          400
        );
      }

      const billing =
        await updatePaymentMethod(
          userId,
          cardBrand.trim(),
          cardLast4,
          cardExpiry
        );

      res.status(200).json({
        success: true,
        message:
          "Payment method updated successfully.",
        data: formatBilling(billing),
      });
    }
  );
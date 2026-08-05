import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import AppError from "../utils/AppError";
import { getBilling, updatePlan,  updatePaymentMethod} from "../services/billing.service";
import { formatBilling } from "../utils/billingFormatter";

export const getBillingController = asyncHandler(
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

export const updatePlanController = asyncHandler(
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

    await updatePlan(userId, plan);

    const billing =
      await getBilling(userId);

    res.status(200).json({
      success: true,
      data: formatBilling(billing),
    });
  }
);

export const updatePaymentController = asyncHandler(
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

    await updatePaymentMethod(
      userId,
      cardBrand,
      cardLast4,
      cardExpiry
    );

    const billing =
      await getBilling(userId);

    res.status(200).json({
      success: true,
      data: formatBilling(billing),
    });
  }
);
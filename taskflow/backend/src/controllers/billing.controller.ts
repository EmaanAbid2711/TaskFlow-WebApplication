import { Request, Response } from "express";

import {getBilling, updatePlan, updatePaymentMethod} from "../services/billing.service";
import { formatBilling } from "../utils/billingFormatter";

export const getBillingController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const billing = await getBilling(userId);

    return res.status(200).json({
      success: true,
      data: formatBilling(billing),
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch billing.",
    });
  }
};

export const updatePlanController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { plan } = req.body;

    await updatePlan(userId, plan);

    const billing = await getBilling(userId);

    return res.status(200).json({
      success: true,
      data: formatBilling(billing),
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to update plan.",
    });
  }
};

export const updatePaymentController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
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

    const billing = await getBilling(userId);

    return res.status(200).json({
      success: true,
      data: formatBilling(billing),
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to update payment method.",
    });
  }
};
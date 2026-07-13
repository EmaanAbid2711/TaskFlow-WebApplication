import {Request, Response} from "express";

import {getBilling, updatePlan, updatePaymentMethod} from "../services/billing.service";

export const getBillingController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId =
        req.user?.id;

      if (!userId) {
        return res.status(401).json({
          message:
            "Unauthorized",
        });
      }

      const billing =
        await getBilling(
          userId
        );

      res.status(200).json({
        success: true,
        data: billing,
      });
    } catch {
      res.status(500).json({
        message:
          "Failed to fetch billing.",
      });
    }
  };

export const updatePlanController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId =
        req.user?.id;

      const { plan } =
        req.body;

      const billing =
        await updatePlan(
          userId!,
          plan
        );

      res.status(200).json({
        success: true,
        data: billing,
      });
    } catch {
      res.status(500).json({
        message:
          "Failed to update plan.",
      });
    }
  };

export const updatePaymentController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId =
        req.user?.id;

      const {
        cardBrand,
        cardLast4,
        cardExpiry,
      } = req.body;

      const billing =
        await updatePaymentMethod(
          userId!,
          cardBrand,
          cardLast4,
          cardExpiry
        );

      res.status(200).json({
        success: true,
        data: billing,
      });
    } catch {
      res.status(500).json({
        message:
          "Failed to update payment method.",
      });
    }
  };
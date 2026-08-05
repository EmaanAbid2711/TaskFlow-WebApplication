import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  sendTeamInvitation,
  getTeamMembers,
  getReceivedInvitations,
  acceptTeamInvitation,
  rejectTeamInvitation,
} from "../services/team.service";

export const sendInvitationController = asyncHandler(
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const result = await sendTeamInvitation(
      userId,
      req.body.email
    );

    res.status(201).json({
      success: true,
      data: result,
    });
  }
);

export const getTeamMembersController = asyncHandler(
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const members = await getTeamMembers(userId);

    res.status(200).json({
      success: true,
      data: members,
    });
  }
);

export const getInvitationsController = asyncHandler(
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const invitations =
      await getReceivedInvitations(userId);

    res.status(200).json({
      success: true,
      data: invitations,
    });
  }
);

export const acceptInvitationController = asyncHandler(
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    await acceptTeamInvitation(
      String(req.params.id),
      userId
    );

    res.status(200).json({
      success: true,
      message: "Invitation accepted",
    });
  }
);

export const rejectInvitationController = asyncHandler(
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    await rejectTeamInvitation(
      String(req.params.id),
      userId
    );

    res.status(200).json({
      success: true,
      message: "Invitation rejected",
    });
  }
);
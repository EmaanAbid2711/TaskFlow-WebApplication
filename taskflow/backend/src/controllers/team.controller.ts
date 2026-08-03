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
  async (req: Request, res: Response) => {
    const result = await sendTeamInvitation(req.user!.id, req.body.email);

    res.status(201).json({
      success: true,
      data: result,
    });
  }
);

export const getTeamMembersController = asyncHandler(
  async (req: Request, res: Response) => {
    const members = await getTeamMembers(req.user!.id);

    res.json({
      success: true,
      data: members,
    });
  }
);

export const getInvitationsController = asyncHandler(
  async (req: Request, res: Response) => {
    const invitations = await getReceivedInvitations(req.user!.id);

    res.json({
      success: true,
      data: invitations,
    });
  }
);

export const acceptInvitationController = asyncHandler(
  async (req: Request, res: Response) => {
    await acceptTeamInvitation(String(req.params.id), req.user!.id);

    res.json({
      success: true,
      message: "Invitation accepted",
    });
  }
);

export const rejectInvitationController = asyncHandler(
  async (req: Request, res: Response) => {
    await rejectTeamInvitation(String(req.params.id), req.user!.id);

    res.json({
      success: true,
      message: "Invitation rejected",
    });
  }
);
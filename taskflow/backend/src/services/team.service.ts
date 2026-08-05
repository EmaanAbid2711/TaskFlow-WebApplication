import prisma from "../config/prisma";
import { createNotificationBar} from "./notificationBar.service";
import AppError from "../utils/AppError";

// Send invitation
export const sendTeamInvitation = async (senderId: string, receiverEmail: string) => {
  const receiver = await prisma.user.findUnique({
    where: {
      email: receiverEmail,
    },
  });

  if (!receiver) {
    throw new AppError(
  "User with this email does not exist",
  404
);
  }

  if (senderId === receiver.id) {
    throw new AppError("You cannot invite yourself", 400);
  }

  // Already teammates?
const existingMember = await prisma.teamMember.findFirst({
  where: {
    userId: senderId,
    memberId: receiver.id,
  },
});

if (existingMember) {
  throw new AppError(
    "This user is already a member of your team",
    400
  );
}

  const existing = await prisma.teamInvitation.findFirst({
  where: {
    senderId,
    receiverId: receiver.id,
    status: "PENDING",
  },
});

  if (existing) {
  throw new AppError(
    "Invitation already sent",
    400
  );
}

  const invitation = await prisma.teamInvitation.create({
    data: {
      senderId,
      receiverId: receiver.id,
    },
  });

  await createNotificationBar(
  receiver.id,
  "Team Invitation",
  "You received a new team invitation",
  "TEAM_INVITATION",
  undefined,
  undefined,
  senderId,
  invitation.id
);

  return invitation;
};

// Get team members
export const getTeamMembers = async (userId: string) => {
  return prisma.teamMember.findMany({
    where: {
      userId,
    },
    include: {
      member: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          username: true,
        },
      },
    },
  });
};

// Get received invitations
export const getReceivedInvitations = async (userId: string) => {
  return prisma.teamInvitation.findMany({
    where: {
      receiverId: userId,
      status: "PENDING",
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
    },
  });
};

// Accept invitation
export const acceptTeamInvitation = async (invitationId: string, userId: string) => {
  const invitation = await prisma.teamInvitation.findUnique({
    where: {
      id: invitationId,
    },
  });
  

  if (!invitation || invitation.receiverId !== userId) {
    throw new AppError("Invitation not found", 404);
  }

  if (invitation.status !== "PENDING") {
  throw new AppError(
    "Invitation has already been processed",
    400
  );
}

  await prisma.teamInvitation.update({
    where: {
      id: invitationId,
    },
    data: {
      status: "ACCEPTED",
    },
  });

  // mutual relation
  await prisma.teamMember.createMany({
    data: [
      {
        userId: invitation.senderId,
        memberId: userId,
      },
      {
        userId,
        memberId: invitation.senderId,
      },
    ],
    skipDuplicates: true,
  });

  // notification to sender
  await createNotificationBar(
  invitation.senderId,
  "Invitation Accepted",
  "Your team invitation was accepted",
  "TEAM_INVITATION_ACCEPTED",
  undefined,
  undefined,
  userId,
  invitation.id
);

  return true;
};

// Reject invitation
export const rejectTeamInvitation = async (invitationId: string, userId: string) => {
  const invitation = await prisma.teamInvitation.findUnique({
    where: {
      id: invitationId,
    },
  });

  if (!invitation || invitation.receiverId !== userId) {
    throw new AppError("Invitation not found", 404);
  }

  if (invitation.status !== "PENDING") {
  throw new AppError(
    "Invitation has already been processed",
    400
  );
}

  await prisma.teamInvitation.update({
    where: {
      id: invitationId,
    },
    data: {
      status: "REJECTED",
    },
  });

  await createNotificationBar(
  invitation.senderId,
  "Invitation Rejected",
  "Your team invitation was rejected",
  "TEAM_INVITATION_REJECTED",
  undefined,
  undefined,
  userId,
  invitation.id
);

  return true;
};
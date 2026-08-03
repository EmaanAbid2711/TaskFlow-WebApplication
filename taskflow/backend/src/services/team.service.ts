import prisma from "../config/prisma";

// Send invitation
export const sendTeamInvitation = async (senderId: string, receiverEmail: string) => {
  const receiver = await prisma.user.findUnique({
    where: {
      email: receiverEmail,
    },
  });

  if (!receiver) {
    throw new Error("User with this email does not exist");
  }

  if (senderId === receiver.id) {
    throw new Error("You cannot invite yourself");
  }

  const existing = await prisma.teamInvitation.findUnique({
    where: {
      senderId_receiverId: {
        senderId,
        receiverId: receiver.id,
      },
    },
  });

  if (existing?.status === "PENDING") {
    throw new Error("Invitation already sent");
  }

  const invitation = await prisma.teamInvitation.create({
    data: {
      senderId,
      receiverId: receiver.id,
    },
  });

  await prisma.notification.create({
    data: {
      userId: receiver.id,
      senderId,
      title: "Team Invitation",
      message: "You received a new team invitation",
      type: "TEAM_INVITATION",
      invitationId: invitation.id,
    },
  });

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
    throw new Error("Invitation not found");
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
  });

  // notification to sender
  await prisma.notification.create({
    data: {
      userId: invitation.senderId,
      senderId: userId,
      title: "Invitation Accepted",
      message: "Your team invitation was accepted",
      type: "TEAM_INVITATION_ACCEPTED",
    },
  });

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
    throw new Error("Invitation not found");
  }

  await prisma.teamInvitation.update({
    where: {
      id: invitationId,
    },
    data: {
      status: "REJECTED",
    },
  });

  await prisma.notification.create({
    data: {
      userId: invitation.senderId,
      senderId: userId,
      title: "Invitation Rejected",
      message: "Your team invitation was rejected",
      type: "TEAM_INVITATION_REJECTED",
    },
  });

  return true;
};
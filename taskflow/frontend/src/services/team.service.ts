import api from "@/api/axios";

export interface InviteTeamPayload {
  email: string;
}

export interface TeamMember {
  id: string;
  member: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
    username?: string | null;
  };
}

export interface TeamInvitation {
  id: string;

  sender: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
  };

  status: "PENDING" | "ACCEPTED" | "REJECTED";

  createdAt: string;
}

export async function inviteTeamMemberService(
  payload: InviteTeamPayload
) {
  const { data } = await api.post(
    "/api/team/invite",
    payload
  );

  return data.data;
}

export async function getTeamMembersService() {
  const { data } = await api.get(
    "/api/team/members"
  );

  return data.data;
}

export async function getPendingInvitationsService() {
  const { data } = await api.get(
    "/api/team/invitations"
  );

  return data.data;
}

export async function acceptInvitationService(
  invitationId: string
) {
  const { data } = await api.patch(
    `/api/team/invitations/${invitationId}/accept`
  );

  return data;
}

export async function rejectInvitationService(
  invitationId: string
) {
  const { data } = await api.patch(
    `/api/team/invitations/${invitationId}/reject`
  );

  return data;
}
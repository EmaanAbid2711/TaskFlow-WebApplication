import api from "./axios";

export const getTeamMembersApi = async () => {
  const response = await api.get("/api/team/members");
  return response.data;
};

export const inviteTeamMemberApi = async (data: { email: string }) => {
  const response = await api.post("/api/team/invite", data);
  return response.data;
};
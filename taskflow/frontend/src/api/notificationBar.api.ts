import api from "./axios";

export const getNotificationBarApi = async () => {
  const response =
    await api.get(
      "/api/notification-bar"
    );
  return response.data;
};

export const getUnreadNotificationBarCountApi =
async () => {
  const response =
    await api.get(
      "/api/notification-bar/unread-count"
    );
  return response.data;
};

export const markNotificationBarReadApi =
async (
  notificationId: string
) => {
  const response =
    await api.patch(
      `/api/notification-bar/${notificationId}/read`
    );
  return response.data;
};

export const markAllNotificationBarReadApi =
async () => {
  const response =
    await api.patch(
      "/api/notification-bar/read-all"
    );
  return response.data;
};

export const deleteNotificationBarApi =
async (
  notificationId: string
) => {
  const response =
    await api.delete(
      `/api/notification-bar/${notificationId}`
    );
  return response.data;
};

export const acceptInvitationApi = async (
  invitationId: string
) => {
  const response = await api.patch(
    `/api/team/invitations/${invitationId}/accept`
  );

  return response.data;
};

export const rejectInvitationApi = async (
  invitationId: string
) => {
  const response = await api.patch(
    `/api/team/invitations/${invitationId}/reject`
  );

  return response.data;
};
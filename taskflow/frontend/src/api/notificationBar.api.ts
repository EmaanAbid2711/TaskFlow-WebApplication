import api from "./axios";

export const getNotificationsBarApi = async () => {
  const response =
    await api.get("/api/notifications");
  return response.data;
};

export const markNotificationBarReadApi = async (
  id: string
) => {
  const response =
    await api.patch(
      `/api/notifications/${id}/read`
    );
  return response.data;
};
import api from "@/api/axios";
import type {NotificationSettings} from "@/interfaces/notification";

export const getNotificationsService =
  () => {
    return api.get(
      "/api/notifications"
    );
  };

export const updateNotificationsService =
  (
    data:
      Partial<NotificationSettings>
  ) => {
    return api.patch(
      "/api/notifications",
      data
    );
  };
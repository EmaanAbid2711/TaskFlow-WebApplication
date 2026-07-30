import { getNotificationsBarApi, markNotificationBarReadApi} from "@/api/notificationBar.api";

export const getNotificationsBarService =
async () => {

  const response =
    await getNotificationsBarApi();

  return response.data;

};

export const markNotificationBarReadService =
async (
  id: string
) => {

  await markNotificationBarReadApi(id);

};
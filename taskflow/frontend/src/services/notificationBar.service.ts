import {getNotificationBarApi, getUnreadNotificationBarCountApi, markNotificationBarReadApi, markAllNotificationBarReadApi, deleteNotificationBarApi} from "@/api/notificationBar.api";

export const getNotificationBarService =
async () => {

  const response =
    await getNotificationBarApi();

  return response.data;

};

export const getUnreadNotificationBarCountService =
async () => {

  const response =
    await getUnreadNotificationBarCountApi();

  return response.data;

};

export const markNotificationBarReadService =
async (
  notificationId: string
) => {

  await markNotificationBarReadApi(
    notificationId
  );

};

export const markAllNotificationBarReadService =
async () => {

  await markAllNotificationBarReadApi();

};

export const deleteNotificationBarService =
async (
  notificationId: string
) => {

  await deleteNotificationBarApi(
    notificationId
  );

};
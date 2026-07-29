import { getActivitiesApi }
from "@/api/activity.api";

export const getActivitiesService =
async () => {

  const response =
    await getActivitiesApi();

  return response.data;

};
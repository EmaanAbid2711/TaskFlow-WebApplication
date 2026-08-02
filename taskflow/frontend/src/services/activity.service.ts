import { getActivitiesApi } from "@/api/activity.api";

export const getActivitiesService = async (
  page: number = 1,
  limit: number = 20
) => {

  const response =
    await getActivitiesApi(
      page,
      limit
    );

  return response.data;

};
import api from "./axios";

export const getActivitiesApi = async (
  page: number = 1,
  limit: number = 20
) => {

  const response =
    await api.get(
      "/api/activity",
      {
        params: {
          page,
          limit,
        },
      }
    );

  return response.data;

};
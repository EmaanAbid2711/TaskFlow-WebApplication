import api from "./axios";

export const getActivitiesApi =
  async () => {

    const response =
      await api.get(
        "/api/activity"
      );
    return response.data;

  };
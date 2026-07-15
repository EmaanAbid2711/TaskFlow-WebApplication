import api from "./axios";

export const getDashboardStatsApi = async () => {
  const response = await api.get("/api/dashboard/stats");

  return response.data;
};
import { getDashboardStatsApi } from "@/api/dashboard.api";

export const getDashboardStatsService = async () => {
  const response = await getDashboardStatsApi();

  return response.data;
};
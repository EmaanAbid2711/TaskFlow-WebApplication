import {createContext, useContext, useEffect, useState, type ReactNode} from "react";

import { getDashboardStatsService } from "@/services/dashboard.service";
import type { DashboardStats } from "@/interfaces/dashboard";
import { useAuth } from "@/context/AuthContext";

interface DashboardContextType {
  stats: DashboardStats;
  loading: boolean;
  refreshDashboardStats: () => Promise<void>;
}

const DashboardContext =
  createContext<DashboardContextType | undefined>(
    undefined
  );

interface Props {
  children: ReactNode;
}

export function DashboardProvider({
  children,
}: Props) {

  const { user } = useAuth();

  const [loading, setLoading] =
    useState(true);

  const emptyDashboardStats: DashboardStats = {
  totalProjects:0,
  totalTasks:0,
  completedTasks:0,
  pendingTasks:0,
  projectProgress:[],
  recentActivities:[],
  upcomingDeadlines:[],
  taskCompletionTrend: [],
};

  const [stats, setStats] =
  useState<DashboardStats>(
    emptyDashboardStats
  );

  const refreshDashboardStats =
  async () => {
    if(!user){
      setStats(emptyDashboardStats);
      return;
    }
    try {
      const dashboardStats =
        await getDashboardStatsService();
      setStats(dashboardStats);
    }
    catch(error){
      console.error(
        "Dashboard refresh failed",
        error
      );
      setStats(emptyDashboardStats);
    }
  };

  useEffect(() => {
   const loadDashboard =
     async () => {
       setLoading(true);
       await refreshDashboardStats();
       setLoading(false);
     };
   loadDashboard();
    }, [user]);

  return (

    <DashboardContext.Provider
      value={{
        stats,
        loading,
        refreshDashboardStats,
      }}
    >

      {children}

    </DashboardContext.Provider>

  );

}

export function useDashboard() {

  const context =
    useContext(DashboardContext);

  if (!context) {

    throw new Error(
      "useDashboard must be used inside DashboardProvider"
    );

  }

  return context;

}
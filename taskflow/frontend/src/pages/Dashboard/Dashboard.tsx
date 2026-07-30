import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from "recharts";

import {DashboardLayout, MetricCard, ProgressCard, ActivityCard, DeadlineCard, TeamMemberCard } from "../../components";
import {metrics} from "../../data/dashboarddata.ts";
import { getAllUsersService } from "@/services/user.service";
import { useDashboard } from "@/context/DashboardContext";
import type { TeamMember } from "@/interfaces/dashboard";


function Dashboard() {

  const [teamMembers, setTeamMembers] =
  useState<TeamMember[]>([]);

  const {stats,} = useDashboard();

  const navigate = useNavigate();
  
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    try {
      const users = await getAllUsersService();
    
      console.log("Users Array:", users);
    
      setTeamMembers(users);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };


  const liveMetrics = useMemo(() => {
    return metrics.map((metric) => {
      switch (metric.title) {
        case "Total Projects":
          return {
            ...metric,
            value: stats.totalProjects,
          };

        case "Total Tasks":
          return {
            ...metric,
            value: stats.totalTasks,
          };

        case "Completed Tasks":
          return {
            ...metric,
            value: stats.completedTasks,
          };

        case "Pending Tasks":
          return {
            ...metric,
            value:
              stats.totalTasks -
              stats.completedTasks,
          };

        default:
          return metric;
      }
    });
  }, [stats]);

  return (
    <DashboardLayout>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {liveMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            metric={metric}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Left Side */}
        <div className="space-y-6 xl:col-span-2">

          {/* Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Task Completion Trend
              </h2>

            </div>

            {/* Chart Placeholder */}
            <div className="h-64">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={stats.taskCompletionTrend}
                  margin={{
                    top: 10,
                    right: 20,
                    left: -20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                  />
            
                  <YAxis
                    allowDecimals={false}
                  />
            
                  <Tooltip />
                
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#0052cc"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* Project Progress */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-slate-900">
                Project Progress
              </h2>
              <div className="space-y-5">
              {
              stats.projectProgress.map(
              (project)=>(
                <ProgressCard
                  key={project.id}
                  project={project}
                />
              ))
              }
              </div>
            </div>

            {/* Recent Activity */}
            <div
              onClick={() => navigate("/activity")}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0052cc] hover:shadow-md"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Recent Activity
                </h2>
                        
                <span className="text-sm font-medium text-[#0052cc]">
                  View All →
                </span>
              </div>
                        
              <div className="space-y-5">
                {stats.recentActivities
                  .slice(0, 4)
                  .map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">

          {/* Deadlines */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Upcoming Deadlines
              </h2>
            </div>

            <div className="max-h-[420px] space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
              {stats.upcomingDeadlines.map((deadline) => (
                <DeadlineCard
                  key={deadline.id}
                  deadline={deadline}
                />
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-slate-900">
              Team Members
            </h2>

            <div className="space-y-4">
              {teamMembers.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
}

export default Dashboard;
export interface SidebarItem {
  id: number;
  title: string;
  icon: string;
  route: string;
}

export interface Metric {
  id: number;
  title: string;
  value: number;
  badge: string;
  badgeColor: string;
  icon: string;
}

export interface ProjectProgress {
  id: string;
  name: string;
  progress: number;
  color: string;
}

export interface Activity {
  id: string;
  user: string;
  avatar?: string | null;
  message: string;
  project: string;
  type: string;
  createdAt: string;
}

export interface Deadline {
  id: string;
  title: string;
  project: string;
  due: string;
  badgeColor: "red" | "orange" | "green" | "gray";
  dueDate: string;
  projectId: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role?: string | null;
  avatar?: string | null;
}

export interface ChartPoint {
  day: string;
  completed: number;
}

export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  projectProgress: ProjectProgress[];
  recentActivities: Activity[];
  upcomingDeadlines: Deadline[];
  taskCompletionTrend: ChartPoint[];
}
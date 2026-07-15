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
  id: number;
  name: string;
  progress: number;
  color: string;
}

export interface Activity {
  id: number;
  user: string;
  action: string;
  project: string;
  time: string;
  icon: string;
}

export interface Deadline {
  id: number;
  title: string;
  project: string;
  due: string;
  badgeColor: "red" | "orange" | "green" | "gray";
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
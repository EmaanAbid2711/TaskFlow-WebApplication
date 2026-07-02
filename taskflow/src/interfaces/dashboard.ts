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
  badgeColor: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
}

export interface ChartPoint {
  day: string;
  completed: number;
}
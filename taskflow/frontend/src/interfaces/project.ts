export interface ProjectStats {
  totalTasks: number;
  completedTasks: number;
  progress: number;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  stats: ProjectStats;
}
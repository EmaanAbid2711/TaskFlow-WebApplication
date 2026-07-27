export interface ProjectStats {
  totalTasks: number;
  completedTasks: number;
  progress: number;
}

export interface ProjectOwner {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;

  owner: ProjectOwner;

  stats: ProjectStats;
}
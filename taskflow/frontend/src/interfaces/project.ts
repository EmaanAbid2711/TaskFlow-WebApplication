export interface ProjectStats {
  totalTasks: number;
  completedTasks: number;
  progress: number;
}

export interface ProjectOwner {
  id: string;
  name: string;
}

export interface ProjectMemberUser {
  id: string;
  name: string;
  avatar?: string | null;
}

export interface ProjectMember {
  id: string;
  role?: string | null;
  user: ProjectMemberUser;
}

export interface ProjectTask {
  id: string;
  title: string;
  status: string;
  assigneeId?: string | null;
}

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  owner: ProjectOwner;
  members?: ProjectMember[];
  tasks?: ProjectTask[];
  stats: ProjectStats;
}
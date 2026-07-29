export interface ActivityUser {
  id: string;
  name: string;
  avatar?: string | null;
}

export interface ActivityProject {
  id: string;
  name: string;
}

export interface ActivityTask {
  id: string;
  title: string;
}

export interface ActivityItem {
  id: string;
  type: string;
  message: string;
  createdAt: string;
  user: ActivityUser;
  task: ActivityTask;
  project: ActivityProject;
}
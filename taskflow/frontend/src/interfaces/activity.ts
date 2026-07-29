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
  type:
    | "system"
    | "comment";
  message: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string | null;
  };
  task: {
    id: string;
    title: string;
  };
  project: {
    id: string;
    name: string;
  };
}
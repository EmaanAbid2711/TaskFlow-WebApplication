export type TaskType =
  | "todo"
  | "progress"
  | "review"
  | "completed";

export type DrawerMode =
  | "create"
  | "edit";

export interface Assignee {
  id: string;
  name: string;
  avatar: string;
}

export interface UserOption {
  id: string;
  name: string;
  avatar: string;
  role?: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "image";
  url: string;
}

export interface Activity {
  id: string;
  type: "system" | "comment";
  user?: string;
  avatar?: string;
  text: string;
  time: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskType;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  progress?: number;
  reviewStatus?: string;
  assignee: Assignee;
  assignees?: string[];
  attachments: Attachment[];
  activities: Activity[];
}
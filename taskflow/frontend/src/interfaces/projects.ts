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

export interface Attachment {
  id: number;
  name: string;
  size: string;
  type: "pdf" | "image";
}

export interface Activity {
  id: number;
  type: "system" | "comment";
  user?: string;
  avatar?: string;
  text: string;
  time: string;
}

export interface Task {
  id: number;
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
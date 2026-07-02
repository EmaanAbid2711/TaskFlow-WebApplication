export type TaskType =
  | "todo"
  | "progress"
  | "review"
  | "completed";

export interface Task {
  id: number;
  title: string;
  priority?: string;
  date?: string;
  status?: string;
  progress?: number;
  assignee?: string;
  assignees?: string[];
}

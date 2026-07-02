import type { Task, TaskType } from "./projects";

export interface TaskCardProps {
  task: Task;
  type: TaskType;
}

export interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  type: TaskType;
}

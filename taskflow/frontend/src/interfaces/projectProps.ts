import type {Task, TaskType} from "./projects";

export interface TaskCardProps {
  task: Task;
  type: TaskType;

  onClick: (
    task: Task
  ) => void;
}

export interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  type: TaskType;

  onAddTask: (
    status: TaskType
  ) => void;

  onTaskClick: (
    task: Task
  ) => void;
}

export interface KanbanBoardProps {
  onAddTask: (
    status: TaskType
  ) => void;

  onTaskClick: (
    task: Task
  ) => void;
}
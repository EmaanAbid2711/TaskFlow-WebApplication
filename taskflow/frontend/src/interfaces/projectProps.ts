import type { Project } from "@/interfaces/project";
import type { Task, TaskType } from "@/interfaces/projects";

export interface TaskCardProps {
  task: Task;
  type: TaskType;
  onClick: (task: Task) => void;
}

export interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  type: TaskType;
  onAddTask: (status: TaskType) => void;
  onTaskClick: (task: Task) => void;
}

export interface KanbanBoardProps {
  tasks: Task[];
  onAddTask: (status: TaskType) => void;
  onTaskClick: (task: Task) => void;
}

export interface ProjectHeaderProps {
  projects: Project[];

  selectedProject: Project | null;

  search: string;

  onSearchChange: (
    value: string
  ) => void;

  onProjectChange: (
    projectId: string
  ) => void;

  onCreateProject: () => void;

  onEditProject: () => void;

  onDeleteProject: () => void;
}
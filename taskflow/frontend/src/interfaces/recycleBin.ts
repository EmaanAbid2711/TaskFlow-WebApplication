import type { Project } from "@/interfaces/project";
import type { Task } from "@/interfaces/projects";

export type RecycleBinItem =
  | {
      recycleId: string;
      type: "project";
      item: Project;
      originalPosition: number;
      deletedAt: string;
    }
  | {
      recycleId: string;
      type: "task";
      item: Task;
      projectId: string;
      originalPosition: number;
      deletedAt: string;
    };

export interface RecycleBinNavigationState {
  restoredItem?: RecycleBinItem;
}
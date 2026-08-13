import type {
  RecycleBinProject,
  RecycleBinTask,
} from "@/api/recycle-bin.api";

export type RecycleBinItem =
  | {
      recycleId: string;
      type: "project";
      item: RecycleBinProject;
      deletedAt: string;
    }
  | {
      recycleId: string;
      type: "task";
      item: RecycleBinTask;
      projectId: string;
      deletedAt: string;
    };

export interface RecycleBinNavigationState {
  restoredItem?: RecycleBinItem;
}
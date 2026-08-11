import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Project } from "@/interfaces/project";
import type { Task } from "@/interfaces/projects";
import type { RecycleBinItem } from "@/interfaces/recycleBin";

import {
  moveProjectToRecycleBinApi,
  restoreProjectApi,
  permanentlyDeleteProjectApi,
} from "@/api/project.api";

import {
  moveTaskToRecycleBinApi,
  restoreTaskApi,
  permanentlyDeleteTaskApi,
} from "@/api/task.api";

interface RecycleBinContextType {
  items: RecycleBinItem[];

  deletedProjectIds: string[];
  deletedTaskIds: string[];

  moveProjectToRecycleBin: (
    project: Project,
    originalPosition: number
  ) => Promise<void>;

  moveTaskToRecycleBin: (
    task: Task,
    projectId: string,
    originalPosition: number
  ) => Promise<void>;

  restoreItem: (
    recycleId: string
  ) => Promise<RecycleBinItem | null>;

  permanentlyDeleteItem: (
    recycleId: string
  ) => Promise<void>;
}

const RecycleBinContext =
  createContext<
    RecycleBinContextType | undefined
  >(undefined);

interface Props {
  children: ReactNode;
}

export function RecycleBinProvider({
  children,
}: Props) {
  const [items, setItems] =
    useState<RecycleBinItem[]>([]);

  /**
   * ------------------------------------------------------------
   * Move Project To Recycle Bin
   * ------------------------------------------------------------
   */
  const moveProjectToRecycleBin = async (
    project: Project,
    originalPosition: number
  ) => {
    await moveProjectToRecycleBinApi(
      project.id
    );

    const recycleItem: RecycleBinItem = {
      recycleId: `project:${project.id}`,
      type: "project",
      item: project,
      originalPosition,
      deletedAt:
        new Date().toISOString(),
    };

    setItems((previous) => {
      const withoutExisting =
        previous.filter(
          (item) =>
            item.recycleId !==
            recycleItem.recycleId
        );

      return [
        recycleItem,
        ...withoutExisting,
      ];
    });
  };

  /**
   * ------------------------------------------------------------
   * Move Task To Recycle Bin
   * ------------------------------------------------------------
   */
  const moveTaskToRecycleBin = async (
    task: Task,
    projectId: string,
    originalPosition: number
  ) => {
    await moveTaskToRecycleBinApi(
      task.id
    );

    const recycleItem: RecycleBinItem = {
      recycleId: `task:${task.id}`,
      type: "task",
      item: task,
      projectId,
      originalPosition,
      deletedAt:
        new Date().toISOString(),
    };

    setItems((previous) => {
      const withoutExisting =
        previous.filter(
          (item) =>
            item.recycleId !==
            recycleItem.recycleId
        );

      return [
        recycleItem,
        ...withoutExisting,
      ];
    });
  };

  /**
   * ------------------------------------------------------------
   * Restore Item
   * ------------------------------------------------------------
   */
  const restoreItem = async (
    recycleId: string
  ): Promise<RecycleBinItem | null> => {
    const item = items.find(
      (entry) =>
        entry.recycleId === recycleId
    );

    if (!item) {
      return null;
    }

    if (item.type === "project") {
      await restoreProjectApi(
        item.item.id
      );
    } else {
      await restoreTaskApi(
        item.item.id
      );
    }

    setItems((previous) =>
      previous.filter(
        (entry) =>
          entry.recycleId !== recycleId
      )
    );

    return item;
  };

  /**
   * ------------------------------------------------------------
   * Permanently Delete Item
   * ------------------------------------------------------------
   */
  const permanentlyDeleteItem = async (
    recycleId: string
  ) => {
    const item = items.find(
      (entry) =>
        entry.recycleId === recycleId
    );

    if (!item) {
      return;
    }

    if (item.type === "project") {
      await permanentlyDeleteProjectApi(
        item.item.id
      );
    } else {
      await permanentlyDeleteTaskApi(
        item.item.id
      );
    }

    setItems((previous) =>
      previous.filter(
        (entry) =>
          entry.recycleId !== recycleId
      )
    );
  };

  /**
   * ------------------------------------------------------------
   * IDs currently hidden from normal views
   * ------------------------------------------------------------
   */
  const deletedProjectIds = items
    .filter(
      (item) =>
        item.type === "project"
    )
    .map(
      (item) =>
        item.item.id
    );

  const deletedTaskIds = items
    .filter(
      (item) =>
        item.type === "task"
    )
    .map(
      (item) =>
        item.item.id
    );

  return (
    <RecycleBinContext.Provider
      value={{
        items,

        deletedProjectIds,
        deletedTaskIds,

        moveProjectToRecycleBin,
        moveTaskToRecycleBin,

        restoreItem,
        permanentlyDeleteItem,
      }}
    >
      {children}
    </RecycleBinContext.Provider>
  );
}

export function useRecycleBin() {
  const context =
    useContext(
      RecycleBinContext
    );

  if (!context) {
    throw new Error(
      "useRecycleBin must be used inside RecycleBinProvider"
    );
  }

  return context;
}
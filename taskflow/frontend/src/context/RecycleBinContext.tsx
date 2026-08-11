import {createContext, useContext, useEffect, useState, type ReactNode} from "react";

import { useAuth } from "@/context/AuthContext";
import type { Project } from "@/interfaces/project";
import type { Task } from "@/interfaces/projects";
import type { RecycleBinItem } from "@/interfaces/recycleBin";

interface RecycleBinContextType {
  items: RecycleBinItem[];

  deletedProjectIds: string[];
  deletedTaskIds: string[];

  moveProjectToRecycleBin: (
    project: Project,
    originalPosition: number
  ) => void;

  moveTaskToRecycleBin: (
    task: Task,
    projectId: string,
    originalPosition: number
  ) => void;

  restoreItem: (
    recycleId: string
  ) => RecycleBinItem | null;

  permanentlyDeleteItem: (
    recycleId: string
  ) => void;
}

const RecycleBinContext =
  createContext<RecycleBinContextType | undefined>(
    undefined
  );

interface Props {
  children: ReactNode;
}

interface StoredRecycleBinData {
  items: RecycleBinItem[];
  permanentlyDeletedProjectIds: string[];
  permanentlyDeletedTaskIds: string[];
}

const STORAGE_PREFIX =
  "taskflow-recycle-bin";

export function RecycleBinProvider({
  children,
}: Props) {
  const { user } = useAuth();

  const [items, setItems] =
    useState<RecycleBinItem[]>([]);

  const [
    permanentlyDeletedProjectIds,
    setPermanentlyDeletedProjectIds,
  ] = useState<string[]>([]);

  const [
    permanentlyDeletedTaskIds,
    setPermanentlyDeletedTaskIds,
  ] = useState<string[]>([]);

  const [loadedUserId, setLoadedUserId] =
    useState<string | null>(null);

  const storageKey = user?.id
    ? `${STORAGE_PREFIX}:${user.id}`
    : null;

  /*
   * ------------------------------------------------------------
   * Load recycle bin when user changes
   * ------------------------------------------------------------
   */

  useEffect(() => {
    if (!user?.id) {
      setItems([]);
      setPermanentlyDeletedProjectIds([]);
      setPermanentlyDeletedTaskIds([]);
      setLoadedUserId(null);

      return;
    }

    setLoadedUserId(null);

    const key =
      `${STORAGE_PREFIX}:${user.id}`;

    try {
      const stored =
        localStorage.getItem(key);

      if (!stored) {
        setItems([]);
        setPermanentlyDeletedProjectIds([]);
        setPermanentlyDeletedTaskIds([]);
      } else {
        const parsed =
          JSON.parse(
            stored
          ) as StoredRecycleBinData;

        setItems(
          Array.isArray(parsed.items)
            ? parsed.items
            : []
        );

        setPermanentlyDeletedProjectIds(
          Array.isArray(
            parsed.permanentlyDeletedProjectIds
          )
            ? parsed.permanentlyDeletedProjectIds
            : []
        );

        setPermanentlyDeletedTaskIds(
          Array.isArray(
            parsed.permanentlyDeletedTaskIds
          )
            ? parsed.permanentlyDeletedTaskIds
            : []
        );
      }
    } catch (error) {
      console.error(
        "Failed to load recycle bin",
        error
      );

      setItems([]);
      setPermanentlyDeletedProjectIds([]);
      setPermanentlyDeletedTaskIds([]);
    }

    setLoadedUserId(user.id);
  }, [user?.id]);

  /*
   * ------------------------------------------------------------
   * Save recycle bin
   * ------------------------------------------------------------
   */

  useEffect(() => {
    if (
      !storageKey ||
      !user?.id ||
      loadedUserId !== user.id
    ) {
      return;
    }

    const data: StoredRecycleBinData = {
      items,
      permanentlyDeletedProjectIds,
      permanentlyDeletedTaskIds,
    };

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(data)
      );
    } catch (error) {
      console.error(
        "Failed to save recycle bin",
        error
      );
    }
  }, [
    items,
    permanentlyDeletedProjectIds,
    permanentlyDeletedTaskIds,
    storageKey,
    user?.id,
    loadedUserId,
  ]);

  /*
   * ------------------------------------------------------------
   * Move project to recycle bin
   * ------------------------------------------------------------
   */

  const moveProjectToRecycleBin = (
    project: Project,
    originalPosition: number
  ) => {
    const recycleId =
      `project:${project.id}`;

    const recycleItem: RecycleBinItem = {
      recycleId,
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
            item.recycleId !== recycleId
        );

      return [
        recycleItem,
        ...withoutExisting,
      ];
    });
  };

  /*
   * ------------------------------------------------------------
   * Move task to recycle bin
   * ------------------------------------------------------------
   */

  const moveTaskToRecycleBin = (
    task: Task,
    projectId: string,
    originalPosition: number
  ) => {
    const recycleId =
      `task:${task.id}`;

    const recycleItem: RecycleBinItem = {
      recycleId,
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
            item.recycleId !== recycleId
        );

      return [
        recycleItem,
        ...withoutExisting,
      ];
    });
  };

  /*
   * ------------------------------------------------------------
   * Restore item
   * ------------------------------------------------------------
   */

  const restoreItem = (
    recycleId: string
  ): RecycleBinItem | null => {
    const item =
      items.find(
        (entry) =>
          entry.recycleId === recycleId
      );

    if (!item) {
      return null;
    }

    setItems((previous) =>
      previous.filter(
        (entry) =>
          entry.recycleId !== recycleId
      )
    );

    return item;
  };

  /*
   * ------------------------------------------------------------
   * Permanently delete item
   *
   * Phase 1:
   * This removes it permanently from frontend state.
   *
   * Phase 2:
   * This will call the backend permanent-delete API.
   * ------------------------------------------------------------
   */

  const permanentlyDeleteItem = (
    recycleId: string
  ) => {
    const item =
      items.find(
        (entry) =>
          entry.recycleId === recycleId
      );

    if (!item) {
      return;
    }

    setItems((previous) =>
      previous.filter(
        (entry) =>
          entry.recycleId !== recycleId
      )
    );

    if (item.type === "project") {
      setPermanentlyDeletedProjectIds(
        (previous) =>
          previous.includes(item.item.id)
            ? previous
            : [
                ...previous,
                item.item.id,
              ]
      );
    } else {
      setPermanentlyDeletedTaskIds(
        (previous) =>
          previous.includes(item.item.id)
            ? previous
            : [
                ...previous,
                item.item.id,
              ]
      );
    }
  };

  /*
   * ------------------------------------------------------------
   * IDs hidden from normal project/task views
   * ------------------------------------------------------------
   */

  const deletedProjectIds = [
    ...items
      .filter(
        (item) =>
          item.type === "project"
      )
      .map(
        (item) =>
          item.item.id
      ),
    ...permanentlyDeletedProjectIds,
  ];

  const deletedTaskIds = [
    ...items
      .filter(
        (item) =>
          item.type === "task"
      )
      .map(
        (item) =>
          item.item.id
      ),
    ...permanentlyDeletedTaskIds,
  ];

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
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode} from "react";

import { getRecycleBinApi, type RecycleBinProject, type RecycleBinTask} from "@/api/recycle-bin.api";
import { restoreProjectApi,  permanentlyDeleteProjectApi} from "@/api/project.api";
import { restoreTaskApi, permanentlyDeleteTaskApi} from "@/api/task.api";

// --------------------------------------------------------------------------
// Context Type
// --------------------------------------------------------------------------

interface RecycleBinContextType {
  projects: RecycleBinProject[];
  tasks: RecycleBinTask[];

  loading: boolean;
  error: string | null;

  fetchRecycleBin: () => Promise<void>;
  refreshRecycleBin: () => Promise<void>;

  restoreProject: (
    projectId: string
  ) => Promise<void>;

  restoreTask: (
    taskId: string
  ) => Promise<void>;

  permanentlyDeleteProject: (
    projectId: string
  ) => Promise<void>;

  permanentlyDeleteTask: (
    taskId: string
  ) => Promise<void>;
}

// --------------------------------------------------------------------------
// Context
// --------------------------------------------------------------------------

const RecycleBinContext =
  createContext<RecycleBinContextType | undefined>(
    undefined
  );

// --------------------------------------------------------------------------
// Provider Props
// --------------------------------------------------------------------------

interface RecycleBinProviderProps {
  children: ReactNode;
}

// --------------------------------------------------------------------------
// Provider
// --------------------------------------------------------------------------

export const RecycleBinProvider = ({
  children,
}: RecycleBinProviderProps) => {
  const [projects, setProjects] = useState<
    RecycleBinProject[]
  >([]);

  const [tasks, setTasks] = useState<
    RecycleBinTask[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  // ------------------------------------------------------------------------
  // Fetch Recycle Bin
  // ------------------------------------------------------------------------

  const fetchRecycleBin = useCallback(
    async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getRecycleBinApi();

        setProjects(data.projects);
        setTasks(data.tasks);
      } catch (error: unknown) {
        console.error(
          "Failed to fetch recycle bin:",
          error
        );

        setError(
          "Failed to load recycle bin."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ------------------------------------------------------------------------
  // Refresh Recycle Bin
  // ------------------------------------------------------------------------

  const refreshRecycleBin =
    useCallback(async () => {
      await fetchRecycleBin();
    }, [fetchRecycleBin]);

  // ------------------------------------------------------------------------
  // Restore Project
  // ------------------------------------------------------------------------

  const restoreProject = useCallback(
    async (projectId: string) => {
      try {
        setError(null);

        await restoreProjectApi(
          projectId
        );

        // Remove restored project from local recycle-bin state.
        setProjects((currentProjects) =>
          currentProjects.filter(
            (project) =>
              project.id !== projectId
          )
        );
      } catch (error: unknown) {
        console.error(
          "Failed to restore project:",
          error
        );

        setError(
          "Failed to restore project."
        );

        throw error;
      }
    },
    []
  );

  // ------------------------------------------------------------------------
  // Restore Task
  // ------------------------------------------------------------------------

  const restoreTask = useCallback(
    async (taskId: string) => {
      try {
        setError(null);

        await restoreTaskApi(taskId);

        // Remove restored task from standalone deleted tasks.
        setTasks((currentTasks) =>
          currentTasks.filter(
            (task) => task.id !== taskId
          )
        );

        // Also remove it from a deleted project's nested tasks
        // in case the backend ever returns it there.
        setProjects((currentProjects) =>
          currentProjects.map((project) => ({
            ...project,
            tasks: project.tasks.filter(
              (task) => task.id !== taskId
            ),
          }))
        );
      } catch (error: unknown) {
        console.error(
          "Failed to restore task:",
          error
        );

        setError(
          "Failed to restore task."
        );

        throw error;
      }
    },
    []
  );

  // ------------------------------------------------------------------------
  // Permanently Delete Project
  // ------------------------------------------------------------------------

  const permanentlyDeleteProject =
    useCallback(
      async (projectId: string) => {
        try {
          setError(null);

          await permanentlyDeleteProjectApi(
            projectId
          );

          setProjects(
            (currentProjects) =>
              currentProjects.filter(
                (project) =>
                  project.id !== projectId
              )
          );
        } catch (error: unknown) {
          console.error(
            "Failed to permanently delete project:",
            error
          );

          setError(
            "Failed to permanently delete project."
          );

          throw error;
        }
      },
      []
    );

  // ------------------------------------------------------------------------
  // Permanently Delete Task
  // ------------------------------------------------------------------------

  const permanentlyDeleteTask =
    useCallback(
      async (taskId: string) => {
        try {
          setError(null);

          await permanentlyDeleteTaskApi(
            taskId
          );

          setTasks((currentTasks) =>
            currentTasks.filter(
              (task) => task.id !== taskId
            )
          );

          setProjects((currentProjects) =>
            currentProjects.map((project) => ({
              ...project,
              tasks: project.tasks.filter(
                (task) => task.id !== taskId
              ),
            }))
          );
        } catch (error: unknown) {
          console.error(
            "Failed to permanently delete task:",
            error
          );

          setError(
            "Failed to permanently delete task."
          );

          throw error;
        }
      },
      []
    );

  // ------------------------------------------------------------------------
  // Initial Fetch
  // ------------------------------------------------------------------------

  useEffect(() => {
    void fetchRecycleBin();
  }, [fetchRecycleBin]);

  // ------------------------------------------------------------------------
  // Context Value
  // ------------------------------------------------------------------------

  const value: RecycleBinContextType = {
    projects,
    tasks,

    loading,
    error,

    fetchRecycleBin,
    refreshRecycleBin,

    restoreProject,
    restoreTask,

    permanentlyDeleteProject,
    permanentlyDeleteTask,
  };

  return (
    <RecycleBinContext.Provider value={value}>
      {children}
    </RecycleBinContext.Provider>
  );
};

// --------------------------------------------------------------------------
// Hook
// --------------------------------------------------------------------------

export const useRecycleBin = () => {
  const context =
    useContext(RecycleBinContext);

  if (!context) {
    throw new Error(
      "useRecycleBin must be used inside RecycleBinProvider"
    );
  }

  return context;
};
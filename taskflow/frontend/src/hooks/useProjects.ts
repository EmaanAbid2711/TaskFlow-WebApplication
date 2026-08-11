import { useCallback, useEffect, useState } from "react";

import { getProjectsApi, getProjectApi, createProjectApi, updateProjectApi} from "@/api/project.api";
import { getProjectTasksApi } from "@/api/task.api";
import type { Project } from "@/interfaces/project";
import type { Task } from "@/interfaces/projects";
import { mapTasks } from "@/mappers/task.mapper";
import { useRecycleBin } from "@/context/RecycleBinContext";

export function useProjects() {
  /*
   * ------------------------------------------------------------
   * State
   * ------------------------------------------------------------
   */
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(false);

  /*
   * ------------------------------------------------------------
   * Recycle Bin
   * ------------------------------------------------------------
   */
  const {
    deletedProjectIds,
    deletedTaskIds,
    moveProjectToRecycleBin,
  } = useRecycleBin();

  /*
   * ------------------------------------------------------------
   * Load Projects
   * ------------------------------------------------------------
   */
  const loadProjects = useCallback(async () => {
    try {
      const response = await getProjectsApi();
      const data = response.data as Project[];

      /*
       * Hide projects that are currently
       * inside the recycle bin.
       */
      const visibleProjects = data.filter(
        (project) => !deletedProjectIds.includes(project.id)
      );

      setProjects(visibleProjects);

      /*
       * Keep the current selected project if it still exists.
       * Otherwise select the first project.
       */
      setSelectedProject((previous) => {
        if (previous) {
          const exists = visibleProjects.find(
            (project) => project.id === previous.id
          );
          if (exists) {
            return exists;
          }
        }
        return visibleProjects.length > 0 ? visibleProjects[0] : null;
      });
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  }, [deletedProjectIds]);

  /*
   * ------------------------------------------------------------
   * Create Project
   * ------------------------------------------------------------
   */
  const createProject = async (name: string, description?: string) => {
    const response = await createProjectApi({
      name,
      description,
    });

    const project = response.data as Project;

    setProjects((previous) => [project, ...previous]);
    setSelectedProject(project);

    /* New project starts with no tasks. */
    setTasks([]);

    return project;
  };

  /*
   * ------------------------------------------------------------
   * Update Project
   * ------------------------------------------------------------
   */
  const updateProject = async (
    projectId: string,
    name: string,
    description: string
  ) => {
    const response = await updateProjectApi(projectId, {
      name,
      description,
    });

    const updated = response.data as Project;

    setProjects((previous) =>
      previous.map((project) => (project.id === projectId ? updated : project))
    );
    setSelectedProject(updated);
  };

  /*
   * ------------------------------------------------------------
   * Delete Project
   *
   * Frontend soft delete: project is moved to recycle bin.
   * No backend DELETE request.
   * ------------------------------------------------------------
   */
  const deleteProject = (projectId: string) => {
    const project = projects.find((entry) => entry.id === projectId);
    if (!project) {
      return;
    }

    const originalPosition = projects.findIndex(
      (entry) => entry.id === projectId
    );

    moveProjectToRecycleBin(project, originalPosition);

    const remaining = projects.filter((entry) => entry.id !== projectId);
    setProjects(remaining);

    /*
     * If the deleted project was selected,
     * select the next available project.
     */
    if (selectedProject?.id === projectId) {
      const nextProject = remaining.length > 0 ? remaining[0] : null;
      setSelectedProject(nextProject);

      if (!nextProject) {
        setTasks([]);
      }
    }
  };

  /*
   * ------------------------------------------------------------
   * Remove Task Locally
   *
   * Used after moving a task to recycle bin.
   * ------------------------------------------------------------
   */
  const removeTaskLocally = (taskId: string, projectId: string) => {
    const task = tasks.find((entry) => entry.id === taskId);
    if (!task) {
      return;
    }

    /* Remove task from current task list. */
    setTasks((previous) => previous.filter((entry) => entry.id !== taskId));

    /* Update project statistics locally. */
    setProjects((previous) =>
      previous.map((project) => {
        if (project.id !== projectId) {
          return project;
        }

        const totalTasks = Math.max(0, project.stats.totalTasks - 1);
        const completedTasks =
          task.status === "completed"
            ? Math.max(0, project.stats.completedTasks - 1)
            : project.stats.completedTasks;

        const progress =
          totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

        return {
          ...project,
          stats: {
            totalTasks,
            completedTasks,
            progress,
          },
        };
      })
    );

    /* Update selected project statistics too. */
    setSelectedProject((previous) => {
      if (!previous || previous.id !== projectId) {
        return previous;
      }

      const totalTasks = Math.max(0, previous.stats.totalTasks - 1);
      const completedTasks =
        task.status === "completed"
          ? Math.max(0, previous.stats.completedTasks - 1)
          : previous.stats.completedTasks;

      const progress =
        totalTasks === 0
          ? 0
          : Math.round((completedTasks / totalTasks) * 100);

      return {
        ...previous,
        stats: {
          totalTasks,
          completedTasks,
          progress,
        },
      };
    });
  };

  /*
   * ------------------------------------------------------------
   * Refresh Project Statistics
   * ------------------------------------------------------------
   */
  const refreshProjectStats = async (projectId: string) => {
    try {
      const response = await getProjectApi(projectId);
      const updatedProject = response.data;
      const stats = calculateStats(updatedProject.tasks);

      /* Update selected project. */
      setSelectedProject((previous) => {
        if (!previous) {
          return updatedProject;
        }
        return {
          ...previous,
          stats,
        };
      });

      /* Update project inside project list. */
      setProjects((previous) =>
        previous.map((project) =>
          project.id === projectId ? { ...project, stats } : project
        )
      );
    } catch (error) {
      console.error("Project refresh failed:", error);
    }
  };

  /*
   * ------------------------------------------------------------
   * Load Tasks
   * ------------------------------------------------------------
   */
  const loadTasks = useCallback(
    async (projectId: string): Promise<Task[]> => {
      try {
        setTasksLoading(true);

        const response = await getProjectTasksApi(projectId);
        const mappedTasks = mapTasks(response.data);

        /* Hide tasks currently inside the recycle bin. */
        const visibleTasks = mappedTasks.filter(
          (task) => !deletedTaskIds.includes(task.id)
        );

        setTasks(visibleTasks);
        return visibleTasks;
      } catch (error) {
        console.error("Failed to load tasks:", error);
        return [];
      } finally {
        setTasksLoading(false);
      }
    },
    [deletedTaskIds]
  );

  /*
   * ------------------------------------------------------------
   * Refresh Current Project
   *
   * This is the function Projects.tsx should use.
   *
   * It refreshes:
   * 1. Tasks
   * 2. Project statistics
   *
   * It returns the latest tasks.
   * ------------------------------------------------------------
   */
  const refreshCurrentProject = async (): Promise<Task[]> => {
    if (!selectedProject) {
      return [];
    }

    const refreshedTasks = await loadTasks(selectedProject.id);
    await refreshProjectStats(selectedProject.id);

    return refreshedTasks;
  };

  /*
   * ------------------------------------------------------------
   * Effects
   * ------------------------------------------------------------
   */
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  /* Load tasks whenever selected project changes. */
  useEffect(() => {
    if (selectedProject) {
      loadTasks(selectedProject.id);
    } else {
      setTasks([]);
    }
  }, [selectedProject, loadTasks]);

  /*
   * ------------------------------------------------------------
   * Return
   * ------------------------------------------------------------
   */
  return {
    loading,
    tasksLoading,
    projects,
    setProjects,
    selectedProject,
    setSelectedProject,
    tasks,
    setTasks,
    createProject,
    updateProject,
    deleteProject,
    removeTaskLocally,
    loadProjects,
    loadTasks,
    refreshCurrentProject,
    refreshProjectStats,
  };
}

/*
 * ------------------------------------------------------------
 * Calculate Project Statistics
 * ------------------------------------------------------------
 */
function calculateStats(tasks: Array<{ status?: string }>) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return {
    totalTasks,
    completedTasks,
    progress,
  };
}
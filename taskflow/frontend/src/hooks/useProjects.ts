import {useCallback, useEffect, useState} from "react";

import { getProjectsApi, getProjectApi, createProjectApi, updateProjectApi} from "@/api/project.api";
import { getProjectTasksApi } from "@/api/task.api";
import type { Project } from "@/interfaces/project";
import type { Task } from "@/interfaces/projects";
import { mapTasks } from "@/mappers/task.mapper";
import { useRecycleBin } from "@/context/RecycleBinContext";

export function useProjects() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [tasksLoading, setTasksLoading] =
    useState(false);

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

  const loadProjects = useCallback(
    async () => {
      try {
        const response =
          await getProjectsApi();

        const data =
          response.data as Project[];

        const visibleProjects =
          data.filter(
            (project) =>
              !deletedProjectIds.includes(
                project.id
              )
          );

        setProjects(
          visibleProjects
        );

        setSelectedProject(
          (previous) => {
            if (previous) {
              const exists =
                visibleProjects.find(
                  (project) =>
                    project.id ===
                    previous.id
                );

              if (exists) {
                return exists;
              }
            }

            return visibleProjects.length > 0
              ? visibleProjects[0]
              : null;
          }
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [deletedProjectIds]
  );

  /*
   * ------------------------------------------------------------
   * Create Project
   * ------------------------------------------------------------
   */

  const createProject = async (
    name: string,
    description?: string
  ) => {
    const response =
      await createProjectApi({
        name,
        description,
      });

    const project =
      response.data as Project;

    setProjects(
      (previous) => [
        project,
        ...previous,
      ]
    );

    setSelectedProject(project);

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
    const response =
      await updateProjectApi(
        projectId,
        {
          name,
          description,
        }
      );

    const updated =
      response.data as Project;

    setProjects(
      (previous) =>
        previous.map(
          (project) =>
            project.id === projectId
              ? updated
              : project
        )
    );

    setSelectedProject(updated);
  };

  /*
   * ------------------------------------------------------------
   * Move Project To Recycle Bin
   *
   * NOTE:
   * No backend DELETE request is made here.
   * ------------------------------------------------------------
   */

  const deleteProject = async (
    projectId: string
  ) => {
    const project =
      projects.find(
        (entry) =>
          entry.id === projectId
      );

    if (!project) {
      return;
    }

    const originalPosition =
      projects.findIndex(
        (entry) =>
          entry.id === projectId
      );

    moveProjectToRecycleBin(
      project,
      originalPosition
    );

    const remaining =
      projects.filter(
        (entry) =>
          entry.id !== projectId
      );

    setProjects(remaining);

    if (
      selectedProject?.id ===
      projectId
    ) {
      const nextProject =
        remaining.length > 0
          ? remaining[0]
          : null;

      setSelectedProject(
        nextProject
      );

      if (!nextProject) {
        setTasks([]);
      }
    }
  };

  /*
   * ------------------------------------------------------------
   * Remove Task Locally
   *
   * Used during frontend soft delete.
   * ------------------------------------------------------------
   */

  const removeTaskLocally = (
    taskId: string,
    projectId: string
  ) => {
    const task =
      tasks.find(
        (entry) =>
          entry.id === taskId
      );

    if (!task) {
      return;
    }

    setTasks(
      (previous) =>
        previous.filter(
          (entry) =>
            entry.id !== taskId
        )
    );

    setProjects(
      (previous) =>
        previous.map(
          (project) => {
            if (
              project.id !== projectId
            ) {
              return project;
            }

            const totalTasks =
              Math.max(
                0,
                project.stats.totalTasks - 1
              );

            const completedTasks =
              task.status === "completed"
                ? Math.max(
                    0,
                    project.stats
                      .completedTasks - 1
                  )
                : project.stats
                    .completedTasks;

            const progress =
              totalTasks === 0
                ? 0
                : Math.round(
                    (
                      completedTasks /
                      totalTasks
                    ) * 100
                  );

            return {
              ...project,
              stats: {
                totalTasks,
                completedTasks,
                progress,
              },
            };
          }
        )
    );

    setSelectedProject(
      (previous) => {
        if (
          !previous ||
          previous.id !== projectId
        ) {
          return previous;
        }

        const totalTasks =
          Math.max(
            0,
            previous.stats.totalTasks - 1
          );

        const completedTasks =
          task.status === "completed"
            ? Math.max(
                0,
                previous.stats
                  .completedTasks - 1
              )
            : previous.stats
                .completedTasks;

        const progress =
          totalTasks === 0
            ? 0
            : Math.round(
                (
                  completedTasks /
                  totalTasks
                ) * 100
              );

        return {
          ...previous,
          stats: {
            totalTasks,
            completedTasks,
            progress,
          },
        };
      }
    );
  };

  /*
   * ------------------------------------------------------------
   * Refresh Project Stats
   * ------------------------------------------------------------
   */

  const refreshProjectStats =
    async (
      projectId: string
    ) => {
      try {
        const response =
          await getProjectApi(
            projectId
          );

        const updatedProject =
          response.data;

        setSelectedProject(
          (previous) => {
            if (!previous) {
              return updatedProject;
            }

            return {
              ...previous,
              stats:
                calculateStats(
                  updatedProject.tasks
                ),
            };
          }
        );

        setProjects(
          (previous) =>
            previous.map(
              (project) =>
                project.id === projectId
                  ? {
                      ...project,
                      stats:
                        calculateStats(
                          updatedProject.tasks
                        ),
                    }
                  : project
            )
        );
      } catch (error) {
        console.log(
          "Project refresh failed",
          error
        );
      }
    };

  /*
   * ------------------------------------------------------------
   * Load Tasks
   * ------------------------------------------------------------
   */

  const loadTasks =
    useCallback(
      async (
        projectId: string
      ) => {
        try {
          setTasksLoading(true);

          const response =
            await getProjectTasksApi(
              projectId
            );

          const mappedTasks =
            mapTasks(
              response.data
            );

          const visibleTasks =
            mappedTasks.filter(
              (task) =>
                !deletedTaskIds.includes(
                  task.id
                )
            );

          setTasks(
            visibleTasks
          );
        } catch (error) {
          console.log(error);
        } finally {
          setTasksLoading(false);
        }
      },
      [deletedTaskIds]
    );

  /*
   * ------------------------------------------------------------
   * Refresh Everything
   * ------------------------------------------------------------
   */

  const refreshCurrentProject =
    async () => {
      if (!selectedProject) {
        return;
      }

      await loadTasks(
        selectedProject.id
      );

      await refreshProjectStats(
        selectedProject.id
      );
    };

  /*
   * ------------------------------------------------------------
   * Effects
   * ------------------------------------------------------------
   */

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    if (selectedProject) {
      loadTasks(
        selectedProject.id
      );
    } else {
      setTasks([]);
    }
  }, [
    selectedProject,
    loadTasks,
  ]);

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

function calculateStats(
  tasks: any[]
) {
  const totalTasks =
    tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "COMPLETED"
    ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (
            completedTasks /
            totalTasks
          ) * 100
        );

  return {
    totalTasks,
    completedTasks,
    progress,
  };
}
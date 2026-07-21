import api from "./axios";

import type {CreateTaskPayload, UpdateTaskPayload} from "@/interfaces/task.api";

export const getProjectTasksApi = async (
  projectId: string
) => {

  const response =
    await api.get(
      `/api/tasks/project/${projectId}`
    );

  return response.data;

};



export const getTaskApi = async (
  taskId: string
) => {

  const response =
    await api.get(
      `/api/tasks/${taskId}`
    );

  return response.data;

};

const statusMap = {
  todo: "TODO",
  progress: "PROGRESS",
  review: "REVIEW",
  completed: "COMPLETED",
} as const;

const priorityMap = {
  High: "HIGH",
  Medium: "MEDIUM",
  Low: "LOW",
} as const;

export const createTaskApi = async (
  task: CreateTaskPayload & {
    projectId: string;
    assigneeId?: string;
  }
) => {

  const response =
    await api.post("/api/tasks", {
      ...task,

      status: statusMap[task.status],

      priority: priorityMap[task.priority],
    });

  return response.data;

};



export const updateTaskApi = async (
  taskId: string,
  task: UpdateTaskPayload
) => {

  const response =
    await api.patch(`/api/tasks/${taskId}`, {
      ...task,
        
      status:
        task.status
          ? statusMap[task.status]
          : undefined,
        
      priority:
        task.priority
          ? priorityMap[task.priority]
          : undefined,
    });

  return response.data;

};



export const deleteTaskApi = async (
  taskId: string
) => {

  const response =
    await api.delete(
      `/api/tasks/${taskId}`
    );

  return response.data;

};
import api from "./axios";

import type { CreateTaskPayload, UpdateTaskPayload} from "@/interfaces/task.api";
import { mapTask } from "@/mappers/task.mapper";

// --------------------------------------------------------------------------
// Get all tasks of a project
// --------------------------------------------------------------------------

export const getProjectTasksApi = async (
  projectId: string
) => {
  const response = await api.get(
    `/api/tasks/project/${projectId}`
  );

  return response.data;
};

// --------------------------------------------------------------------------
// Get single task
// --------------------------------------------------------------------------

export const getTaskApi = async (
  taskId: string
) => {
  const response = await api.get(
    `/api/tasks/${taskId}`
  );

  return {
    success: response.data.success,
    data: mapTask(response.data.data),
  };
};

// --------------------------------------------------------------------------
// Backend status mapping
// --------------------------------------------------------------------------

const statusMap = {
  todo: "TODO",
  progress: "PROGRESS",
  review: "REVIEW",
  completed: "COMPLETED",
} as const;

// --------------------------------------------------------------------------
// Backend priority mapping
// --------------------------------------------------------------------------

const priorityMap = {
  High: "HIGH",
  Medium: "MEDIUM",
  Low: "LOW",
} as const;

// --------------------------------------------------------------------------
// Create task
// --------------------------------------------------------------------------

export const createTaskApi = async (
  task: CreateTaskPayload & {
    projectId: string;
    assigneeId?: string;
  }
) => {
  const response = await api.post(
    "/api/tasks",
    {
      ...task,

      status: statusMap[task.status],

      priority: priorityMap[task.priority],
    }
  );

  return response.data;
};

// --------------------------------------------------------------------------
// Update task
// --------------------------------------------------------------------------

export const updateTaskApi = async (
  taskId: string,
  task: UpdateTaskPayload
) => {
  const response = await api.patch(
    `/api/tasks/${taskId}`,
    {
      ...task,

      status: task.status
        ? statusMap[task.status]
        : undefined,

      priority: task.priority
        ? priorityMap[task.priority]
        : undefined,
    }
  );

  return response.data;
};

// ==========================================================================
// RECYCLE BIN
// ==========================================================================


export const moveTaskToRecycleBinApi = async (
  taskId: string
) => {
  const response = await api.patch(
    `/api/tasks/${taskId}/trash`
  );

  return response.data;
};

// --------------------------------------------------------------------------
// Restore task from recycle bin
// --------------------------------------------------------------------------

export const restoreTaskApi = async (
  taskId: string
) => {
  const response = await api.patch(
    `/api/tasks/${taskId}/restore`
  );

  return response.data;
};


export const permanentlyDeleteTaskApi = async (
  taskId: string
) => {
  const response = await api.delete(
    `/api/tasks/${taskId}/permanent`
  );

  return response.data;
};

// ==========================================================================
// ATTACHMENTS
// ==========================================================================

// --------------------------------------------------------------------------
// Upload task attachment
// --------------------------------------------------------------------------

export const uploadTaskAttachmentApi = async (
  taskId: string,
  file: File
) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    `/api/tasks/${taskId}/attachments`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// --------------------------------------------------------------------------
// Delete task attachment
// --------------------------------------------------------------------------

export const deleteTaskAttachmentApi = async (
  taskId: string,
  attachmentId: string
) => {
  const response = await api.delete(
    `/api/tasks/${taskId}/attachments/${attachmentId}`
  );

  return response.data;
};

// ==========================================================================
// COMMENTS
// ==========================================================================

// --------------------------------------------------------------------------
// Create task comment
// --------------------------------------------------------------------------

export const createTaskCommentApi = async (
  taskId: string,
  text: string
) => {
  const response = await api.post(
    `/api/tasks/${taskId}/comments`,
    {
      text,
    }
  );

  return response.data;
};
import api from "./axios";

export const getProjectsApi = async () => {
  const response = await api.get("/api/projects");

  return response.data;
};

export const getProjectApi = async (
  projectId: string
) => {
  const response = await api.get(
    `/api/projects/${projectId}`
  );

  return response.data;
};

export const createProjectApi = async (
  data: {
    name: string;
    description?: string;
  }
) => {
  const response = await api.post(
    "/api/projects",
    data
  );

  return response.data;
};

export const updateProjectApi = async (
  projectId: string,
  data: {
    name?: string;
    description?: string;
  }
) => {
  const response = await api.patch(
    `/api/projects/${projectId}`,
    data
  );

  return response.data;
};

/**
 * Move project to recycle bin.
 *
 * IMPORTANT:
 * This should be a SOFT DELETE.
 */
export const moveProjectToRecycleBinApi = async (
  projectId: string
) => {
  const response = await api.patch(
    `/api/projects/${projectId}/trash`
  );

  return response.data;
};

/**
 * Restore project from recycle bin.
 */
export const restoreProjectApi = async (
  projectId: string
) => {
  const response = await api.patch(
    `/api/projects/${projectId}/restore`
  );

  return response.data;
};

/**
 * Permanently delete project.
 */
export const permanentlyDeleteProjectApi = async (
  projectId: string
) => {
  const response = await api.delete(
    `/api/projects/${projectId}/permanent`
  );

  return response.data;
};
import api from "./axios";

// --------------------------------------------------------------------------
// Get all projects
// --------------------------------------------------------------------------

export const getProjectsApi = async () => {
  const response = await api.get("/api/projects");

  return response.data;
};

// --------------------------------------------------------------------------
// Get single project
// --------------------------------------------------------------------------

export const getProjectApi = async (
  projectId: string
) => {
  const response = await api.get(
    `/api/projects/${projectId}`
  );

  return response.data;
};

// --------------------------------------------------------------------------
// Create project
// --------------------------------------------------------------------------

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

// --------------------------------------------------------------------------
// Update project
// --------------------------------------------------------------------------

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

// ==========================================================================
// RECYCLE BIN
// ==========================================================================


export const moveProjectToRecycleBinApi = async (
  projectId: string
) => {
  const response = await api.patch(
    `/api/projects/${projectId}/trash`
  );

  return response.data;
};

// --------------------------------------------------------------------------
// Restore project from recycle bin
// --------------------------------------------------------------------------

export const restoreProjectApi = async (
  projectId: string
) => {
  const response = await api.patch(
    `/api/projects/${projectId}/restore`
  );

  return response.data;
};

// Permanently delete project

export const permanentlyDeleteProjectApi = async (
  projectId: string
) => {
  const response = await api.delete(
    `/api/projects/${projectId}/permanent`
  );

  return response.data;
};
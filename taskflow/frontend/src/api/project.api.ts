import api from "./axios";

export const getProjectsApi = async () => {

  const response =
    await api.get("/api/projects");
  return response.data;
};

export const getProjectApi = async (
  projectId: string
) => {
  const response =
    await api.get(
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

  const response =
    await api.post(
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
  const response =
    await api.patch(
      `/api/projects/${projectId}`,
      data
    );

  return response.data;
};

export const deleteProjectApi = async (
  projectId: string
) => {
  const response =
    await api.delete(
      `/api/projects/${projectId}`
    );

  return response.data;
};
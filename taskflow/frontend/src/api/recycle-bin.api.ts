import api from "./axios";

export interface RecycleBinTaskAssignee {
  id: string;
  name: string;
  avatar: string | null;
}

export interface RecycleBinProjectTask {
  id: string;
  title: string;
  description: string | null;
  status: "TODO" | "PROGRESS" | "REVIEW" | "COMPLETED";
  priority: "HIGH" | "MEDIUM" | "LOW";
  dueDate: string | null;
  deletedAt: string | null;
  assignee: RecycleBinTaskAssignee | null;
}

export interface RecycleBinProject {
  id: string;
  name: string;
  description: string | null;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  tasks: RecycleBinProjectTask[];
}

export interface RecycleBinTask {
  id: string;
  title: string;
  description: string | null;
  status: "TODO" | "PROGRESS" | "REVIEW" | "COMPLETED";
  priority: "HIGH" | "MEDIUM" | "LOW";
  dueDate: string | null;
  deletedAt: string;
  project: {
    id: string;
    name: string;
  };
  assignee: RecycleBinTaskAssignee | null;
}

export interface RecycleBinData {
  projects: RecycleBinProject[];
  tasks: RecycleBinTask[];
}

interface RecycleBinResponse {
  success: boolean;
  data: RecycleBinData;
}

// --------------------------------------------------------------------------
// Get Recycle Bin
// --------------------------------------------------------------------------

export const getRecycleBinApi = async (): Promise<RecycleBinData> => {
  const response = await api.get<RecycleBinResponse>(
    "/api/recycle-bin"
  );

  return response.data.data;
};
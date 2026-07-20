export interface CreateTaskPayload {

  title: string;

  description?: string;

  status:
    | "todo"
    | "progress"
    | "review"
    | "completed";

  priority:
    | "High"
    | "Medium"
    | "Low";

  dueDate?: string;

  progress?: number;

  reviewStatus?: string;

  projectId: string;

  assigneeId?: string;

}


export interface UpdateTaskPayload {

  title?: string;

  description?: string;

  status?:
    | "todo"
    | "progress"
    | "review"
    | "completed";

  priority?:
    | "High"
    | "Medium"
    | "Low";

  dueDate?: string;

  progress?: number;

  reviewStatus?: string;

  assigneeId?: string;

}
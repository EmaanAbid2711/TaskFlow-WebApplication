import type { Task } from "@/interfaces/projects";

/*
|--------------------------------------------------------------------------
| Backend Task
|--------------------------------------------------------------------------
*/

interface BackendTask {
  id: string;
  title: string;
  description: string | null;

  status:
    | "TODO"
    | "PROGRESS"
    | "REVIEW"
    | "COMPLETED";

  priority:
    | "HIGH"
    | "MEDIUM"
    | "LOW";

  dueDate: string | null;

  progress: number | null;

  reviewStatus: string | null;

  assignee?: {
    id: string;
    name: string;
    avatar: string | null;
  } | null;

  attachments?: {
    id: string;
    fileName: string;
    fileSize: string;
    fileType: string;
    fileUrl: string;
  }[];

  activities?: {
    id: string;
    type: string;
    message: string;
    createdAt: string;
    user?: {
      name: string;
      avatar: string | null;
    };
  }[];
}

/*
|--------------------------------------------------------------------------
| Status Mapper
|--------------------------------------------------------------------------
*/

function mapStatus(
  status: BackendTask["status"]
): Task["status"] {

  switch (status) {

    case "TODO":
      return "todo";

    case "PROGRESS":
      return "progress";

    case "REVIEW":
      return "review";

    case "COMPLETED":
      return "completed";
  }
}

/*
|--------------------------------------------------------------------------
| Priority Mapper
|--------------------------------------------------------------------------
*/

function mapPriority(
  priority: BackendTask["priority"]
): Task["priority"] {

  switch (priority) {

    case "HIGH":
      return "High";

    case "MEDIUM":
      return "Medium";

    case "LOW":
      return "Low";
  }
}

/*
|--------------------------------------------------------------------------
| Task Mapper
|--------------------------------------------------------------------------
*/

export function mapTask(
  task: BackendTask
): Task {

  return {

    id: task.id,

    title: task.title,

    description:
      task.description ?? "",

    status:
      mapStatus(task.status),

    priority:
      mapPriority(task.priority),

    dueDate:
      task.dueDate ?? "",

    progress:
      task.progress ?? 0,

    reviewStatus:
      task.reviewStatus ?? "",

    assignee: {

      id:
        task.assignee?.id ?? "",

      name:
        task.assignee?.name ?? "",

      avatar:
        task.assignee?.avatar ?? "",

    },

    attachments:
      (task.attachments ?? []).map(file => ({

        id: file.id,

        name: file.fileName,

        size: file.fileSize,

        type:
          file.fileType.startsWith("image")
            ? "image"
            : "pdf",
        
        url: file.fileUrl,

      })),

    activities:
      (task.activities ?? []).map(activity => ({

        id: activity.id,

        type:
          activity.type === "comment"
            ? "comment"
            : "system",

        user:
          activity.user?.name,

        avatar:
          activity.user?.avatar ?? undefined,

        text:
          activity.message,

        time:
          new Date(
            activity.createdAt
          ).toLocaleString(),

      })),

  };

}

/*
|--------------------------------------------------------------------------
| Task List Mapper
|--------------------------------------------------------------------------
*/

export function mapTasks(
  tasks: BackendTask[]
): Task[] {

  return tasks.map(mapTask);

}
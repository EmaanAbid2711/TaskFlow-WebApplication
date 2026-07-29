import type { Task, Activity } from "@/interfaces/projects";

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
  project?: {
    id: string;
    name: string;
  };
  task?: {
    id: string;
    title: string;
  };
}[];

  comments?: {
  id: string;
  text: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar: string | null;
  };
  project?: {
    id: string;
    name: string;
  };
  task?: {
    id: string;
    title: string;
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

  const systemActivities: Activity[] =
  (task.activities ?? []).map((activity): Activity => ({
    id: activity.id,
    type: "system",
    user: activity.user?.name,
    avatar: activity.user?.avatar ?? undefined,
    text: activity.message,
    time: activity.createdAt,

    projectId: activity.project?.id ?? "",
    projectName: activity.project?.name ?? "",

    taskId: activity.task?.id ?? task.id,
    taskTitle: activity.task?.title ?? task.title,
  }));

  const commentActivities: Activity[] =
  (task.comments ?? []).map((comment): Activity => ({
    id: comment.id,
    type: "comment",
    user: comment.user.name,
    avatar: comment.user.avatar ?? undefined,
    text: comment.text,
    time: comment.createdAt,

    projectId: comment.project?.id ?? "",
    projectName: comment.project?.name ?? "",

    taskId: comment.task?.id ?? task.id,
    taskTitle: comment.task?.title ?? task.title,
  }));

  const activities: Activity[] = [
    ...systemActivities,
    ...commentActivities,
  ].sort(
    (a, b) =>
      new Date(a.time).getTime() -
      new Date(b.time).getTime()
  );

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
        url: `${import.meta.env.VITE_API_URL}${file.fileUrl}`,
      })),

    activities,
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
export interface Assignee {
  name: string;
  avatar: string;
}

export interface Attachment {
  id: number;
  name: string;
  size: string;
  type: "pdf" | "image";
}

export interface Activity {
  id: number;
  type: "system" | "comment";
  user?: string;
  avatar?: string;
  text: string;
  time: string;
}

export interface TaskDetails {
  id: string;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Review" | "Completed";
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  assignee: Assignee;
  attachments: Attachment[];
  activities: Activity[];
}
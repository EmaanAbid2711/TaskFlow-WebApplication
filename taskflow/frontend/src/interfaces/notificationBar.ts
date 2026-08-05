export interface NotificationBar {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  projectId?: string | null;
  taskId?: string | null;
  sender?: {
    id: string;
    name: string;
    avatar?: string | null;
  } | null;

  invitation?: {
    id: string;
    senderId: string;
    receiverId: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
  } | null;
}
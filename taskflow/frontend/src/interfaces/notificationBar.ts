 export interface NotificationBar {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  projectId?: string | null;
  taskId?: string | null;
}
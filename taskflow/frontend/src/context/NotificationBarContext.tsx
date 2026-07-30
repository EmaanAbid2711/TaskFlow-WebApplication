import { createContext, useContext, useEffect, useState } from "react";

import type { Notification } from "@/interfaces/notificationBar";
import { getNotificationsBarService, markNotificationBarReadService} from "@/services/notificationBar.service";

interface NotificationBarContextType {
  notifications: Notification[];
  unreadCount: number;
  refreshNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationBarContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const refreshNotifications = async () => {
    try {
      const data = await getNotificationsBarService();
      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  refreshNotifications();
  const interval = setInterval(
    refreshNotifications,
    30000
  );
  return () => clearInterval(interval);
}, []);


  const markAsRead = async (id: string) => {
    await markNotificationBarReadService(id);
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        refreshNotifications,
        markAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used inside NotificationProvider");
  }
  return context;
}
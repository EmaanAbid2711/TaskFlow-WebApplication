import {createContext, useContext, useEffect, useState, useCallback} from "react";

import type { NotificationBar } from "@/interfaces/notificationBar";
import { getNotificationBarService, getUnreadNotificationBarCountService, markNotificationBarReadService, markAllNotificationBarReadService, deleteNotificationBarService} from "@/services/notificationBar.service";

interface NotificationBarContextType {
  notifications: NotificationBar[];
  unreadCount: number;
  loading: boolean;
  refreshNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

const NotificationBarContext = createContext<NotificationBarContextType | null>(
  null
);

export function NotificationBarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<NotificationBar[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  //---------------------------------------------------
  // Refresh
  //---------------------------------------------------
  const refreshNotifications = useCallback(async () => {
    try {
      const [notificationData, unread] = await Promise.all([
        getNotificationBarService(),
        getUnreadNotificationBarCountService(),
      ]);

      setNotifications(notificationData);
      setUnreadCount(unread);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  //---------------------------------------------------
  // Initial Load
  //---------------------------------------------------
  useEffect(() => {
    refreshNotifications();
  }, [refreshNotifications]);

  //---------------------------------------------------
  // Poll every 30 seconds
  //---------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      refreshNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshNotifications]);

  //---------------------------------------------------
  // Mark One Read
  //---------------------------------------------------
  const markAsRead = async (id: string) => {
    await markNotificationBarReadService(id);

    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );

    setUnreadCount((previous) => Math.max(previous - 1, 0));
  };

  //---------------------------------------------------
  // Mark All
  //---------------------------------------------------
  const markAllAsRead = async () => {
    await markAllNotificationBarReadService();

    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );

    setUnreadCount(0);
  };

  //---------------------------------------------------
  // Delete
  //---------------------------------------------------
  const deleteNotification = async (id: string) => {
    const notification = notifications.find((n) => n.id === id);

    await deleteNotificationBarService(id);

    setNotifications((previous) => previous.filter((n) => n.id !== id));

    if (notification && !notification.isRead) {
      setUnreadCount((previous) => Math.max(previous - 1, 0));
    }
  };

  return (
    <NotificationBarContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        refreshNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationBarContext.Provider>
  );
}

export function useNotificationBar() {
  const context = useContext(NotificationBarContext);

  if (!context) {
    throw new Error(
      "useNotificationBar must be used inside NotificationBarProvider"
    );
  }

  return context;
}
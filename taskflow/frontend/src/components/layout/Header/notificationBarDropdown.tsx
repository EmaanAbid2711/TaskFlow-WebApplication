import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useNotificationBar } from "@/context/NotificationBarContext";

interface Props {
  closeDropdown: () => void;
}

function NotificationBarDropdown({ closeDropdown }: Props) {
  const navigate = useNavigate();
  const {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotificationBar();

  //----------------------------------------------------
  // Open Notification
  //----------------------------------------------------
  const openNotification = async (
    id: string,
    projectId?: string | null,
    taskId?: string | null
  ) => {
    await markAsRead(id);
    closeDropdown();

    if (projectId && taskId) {
      navigate(`/projects?project=${projectId}&task=${taskId}`);
    }
  };

  //----------------------------------------------------
  return (
    <div className="absolute right-0 z-50 mt-3 w-[380px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h3 className="text-base font-semibold text-slate-800">
            Notifications
          </h3>
          <p className="text-xs text-slate-500">Recent activity</p>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-[#0052cc] transition hover:bg-blue-50"
          >
            <CheckCheck size={15} />
            Mark all
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="p-8 text-center text-sm text-slate-400">
          Loading notifications...
        </div>
      )}

      {/* Empty */}
      {!loading && notifications.length === 0 && (
        <div className="flex flex-col items-center gap-3 p-10">
          <Bell size={40} className="text-slate-300" />
          <p className="text-sm text-slate-500">You're all caught up.</p>
        </div>
      )}

      {/* List */}
      {!loading && notifications.length > 0 && (
        <div className="max-h-[420px] overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`group flex gap-3 border-b border-slate-100 px-5 py-4 transition ${
                notification.isRead ? "bg-white" : "bg-blue-50"
              } hover:bg-slate-50`}
            >
              {/* Blue Dot */}
              <div className="pt-2">
                {!notification.isRead && (
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                )}
              </div>

              {/* Content */}
              <button
                onClick={() =>
                  openNotification(
                    notification.id,
                    notification.projectId,
                    notification.taskId
                  )
                }
                className="flex-1 text-left"
              >
                <p className="font-medium text-slate-800">
                  {notification.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {notification.message}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </button>

              {/* Delete */}
              <button
                onClick={() => deleteNotification(notification.id)}
                className="opacity-0 transition group-hover:opacity-100"
              >
                <Trash2
                  size={16}
                  className="text-slate-400 hover:text-red-500"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationBarDropdown;
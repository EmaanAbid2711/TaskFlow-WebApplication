import { useNotifications } from "@/context/NotificationBarContext";

function NotificationDropdown() {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div className="absolute right-0 mt-3 w-96 rounded-xl border bg-white shadow-xl">
      <div className="border-b p-4">
        <h3 className="font-semibold">Notifications</h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="p-6 text-center text-slate-400">No notifications</p>
        ) : (
          notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`w-full border-b p-4 text-left hover:bg-slate-50 ${
                !notification.isRead ? "bg-blue-50" : ""
              }`}
            >
              <p className="font-medium">{notification.title}</p>
              <p className="text-sm text-slate-500">{notification.message}</p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationDropdown;
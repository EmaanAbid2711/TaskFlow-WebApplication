import { Bell, CheckCheck, Trash2, Loader2, CheckCircle2, XCircle} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate, } from "react-router-dom";
import { useState } from "react";

import { useNotificationBar } from "@/context/NotificationBarContext";
import {acceptInvitationService, rejectInvitationService} from "@/services/notificationBar.service";

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
    refreshNotifications,
  } = useNotificationBar();

  const [processingInvitation, setProcessingInvitation] =
  useState<string | null>(null);

  const acceptInvitation = async (
  notification: any
) => {
  if (!notification.invitationId) return;
  try {
    setProcessingInvitation(notification.id);
    await acceptInvitationService(
      notification.invitationId
    );
    await markAsRead(notification.id);
    await refreshNotifications();
  } finally {
    setProcessingInvitation(null);
  }
};

const rejectInvitation = async (
  notification: any
) => {
  if (!notification.invitationId) return;
  try {
    setProcessingInvitation(notification.id);
    await rejectInvitationService(
      notification.invitationId
    );
    await markAsRead(notification.id);
    await refreshNotifications();
  } finally {
    setProcessingInvitation(null);
  }
};

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
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  {notification.sender?.avatar ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}${notification.sender.avatar}`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                  
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0052cc] font-semibold text-white">
                    
                      {notification.sender?.name
                        ?.split(" ")
                        .map((word: string) => word[0])
                        .join("")
                        .slice(0,2)
                        .toUpperCase()}
                    </div>
                  )}
              
                  <div>
                    <p className="font-medium">
                      {notification.title}
                    </p>
                
                    <p className="text-sm text-slate-500">
                      {notification.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {formatDistanceToNow(
                        new Date(notification.createdAt),
                        {
                          addSuffix:true,
                        }
                      )}
                    </p>
                  </div>
                </div>
                    
                {/* Invitation buttons */}
                {notification.type === "TEAM_INVITATION" &&
                  notification.invitation?.id && (
                  
                    <>
                      {notification.invitation.status === "PENDING" ? (
                      
                        <div className="mt-4 flex gap-2">
                        
                          <button
                            disabled={
                              processingInvitation === notification.id
                            }
                            onClick={() =>
                              acceptInvitation(notification)
                            }
                            className="flex items-center gap-2 rounded-lg bg-[#0052cc] px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {processingInvitation === notification.id && (
                              <Loader2
                                size={15}
                                className="animate-spin"
                              />
                            )}
                
                            Accept
                          </button>
                          
                          <button
                            disabled={
                              processingInvitation === notification.id
                            }
                            onClick={() =>
                              rejectInvitation(notification)
                            }
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Reject
                          </button>
                          
                        </div>
                
                      ) : notification.invitation.status === "ACCEPTED" ? (
                      
                        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                          <CheckCircle2 size={16} />
                          Invitation Accepted
                        </div>
                
                      ) : (
                      
                        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                          <XCircle size={16} />
                          Invitation Rejected
                        </div>
                
                      )}
                    </>
                )}
              
                {notification.type !== "TEAM_INVITATION" && (
                
                  <button
                    onClick={() =>
                      openNotification(
                        notification.id,
                        notification.projectId,
                        notification.taskId
                      )
                    }
                    className="mt-3 text-sm font-medium text-[#0052cc]"
                  >
                    Open
                  </button>
                )}
              </div>

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
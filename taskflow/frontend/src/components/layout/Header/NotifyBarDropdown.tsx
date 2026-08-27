import {
  Bell,
  CheckCheck,
  Trash2,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useNotificationBar } from "@/context/NotificationBarContext";

import {
  acceptInvitationService,
  rejectInvitationService,
} from "@/services/notificationBar.service";

interface Props {
  closeDropdown: () => void;
}

function NotificationBarDropdown({
  closeDropdown,
}: Props) {
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

  //----------------------------------------------------
  // Accept invitation
  //----------------------------------------------------

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

  //----------------------------------------------------
  // Reject invitation
  //----------------------------------------------------

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
  // Open notification
  //----------------------------------------------------

  const openNotification = async (
    notification: any
  ) => {
    await markAsRead(notification.id);

    closeDropdown();

    if (
      notification.type === "TEAM_INVITATION" ||
      notification.type ===
        "TEAM_INVITATION_ACCEPTED" ||
      notification.type ===
        "TEAM_INVITATION_REJECTED"
    ) {
      navigate("/team");
      return;
    }

    if (
      notification.projectId &&
      notification.taskId
    ) {
      navigate(
        `/projects?project=${notification.projectId}&task=${notification.taskId}`
      );
    }
  };

  //----------------------------------------------------
  // Render
  //----------------------------------------------------

  return (
    <div
      className="
        fixed
        left-2
        right-2
        top-[76px]
        z-[100]
        w-auto
        max-w-none
      
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-2xl
      
        sm:absolute
        sm:left-auto
        sm:right-0
        sm:top-full
        sm:mt-3
        sm:w-[380px]
        sm:max-w-[380px]
      "
    >
      {/* Header */}
      <div
        className="
          flex
          items-center
          justify-between
          gap-3
          border-b
          border-slate-200
          px-4
          py-4
          sm:px-5
        "
      >
        {/* Title */}
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-slate-800">
            Notifications
          </h3>

          <p className="text-xs text-slate-500">
            Recent activity
          </p>
        </div>

        {/* Mark all */}
        {notifications.length > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="
              flex
              shrink-0
              items-center
              gap-1
              rounded-lg
              px-2
              py-1
              text-xs
              font-medium
              text-[#0052cc]
              transition
              hover:bg-blue-50
            "
          >
            <CheckCheck size={15} />

            <span className="hidden xs:inline sm:inline">
              Mark all
            </span>
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
      {!loading &&
        notifications.length === 0 && (
          <div className="flex flex-col items-center gap-3 p-10">
            <Bell
              size={40}
              className="text-slate-300"
            />

            <p className="text-center text-sm text-slate-500">
              You're all caught up.
            </p>
          </div>
        )}

      {/* Notification List */}
      {!loading &&
        notifications.length > 0 && (
          <div
            className="
              max-h-[min(70vh,420px)]
              overflow-x-hidden
              overflow-y-auto
            "
          >
            {notifications.map(
              (notification) => (
                <div
                  key={notification.id}
                  className={`
                    group
                    flex
                    min-w-0
                    gap-2
                    border-b
                    border-slate-100
                    px-3
                    py-4
                    transition

                    sm:gap-3
                    sm:px-5

                    ${
                      notification.isRead
                        ? "bg-white"
                        : "bg-blue-50"
                    }

                    hover:bg-slate-50
                  `}
                >
                  {/* Blue Dot */}
                  <div className="w-2 shrink-0 pt-2">
                    {!notification.isRead && (
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    {/* Sender + notification text */}
                    <div
                      className="
                        flex
                        min-w-0
                        items-start
                        gap-2
                        sm:gap-3
                      "
                    >
                      {/* Avatar */}
                      <div className="shrink-0">
                        {notification.sender
                          ?.avatar ? (
                          <img
                            src={`${
                              import.meta
                                .env
                                .VITE_API_URL
                            }${
                              notification
                                .sender
                                .avatar
                            }`}
                            alt={
                              notification
                                .sender
                                ?.name ??
                              "User"
                            }
                            className="
                              h-9
                              w-9
                              rounded-full
                              object-cover
                              sm:h-10
                              sm:w-10
                            "
                          />
                        ) : (
                          <div
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-full
                              bg-[#0052cc]
                              text-xs
                              font-semibold
                              text-white
                              sm:h-10
                              sm:w-10
                              sm:text-sm
                            "
                          >
                            {notification.sender?.name
                              ?.split(" ")
                              .map(
                                (
                                  word: string
                                ) =>
                                  word[0]
                              )
                              .join("")
                              .slice(
                                0,
                                2
                              )
                              .toUpperCase()}
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <p
                          className="
                            break-words
                            text-sm
                            font-medium
                            text-slate-800
                          "
                        >
                          {
                            notification.title
                          }
                        </p>

                        <p
                          className="
                            mt-0.5
                            break-words
                            text-sm
                            leading-5
                            text-slate-500
                          "
                        >
                          {
                            notification.message
                          }
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            text-slate-400
                          "
                        >
                          {formatDistanceToNow(
                            new Date(
                              notification.createdAt
                            ),
                            {
                              addSuffix:
                                true,
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Invitation Buttons */}
                    {notification.type ===
                      "TEAM_INVITATION" &&
                      notification.invitation
                        ?.id && (
                        <>
                          {notification
                            .invitation
                            .status ===
                          "PENDING" ? (
                            <div
                              className="
                                mt-4
                                flex
                                flex-wrap
                                gap-2
                              "
                            >
                              {/* Accept */}
                              <button
                                type="button"
                                disabled={
                                  processingInvitation ===
                                  notification.id
                                }
                                onClick={() =>
                                  acceptInvitation(
                                    notification
                                  )
                                }
                                className="
                                  flex
                                  min-w-[90px]
                                  flex-1
                                  items-center
                                  justify-center
                                  gap-2
                                  rounded-lg
                                  bg-[#0052cc]
                                  px-3
                                  py-2
                                  text-sm
                                  text-white
                                  transition
                                  hover:bg-[#0047b3]
                                  disabled:cursor-not-allowed
                                  disabled:opacity-60
                                  sm:flex-none
                                  sm:px-4
                                "
                              >
                                {processingInvitation ===
                                  notification.id && (
                                  <Loader2
                                    size={15}
                                    className="animate-spin"
                                  />
                                )}

                                Accept
                              </button>

                              {/* Reject */}
                              <button
                                type="button"
                                disabled={
                                  processingInvitation ===
                                  notification.id
                                }
                                onClick={() =>
                                  rejectInvitation(
                                    notification
                                  )
                                }
                                className="
                                  min-w-[90px]
                                  flex-1
                                  rounded-lg
                                  border
                                  border-slate-300
                                  px-3
                                  py-2
                                  text-sm
                                  transition
                                  hover:bg-slate-100
                                  disabled:cursor-not-allowed
                                  disabled:opacity-60
                                  sm:flex-none
                                  sm:px-4
                                "
                              >
                                Reject
                              </button>
                            </div>
                          ) : notification
                              .invitation
                              .status ===
                            "ACCEPTED" ? (
                            <div
                              className="
                                mt-4
                                inline-flex
                                max-w-full
                                items-center
                                gap-2
                                rounded-full
                                bg-green-100
                                px-3
                                py-1
                                text-xs
                                font-medium
                                text-green-700
                                sm:text-sm
                              "
                            >
                              <CheckCircle2
                                size={16}
                                className="shrink-0"
                              />

                              <span className="truncate">
                                Invitation
                                Accepted
                              </span>
                            </div>
                          ) : (
                            <div
                              className="
                                mt-4
                                inline-flex
                                max-w-full
                                items-center
                                gap-2
                                rounded-full
                                bg-red-100
                                px-3
                                py-1
                                text-xs
                                font-medium
                                text-red-700
                                sm:text-sm
                              "
                            >
                              <XCircle
                                size={16}
                                className="shrink-0"
                              />

                              <span className="truncate">
                                Invitation
                                Rejected
                              </span>
                            </div>
                          )}
                        </>
                      )}

                    {/* Open Button */}
                    {notification.type !==
                      "TEAM_INVITATION" && (
                      <button
                        type="button"
                        onClick={() =>
                          openNotification(
                            notification
                          )
                        }
                        className="
                          mt-3
                          text-sm
                          font-medium
                          text-[#0052cc]
                          hover:underline
                        "
                      >
                        Open
                      </button>
                    )}
                  </div>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() =>
                      deleteNotification(
                        notification.id
                      )
                    }
                    aria-label="Delete notification"
                    className="
                      shrink-0
                      self-start
                      rounded-lg
                      p-1
                      opacity-100
                      transition
                      hover:bg-red-50
                      sm:opacity-0
                      sm:group-hover:opacity-100
                    "
                  >
                    <Trash2
                      size={16}
                      className="
                        text-slate-400
                        transition
                        hover:text-red-500
                      "
                    />
                  </button>
                </div>
              )
            )}
          </div>
        )}
    </div>
  );
}

export default NotificationBarDropdown;
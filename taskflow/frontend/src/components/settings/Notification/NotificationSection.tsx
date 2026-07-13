import {useEffect, useMemo, useState} from "react";
import {Bell, Mail,} from "lucide-react";
import { toast } from "sonner";

import NotificationToggle from "./NotificationToggle";
import type {NotificationSettings} from "@/interfaces/notification";

import {getNotificationsService, updateNotificationsService} from "@/services/notification.service";

function NotificationSection() {
  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [
    notifications,
    setNotifications,
  ] =
    useState<NotificationSettings | null>(
      null
    );

  const [
    initialNotifications,
    setInitialNotifications,
  ] =
    useState<NotificationSettings | null>(
      null
    );

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications =
    async () => {
      try {
        setLoading(true);

        const response =
          await getNotificationsService();

        setNotifications(
          response.data
        );

        setInitialNotifications(
          response.data
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load notification settings."
        );
      } finally {
        setLoading(false);
      }
    };

  const handleToggle = (
    key: keyof NotificationSettings
  ) => {
    if (!notifications) {
      return;
    }

    setNotifications({
      ...notifications,
      [key]:
        !notifications[key],
    });
  };

  const handleSave =
    async () => {
      if (!notifications) {
        return;
      }

      try {
        setSaving(true);

        const response =
          await updateNotificationsService(
            notifications
          );

        setNotifications(
          response.data.data
        );

        setInitialNotifications(
          response.data.data
        );

        toast.success(
          "Notification settings updated."
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to update notification settings."
        );
      } finally {
        setSaving(false);
      }
    };

  const handleDiscard =
    () => {
      if (
        !initialNotifications
      ) {
        return;
      }

      setNotifications(
        initialNotifications
      );

      toast.success(
        "Changes discarded."
      );
    };

  const hasChanges =
    useMemo(() => {
      return (
        JSON.stringify(
          notifications
        ) !==
        JSON.stringify(
          initialNotifications
        )
      );
    }, [
      notifications,
      initialNotifications,
    ]);

  const rows = [
    {
      category: "Activity",
      items: [
        {
          title:
            "Task assigned to me",
          description:
            "When someone assigns a task to you",
          email:
            "taskAssignedEmail",
          push:
            "taskAssignedPush",
        },
        {
          title:
            "Comments on my tasks",
          description:
            "New comments on tasks you own",
          email:
            "commentsEmail",
          push:
            "commentsPush",
        },
        {
          title:
            "Due date reminders",
          description:
            "24h before a task is due",
          email:
            "remindersEmail",
          push:
            "remindersPush",
        },
        {
          title:
            "Task completed",
          description:
            "When a task in your project is completed",
          email:
            "completedEmail",
          push:
            "completedPush",
        },
      ],
    },

    {
      category: "Projects",
      items: [
        {
          title:
            "Project invitations",
          description:
            "When you are invited to a project",
          email:
            "invitationEmail",
          push:
            "invitationPush",
        },
        {
          title:
            "Project status updates",
          description:
            "Weekly digest of project activity",
          email:
            "statusEmail",
          push:
            "statusPush",
        },
        {
          title:
            "New project member",
          description:
            "When someone joins your project",
          email:
            "memberEmail",
          push:
            "memberPush",
        },
      ],
    },

    {
      category: "System",
      items: [
        {
          title:
            "Security alerts",
          description:
            "Login from a new device or location",
          email:
            "securityEmail",
          push:
            "securityPush",
        },
        {
          title:
            "Product updates",
          description:
            "New features and improvements",
          email:
            "productEmail",
          push:
            "productPush",
        },
      ],
    },
  ];

  if (
    loading ||
    !notifications
  ) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-slate-500">
          Loading notification settings...
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
      <div className="border-b border-slate-100 pb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Notifications
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Choose how and when
          TaskFlow notifies you
          about activity.
        </p>
      </div>

      <div className="mt-8">
        
        {/* Desktop Header */}
        <div className="mb-6 hidden grid-cols-12 text-xs font-semibold uppercase tracking-wider text-slate-400 md:grid">
          <div className="col-span-8" />

          <div className="col-span-2 flex items-center justify-center gap-1">
            <Mail size={16} />
            <span>Email</span>
          </div>

          <div className="col-span-2 flex items-center justify-center gap-1">
            <Bell size={16} />
            <span>Push</span>
          </div>
        </div>

        {rows.map((section) => (
          <div
            key={section.category}
            className="mb-10"
          >
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              {section.category}
            </h2>

            <div className="divide-y divide-slate-100 border-y border-slate-100">
              {section.items.map(
                (item) => (
                  <div
                    key={item.title}
                    className="
                      flex flex-col gap-4 py-5
                      md:grid md:grid-cols-12 md:items-center md:gap-0
                    "
                  >
                    {/* Text */}
                    <div className="md:col-span-8">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </h3>
                                  
                      <p className="mt-1 text-xs text-slate-400">
                        {item.description}
                      </p>
                    </div>
                                  
                    {/* Mobile + Desktop Toggles */}
                    <div
                      className="
                        flex items-center justify-between gap-6
                        md:col-span-4 md:justify-around
                      "
                    >
                      {/* Email */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-slate-500 md:hidden">
                          Email
                        </span>
                                  
                        <NotificationToggle
                          enabled={
                            notifications[
                              item.email as keyof NotificationSettings
                            ]
                          }
                          onToggle={() =>
                            handleToggle(
                              item.email as keyof NotificationSettings
                            )
                          }
                        />
                      </div>
                        
                      {/* Push */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-slate-500 md:hidden">
                          Push
                        </span>
                        
                        <NotificationToggle
                          enabled={
                            notifications[
                              item.push as keyof NotificationSettings
                            ]
                          }
                          onToggle={() =>
                            handleToggle(
                              item.push as keyof NotificationSettings
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-8">
          <button
            type="button"
            onClick={
              handleSave
            }
            disabled={
              !hasChanges ||
              saving
            }
            className="
              rounded-xl
              bg-[#0052cc]
              px-5
              py-3
              text-sm
              font-medium
              text-white
              shadow-sm
              transition
              hover:bg-[#0047b3]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={
              handleDiscard
            }
            disabled={
              !hasChanges
            }
            className="
              rounded-xl
              px-5
              py-3
              text-sm
              font-medium
              text-slate-500
              transition
              hover:bg-red-50
              hover:text-red-600
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Discard
          </button>
        </div>
      </div>
    </section>
  );
}

export default NotificationSection;
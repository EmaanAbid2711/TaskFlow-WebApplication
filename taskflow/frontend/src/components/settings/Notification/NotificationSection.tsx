import { useState } from "react";
import {Bell, Mail} from "lucide-react";

import NotificationToggle from "./NotificationToggle";

function NotificationSection() {
  const [notifications, setNotifications] =
    useState({
      taskAssignedEmail: false,
      taskAssignedPush: false,

      commentsEmail: false,
      commentsPush: false,

      remindersEmail: false,
      remindersPush: false,

      completedEmail: false,
      completedPush: false,

      invitationEmail: false,
      invitationPush: false,

      statusEmail: false,
      statusPush: false,

      memberEmail: false,
      memberPush: false,

      securityEmail: false,
      securityPush: false,

      productEmail: false,
      productPush: false,
    });

  const toggle = (
    key: keyof typeof notifications
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
        {/* Header */}
        <div className="mb-6 grid grid-cols-12 text-xs font-semibold uppercase tracking-wider text-slate-400">
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
                    className="grid grid-cols-12 items-center py-5"
                  >
                    <div className="col-span-8">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {
                          item.description
                        }
                      </p>
                    </div>

                    <div className="col-span-2 flex justify-center">
                      <NotificationToggle
                        enabled={
                          notifications[
                            item.email as keyof typeof notifications
                          ]
                        }
                        onToggle={() =>
                          toggle(
                            item.email as keyof typeof notifications
                          )
                        }
                      />
                    </div>

                    <div className="col-span-2 flex justify-center">
                      <NotificationToggle
                        enabled={
                          notifications[
                            item.push as keyof typeof notifications
                          ]
                        }
                        onToggle={() =>
                          toggle(
                            item.push as keyof typeof notifications
                          )
                        }
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NotificationSection;
import type { Task } from "@/interfaces/projects";

export const todoTasks: Task[] = [
  {
    id: "1",
    title: "Refactor Authentication Middleware",

    description:
      "Improve authentication middleware by separating token verification and authorization logic into reusable modules.",

    status: "todo",

    priority: "High",

    dueDate: "2026-08-12",

    assignee: {
      id: "1",
      name: "John Smith",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80",
    },

    attachments: [],

    activities: [],
  },

  {
    id: "2",
    title: "Update API Documentation",

    description:
      "Document every endpoint using Swagger and add request/response examples.",

    status: "todo",

    priority: "Medium",

    dueDate: "2026-08-15",

    assignee: {
      id: "2",
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
    },

    attachments: [],

    activities: [],
  },
];

export const inProgressTasks: Task[] = [
  {
    id: "3",

    title: "Implement WebSocket Notifications",

    description:
      "Build a real-time notification service using Socket.IO.",

    status: "progress",

    priority: "High",

    dueDate: "2026-08-18",

    progress: 45,

    assignee: {
      id: "3",
      name: "Michael Brown",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80",
    },

    assignees: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80",
    ],

    attachments: [],

    activities: [],
  },
];

export const reviewTasks: Task[] = [
  {
    id: "4",

    title: "Accessibility Audit",

    description:
      "Review the accessibility of all pages and ensure WCAG compliance.",

    status: "review",

    priority: "Medium",

    dueDate: "2026-08-20",

    reviewStatus: "Pending Approval",

    assignee: {
      id: "4",
      name: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80",
    },

    attachments: [],

    activities: [],
  },
];

export const completedTasks: Task[] = [
  {
    id: "5",

    title: "Setup CI/CD Pipeline",

    description:
      "Configured GitHub Actions for automatic deployment and testing.",

    status: "completed",

    priority: "Low",

    dueDate: "2026-08-05",

    assignee: {
      id: "5",
      name: "David Lee",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80",
    },

    attachments: [],

    activities: [],
  },
];
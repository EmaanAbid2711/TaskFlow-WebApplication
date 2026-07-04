import type { TaskDetails } from "../interfaces/taskDetails";

export const taskDetails: TaskDetails = {
  id: "TASK-1024",

  title: "API Documentation Update",

  description: `Update Swagger documentation with the latest project management endpoints.

The following items need to be completed:
• Update authentication header requirements
• Add PUT /projects/{id} endpoint documentation
• Clarify HTTP 403 and 404 error responses
• Update request and response examples
• Verify all schemas against the latest backend implementation.`,

  status: "In Progress",

  priority: "Medium",

  dueDate: "11/15/2024",

  assignee: {
    name: "Sarah Jenkins",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
  },

  attachments: [
    {
      id: 1,
      name: "api_v2_spec.pdf",
      size: "2.4 MB",
      type: "pdf",
    },
    {
      id: 2,
      name: "header_hero.png",
      size: "850 KB",
      type: "image",
    },
  ],

  activities: [
    {
      id: 1,
      type: "system",
      text: "System moved this task to In Progress.",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "comment",
      user: "Alex Rivera",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      text: "I've added the initial Swagger definitions for the authentication layer. Sarah, could you please review the PUT endpoints?",
      time: "Yesterday at 4:15 PM",
    },
    {
      id: 3,
      type: "comment",
      user: "Sarah Jenkins",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      text: "Looks good! I'll verify the remaining endpoints and update the examples before merging.",
      time: "Today at 9:30 AM",
    },
  ],
};
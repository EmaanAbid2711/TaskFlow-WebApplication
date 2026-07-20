import { z } from "zod";

export const createTaskSchema = z.object({

  title: z
    .string()
    .min(3, "Task title must be at least 3 characters.")
    .max(150),

  description: z
    .string()
    .optional(),

  projectId: z
    .string()
    .cuid("Invalid project id."),

  status: z.enum([
    "todo",
    "progress",
    "review",
    "completed",
  ]),

  priority: z.enum([
    "High",
    "Medium",
    "Low",
  ]),

  dueDate: z
    .string()
    .optional(),

  assigneeId: z
    .string()
    .cuid()
    .optional(),

  progress: z
    .number()
    .min(0)
    .max(100)
    .optional(),

  reviewStatus: z
    .string()
    .optional(),

});

export const updateTaskSchema =
  createTaskSchema.partial();

export type CreateTaskInput =
  z.infer<typeof createTaskSchema>;

export type UpdateTaskInput =
  z.infer<typeof updateTaskSchema>;
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
    "TODO",
    "PROGRESS",
    "REVIEW",
    "COMPLETED",
  ]),

  priority: z.enum([
    "HIGH",
    "MEDIUM",
    "LOW",
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

export const createCommentSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty.")
    .max(2000),
});

export type CreateCommentInput =
  z.infer<typeof createCommentSchema>;
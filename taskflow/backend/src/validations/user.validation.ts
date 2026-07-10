import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .optional(),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .optional(),

  bio: z
    .string()
    .max(160, "Bio cannot exceed 160 characters.")
    .optional(),

  location: z
    .string()
    .max(100)
    .optional(),

  website: z
    .string()
    .max(255)
    .optional(),

  role: z
    .string()
    .max(100)
    .optional(),

  timezone: z
    .string()
    .max(100)
    .optional(),

  avatar: z
    .string()
    .optional(),
});

export type UpdateProfileInput =
  z.infer<typeof updateProfileSchema>;
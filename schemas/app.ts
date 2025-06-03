import { z } from "zod/v4";

export const onboardingSchema = z.object({
  name: z
    .string()
    .min(3, { message: "too_short_name" })
    .max(128, { message: "too_long_name" }),
  avatarUrl: z.url("invalid_url"),
});

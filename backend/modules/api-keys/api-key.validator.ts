import { z } from "zod";

export const CreateApiKeySchema = z.object({
  name: z
    .string()
    .min(2, "Key name must be at least 2 characters")
    .max(80, "Key name cannot exceed 80 characters")
    .trim(),
  permissions: z
    .array(z.enum(["links:read", "links:write", "analytics:read"]))
    .min(1, "At least one permission is required")
    .default(["links:read", "links:write", "analytics:read"]),
  rateLimitPerMinute: z
    .number()
    .min(10, "Minimum rate limit is 10 requests/min")
    .max(1000, "Maximum rate limit is 1000 requests/min")
    .default(120),
});

export type CreateApiKeyInput = z.infer<typeof CreateApiKeySchema>;

export const RevokeApiKeySchema = z.object({
  keyId: z.string().min(1, "keyId is required"),
});

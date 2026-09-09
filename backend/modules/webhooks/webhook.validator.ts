import { z } from "zod";

export const CreateWebhookSchema = z.object({
  url: z
    .string({ required_error: "Webhook target URL is required" })
    .trim()
    .url("Please provide a valid webhook URL")
    .refine(
      (u) => u.startsWith("http://") || u.startsWith("https://"),
      "Webhook URL must start with http:// or https://"
    ),
  events: z
    .array(z.enum(["link.clicked", "link.created"]))
    .min(1, "Select at least one event to subscribe to")
    .default(["link.clicked"]),
});

export type CreateWebhookInput = z.infer<typeof CreateWebhookSchema>;

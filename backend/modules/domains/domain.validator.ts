import { z } from "zod";

const BLOCKED_DOMAINS = [
  "snaplink.to",
  "localhost",
  "127.0.0.1",
  "vercel.app",
  "herokuapp.com",
  "netlify.app",
  "render.com",
  "ngrok.io",
  "ngrok-free.app",
];

const DOMAIN_REGEX = /^(?!:\/\/)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

export const CreateDomainSchema = z.object({
  domain: z
    .string({ required_error: "Domain name is required." })
    .trim()
    .toLowerCase()
    .refine((d) => DOMAIN_REGEX.test(d), {
      message: "Please enter a valid domain or subdomain (e.g. links.mybrand.com).",
    })
    .refine((d) => !BLOCKED_DOMAINS.some((blocked) => d.endsWith(blocked)), {
      message: "This domain or platform suffix cannot be registered as a custom domain.",
    }),

  defaultRedirectUrl: z
    .string()
    .trim()
    .refine(
      (url) => url === "" || url.startsWith("http://") || url.startsWith("https://"),
      "Only http:// and https:// URLs are allowed for fallback."
    )
    .optional()
    .default(""),
});

export type CreateDomainInput = z.infer<typeof CreateDomainSchema>;

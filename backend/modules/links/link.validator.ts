import { z } from "zod";

const RESERVED_SLUGS = [
  "api",
  "analytics",
  "dashboard",
  "admin",
  "login",
  "signup",
  "register",
  "logout",
  "auth",
  "settings",
  "terms",
  "privacy",
  "qr",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "manifest.json",
];

/**
 * Zod Schema for Creating a Smart Deep Link
 * Validates URLs, prevents XSS, and enforces slug rules.
 */
export const CreateLinkSchema = z.object({
  originalUrl: z
    .string({ required_error: "Destination URL is required." })
    .trim()
    .url("Please provide a valid URL (e.g. https://youtube.com/watch?v=...)")
    .refine(
      (url) => url.startsWith("http://") || url.startsWith("https://"),
      "Only http:// and https:// URLs are allowed."
    ),

  customSlug: z
    .string()
    .trim()
    .toLowerCase()
    .transform((val) => (val === "" ? undefined : val))
    .pipe(
      z
        .string()
        .min(3, "Custom alias must be at least 3 characters long.")
        .max(30, "Custom alias cannot exceed 30 characters.")
        .regex(
          /^[a-z0-9-_]+$/,
          "Custom alias can only contain lowercase letters, numbers, hyphens, and underscores."
        )
        .refine(
          (slug) => !RESERVED_SLUGS.includes(slug),
          "This alias is a reserved system path."
        )
        .optional()
    )
    .optional(),

  title: z.string().trim().max(100).optional(),
  customTitle: z.string().trim().max(100).optional(),
  customDescription: z.string().trim().max(250).optional(),
  customImage: z.string().trim().url().max(500).optional(),
});

export type CreateLinkInput = z.infer<typeof CreateLinkSchema>;

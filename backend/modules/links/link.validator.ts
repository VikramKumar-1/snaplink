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
  customDomain: z.string().trim().toLowerCase().max(100).optional(),
  smartRules: z
    .array(
      z.object({
        id: z.string().min(1),
        type: z.enum(["geo", "device", "language"]),
        condition: z.string().min(1).trim(),
        destinationUrl: z.string().trim().url("Destination must be a valid URL"),
      })
    )
    .optional(),
  ctaOverlay: z
    .object({
      enabled: z.boolean().default(false),
      headline: z.string().trim().max(120).optional().default(""),
      buttonText: z.string().trim().max(35).optional().default("Learn More"),
      buttonUrl: z
        .string()
        .trim()
        .refine(
          (url) => url === "" || url.startsWith("http://") || url.startsWith("https://"),
          "Only http:// and https:// URLs are allowed."
        )
        .optional()
        .default(""),
      theme: z.enum(["blue", "dark", "emerald", "amber"]).optional().default("blue"),
      badgeText: z.string().trim().max(25).optional().default("Featured"),
    })
    .optional(),

  routing: z
    .object({
      expiresAt: z
        .string()
        .nullable()
        .optional()
        .transform((val) => (val && val.trim() !== "" ? new Date(val) : null)),
      maxClicks: z
        .number()
        .int()
        .positive("Click limit must be greater than 0.")
        .nullable()
        .optional(),
      expiredFallbackUrl: z
        .string()
        .trim()
        .refine(
          (url) => url === "" || url.startsWith("http://") || url.startsWith("https://"),
          "Only http:// and https:// URLs are allowed for fallback destination."
        )
        .optional()
        .default(""),
      passwordProtected: z.boolean().optional().default(false),
      password: z
        .string()
        .trim()
        .max(50, "Password cannot exceed 50 characters.")
        .optional(),
    })
    .optional(),

  utm: z
    .object({
      source: z.string().trim().max(100).optional().default(""),
      medium: z.string().trim().max(100).optional().default(""),
      campaign: z.string().trim().max(100).optional().default(""),
      term: z.string().trim().max(100).optional().default(""),
      content: z.string().trim().max(100).optional().default(""),
    })
    .optional(),

  retargeting: z
    .object({
      metaPixelId: z.string().trim().max(50).optional().default(""),
      googleAnalyticsId: z.string().trim().max(50).optional().default(""),
      affiliateTag: z.string().trim().max(50).optional().default(""),
    })
    .optional(),
});

export const VerifyPasswordSchema = z.object({
  shortCode: z.string().trim().min(1, "Short code is required."),
  password: z.string().min(1, "Password is required."),
});

export const BulkCreateLinkSchema = z.object({
  urls: z
    .array(
      z
        .string({ required_error: "URL is required" })
        .trim()
        .url("Please provide a valid URL")
        .refine(
          (url) => url.startsWith("http://") || url.startsWith("https://"),
          "Only http:// and https:// URLs are allowed."
        )
    )
    .min(1, "Provide at least 1 URL")
    .max(20, "Maximum 20 URLs allowed per batch"),
});

export type CreateLinkInput = z.infer<typeof CreateLinkSchema>;
export type VerifyPasswordInput = z.infer<typeof VerifyPasswordSchema>;
export type BulkCreateLinkInput = z.infer<typeof BulkCreateLinkSchema>;

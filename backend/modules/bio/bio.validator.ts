import { z } from "zod";

const RESERVED_USERNAMES = [
  "api",
  "auth",
  "admin",
  "dashboard",
  "settings",
  "login",
  "signup",
  "register",
  "logout",
  "bio",
  "qr",
  "analytics",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "manifest.json",
  "pricing",
  "terms",
  "privacy",
  "about",
  "help",
  "support",
];

const SocialLinkValidator = z.object({
  platform: z.enum([
    "youtube",
    "instagram",
    "x",
    "tiktok",
    "telegram",
    "spotify",
    "github",
    "linkedin",
    "facebook",
    "website",
  ]),
  url: z.string().trim().url("Please provide a valid social profile URL."),
  handle: z.string().trim().max(30, "Handle too long").optional(),
});

const CustomLinkValidator = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1, "Link title is required.").max(80, "Title cannot exceed 80 characters."),
  url: z
    .string()
    .trim()
    .url("Please provide a valid destination URL.")
    .refine(
      (url) => url.startsWith("http://") || url.startsWith("https://"),
      "Only http:// and https:// URLs are allowed."
    ),
  isHighlighted: z.boolean().optional().default(false),
  clicks: z.number().optional().default(0),
});

export const SaveBioPageSchema = z.object({
  username: z
    .string({ required_error: "Username is required." })
    .trim()
    .toLowerCase()
    .min(3, "Username must be at least 3 characters long.")
    .max(30, "Username cannot exceed 30 characters.")
    .regex(/^[a-z0-9_-]+$/, "Username can only contain letters, numbers, hyphens, and underscores.")
    .refine((u) => !RESERVED_USERNAMES.includes(u), "This username is reserved by the system."),

  displayName: z
    .string({ required_error: "Display name is required." })
    .trim()
    .min(1, "Display name cannot be empty.")
    .max(32, "Display name cannot exceed 32 characters.")
    .regex(/^[^\r\n]+$/, "Display name must be a single line without line breaks."),

  bio: z.string().trim().max(90, "Bio cannot exceed 90 characters.").optional().default(""),
  avatarUrl: z.string().trim().optional().default(""),
  theme: z.enum(["royal_blue", "glass_dark", "clay_light", "emerald", "sunset", "midnight_glow", "cyberpunk"]).default("royal_blue"),
  socialLinks: z.array(SocialLinkValidator).default([]),
  customLinks: z.array(CustomLinkValidator).default([]),
});

export type SaveBioPageInput = z.infer<typeof SaveBioPageSchema>;

import { z } from "zod";

export const CreateWorkspaceSchema = z.object({
  name: z.string().min(2, "Workspace name must be at least 2 characters").max(80).trim(),
  slug: z
    .string()
    .min(2)
    .max(40)
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens")
    .optional(),
});

export const InviteMemberSchema = z.object({
  workspaceId: z.string().min(1, "workspaceId is required"),
  email: z.string().email("Please provide a valid email address").toLowerCase().trim(),
  role: z.enum(["admin", "member", "viewer"]).default("member"),
});

export const UpdateMemberRoleSchema = z.object({
  workspaceId: z.string().min(1, "workspaceId is required"),
  email: z.string().email().toLowerCase().trim(),
  role: z.enum(["admin", "member", "viewer"]),
});

export const RemoveMemberSchema = z.object({
  workspaceId: z.string().min(1, "workspaceId is required"),
  email: z.string().email().toLowerCase().trim(),
});

export const UpdateSsoSchema = z.object({
  workspaceId: z.string().min(1, "workspaceId is required"),
  provider: z.enum(["okta", "azure_ad", "google_workspace"]),
  domain: z.string().min(3, "Enterprise identity domain is required").trim(),
  enabled: z.boolean(),
});

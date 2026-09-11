import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  persona: z.enum(["creator", "brand", "agency", "user"]).optional().default("user"),
});

export const LoginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const GoogleAuthSchema = z.object({
  credential: z.string().min(1, "Google credential is required"),
});

export const SyncLinksSchema = z.object({
  shortCodes: z.array(z.string().min(1)).min(1, "At least one short code is required"),
});

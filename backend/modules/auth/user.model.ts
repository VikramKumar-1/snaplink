import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional if using Google OAuth
  authProvider: "local" | "google";
  avatar?: string;
  refreshToken?: string; // For long-lived sessions
  plan: "free" | "creator" | "enterprise";
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String },
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    avatar: { type: String },
    refreshToken: { type: String },
    plan: {
      type: String,
      enum: ["free", "creator", "enterprise"],
      default: "free",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Prevent re-compilation of model in Next.js dev mode
export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

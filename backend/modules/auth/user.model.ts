import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional if using Google OAuth
  authProvider: "local" | "google";
  avatar?: string;
  refreshToken?: string; // For long-lived sessions
  plan: "free" | "pro" | "team";
  role: "user" | "admin";
  persona: "creator" | "brand" | "agency" | "user"; // Persona tracking
  stripeCustomerId?: string;
  razorpayCustomerId?: string;
  subscriptionId?: string;
  planStatus: "active" | "past_due" | "canceled" | "none";
  currentPeriodEnd?: Date;
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
      enum: ["free", "pro", "team"],
      default: "free",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    persona: {
      type: String,
      enum: ["creator", "brand", "agency", "user"],
      default: "user",
    },
    stripeCustomerId: { type: String, trim: true },
    razorpayCustomerId: { type: String, trim: true },
    subscriptionId: { type: String, trim: true },
    planStatus: {
      type: String,
      enum: ["active", "past_due", "canceled", "none"],
      default: "none",
    },
    currentPeriodEnd: { type: Date },
  },
  { timestamps: true }
);

// Prevent re-compilation of model in Next.js dev mode
export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

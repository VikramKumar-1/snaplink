import mongoose, { Schema, Document, Model } from "mongoose";

export type WorkspaceRole = "owner" | "admin" | "member" | "viewer";

export interface IWorkspaceMember {
  userId?: string;
  email: string;
  role: WorkspaceRole;
  status: "active" | "invited";
  invitedAt: Date;
}

export interface IWorkspace {
  _id?: string;
  name: string;
  slug: string;
  ownerId: string;
  members: IWorkspaceMember[];
  plan: "team" | "enterprise";
  ssoConfig?: {
    provider: "okta" | "azure_ad" | "google_workspace";
    domain: string;
    enabled: boolean;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWorkspaceDocument extends Omit<IWorkspace, "_id">, Document {}

const WorkspaceMemberSchema = new Schema<IWorkspaceMember>({
  userId: { type: String },
  email: { type: String, required: true, lowercase: true, trim: true },
  role: {
    type: String,
    enum: ["owner", "admin", "member", "viewer"],
    default: "member",
  },
  status: {
    type: String,
    enum: ["active", "invited"],
    default: "active",
  },
  invitedAt: { type: Date, default: Date.now },
});

const WorkspaceSchema = new Schema<IWorkspaceDocument>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    ownerId: { type: String, required: true, index: true },
    members: [WorkspaceMemberSchema],
    plan: { type: String, enum: ["team", "enterprise"], default: "team" },
    ssoConfig: {
      provider: { type: String, enum: ["okta", "azure_ad", "google_workspace"], default: "okta" },
      domain: { type: String, default: "" },
      enabled: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

export const Workspace: Model<IWorkspaceDocument> =
  mongoose.models.Workspace || mongoose.model<IWorkspaceDocument>("Workspace", WorkspaceSchema);

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuditLog {
  _id?: string;
  workspaceId: string;
  actorId: string;
  actorEmail: string;
  action: string;
  resourceId: string;
  details?: Record<string, any>;
  ip?: string;
  createdAt?: Date;
}

export interface IAuditLogDocument extends Omit<IAuditLog, "_id">, Document {}

const AuditLogSchema = new Schema<IAuditLogDocument>(
  {
    workspaceId: { type: String, required: true, index: true },
    actorId: { type: String, required: true },
    actorEmail: { type: String, required: true },
    action: { type: String, required: true, index: true },
    resourceId: { type: String, required: true },
    details: { type: Schema.Types.Mixed, default: {} },
    ip: { type: String, default: "127.0.0.1" },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const AuditLog: Model<IAuditLogDocument> =
  mongoose.models.AuditLog || mongoose.model<IAuditLogDocument>("AuditLog", AuditLogSchema);

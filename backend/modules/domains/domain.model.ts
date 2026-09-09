import mongoose, { Schema, Document, Model } from "mongoose";

export type DomainStatus = "pending_dns" | "verified" | "active" | "failed";

export interface IDomain extends Document {
  userId?: mongoose.Types.ObjectId;
  domain: string;
  status: DomainStatus;
  verificationToken: string;
  targetCname: string;
  defaultRedirectUrl?: string;
  sslStatus: "pending" | "active";
  lastCheckedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DomainSchema: Schema<IDomain> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    domain: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending_dns", "verified", "active", "failed"],
      default: "pending_dns",
      index: true,
    },
    verificationToken: {
      type: String,
      required: true,
      trim: true,
    },
    targetCname: {
      type: String,
      default: "cname.snaplink.to",
      trim: true,
    },
    defaultRedirectUrl: {
      type: String,
      trim: true,
      default: "",
    },
    sslStatus: {
      type: String,
      enum: ["pending", "active"],
      default: "active",
    },
    lastCheckedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Domain: Model<IDomain> =
  mongoose.models.Domain || mongoose.model<IDomain>("Domain", DomainSchema);

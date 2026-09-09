import mongoose, { Schema, Document, Model } from "mongoose";

export interface IApiKey {
  _id?: string;
  keyId: string;
  userId: string;
  name: string;
  hashedSecret: string;
  prefix: string;
  permissions: string[];
  rateLimitPerMinute: number;
  status: "active" | "revoked";
  lastUsedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IApiKeyDocument extends Omit<IApiKey, "_id">, Document {}

const ApiKeySchema = new Schema<IApiKeyDocument>(
  {
    keyId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    hashedSecret: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      required: true,
      index: true,
    },
    permissions: {
      type: [String],
      default: ["links:read", "links:write", "analytics:read"],
    },
    rateLimitPerMinute: {
      type: Number,
      default: 120,
    },
    status: {
      type: String,
      enum: ["active", "revoked"],
      default: "active",
      index: true,
    },
    lastUsedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const ApiKey: Model<IApiKeyDocument> =
  mongoose.models.ApiKey || mongoose.model<IApiKeyDocument>("ApiKey", ApiKeySchema);

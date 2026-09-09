import mongoose, { Schema, Document, Model } from "mongoose";

export type WebhookEvent = "link.clicked" | "link.created";

export interface IWebhook {
  _id?: string;
  userId: string;
  url: string;
  events: WebhookEvent[];
  secret: string;
  status: "active" | "failing" | "disabled";
  failureCount: number;
  lastDeliveryStatus?: number;
  lastDeliveryAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWebhookDocument extends Omit<IWebhook, "_id">, Document {}

const WebhookSchema = new Schema<IWebhookDocument>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    events: {
      type: [String],
      enum: ["link.clicked", "link.created"],
      default: ["link.clicked"],
    },
    secret: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "failing", "disabled"],
      default: "active",
      index: true,
    },
    failureCount: {
      type: Number,
      default: 0,
    },
    lastDeliveryStatus: {
      type: Number,
    },
    lastDeliveryAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Webhook: Model<IWebhookDocument> =
  mongoose.models.Webhook || mongoose.model<IWebhookDocument>("Webhook", WebhookSchema);

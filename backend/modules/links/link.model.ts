import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILink extends Document {
  shortCode: string;
  originalUrl: string;
  platform: "youtube" | "instagram" | "telegram" | "amazon" | "spotify" | "whatsapp" | "myntra" | "other";
  title?: string;
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
  clicks: number;
  userId?: mongoose.Types.ObjectId; // Link to User model (optional for anonymous links)
  createdAt: Date;
  updatedAt: Date;
}

const LinkSchema: Schema<ILink> = new Schema(
  {
    shortCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    platform: {
      type: String,
      enum: ["youtube", "instagram", "telegram", "amazon", "spotify", "whatsapp", "myntra", "other"],
      default: "other",
    },
    title: {
      type: String,
      default: "Smart Link",
    },
    customTitle: {
      type: String,
    },
    customDescription: {
      type: String,
    },
    customImage: {
      type: String,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Link: Model<ILink> =
  mongoose.models.Link || mongoose.model<ILink>("Link", LinkSchema);

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IClickAnalytics extends Document {
  shortCode: string;
  linkId: mongoose.Types.ObjectId;
  device: "android" | "ios" | "windows" | "mac" | "linux" | "other";
  inAppBrowser: boolean;
  referrerSource: "instagram" | "whatsapp" | "facebook" | "twitter" | "telegram" | "youtube" | "linkedin" | "tiktok" | "direct" | "other";
  country: string; // ISO 2-letter code or country name (e.g., "IN", "US", "Unknown")
  city: string;    // e.g. "Mumbai", "New York", "Unknown"
  browser: string; // e.g. "Chrome", "Safari", "Firefox", "Edge", "In-App WebView"
  os: string;      // e.g. "Android", "iOS", "Windows", "macOS", "Linux"
  userAgent: string;
  timestamp: Date;
}

const ClickAnalyticsSchema: Schema<IClickAnalytics> = new Schema(
  {
    shortCode: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    linkId: {
      type: Schema.Types.ObjectId,
      ref: "Link",
      required: true,
      index: true,
    },
    device: {
      type: String,
      enum: ["android", "ios", "windows", "mac", "linux", "other"],
      default: "other",
    },
    inAppBrowser: {
      type: Boolean,
      default: false,
    },
    referrerSource: {
      type: String,
      enum: ["instagram", "whatsapp", "facebook", "twitter", "telegram", "youtube", "linkedin", "tiktok", "direct", "other"],
      default: "direct",
    },
    country: {
      type: String,
      default: "Unknown",
      uppercase: true,
      trim: true,
    },
    city: {
      type: String,
      default: "Unknown",
      trim: true,
    },
    browser: {
      type: String,
      default: "Other",
      trim: true,
    },
    os: {
      type: String,
      default: "Other",
      trim: true,
    },
    userAgent: {
      type: String,
      default: "",
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false,
  }
);

// High-Performance Compound Indexes for sub-millisecond aggregations at 10 Crore scale
ClickAnalyticsSchema.index({ shortCode: 1, timestamp: -1 });
ClickAnalyticsSchema.index({ shortCode: 1, country: 1 });
ClickAnalyticsSchema.index({ shortCode: 1, referrerSource: 1 });
ClickAnalyticsSchema.index({ shortCode: 1, device: 1 });

export const ClickAnalytics: Model<IClickAnalytics> =
  mongoose.models.ClickAnalytics ||
  mongoose.model<IClickAnalytics>("ClickAnalytics", ClickAnalyticsSchema);

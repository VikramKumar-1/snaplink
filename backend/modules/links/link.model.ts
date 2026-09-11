import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICtaOverlay {
  enabled: boolean;
  headline: string;
  buttonText: string;
  buttonUrl: string;
  theme?: "blue" | "dark" | "emerald" | "amber";
  badgeText?: string;
}

export interface ILinkRouting {
  expiresAt?: Date | null;
  maxClicks?: number | null;
  expiredFallbackUrl?: string;
  passwordProtected?: boolean;
  passwordHash?: string | null;
}

export interface IUtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface IRetargeting {
  metaPixelId?: string;
  googleAnalyticsId?: string;
  affiliateTag?: string;
}

export interface ISmartRule {
  id: string;
  type: "geo" | "device" | "language";
  condition: string;
  destinationUrl: string;
}

export interface ILink extends Document {
  shortCode: string;
  originalUrl: string;
  platform: string;
  title?: string;
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
  ctaOverlay?: ICtaOverlay;
  routing?: ILinkRouting;
  utm?: IUtmParams;
  retargeting?: IRetargeting;
  customDomain?: string;
  smartRules?: ISmartRule[];
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
      default: "other",
      index: true,
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
    ctaOverlay: {
      enabled: { type: Boolean, default: false },
      headline: { type: String, trim: true, default: "" },
      buttonText: { type: String, trim: true, default: "Learn More" },
      buttonUrl: { type: String, trim: true, default: "" },
      theme: {
        type: String,
        enum: ["blue", "dark", "emerald", "amber"],
        default: "blue",
      },
      badgeText: { type: String, trim: true, default: "Featured" },
    },
    routing: {
      expiresAt: { type: Date, default: null },
      maxClicks: { type: Number, default: null },
      expiredFallbackUrl: { type: String, trim: true, default: "" },
      passwordProtected: { type: Boolean, default: false },
      passwordHash: { type: String, default: null },
    },
    utm: {
      source: { type: String, trim: true, default: "" },
      medium: { type: String, trim: true, default: "" },
      campaign: { type: String, trim: true, default: "" },
      term: { type: String, trim: true, default: "" },
      content: { type: String, trim: true, default: "" },
    },
    retargeting: {
      metaPixelId: { type: String, trim: true, default: "" },
      googleAnalyticsId: { type: String, trim: true, default: "" },
      affiliateTag: { type: String, trim: true, default: "" },
    },
    customDomain: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
    },
    smartRules: [
      {
        id: { type: String, required: true },
        type: { type: String, enum: ["geo", "device", "language"], required: true },
        condition: { type: String, required: true, trim: true },
        destinationUrl: { type: String, required: true, trim: true },
      },
    ],
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

// High-Performance Compound Indexes for Sub-1ms Edge Lookups
LinkSchema.index({ shortCode: 1, customDomain: 1 });
LinkSchema.index({ userId: 1, createdAt: -1 });
LinkSchema.index({ userId: 1, clicks: -1 });

export const Link: Model<ILink> =
  mongoose.models.Link || mongoose.model<ILink>("Link", LinkSchema);

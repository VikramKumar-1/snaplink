import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISocialLink {
  platform: "youtube" | "instagram" | "x" | "tiktok" | "telegram" | "spotify" | "github" | "linkedin" | "facebook" | "website";
  url: string;
  handle?: string;
}

export interface ICustomBioLink {
  id: string;
  title: string;
  url: string;
  isHighlighted?: boolean;
  clicks?: number;
}

export interface IBioPage extends Document {
  userId: mongoose.Types.ObjectId;
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  theme: "royal_blue" | "glass_dark" | "clay_light" | "emerald" | "sunset";
  socialLinks: ISocialLink[];
  customLinks: ICustomBioLink[];
  views: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SocialLinkSchema = new Schema<ISocialLink>(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true, trim: true },
    handle: { type: String, trim: true },
  },
  { _id: false }
);

const CustomBioLinkSchema = new Schema<ICustomBioLink>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    isHighlighted: { type: Boolean, default: false },
    clicks: { type: Number, default: 0 },
  },
  { _id: false }
);

const BioPageSchema = new Schema<IBioPage>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 90,
      default: "",
    },
    avatarUrl: {
      type: String,
      trim: true,
      default: "",
    },
    theme: {
      type: String,
      enum: ["royal_blue", "glass_dark", "clay_light", "emerald", "sunset"],
      default: "royal_blue",
    },
    socialLinks: {
      type: [SocialLinkSchema],
      default: [],
    },
    customLinks: {
      type: [CustomBioLinkSchema],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const BioPage: Model<IBioPage> =
  mongoose.models.BioPage || mongoose.model<IBioPage>("BioPage", BioPageSchema);

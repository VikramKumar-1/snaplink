"use client";

import React from "react";
import {
  Link2,
  Copy,
  Check,
  QrCode,
  BarChart3,
  ExternalLink,
  Edit3,
  Trash2,
  Megaphone,
  Lock,
  Clock,
  Tag,
  Target,
  Globe,
  Compass,
} from "lucide-react";
import {
  YoutubeLogo,
  InstagramLogo,
  AmazonLogo,
  MyntraLogo,
  FlipkartLogo,
  TwitterXLogo,
  LinkedInLogo,
  FacebookLogo,
  RedditLogo,
  DiscordLogo,
  GitHubLogo,
  TelegramLogo,
  SpotifyLogo,
  WhatsAppLogo,
} from "@/frontend/shared/icons/PlatformIcons";

export interface DashboardLinkItem {
  _id?: string;
  shortCode: string;
  originalUrl: string;
  platform: string;
  title?: string;
  customTitle?: string;
  customDescription?: string;
  ctaOverlay?: {
    enabled: boolean;
    headline: string;
    buttonText: string;
    buttonUrl: string;
    theme?: "blue" | "dark" | "emerald" | "amber";
    badgeText?: string;
  };
  routing?: {
    expiresAt?: string | Date | null;
    maxClicks?: number | null;
    expiredFallbackUrl?: string;
    passwordProtected?: boolean;
  };
  smartRules?: Array<{
    id: string;
    type: "geo" | "device" | "language";
    condition: string;
    destinationUrl: string;
  }>;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
  retargeting?: {
    affiliateTag?: string;
    metaPixelId?: string;
    googleAnalyticsId?: string;
  };
  customDomain?: string;
  clicks: number;
  createdAt: string;
}

interface LinkRowItemProps {
  link: DashboardLinkItem;
  isCopied: boolean;
  onCopy: (shortCode: string, customDomain?: string) => void;
  onEdit: (link: DashboardLinkItem) => void;
  onQr: (link: DashboardLinkItem) => void;
  onAnalytics: (shortCode: string) => void;
  onDelete: (shortCode: string) => void;
}

export const LinkRowItem: React.FC<LinkRowItemProps> = ({
  link,
  isCopied,
  onCopy,
  onEdit,
  onQr,
  onAnalytics,
  onDelete,
}) => {
  const getPlatformIcon = (platform: string) => {
    const p = platform?.toLowerCase();
    switch (p) {
      case "youtube": return <YoutubeLogo className="h-5 w-5 text-[#cc0000]" />;
      case "instagram": return <InstagramLogo className="h-5 w-5 text-[#c13584]" />;
      case "amazon": return <AmazonLogo className="h-5 w-5 text-[#121316]" />;
      case "flipkart": return <FlipkartLogo className="h-5 w-5" />;
      case "myntra": return <MyntraLogo className="h-5 w-5 text-[#ff3f6c]" />;
      case "twitter": return <TwitterXLogo className="h-5 w-5 text-black" />;
      case "linkedin": return <LinkedInLogo className="h-5 w-5 text-[#0a66c2]" />;
      case "facebook": return <FacebookLogo className="h-5 w-5 text-[#1877f2]" />;
      case "reddit": return <RedditLogo className="h-5 w-5 text-[#ff4500]" />;
      case "discord": return <DiscordLogo className="h-5 w-5 text-[#5865f2]" />;
      case "github": return <GitHubLogo className="h-5 w-5 text-black" />;
      case "telegram": return <TelegramLogo className="h-5 w-5 text-[#229ed9]" />;
      case "spotify": return <SpotifyLogo className="h-5 w-5 text-[#1db954]" />;
      case "whatsapp": return <WhatsAppLogo className="h-5 w-5 text-[#25d366]" />;
      default: return <Link2 className="h-5 w-5 text-[#2c35af]" />;
    }
  };

  const isExpired = Boolean(
    (link.routing?.expiresAt && new Date() > new Date(link.routing.expiresAt)) ||
    (link.routing?.maxClicks && (link.clicks || 0) >= link.routing.maxClicks)
  );

  return (
    <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-[24px] bento-card-light transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 group hover:border-[#2c35af]">
      {/* Left: Platform Icon & Link Details */}
      <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
        <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white border border-[#e7e5dc] shadow-2xs shrink-0 mt-0.5">
          {getPlatformIcon(link.platform)}
        </div>

        <div className="min-w-0 flex-1">
          {/* Header row: Shortcode + Clicks */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <a
              href={link.customDomain ? `https://${link.customDomain}/${link.shortCode}` : `/${link.shortCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] sm:text-[16px] font-black text-[#121316] font-mono tracking-tight hover:text-[#2c35af] transition flex items-center gap-1.5 truncate"
            >
              <span className="truncate">{link.customDomain ? `${link.customDomain}/${link.shortCode}` : `/${link.shortCode}`}</span>
              <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-zinc-400 shrink-0" />
            </a>

            <div className="flex items-center gap-1 text-[11px] sm:text-[12px] font-mono font-bold text-zinc-700 shrink-0 bg-[#ccff00]/30 px-2 sm:px-2.5 py-0.5 rounded-full border border-[#ccff00]/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#121316]" />
              <span>
                {link.clicks || 0}
                {link.routing?.maxClicks ? `/${link.routing.maxClicks}` : ""} <span className="hidden xs:inline">Clicks</span>
              </span>
            </div>
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <span className="text-[9.5px] sm:text-[10px] font-black uppercase text-zinc-700 bg-[#f5f4ef] border border-[#e7e5dc] rounded-md px-1.5 sm:px-2 py-0.5">
              {link.platform}
            </span>

            {link.customDomain && (
              <span className="text-[9.5px] sm:text-[10px] font-black uppercase text-violet-700 bg-violet-50 border border-violet-200 rounded-md px-1.5 sm:px-2 py-0.5 flex items-center gap-1 font-mono">
                <Globe className="h-2.5 w-2.5" /> CNAME
              </span>
            )}

            {Boolean(link.smartRules && link.smartRules.length > 0) && (
              <span className="text-[9.5px] sm:text-[10px] font-black uppercase text-[#2c35af] bg-indigo-50 border border-indigo-200 rounded-md px-1.5 sm:px-2 py-0.5 flex items-center gap-1 font-mono">
                <Compass className="h-2.5 w-2.5" /> {link.smartRules!.length} {link.smartRules!.length === 1 ? "Target" : "Targets"}
              </span>
            )}

            {link.ctaOverlay?.enabled && (
              <span className="text-[9.5px] sm:text-[10px] font-black uppercase text-[#2c35af] bg-indigo-50 border border-indigo-200 rounded-md px-1.5 sm:px-2 py-0.5 flex items-center gap-1">
                <Megaphone className="h-2.5 w-2.5" /> CTA
              </span>
            )}

            {link.routing?.passwordProtected && (
              <span className="text-[9.5px] sm:text-[10px] font-black uppercase text-purple-700 bg-purple-50 border border-purple-200 rounded-md px-1.5 sm:px-2 py-0.5 flex items-center gap-1">
                <Lock className="h-2.5 w-2.5" /> PIN
              </span>
            )}

            {isExpired && (
              <span className="text-[9.5px] sm:text-[10px] font-black uppercase text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-1.5 sm:px-2 py-0.5 flex items-center gap-1">
                <Clock className="h-2.5 w-2.5" /> Expired
              </span>
            )}

            {Boolean(link.utm?.campaign || link.utm?.source) && (
              <span className="text-[9.5px] sm:text-[10px] font-black uppercase text-blue-700 bg-blue-50 border border-blue-200 rounded-md px-1.5 sm:px-2 py-0.5 flex items-center gap-1">
                <Tag className="h-2.5 w-2.5" /> UTM
              </span>
            )}

            {Boolean(link.retargeting?.affiliateTag) && (
              <span className="text-[9.5px] sm:text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-1.5 sm:px-2 py-0.5 flex items-center gap-1">
                <Target className="h-2.5 w-2.5" /> Tag
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 truncate">
            <span className="font-bold text-zinc-700 shrink-0 text-[11px]">URL:</span>
            <span className="truncate font-mono text-[11.5px]">{link.originalUrl}</span>
          </div>

          {link.title && (
            <div className="text-[11.5px] font-bold text-zinc-700 mt-1 truncate">
              {link.title}
            </div>
          )}
        </div>
      </div>

      {/* Right: Quick Action Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 pt-2.5 md:pt-0 border-t md:border-t-0 border-[#f0eee6] w-full md:w-auto justify-between md:justify-end">
        <button
          onClick={() => onCopy(link.shortCode, link.customDomain)}
          className="flex-1 md:flex-initial py-2 px-2.5 md:p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] hover:bg-white hover:border-[#2c35af] text-zinc-700 hover:text-black transition active:scale-95 cursor-pointer shadow-2xs flex items-center justify-center gap-1.5 text-[11.5px] font-bold"
          title="Copy Short Link"
        >
          {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[3]" /> : <Copy className="h-3.5 w-3.5" />}
          <span className="md:hidden">{isCopied ? "Copied" : "Copy"}</span>
        </button>

        <button
          onClick={() => onEdit(link)}
          className="flex-1 md:flex-initial py-2 px-2.5 md:p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] hover:bg-white hover:border-[#2c35af] text-zinc-700 hover:text-[#2c35af] transition active:scale-95 cursor-pointer shadow-2xs flex items-center justify-center gap-1.5 text-[11.5px] font-bold"
          title="Edit Target & Smart Rules"
        >
          <Edit3 className="h-3.5 w-3.5" />
          <span>Edit</span>
        </button>

        <button
          onClick={() => onQr(link)}
          className="p-2 md:p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] hover:bg-white hover:border-[#2c35af] text-zinc-700 hover:text-black transition active:scale-95 cursor-pointer shadow-2xs shrink-0 flex items-center justify-center"
          title="Download 1200px QR Code"
        >
          <QrCode className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#2c35af]" />
        </button>

        <button
          onClick={() => onAnalytics(link.shortCode)}
          className="p-2 md:p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] hover:bg-white hover:border-[#2c35af] text-zinc-700 hover:text-black transition active:scale-95 cursor-pointer shadow-2xs shrink-0 flex items-center justify-center"
          title="View Analytics"
        >
          <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-zinc-600" />
        </button>

        <button
          onClick={() => onDelete(link.shortCode)}
          className="p-2 md:p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] hover:bg-red-50 hover:border-red-300 text-zinc-400 hover:text-red-600 transition active:scale-95 cursor-pointer shadow-2xs shrink-0 flex items-center justify-center"
          title="Delete Link"
        >
          <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>
    </div>
  );
};

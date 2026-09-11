"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Share2,
  Check,
  Globe,
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  ShieldCheck,
  Link2,
} from "lucide-react";
import {
  YoutubeLogo,
  InstagramLogo,
  TelegramLogo,
  SpotifyLogo,
  WhatsAppLogo,
  TwitterXLogo,
  FacebookLogo,
} from "@/frontend/shared/icons/PlatformIcons";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

export interface BioPageProps {
  bio: {
    username: string;
    displayName: string;
    bio?: string;
    avatarUrl?: string;
    theme?: "royal_blue" | "glass_dark" | "clay_light" | "emerald" | "sunset";
    socialLinks: Array<{ platform: string; url: string; handle?: string }>;
    customLinks: Array<{
      id: string;
      title: string;
      url: string;
      isHighlighted?: boolean;
      clicks?: number;
    }>;
  };
}

const THEMES = {
  royal_blue: {
    bg: "bg-[#0b0f19] text-white",
    card: "bg-white/[0.06] hover:bg-white/[0.1] border-white/10 text-white shadow-xs",
    cardHighlight: "bg-[#2c35af] hover:bg-[#343ebb] border-transparent text-white shadow-sm",
    badge: "bg-[#2c35af] text-white",
    avatarRing: "ring-1 ring-white/20",
    socialBtn: "bg-white/[0.06] hover:bg-white/[0.1] border-white/10 text-white shadow-xs",
  },
  glass_dark: {
    bg: "bg-black text-white",
    card: "bg-zinc-900/80 hover:bg-zinc-900 border-zinc-800/80 text-zinc-100 shadow-xs",
    cardHighlight: "bg-zinc-100 hover:bg-white border-transparent text-black shadow-sm font-semibold",
    badge: "bg-zinc-100 text-black",
    avatarRing: "ring-1 ring-zinc-800",
    socialBtn: "bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800/80 text-zinc-300 shadow-xs",
  },
  clay_light: {
    bg: "bg-[#fbfaf8] text-[#121316]",
    card: "bg-white hover:bg-[#f7f5ef] border-[#e8e6df] text-[#121316] shadow-[0_1px_2px_rgba(0,0,0,0.03)]",
    cardHighlight: "bg-[#121316] hover:bg-black border-transparent text-white shadow-sm font-semibold",
    badge: "bg-[#121316] text-white",
    avatarRing: "ring-1 ring-black/10",
    socialBtn: "bg-white hover:bg-[#f7f5ef] border-[#e8e6df] text-[#121316] shadow-xs",
  },
  emerald: {
    bg: "bg-[#07130e] text-emerald-50",
    card: "bg-emerald-950/40 hover:bg-emerald-950/60 border-emerald-900/40 text-emerald-100 shadow-xs",
    cardHighlight: "bg-emerald-500 hover:bg-emerald-400 border-transparent text-emerald-950 shadow-sm font-semibold",
    badge: "bg-emerald-500 text-emerald-950",
    avatarRing: "ring-1 ring-emerald-800/40",
    socialBtn: "bg-emerald-950/40 hover:bg-emerald-900/40 border-emerald-900/40 text-emerald-200 shadow-xs",
  },
  sunset: {
    bg: "bg-[#120a14] text-rose-50",
    card: "bg-white/[0.06] hover:bg-white/[0.1] border-white/10 text-rose-100 shadow-xs",
    cardHighlight: "bg-gradient-to-r from-rose-500 to-amber-500 border-transparent text-white shadow-sm font-semibold",
    badge: "bg-rose-500 text-white",
    avatarRing: "ring-1 ring-rose-800/30",
    socialBtn: "bg-white/[0.06] hover:bg-white/[0.1] border-white/10 text-rose-200 shadow-xs",
  },
};

const getLinkDetails = (url: string) => {
  let domain = "";
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    domain = parsed.hostname.replace(/^www\./, "");
  } catch {
    domain = "";
  }

  const d = domain.toLowerCase();
  let icon = <Link2 className="h-4 w-4 opacity-70" />;

  if (d.includes("youtube") || d.includes("youtu.be")) {
    icon = <YoutubeLogo className="h-4 w-4" />;
  } else if (d.includes("instagram")) {
    icon = <InstagramLogo className="h-4 w-4" />;
  } else if (d.includes("spotify")) {
    icon = <SpotifyLogo className="h-4 w-4 text-emerald-500" />;
  } else if (d.includes("x.com") || d.includes("twitter")) {
    icon = <TwitterXLogo className="h-3.5 w-3.5" />;
  } else if (d.includes("facebook")) {
    icon = <FacebookLogo className="h-4 w-4 text-blue-600" />;
  } else if (d.includes("github")) {
    icon = <Github className="h-4 w-4" />;
  } else if (d.includes("linkedin")) {
    icon = <Linkedin className="h-4 w-4 text-blue-500" />;
  }

  return { domain, icon };
};

export const PublicBioPage: React.FC<BioPageProps> = ({ bio }) => {
  const [copied, setCopied] = useState(false);
  const theme = THEMES[bio.theme || "royal_blue"] || THEMES.royal_blue;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${bio.displayName} on SnapLink`, url });
        return;
      } catch {}
    }
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkClick = (linkId: string, targetUrl: string) => {
    fetch(`/api/bio/${bio.username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkId }),
    }).catch(() => {});
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "youtube": return <YoutubeLogo className="h-4 w-4 text-red-500" />;
      case "instagram": return <InstagramLogo className="h-4 w-4 text-pink-500" />;
      case "telegram": return <TelegramLogo className="h-4 w-4 text-sky-400" />;
      case "spotify": return <SpotifyLogo className="h-4 w-4 text-emerald-400" />;
      case "whatsapp": return <WhatsAppLogo className="h-4 w-4 text-emerald-500" />;
      case "x": return <TwitterXLogo className="h-4 w-4" />;
      case "facebook": return <FacebookLogo className="h-4 w-4 text-blue-600" />;
      case "github": return <Github className="h-4 w-4" />;
      case "linkedin": return <Linkedin className="h-4 w-4 text-blue-400" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-6 transition-colors duration-300 ${theme.bg}`}>
      {/* Top Share Button */}
      <header className="w-full max-w-md flex justify-end pt-2 pb-4">
        <button
          onClick={handleShare}
          className={`p-2.5 rounded-full border backdrop-blur-md transition active:scale-95 cursor-pointer flex items-center gap-1.5 text-xs font-bold ${theme.socialBtn}`}
          title="Share Bio Page"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
          <span className="text-[11px] font-mono">{copied ? "Copied!" : "Share"}</span>
        </button>
      </header>

      {/* Profile Header */}
      <main className="w-full max-w-md flex-1 flex flex-col items-center text-center">
        <div className="relative mb-3">
          {bio.avatarUrl ? (
            <img
              src={bio.avatarUrl}
              alt={bio.displayName}
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ${theme.avatarRing}`}
            />
          ) : (
            <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#2c35af] to-purple-600 flex items-center justify-center text-3xl font-black text-white ${theme.avatarRing}`}>
              {bio.displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="absolute bottom-1 right-1 p-1 bg-white rounded-full shadow-md" title="Verified SnapLink Creator">
            <ShieldCheck className="h-4 w-4 text-[#2c35af]" />
          </div>
        </div>

        {/* Single-line Display Name */}
        <h1
          title={bio.displayName}
          className="text-xl sm:text-2xl font-bold tracking-tight max-w-full truncate whitespace-nowrap overflow-hidden text-center px-2"
        >
          {bio.displayName}
        </h1>
        <p className="text-[12px] font-mono opacity-70 mb-2 max-w-full truncate text-center">@{bio.username}</p>

        {bio.bio && (
          <p
            style={{ wordBreak: "break-all", overflowWrap: "break-word", whiteSpace: "pre-wrap" }}
            className="text-[13px] leading-relaxed opacity-90 max-w-xs mb-4 break-all whitespace-pre-wrap text-center"
          >
            {bio.bio}
          </p>
        )}

        {/* Social Icons Bar */}
        {bio.socialLinks && bio.socialLinks.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-full px-2">
            {bio.socialLinks.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.handle || s.platform}
                className={`max-w-[160px] px-3 py-1.5 rounded-full border transition-all active:scale-95 shadow-sm flex items-center gap-1.5 overflow-hidden ${theme.socialBtn}`}
                aria-label={s.platform}
              >
                <span className="shrink-0">{renderSocialIcon(s.platform)}</span>
                {s.handle && (
                  <span className="truncate max-w-[110px] text-[11px] font-bold tracking-wide pr-1 select-none">
                    {s.handle.startsWith("@") || s.handle.startsWith("/")
                      ? s.handle
                      : `@${s.handle}`}
                  </span>
                )}
              </a>
            ))}
          </div>
        )}

        {/* Links List */}
        <div className="w-full space-y-3.5">
          {bio.customLinks && bio.customLinks.length > 0 ? (
            bio.customLinks.map((link) => {
              const isHighlight = link.isHighlighted;
              const { domain, icon } = getLinkDetails(link.url);
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id, link.url)}
                  className={`w-full p-3.5 px-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all active:scale-[0.98] cursor-pointer group shadow-xs hover:shadow-md ${
                    isHighlight ? theme.cardHighlight : theme.card
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                    {icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="truncate font-semibold text-[14px] tracking-tight leading-tight">
                      {link.title}
                    </p>
                    {domain && (
                      <p className="truncate text-[11px] font-mono opacity-50 mt-0.5">
                        {domain}
                      </p>
                    )}
                  </div>

                  <div className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <ArrowUpRight className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-6 rounded-2xl border border-dashed border-white/20 text-xs opacity-60">
              No public links published yet.
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-md py-6 text-center text-xs opacity-60 font-medium">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 hover:opacity-100 transition font-mono"
        >
          <span>⚡ Created with</span>
          <span className="font-bold underline">{BRAND_CONFIG.name}</span>
        </Link>
      </footer>
    </div>
  );
};

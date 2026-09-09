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
} from "lucide-react";
import {
  YoutubeLogo,
  InstagramLogo,
  TelegramLogo,
  SpotifyLogo,
  WhatsAppLogo,
} from "@/frontend/shared/icons/PlatformIcons";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

export interface BioPageProps {
  bio: {
    username: string;
    displayName: string;
    bio?: string;
    avatarUrl?: string;
    theme?: "royal_blue" | "glass_dark" | "clay_light" | "emerald" | "sunset";
    socialLinks: Array<{ platform: string; url: string }>;
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
    bg: "bg-gradient-to-b from-[#101438] via-[#0b0e29] to-[#060817] text-white",
    card: "bg-white/10 hover:bg-white/15 border-white/15 hover:border-[#ccff00]/60 text-white shadow-lg",
    cardHighlight: "bg-[#2c35af] hover:bg-[#3b47db] border-[#ccff00]/80 text-white shadow-xl ring-2 ring-[#ccff00]/30",
    badge: "bg-[#ccff00] text-black",
    avatarRing: "ring-4 ring-[#2c35af]/80 shadow-indigo-500/20",
    socialBtn: "bg-white/10 hover:bg-white/20 border-white/15 text-white",
  },
  glass_dark: {
    bg: "bg-zinc-950 text-white",
    card: "bg-zinc-900/80 hover:bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-white shadow-md",
    cardHighlight: "bg-gradient-to-r from-zinc-800 to-zinc-900 border-white/30 text-white shadow-xl ring-2 ring-white/20",
    badge: "bg-white text-black",
    avatarRing: "ring-4 ring-zinc-700 shadow-black/40",
    socialBtn: "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300",
  },
  clay_light: {
    bg: "bg-[#f5f4ef] text-[#121316]",
    card: "bg-white hover:bg-[#faf9f5] border-[#e7e5dc] hover:border-[#2c35af] text-[#121316] shadow-sm",
    cardHighlight: "bg-[#2c35af] hover:bg-[#232b91] border-transparent text-white shadow-lg",
    badge: "bg-[#ccff00] text-black",
    avatarRing: "ring-4 ring-white shadow-zinc-400/30",
    socialBtn: "bg-white hover:bg-[#ebe8dc] border-[#e7e5dc] text-zinc-700",
  },
  emerald: {
    bg: "bg-gradient-to-b from-[#06241a] via-[#041710] to-[#020b08] text-white",
    card: "bg-emerald-950/60 hover:bg-emerald-900/60 border-emerald-800/40 hover:border-emerald-500/60 text-white shadow-md",
    cardHighlight: "bg-emerald-700 hover:bg-emerald-600 border-emerald-400 text-white shadow-xl ring-2 ring-emerald-400/30",
    badge: "bg-emerald-300 text-emerald-950",
    avatarRing: "ring-4 ring-emerald-600 shadow-emerald-900/40",
    socialBtn: "bg-emerald-950/80 hover:bg-emerald-900 border-emerald-800/50 text-emerald-200",
  },
  sunset: {
    bg: "bg-gradient-to-b from-[#240e2b] via-[#17081c] to-[#0a030d] text-white",
    card: "bg-white/10 hover:bg-white/15 border-white/15 hover:border-rose-400 text-white shadow-md",
    cardHighlight: "bg-gradient-to-r from-rose-700 to-amber-700 border-rose-400 text-white shadow-xl ring-2 ring-rose-400/30",
    badge: "bg-amber-300 text-amber-950",
    avatarRing: "ring-4 ring-rose-500 shadow-rose-900/40",
    socialBtn: "bg-white/10 hover:bg-white/20 border-white/15 text-rose-200",
  },
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
      case "twitter": return <Twitter className="h-4 w-4 text-sky-400" />;
      case "github": return <Github className="h-4 w-4" />;
      case "linkedin": return <Linkedin className="h-4 w-4 text-blue-400" />;
      default: return <Globe className="h-4 w-4 text-zinc-400" />;
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

        <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1.5">
          {bio.displayName}
        </h1>
        <p className="text-[12px] font-mono opacity-70 mb-2">@{bio.username}</p>

        {bio.bio && (
          <p className="text-[13px] leading-relaxed opacity-90 max-w-xs mb-4">
            {bio.bio}
          </p>
        )}

        {/* Social Icons Bar */}
        {bio.socialLinks && bio.socialLinks.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {bio.socialLinks.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-full border transition-all active:scale-95 shadow-sm ${theme.socialBtn}`}
                aria-label={s.platform}
              >
                {renderSocialIcon(s.platform)}
              </a>
            ))}
          </div>
        )}

        {/* Links List */}
        <div className="w-full space-y-3.5">
          {bio.customLinks && bio.customLinks.length > 0 ? (
            bio.customLinks.map((link) => {
              const isHighlight = link.isHighlighted;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id, link.url)}
                  className={`w-full p-4 rounded-2xl border text-left font-bold text-[14px] flex items-center justify-between gap-3 transition-all active:scale-[0.98] cursor-pointer group ${
                    isHighlight ? theme.cardHighlight : theme.card
                  }`}
                >
                  <span className="truncate flex-1">{link.title}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {isHighlight && (
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md font-extrabold ${theme.badge}`}>
                        Featured
                      </span>
                    )}
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

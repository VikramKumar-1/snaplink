"use client";

import React from "react";
import { Smartphone, ArrowUpRight, Github, Linkedin, Globe, Link2, ShieldCheck } from "lucide-react";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";
import {
  YoutubeLogo,
  InstagramLogo,
  TelegramLogo,
  SpotifyLogo,
  WhatsAppLogo,
  TwitterXLogo,
  FacebookLogo,
} from "@/frontend/shared/icons/PlatformIcons";

interface Props {
  username: string;
  displayName: string;
  bioText: string;
  avatarUrl: string;
  customLinks: Array<{ id: string; title: string; url: string; isHighlighted?: boolean }>;
  socialLinks: Array<{ platform: string; url: string; handle?: string }>;
  theme?: "royal_blue" | "glass_dark" | "clay_light" | "emerald" | "sunset";
}

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

const THEMES = {
  royal_blue: {
    bg: "bg-[#0b1026]",
    text: "text-white",
    subtext: "text-zinc-200",
    card: "bg-white/[0.08] hover:bg-white/[0.12] border-white/15 text-white shadow-xs",
    cardHighlight: "bg-[#2c35af] hover:bg-[#343ebb] border-transparent text-white shadow-sm",
    avatarRing: "ring-1 ring-white/20",
    socialBtn: "bg-white/[0.08] hover:bg-white/[0.12] border-white/15 text-white shadow-xs",
  },
  glass_dark: {
    bg: "bg-black",
    text: "text-white",
    subtext: "text-zinc-400",
    card: "bg-zinc-900/80 hover:bg-zinc-900 border-zinc-800/80 text-zinc-100 shadow-xs",
    cardHighlight: "bg-zinc-100 hover:bg-white border-transparent text-black shadow-sm font-semibold",
    avatarRing: "ring-1 ring-zinc-800",
    socialBtn: "bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800/80 text-zinc-300 shadow-xs",
  },
  clay_light: {
    bg: "bg-[#fbfaf8]",
    text: "text-[#121316]",
    subtext: "text-zinc-600",
    card: "bg-white hover:bg-[#f7f5ef] border-[#e8e6df] text-[#121316] shadow-[0_1px_2px_rgba(0,0,0,0.03)]",
    cardHighlight: "bg-[#121316] hover:bg-black border-transparent text-white shadow-sm font-semibold",
    avatarRing: "ring-1 ring-black/10",
    socialBtn: "bg-white hover:bg-[#f7f5ef] border-[#e8e6df] text-[#121316] shadow-xs",
  },
  emerald: {
    bg: "bg-[#07130e]",
    text: "text-emerald-50",
    subtext: "text-emerald-200/80",
    card: "bg-emerald-950/40 hover:bg-emerald-950/60 border-emerald-900/40 text-emerald-100 shadow-xs",
    cardHighlight: "bg-emerald-500 hover:bg-emerald-400 border-transparent text-emerald-950 shadow-sm font-semibold",
    avatarRing: "ring-1 ring-emerald-800/40",
    socialBtn: "bg-emerald-950/40 hover:bg-emerald-900/40 border-emerald-900/40 text-emerald-200 shadow-xs",
  },
  sunset: {
    bg: "bg-[#120a14]",
    text: "text-rose-50",
    subtext: "text-rose-200/80",
    card: "bg-white/[0.06] hover:bg-white/[0.1] border-white/10 text-rose-100 shadow-xs",
    cardHighlight: "bg-gradient-to-r from-rose-500 to-amber-500 border-transparent text-white shadow-sm font-semibold",
    avatarRing: "ring-1 ring-rose-800/30",
    socialBtn: "bg-white/[0.06] hover:bg-white/[0.1] border-white/10 text-rose-200 shadow-xs",
  },
};

export const BioPhonePreview: React.FC<Props> = ({
  username,
  displayName,
  bioText,
  avatarUrl,
  customLinks,
  socialLinks,
  theme = "royal_blue",
}) => {
  const activeTheme = THEMES[theme] || THEMES.royal_blue;

  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "youtube": return <YoutubeLogo className="h-3.5 w-3.5 text-red-500" />;
      case "instagram": return <InstagramLogo className="h-3.5 w-3.5 text-pink-500" />;
      case "telegram": return <TelegramLogo className="h-3.5 w-3.5 text-sky-400" />;
      case "spotify": return <SpotifyLogo className="h-3.5 w-3.5 text-emerald-400" />;
      case "whatsapp": return <WhatsAppLogo className="h-3.5 w-3.5 text-emerald-500" />;
      case "x": return <TwitterXLogo className="h-3.5 w-3.5" />;
      case "facebook": return <FacebookLogo className="h-3.5 w-3.5 text-blue-600" />;
      case "github": return <Github className="h-3.5 w-3.5" />;
      case "linkedin": return <Linkedin className="h-3.5 w-3.5 text-blue-400" />;
      default: return <Globe className="h-3.5 w-3.5" />;
    }
  };

  return (
    <div className="lg:col-span-5 sticky top-20 flex flex-col items-center select-none py-2">
      {/* Live Preview Status Pill */}
      <div className="text-center mb-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
            <Smartphone className="h-3.5 w-3.5 text-[#2c35af]" />
            iPhone 16 Pro • Live Preview
          </span>
        </div>
      </div>

      {/* Realistic Titanium iPhone 16 Pro Chassis */}
      <div className="relative w-[308px] rounded-[52px] p-[10px] bg-gradient-to-b from-[#3a3f4c] via-[#20232a] to-[#14161b] border-2 border-[#4a5060] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.15),0_10px_25px_-5px_rgba(0,0,0,0.4)]">
        
        {/* Antenna bands (Authentic Apple Chassis Details) */}
        <div className="absolute -left-[2px] top-[55px] w-[2px] h-[3px] bg-[#14161b]" />
        <div className="absolute -left-[2px] bottom-[55px] w-[2px] h-[3px] bg-[#14161b]" />
        <div className="absolute -right-[2px] top-[55px] w-[2px] h-[3px] bg-[#14161b]" />
        <div className="absolute -right-[2px] bottom-[55px] w-[2px] h-[3px] bg-[#14161b]" />

        {/* Hardware side buttons */}
        {/* Action Button (Left) */}
        <div className="absolute -left-[5px] top-[80px] w-[4px] h-[22px] bg-gradient-to-r from-[#4a5060] to-[#252830] rounded-l-sm border-l border-white/25 shadow-xs" />
        {/* Volume Up (Left) */}
        <div className="absolute -left-[5px] top-[118px] w-[4px] h-[40px] bg-gradient-to-r from-[#4a5060] to-[#252830] rounded-l-sm border-l border-white/25 shadow-xs" />
        {/* Volume Down (Left) */}
        <div className="absolute -left-[5px] top-[170px] w-[4px] h-[40px] bg-gradient-to-r from-[#4a5060] to-[#252830] rounded-l-sm border-l border-white/25 shadow-xs" />
        {/* Power / Lock Button (Right) */}
        <div className="absolute -right-[5px] top-[130px] w-[4px] h-[55px] bg-gradient-to-l from-[#4a5060] to-[#252830] rounded-r-sm border-r border-white/25 shadow-xs" />

        {/* Speaker Ear-piece Micro Grill */}
        <div className="w-12 h-1 bg-[#101216] rounded-full mx-auto -mt-0.5 mb-1 border border-white/5 shadow-inner" />

        {/* Inner Screen Display Viewport */}
        <div className={`relative w-full h-[570px] rounded-[42px] overflow-hidden flex flex-col transition-colors duration-300 ${activeTheme.bg} ${activeTheme.text}`}>
          
          {/* Glass Gloss Sheen Highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-[42px] bg-gradient-to-tr from-transparent via-white/[0.015] to-white/[0.05] z-20" />

          {/* Realistic Apple Dynamic Island (Centered floating pill) */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[92px] h-[25px] bg-black rounded-full flex items-center justify-between px-2.5 z-30 shadow-[0_2px_8px_rgba(0,0,0,0.9)] ring-1 ring-white/10 pointer-events-none">
            {/* TrueDepth Sensor Pill */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#0a0d18] border border-[#192238] flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-[#0d2347]" />
            </div>
            {/* FaceTime Camera Lens with reflection */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#0a0c14] border border-[#1c2230] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0b2848] opacity-90 shadow-inner" />
            </div>
          </div>

          {/* iOS Status Bar */}
          <div className="w-full h-8 pt-1.5 px-6 flex items-center justify-between text-[10.5px] font-bold select-none shrink-0 z-20">
            {/* Clock */}
            <span className="tracking-tight">9:41</span>

            {/* iOS Status Icons */}
            <div className="flex items-center gap-1.5">
              {/* Cellular Signal Bars */}
              <div className="flex items-end gap-[1.5px] h-2.5">
                <span className="w-[2.5px] h-1 bg-current rounded-[0.5px]" />
                <span className="w-[2.5px] h-1.5 bg-current rounded-[0.5px]" />
                <span className="w-[2.5px] h-2 bg-current rounded-[0.5px]" />
                <span className="w-[2.5px] h-2.5 bg-current rounded-[0.5px]" />
              </div>
              {/* Wi-Fi Icon */}
              <svg className="w-3 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
              </svg>
              {/* Battery Pill */}
              <div className="flex items-center">
                <div className="w-4 h-2.5 rounded-[2.5px] border-[1.2px] border-current p-[1px] flex items-center">
                  <div className="h-full w-[80%] bg-current rounded-[1px]" />
                </div>
                <div className="w-[1.5px] h-1 bg-current rounded-r-xs -ml-[0.5px]" />
              </div>
            </div>
          </div>

          {/* Screen Scrollable Body (Optimized Clean Scroll) */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-3.5 pt-2 pb-2 overscroll-contain flex flex-col items-center text-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            
            {/* Profile Avatar & Header */}
            <div className="flex flex-col items-center w-full max-w-[220px] mx-auto shrink-0 mt-1">
              <div className="relative mb-2 shrink-0">
                <div className={`w-14 h-14 rounded-full overflow-hidden bg-gradient-to-tr from-[#2c35af] to-purple-600 flex items-center justify-center text-sm font-bold shadow-xs ${activeTheme.avatarRing}`}>
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : displayName ? (
                    <span className="font-semibold text-white">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <span className="text-white/80">@</span>
                  )}
                </div>
                {/* Verified Shield Badge */}
                <div className="absolute -bottom-0.5 -right-0.5 p-0.5 bg-white rounded-full shadow-xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#2c35af]" />
                </div>
              </div>

              {/* Single-Line Display Name (Strictly no multi-line wrapping) */}
              <h3
                title={displayName || "Your Name"}
                className={`font-bold text-[14px] tracking-tight ${activeTheme.text} leading-tight w-full max-w-[220px] text-center truncate whitespace-nowrap overflow-hidden px-1`}
              >
                {displayName || "Your Name"}
              </h3>
              
              {/* Username Handle */}
              <p className="text-[10px] font-mono opacity-60 mt-0.5 w-full max-w-[220px] truncate text-center px-1">
                @{username || "username"}
              </p>

              {/* Bio Description (Strictly capped at 90 chars, defensive word-break) */}
              {bioText && (
                <p
                  style={{
                    width: "100%",
                    maxWidth: "220px",
                    wordBreak: "break-all",
                    overflowWrap: "anywhere",
                    whiteSpace: "pre-wrap",
                    display: "block",
                  }}
                  className={`text-[11px] ${activeTheme.subtext} leading-snug w-full max-w-[220px] mt-1.5 font-normal text-center break-all whitespace-pre-wrap px-1`}
                >
                  {bioText}
                </p>
              )}
            </div>
              
            {/* Social Chips (Micro Pills with Overflow Protection & Truncate) */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5 w-full shrink-0 px-1">
                {socialLinks.filter((s) => s.platform).map((s, idx) => (
                  <div
                    key={idx}
                    title={s.handle || s.platform}
                    className={`max-w-[120px] px-2 py-0.5 rounded-full border text-[10px] font-medium flex items-center gap-1 shadow-xs transition-all overflow-hidden shrink-0 ${activeTheme.socialBtn}`}
                  >
                    <span className="shrink-0">{renderSocialIcon(s.platform)}</span>
                    {s.handle && (
                      <span className="truncate max-w-[85px] tracking-tight font-medium select-none">
                        {s.handle.startsWith("@") || s.handle.startsWith("/")
                          ? s.handle
                          : `@${s.handle}`}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Custom Links (Compact Cards with Favicons & Domains) */}
            <div className="w-full space-y-1.5 mt-3 flex-1">
              {customLinks.filter((l) => l.title).length > 0 ? (
                customLinks
                  .filter((l) => l.title)
                  .map((l) => {
                    const { domain, icon } = getLinkDetails(l.url);
                    return (
                      <div
                        key={l.id}
                        className={`group w-full p-2 px-2.5 rounded-xl border text-left flex items-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98] shadow-xs cursor-pointer ${
                          l.isHighlighted ? activeTheme.cardHighlight : activeTheme.card
                        }`}
                      >
                        {/* Favicon / Platform Badge */}
                        <div className="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                          {icon}
                        </div>

                        {/* Title & Domain Subtitle */}
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-semibold text-[11.5px] tracking-tight leading-tight">
                            {l.title}
                          </p>
                          {domain && (
                            <p className="truncate text-[9px] font-mono opacity-50 mt-0.5">
                              {domain}
                            </p>
                          )}
                        </div>

                        {/* Arrow Action Indicator */}
                        <div className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <ArrowUpRight className="h-3 w-3 opacity-60" />
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="p-3.5 rounded-xl border border-dashed border-current/15 opacity-40 text-[10px] font-mono text-center my-3">
                  No links added yet
                </div>
              )}
            </div>

            {/* Branding & iOS Home Indicator Bar */}
            <div className="mt-auto pt-3 pb-1 flex flex-col items-center gap-1 shrink-0 select-none">
              <span className="text-[8.5px] opacity-40 font-mono tracking-wider">
                {`${BRAND_CONFIG.name.toLowerCase()}.in/${username || "you"}`}
              </span>
              {/* Home Indicator */}
              <div className="w-24 h-1 bg-current opacity-30 rounded-full" />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

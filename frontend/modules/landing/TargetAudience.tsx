"use client";

import React from "react";
import { YoutubeLogo, AmazonLogo, TelegramLogo } from "@/frontend/shared/icons/PlatformIcons";
import { QrCode } from "lucide-react";

export const TargetAudience: React.FC = () => {
  const audiences = [
    {
      title: "YouTubers & Video Creators",
      role: "Grow Subscribers 5.4x Faster",
      icon: YoutubeLogo,
      color: "text-red-600 bg-red-50 border-red-200",
      highlight: "1-Tap Subscribe",
      desc: "Stop losing 80% of your Instagram Bio and Story viewers to the webview login wall. Let followers Subscribe & Like with 1 tap inside the official YouTube app.",
    },
    {
      title: "Amazon Affiliate Marketers",
      role: "Boost Commission by 300%",
      icon: AmazonLogo,
      color: "text-[#121316] bg-amber-50 border-amber-200",
      highlight: "1-Click UPI & Cookies",
      desc: "Webviews frequently drop affiliate cookies. By launching the official Amazon Shopping App, users purchase using their saved UPI and 1-Click Buy instantly.",
    },
    {
      title: "Community & Course Creators",
      role: "Zero Drop-Off Conversions",
      icon: TelegramLogo,
      color: "text-sky-700 bg-sky-50 border-sky-200",
      highlight: "Direct Channel Join",
      desc: "Direct followers to VIP Telegram channels, exclusive Instagram posts, and Spotify podcasts without requiring them to log in again.",
    },
    {
      title: "Retail Brands & Agencies",
      role: "Offline-to-Online QR Codes",
      icon: QrCode,
      color: "text-[#2c35af] bg-indigo-50 border-indigo-200",
      highlight: "1200px Dynamic QR",
      desc: "Download high-resolution 1200px dynamic QR codes for product packaging, flyers, restaurant tables, and event banners with zero watermarks.",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-[24px] sm:text-[34px] font-bold tracking-tight text-[#121316] uppercase leading-tight max-w-4xl mx-auto truncate sm:whitespace-nowrap">
          Who Wins With <span className="text-[#2c35af]">SmartDeepLink?</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {audiences.map((a, i) => {
          const Icon = a.icon;
          return (
            <div
              key={i}
              className="p-7 rounded-[28px] clay-card-glass flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className={`p-3 rounded-2xl border ${a.color} clay-icon-box shrink-0`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-[16.5px] font-bold text-[#121316] tracking-tight group-hover:text-[#2c35af] transition-colors">
                        {a.title}
                      </h3>
                      <div className="text-[12.5px] font-semibold text-zinc-500">
                        {a.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] font-bold px-3 py-1 rounded-full pill-lime text-black tracking-normal clay-badge">
                      {a.highlight}
                    </span>
                  </div>
                </div>

                <p className="text-[13.5px] text-zinc-600 leading-relaxed font-medium">
                  {a.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

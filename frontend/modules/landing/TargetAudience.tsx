"use client";

import React from "react";
import { ShoppingBag, Youtube, Radio, QrCode } from "lucide-react";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

export const TargetAudience: React.FC = () => {
  const audiences = [
    {
      title: "Affiliate Marketers",
      role: "E-Commerce & Amazon Influencers",
      icon: ShoppingBag,
      color: "text-amber-600 bg-amber-50 border-amber-200",
      highlight: "+85% Checkout Rate",
      desc: "Stop losing affiliate commissions when Amazon/Myntra prompts followers to log into mobile web. Route them instantly into pre-authenticated native apps.",
    },
    {
      title: "Content Creators & YouTubers",
      role: "Channel Subscriptions & Engagement",
      icon: Youtube,
      color: "text-rose-600 bg-rose-50 border-rose-200",
      highlight: "1-Tap Subscribe",
      desc: "Drive bio clicks straight into the YouTube native app with auto-subscribe dialogs, retaining high-intent viewers instead of bouncing them to browser login screens.",
    },
    {
      title: "Podcasters & Community Leads",
      role: "Audience Growth & Group Invites",
      icon: Radio,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
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
        <h2 className="text-[clamp(12px,3.7vw,20px)] sm:text-[26px] md:text-[34px] font-bold tracking-tight text-[#121316] uppercase leading-tight max-w-4xl mx-auto whitespace-nowrap">
          Who Wins With <span className="text-[#2c35af]">{BRAND_CONFIG.name}?</span>
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

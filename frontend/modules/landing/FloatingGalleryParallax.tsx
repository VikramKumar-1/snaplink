"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  YoutubeLogo,
  InstagramLogo,
  AmazonLogo,
  TelegramLogo,
} from "@/frontend/shared/icons/PlatformIcons";
import {
  Smartphone,
  CheckCircle2,
  Bell,
  Play,
  Heart,
  MessageCircle,
} from "lucide-react";

export const FloatingGalleryParallax: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Spring physics for buttery-smooth non-jerky motion with optimized restDelta
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.01,
  });

  // Clear, distinct vertical parallax offsets that feel alive on scroll
  const yFarLeft = useTransform(smoothProgress, [0, 1], [60, -80]);
  const yLeft = useTransform(smoothProgress, [0, 1], [30, -45]);
  const yCenter = useTransform(smoothProgress, [0, 1], [0, -15]);
  const yRight = useTransform(smoothProgress, [0, 1], [30, -45]);
  const yFarRight = useTransform(smoothProgress, [0, 1], [60, -80]);

  return (
    <section ref={containerRef} className="w-full max-w-6xl mx-auto py-10 sm:py-16 px-4">
      {/* 5-PILLAR COMPACT GALLERY: BALANCED PROPORTIONS & CALM EDITORIAL TONE */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 min-h-[380px] sm:min-h-[450px] overflow-visible">
        
        {/* Pillar 1: YouTube (Slightly taller balanced card) */}
        <motion.div
          style={{ y: yFarLeft }}
          className="w-32 sm:w-40 md:w-48 h-[290px] sm:h-[340px] rounded-2xl bg-white border border-[#e4e2d8] p-3.5 sm:p-4 flex flex-col justify-between shadow-[0_8px_20px_-6px_rgba(0,0,0,0.06)] shrink-0 relative transform-gpu will-change-transform hover:border-red-400 transition-colors"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <YoutubeLogo className="h-8 w-8 shrink-0 drop-shadow-xs" />
            <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider bg-red-50 text-red-700 px-2 py-0.5 rounded-full border border-red-100">
              App
            </span>
          </div>

          {/* Player Mockup */}
          <div className="my-auto space-y-2.5">
            <div className="h-24 sm:h-28 rounded-xl bg-zinc-900 text-white flex flex-col items-center justify-center relative overflow-hidden">
              <div className="h-8 w-8 rounded-full bg-[#cc0000] text-white flex items-center justify-center shadow">
                <Play className="h-3.5 w-3.5 fill-white ml-0.5" />
              </div>
              <span className="text-[9.5px] font-mono text-zinc-400 mt-2">
                4K HDR Stream
              </span>
            </div>

            <div className="text-[12.5px] sm:text-[13px] font-bold text-[#121316] truncate leading-tight">
              Studio Setup 2026
            </div>
          </div>

          {/* Subscribed Footer */}
          <div className="p-2 rounded-xl bg-[#faf9f5] border border-[#e8e6dd] flex items-center justify-between text-[10.5px] font-bold">
            <div className="flex items-center gap-1.5 text-zinc-800">
              <Bell className="h-3 w-3 text-[#cc0000]" />
              <span>Subscribed</span>
            </div>
            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
              Active
            </span>
          </div>
        </motion.div>

        {/* Pillar 2: Instagram (Slightly taller balanced card) */}
        <motion.div
          style={{ y: yLeft }}
          className="w-36 sm:w-48 md:w-56 h-[330px] sm:h-[390px] rounded-2xl bg-white border border-[#e4e2d8] p-3.5 sm:p-5 flex flex-col justify-between shadow-[0_10px_24px_-6px_rgba(0,0,0,0.07)] shrink-0 relative transform-gpu will-change-transform hover:border-pink-400 transition-colors"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <InstagramLogo className="h-8 w-8 shrink-0 rounded-xl shadow-xs" />
              <div>
                <span className="text-[12.5px] sm:text-[13px] font-bold text-[#121316] block leading-tight">
                  Instagram
                </span>
                <span className="text-[10px] text-zinc-400 block">
                  @creator
                </span>
              </div>
            </div>
            <span className="h-2 w-2 rounded-full bg-[#E1306C]" />
          </div>

          {/* Preview Box */}
          <div className="my-auto rounded-xl bg-[#faf9f5] border border-[#e8e6dd] p-3 space-y-2.5">
            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium">
              <span className="text-[#2c35af] font-bold">Direct Reel</span>
              <span>1080p</span>
            </div>
            <div className="p-3 rounded-lg bg-white border border-[#e4e2d8] flex items-center justify-between text-[11px] font-bold">
              <span className="text-[#121316] truncate">Fall Collection Drop</span>
              <div className="flex items-center gap-1 text-rose-500 shrink-0">
                <Heart className="h-3 w-3 fill-rose-500" />
                <span className="text-[10px]">54k</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e8e6dd] text-center text-[10px] font-mono font-bold text-[#121316]">
            instagram://reel
          </div>
        </motion.div>

        {/* Pillar 3: CENTER HERO — iPhone Intent Engine (Focal Anchor Card) */}
        <motion.div
          style={{ y: yCenter }}
          className="w-48 sm:w-60 md:w-72 h-[380px] sm:h-[440px] rounded-[30px] sm:rounded-[36px] bg-[#2c35af] border-2 border-white text-white p-4 sm:p-6 flex flex-col justify-between shadow-[0_20px_45px_-6px_rgba(44,53,175,0.4)] relative shrink-0 z-20 transform-gpu will-change-transform"
        >
          {/* Top iPhone Dynamic Island */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="h-4 sm:h-4.5 w-20 sm:w-24 rounded-full bg-black border border-white/20 flex items-center justify-between px-2.5 mb-2.5 shadow-inner">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00] animate-pulse" />
              <div className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-white/60" />
                <span className="h-1 w-1 rounded-full bg-white/60" />
              </div>
            </div>

            <div className="flex items-center justify-between w-full text-[9.5px] sm:text-[10px] font-mono uppercase tracking-widest text-white/80 font-bold">
              <span>App Intent Router</span>
              <span className="text-[#ccff00] font-black">0s Delay</span>
            </div>
          </div>

          {/* Center Graphic */}
          <div className="my-auto space-y-3">
            {/* Old In-App Webview Trap */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-black/25 border border-white/15 flex items-center justify-between text-[10.5px] sm:text-[11px] font-medium text-white/90">
              <div className="flex items-center gap-1.5 text-rose-300 font-bold">
                <span className="h-3.5 w-3.5 rounded-full bg-rose-500/30 flex items-center justify-center text-[9px]">✕</span>
                <span>In-App Webview Trap</span>
              </div>
              <span className="text-rose-300 font-bold text-[9.5px] font-mono">85% Drop</span>
            </div>

            {/* SmartLink Direct */}
            <div className="p-3 rounded-2xl bg-white/15 border border-white/25 space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-[11px] sm:text-[12px] font-bold text-white">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5 text-[#ccff00]" />
                  <span>Opens Official App</span>
                </div>
                <span className="text-[#ccff00] text-[10px] font-mono font-bold">
                  Instant
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white text-[#121316] flex items-center justify-between text-[10.5px] sm:text-[11px] font-bold shadow-xs">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">Users Stay Logged In</span>
                </div>
                <span className="text-[9px] font-mono text-zinc-500">1-Tap</span>
              </div>
            </div>
          </div>

          {/* Bottom Headline */}
          <div className="pt-2.5 border-t border-white/20 text-center">
            <div className="text-[13.5px] sm:text-[15px] font-bold text-white uppercase tracking-tight leading-tight">
              Fans Stay Logged In. <br />
              <span className="text-[#ccff00] font-extrabold">Zero Bounce Rate.</span>
            </div>
          </div>
        </motion.div>

        {/* Pillar 4: Amazon (Slightly taller balanced card) */}
        <motion.div
          style={{ y: yRight }}
          className="w-36 sm:w-48 md:w-56 h-[330px] sm:h-[390px] rounded-2xl bg-white border border-[#e4e2d8] p-3.5 sm:p-5 flex flex-col justify-between shadow-[0_10px_24px_-6px_rgba(0,0,0,0.07)] shrink-0 relative transform-gpu will-change-transform hover:border-amber-400 transition-colors"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-white border border-amber-200/90 shadow-xs flex items-center justify-center p-1 shrink-0">
                <AmazonLogo className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[12.5px] sm:text-[13px] font-bold text-[#121316] block leading-tight">
                  Amazon
                </span>
                <span className="text-[10px] text-zinc-400 block">
                  1-Click Shop
                </span>
              </div>
            </div>
            <span className="text-[9px] font-bold uppercase bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-100">
              Prime
            </span>
          </div>

          {/* Product Deal */}
          <div className="my-auto rounded-xl bg-[#faf9f5] border border-[#e8e6dd] p-3 space-y-2.5">
            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium">
              <span className="text-zinc-700 font-bold">Cookies Saved</span>
              <span className="text-amber-600 font-bold">4.8 ★</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#e4e2d8] space-y-1.5">
              <div className="text-[11.5px] font-bold text-[#121316] truncate">Sony Headphones ANC</div>
              <div className="py-1 rounded bg-[#ff9900] text-black text-[9.5px] font-extrabold uppercase text-center">
                1-Click Buy with UPI
              </div>
            </div>
          </div>

          {/* Bottom Stat */}
          <div className="p-2 rounded-xl bg-[#faf9f5] border border-[#e8e6dd] text-center text-[10px] font-bold text-zinc-700">
            +300% Affiliate Retention
          </div>
        </motion.div>

        {/* Pillar 5: Telegram (Slightly taller balanced card) */}
        <motion.div
          style={{ y: yFarRight }}
          className="w-32 sm:w-40 md:w-48 h-[290px] sm:h-[340px] rounded-2xl bg-white border border-[#e4e2d8] p-3.5 sm:p-4 flex flex-col justify-between shadow-[0_8px_20px_-6px_rgba(0,0,0,0.06)] shrink-0 relative transform-gpu will-change-transform hover:border-sky-400 transition-colors"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="h-8 w-8 rounded-xl bg-[#229ed9] text-white flex items-center justify-center shadow-xs shrink-0">
              <TelegramLogo className="h-5 w-5" />
            </div>
            <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-100">
              tg://
            </span>
          </div>

          {/* Community Card */}
          <div className="my-auto space-y-2">
            <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e8e6dd] space-y-1 text-center">
              <div className="text-[#121316] font-bold text-[12px] truncate">
                Creator Community
              </div>
              <p className="text-[10px] text-zinc-500 font-mono">
                24.5k Members &middot; Online
              </p>
            </div>
          </div>

          {/* Join Button */}
          <div className="p-2 rounded-xl bg-[#229ed9] text-white text-center font-bold text-[10.5px] uppercase">
            Join Group
          </div>
        </motion.div>
      </div>
    </section>
  );
});

FloatingGalleryParallax.displayName = "FloatingGalleryParallax";


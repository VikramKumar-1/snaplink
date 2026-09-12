"use client";

import React from "react";
import { platformList } from "./parts/platformData";
import { PlatformCard } from "./parts/PlatformCard";
import { MorePlatformsBanner } from "./parts/MorePlatformsBanner";

export const SupportedPlatforms: React.FC = React.memo(() => (
  <section id="platforms" className="w-full max-w-6xl mx-auto px-4">
    <div className="text-center mb-8 sm:mb-10">
      <h2 className="text-[clamp(12px,3.7vw,20px)] sm:text-[26px] md:text-[34px] font-bold tracking-tight text-[#121316] uppercase leading-tight max-w-4xl mx-auto whitespace-nowrap">
        Crafted For Platforms <span className="text-[#2c35af]">You Love</span>
      </h2>
    </div>

    {/* 📱 Mobile: Horizontal Snap Carousel | 🖥️ Desktop: 3-Col Grid */}
    <div className="flex md:grid overflow-x-auto md:overflow-visible scrollbar-none snap-x snap-mandatory md:snap-none gap-4 md:gap-6 pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 md:grid-cols-2 lg:grid-cols-3">
      {platformList.map((platform) => (
        <PlatformCard key={platform.id} platform={platform} />
      ))}
    </div>
    <div className="md:hidden text-center text-[10.5px] font-mono text-zinc-400 font-bold uppercase tracking-wider mt-2 mb-4">
      ← Swipe to see all platforms →
    </div>

    <MorePlatformsBanner />
  </section>
));

SupportedPlatforms.displayName = "SupportedPlatforms";

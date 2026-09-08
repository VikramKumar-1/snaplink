"use client";

import React from "react";
import { platformList } from "./parts/platformData";
import { PlatformCard } from "./parts/PlatformCard";
import { MorePlatformsBanner } from "./parts/MorePlatformsBanner";

export const SupportedPlatforms: React.FC = React.memo(() => (
  <section id="platforms" className="w-full max-w-6xl mx-auto px-4">
    <div className="text-center mb-8 sm:mb-10">
      <h2 className="text-[24px] sm:text-[34px] font-bold tracking-tight text-[#121316] uppercase leading-tight max-w-4xl mx-auto">
        Crafted For Platforms <span className="text-[#2c35af]">You Love</span>
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {platformList.map((platform) => (
        <PlatformCard key={platform.id} platform={platform} />
      ))}
    </div>

    <MorePlatformsBanner />
  </section>
));

SupportedPlatforms.displayName = "SupportedPlatforms";

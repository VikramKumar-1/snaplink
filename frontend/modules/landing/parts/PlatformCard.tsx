"use client";

import React from "react";
import { PlatformItem } from "./platformData";
import { PlatformCardHeader } from "./PlatformCardHeader";
import { PlatformHandoffPill } from "./PlatformHandoffPill";
import { PlatformCardFooter } from "./PlatformCardFooter";

interface CardProps {
  platform: PlatformItem;
}

/** Tactile Claymorphism + Glassmorphism Platform Showcase Card */
export const PlatformCard: React.FC<CardProps> = React.memo(({ platform }) => (
  <div
    className={`w-[250px] sm:w-[270px] md:w-auto shrink-0 md:shrink snap-center p-4 sm:p-6 rounded-[22px] sm:rounded-[28px] clay-glass-hybrid ${platform.hoverGlow} flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 transform-gpu`}
  >
    <div>
      <PlatformCardHeader
        Icon={platform.icon}
        name={platform.name}
        category={platform.category}
        description={platform.description}
      />
      <PlatformHandoffPill
        sourceUrl={platform.sourceUrl}
        targetApp={platform.targetApp}
        accentColor={platform.accentColor}
      />
    </div>
    <PlatformCardFooter bottomStat={platform.bottomStat} />
  </div>
));

PlatformCard.displayName = "PlatformCard";

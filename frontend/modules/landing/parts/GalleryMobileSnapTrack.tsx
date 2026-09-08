"use client";

import React, { memo } from "react";
import { GalleryYouTubeCard } from "./GalleryYouTubeCard";
import { GalleryInstagramCard } from "./GalleryInstagramCard";
import { GalleryCenterHero } from "./GalleryCenterHero";
import { GalleryAmazonCard } from "./GalleryAmazonCard";
import { GalleryTelegramCard } from "./GalleryTelegramCard";

/** 📱 MOBILE TOUCH-SNAP GALLERY (< sm screens): zero horizontal overflow, fluid touch scrolling */
export const GalleryMobileSnapTrack: React.FC = memo(() => (
  <div className="w-full sm:hidden">
    <div className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory items-center gap-3 px-2 py-4">
      <GalleryCenterHero />
      <GalleryYouTubeCard />
      <GalleryInstagramCard />
      <GalleryAmazonCard />
      <GalleryTelegramCard />
    </div>
    <div className="text-center text-[10.5px] font-mono text-zinc-400 font-bold uppercase tracking-wider mt-1">
      ← Swipe cards to explore platforms →
    </div>
  </div>
));
GalleryMobileSnapTrack.displayName = "GalleryMobileSnapTrack";

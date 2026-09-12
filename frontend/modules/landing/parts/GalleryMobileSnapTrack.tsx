"use client";

import React, { memo, useRef, useEffect } from "react";
import { GalleryYouTubeCard } from "./GalleryYouTubeCard";
import { GalleryInstagramCard } from "./GalleryInstagramCard";
import { GalleryCenterHero } from "./GalleryCenterHero";
import { GalleryAmazonCard } from "./GalleryAmazonCard";
import { GalleryTelegramCard } from "./GalleryTelegramCard";

/** 📱 MOBILE TOUCH-SNAP GALLERY (< sm screens): zero horizontal overflow, fluid touch scrolling */
export const GalleryMobileSnapTrack: React.FC = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for layout to finish rendering before calculating widths
    const timer = setTimeout(() => {
      if (containerRef.current) {
        const container = containerRef.current;
        const centerItem = container.children[2] as HTMLElement; // 3rd item is the blue card
        if (centerItem) {
          const scrollLeft = centerItem.offsetLeft - (container.clientWidth / 2) + (centerItem.clientWidth / 2);
          // Use instant scroll so user doesn't see a jump on load
          container.scrollTo({ left: scrollLeft, behavior: "instant" as any });
        }
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full sm:hidden">
      <div 
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory items-center gap-3 px-2 py-4"
      >
        <div className="snap-center shrink-0"><GalleryYouTubeCard /></div>
        <div className="snap-center shrink-0"><GalleryInstagramCard /></div>
        <div className="snap-center shrink-0"><GalleryCenterHero /></div>
        <div className="snap-center shrink-0"><GalleryAmazonCard /></div>
        <div className="snap-center shrink-0"><GalleryTelegramCard /></div>
      </div>
      <div className="text-center text-[10.5px] font-mono text-zinc-400 font-bold uppercase tracking-wider mt-1">
        ← Swipe cards to explore platforms →
      </div>
    </div>
  );
});
GalleryMobileSnapTrack.displayName = "GalleryMobileSnapTrack";

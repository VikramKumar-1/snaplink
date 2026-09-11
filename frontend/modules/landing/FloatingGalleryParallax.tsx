"use client";

import React, { memo } from "react";
import { GalleryMobileSnapTrack } from "./parts/GalleryMobileSnapTrack";
import { GalleryDesktopParallax } from "./parts/GalleryDesktopParallax";

/**
 * Responsive Reverse Parallax Gallery
 * -------------------------------------------------------------
 * 📱 Mobile  (< sm):  Touch-snap swipe track via <GalleryMobileSnapTrack />
 * 🖥️ Desktop (sm+):   5-Pillar spring parallax via <GalleryDesktopParallax />
 * -------------------------------------------------------------
 */
export const FloatingGalleryParallax: React.FC = memo(() => (
  <section className="w-full max-w-7xl mx-auto py-8 sm:py-16 px-2 sm:px-4">
    {/* 1. Mobile Touch Carousel (Zero Horizontal Spilling) */}
    <GalleryMobileSnapTrack />

    {/* 2. Desktop 5-Pillar Spring Motion Parallax */}
    <GalleryDesktopParallax />
  </section>
));

FloatingGalleryParallax.displayName = "FloatingGalleryParallax";

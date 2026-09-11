"use client";

import React, { useRef, memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { GalleryYouTubeCard } from "./GalleryYouTubeCard";
import { GalleryInstagramCard } from "./GalleryInstagramCard";
import { GalleryCenterHero } from "./GalleryCenterHero";
import { GalleryAmazonCard } from "./GalleryAmazonCard";
import { GalleryTelegramCard } from "./GalleryTelegramCard";

/** 🖥️ DESKTOP PARALLAX GALLERY (sm+ screens): 5-pillar spring physics */
export const GalleryDesktopParallax: React.FC = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.01 });

  const yFarLeft = useTransform(smooth, [0, 1], [60, -80]);
  const yLeft = useTransform(smooth, [0, 1], [30, -45]);
  const yCenter = useTransform(smooth, [0, 1], [0, -15]);
  const yRight = useTransform(smooth, [0, 1], [30, -45]);
  const yFarRight = useTransform(smooth, [0, 1], [60, -80]);

  return (
    <div ref={ref} className="hidden sm:flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 xl:gap-5 min-h-[380px] sm:min-h-[450px]">
      <motion.div style={{ y: yFarLeft }} className="shrink-0 transform-gpu"><GalleryYouTubeCard /></motion.div>
      <motion.div style={{ y: yLeft }} className="shrink-0 transform-gpu"><GalleryInstagramCard /></motion.div>
      <motion.div style={{ y: yCenter }} className="shrink-0 transform-gpu z-20"><GalleryCenterHero /></motion.div>
      <motion.div style={{ y: yRight }} className="shrink-0 transform-gpu"><GalleryAmazonCard /></motion.div>
      <motion.div style={{ y: yFarRight }} className="shrink-0 transform-gpu"><GalleryTelegramCard /></motion.div>
    </div>
  );
});
GalleryDesktopParallax.displayName = "GalleryDesktopParallax";

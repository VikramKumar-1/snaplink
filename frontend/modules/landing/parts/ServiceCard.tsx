"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { ServiceItem } from "./servicesData";

interface ServiceCardProps {
  item: ServiceItem;
  idx: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = memo(({ item, idx }) => {
  const VectorIcon = item.vector;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05 }}
      className="p-6 sm:p-7 rounded-[28px] clay-glass-hybrid flex flex-col items-center text-center justify-between group transform-gpu"
    >
      <div className="w-full flex flex-col items-center">
        <div className="mb-4 p-3.5 clay-center-icon flex items-center justify-center">
          <VectorIcon />
        </div>

        <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider bg-[#f5f4ef]/90 text-zinc-700 px-3 py-1 rounded-full border border-white/80 shadow-2xs mb-3">
          {item.badge}
        </span>

        <h3 className="text-[18px] font-bold text-[#121316] tracking-tight mb-2 group-hover:text-[#2c35af] transition-colors">
          {item.title}
        </h3>

        <p className="text-[13.5px] text-zinc-600 font-medium leading-relaxed mb-4">
          {item.desc}
        </p>
      </div>

      <div className="w-full pt-3 border-t border-black/[0.06] flex items-center justify-center">
        <span className="text-[11.5px] font-bold text-zinc-800 flex items-center gap-1.5 bg-white/85 px-3 py-1 rounded-full border border-white/90 shadow-2xs">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          <span>{item.highlight}</span>
        </span>
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = "ServiceCard";

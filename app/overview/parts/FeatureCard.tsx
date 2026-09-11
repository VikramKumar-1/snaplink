import React from "react";
import Link from "next/link";
import { LucideIcon, ArrowUpRight, CheckCircle2 } from "lucide-react";

export interface FeatureCardProps {
  title: string;
  category: string;
  badge: string;
  description: string;
  howToAccess: string;
  actionUrl?: string;
  actionLabel?: string;
  icon: LucideIcon;
  highlights: string[];
}

export function FeatureCard({
  title,
  category,
  badge,
  description,
  howToAccess,
  actionUrl,
  actionLabel,
  icon: Icon,
  highlights,
}: FeatureCardProps) {
  return (
    <div className="rounded-3xl bento-card-light bg-white border border-[#e7e5dc] p-6 flex flex-col justify-between hover:shadow-xl hover:border-[#2c35af]/40 transition-all group">
      <div>
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#f5f4ef] border border-[#e7e5dc] flex items-center justify-center text-[#2c35af] group-hover:scale-110 transition-transform">
            <Icon className="h-6 w-6 stroke-[2.2]" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-[#2c35af]">
            {badge}
          </span>
        </div>

        <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
          {category}
        </div>
        <h3 className="text-[18px] font-black text-[#121316] tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-[13px] text-zinc-600 leading-relaxed mb-4">
          {description}
        </p>

        {/* Highlights Checklist */}
        <div className="space-y-1.5 mb-5 pt-3 border-t border-zinc-100">
          {highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2 text-[12px] text-zinc-700 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Access Footer */}
      <div className="pt-4 border-t border-zinc-100/80 mt-auto">
        <div className="text-[11px] font-mono text-zinc-500 mb-2.5 truncate">
          <span className="font-bold text-zinc-700">Access:</span> {howToAccess}
        </div>

        {actionUrl && (
          <Link
            href={actionUrl}
            className="w-full py-2.5 px-4 rounded-xl bg-[#121316] hover:bg-[#2c35af] text-white text-[12px] font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm group-hover:shadow-md"
          >
            <span>{actionLabel || "Explore Feature"}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};

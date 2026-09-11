"use client";

import React from "react";
import Link from "next/link";
import { ServiceStep } from "../types";
import { ArrowRight, Layers } from "lucide-react";

interface Props {
  serviceName: string;
  steps: ServiceStep[];
  actionLabel: string;
  actionUrl: string;
}

export const ServiceStepsSection: React.FC<Props> = ({
  serviceName,
  steps,
  actionLabel,
  actionUrl,
}) => {
  return (
    <section
      aria-label={`How to use ${serviceName}`}
      className="p-6 sm:p-7 rounded-3xl bento-card-light bg-white border border-[#e7e5dc] shadow-sm mb-8"
    >
      <div className="flex items-center gap-2 mb-2 text-[#2c35af]">
        <Layers className="h-4 w-4 stroke-[2.2]" />
        <h2 className="text-[13px] font-black uppercase tracking-wider text-[#121316]">
          How to Use in 3 Simple Steps
        </h2>
      </div>

      <p className="text-[13px] text-zinc-500 mb-6 font-medium">
        Zero technical setup required. Start using {serviceName} in less than 30 seconds.
      </p>

      {/* 3 Step Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-[#faf9f5] border border-[#e7e5dc] flex flex-col justify-between hover:border-[#2c35af] transition"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-lg bg-white border border-[#e7e5dc] text-[#2c35af] font-black text-[11px] flex items-center justify-center shadow-xs">
                  0{s.stepNumber}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">
                  Step {s.stepNumber}
                </span>
              </div>
              <h3 className="text-[14px] font-bold text-[#121316] mb-1.5">
                {s.title}
              </h3>
              <p className="text-[12px] text-zinc-600 leading-relaxed font-medium">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action CTA Bar */}
      <div className="pt-5 border-t border-zinc-100 flex flex-col sm:flex-row items-center gap-3">
        <Link
          href={actionUrl}
          className="w-full sm:w-auto px-6 py-3 rounded-xl pill-lime text-[#121316] text-[12.5px] font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:scale-102 transition"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="h-4 w-4 stroke-[2.5]" />
        </Link>

        <Link
          href="/services"
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-[#e7e5dc] hover:border-[#2c35af] text-zinc-700 text-[12px] font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
        >
          <span>Browse All 10 Services</span>
        </Link>
      </div>
    </section>
  );
};

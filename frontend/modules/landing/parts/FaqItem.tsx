"use client";

import React, { memo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaqItemData } from "./faqData";

interface FaqItemProps {
  faq: FaqItemData;
  isOpen: boolean;
  onToggle: () => void;
}

export const FaqItem: React.FC<FaqItemProps> = memo(({ faq, isOpen, onToggle }) => {
  return (
    <div className="rounded-[24px] clay-card-glass overflow-hidden transition-all">
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between text-[15px] sm:text-[16px] font-semibold text-[#121316] hover:text-[#2c35af] transition-colors cursor-pointer"
      >
        <span>{faq.q}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-[#2c35af] shrink-0 stroke-[2.5]" />
        ) : (
          <ChevronDown className="h-5 w-5 text-zinc-400 shrink-0 stroke-[2.5]" />
        )}
      </button>

      {isOpen && (
        <div className="px-6 pb-6 text-[14px] text-zinc-600 leading-relaxed border-t border-[#f0eee6] pt-4 font-medium bg-[#faf9f5]">
          {faq.a}
        </div>
      )}
    </div>
  );
});

FaqItem.displayName = "FaqItem";

"use client";

import React, { useState, useCallback, memo } from "react";
import { FAQS_DATA } from "./parts/faqData";
import { FaqItem } from "./parts/FaqItem";

export const FaqSection: React.FC = memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = useCallback((idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  }, []);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 transform-gpu">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-[clamp(12px,3.7vw,20px)] sm:text-[26px] md:text-[34px] font-bold tracking-tight text-[#121316] uppercase leading-tight max-w-4xl mx-auto whitespace-nowrap">
          Frequently Asked <span className="text-[#2c35af]">Questions</span>
        </h2>
      </div>

      <div className="space-y-4">
        {FAQS_DATA.map((faq, i) => (
          <FaqItem
            key={i}
            faq={faq}
            isOpen={openIndex === i}
            onToggle={() => handleToggle(i)}
          />
        ))}
      </div>
    </section>
  );
});

FaqSection.displayName = "FaqSection";

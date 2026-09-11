import React from "react";
import { HelpCircle } from "lucide-react";
import { ServiceFaq } from "../types";

interface ServiceFaqSectionProps {
  faqs: ServiceFaq[];
  serviceName: string;
}

export const ServiceFaqSection: React.FC<ServiceFaqSectionProps> = ({
  faqs,
  serviceName,
}) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="p-6 sm:p-7 rounded-3xl bento-card-light bg-white border border-[#e7e5dc]">
      <div className="flex items-center gap-2 mb-4 text-[#2c35af]">
        <HelpCircle className="h-4 w-4 stroke-[2.2]" />
        <h3 className="text-[14px] font-black uppercase tracking-wider text-[#121316]">
          Frequently Asked Questions ({serviceName})
        </h3>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-[#f5f4ef]/60 border border-[#e7e5dc]/80"
          >
            <h4 className="text-[13.5px] font-bold text-[#121316] mb-1.5 flex items-start gap-2">
              <span className="text-[#2c35af] font-black shrink-0">Q:</span>
              <span>{faq.question}</span>
            </h4>
            <p className="text-[13px] text-zinc-600 leading-relaxed font-medium pl-5">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

"use client";

import React from "react";
import { AppOpenerFlowMockup } from "./AppOpenerFlowMockup";
import {
  QrCodeMockup,
  BioCardMockup,
  AnalyticsChartMockup,
  SmartRoutingMockup,
} from "./mockups/CoreMockups";
import {
  DomainCnameMockup,
  SecurityLockMockup,
  CtaBannerMockup,
  UtmPixelMockup,
  ApiCodeMockup,
} from "./mockups/AdvancedMockups";
import { Layers } from "lucide-react";

interface Props {
  type: string;
  name: string;
  accentColor: string;
}

export const ServiceVisualMockup: React.FC<Props> = ({ type, name, accentColor }) => {
  switch (type) {
    case "app-intent":
      return <AppOpenerFlowMockup />;

    case "qr-code":
      return <QrCodeMockup name={name} accentColor={accentColor} />;

    case "bio-card":
      return <BioCardMockup name={name} accentColor={accentColor} />;

    case "analytics-chart":
      return <AnalyticsChartMockup name={name} accentColor={accentColor} />;

    case "smart-routing":
      return <SmartRoutingMockup name={name} accentColor={accentColor} />;

    case "domain-cname":
      return <DomainCnameMockup name={name} accentColor={accentColor} />;

    case "security-lock":
      return <SecurityLockMockup name={name} accentColor={accentColor} />;

    case "cta-banner":
      return <CtaBannerMockup name={name} accentColor={accentColor} />;

    case "utm-pixel":
    case "utm-tags":
      return <UtmPixelMockup name={name} accentColor={accentColor} />;

    case "api-code":
      return <ApiCodeMockup name={name} accentColor={accentColor} />;

    default:
      return (
        <div className="rounded-2xl bg-white border border-[#e7e5dc] p-6 text-center shadow-lg">
          <div className="h-12 w-12 rounded-2xl bg-[#f5f4ef] border border-[#e7e5dc] mx-auto mb-3 flex items-center justify-center text-[#2c35af]">
            <Layers className="h-6 w-6" />
          </div>
          <div className="text-[13px] font-black text-[#121316] uppercase">{name}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Enterprise-grade architecture</div>
        </div>
      );
  }
};

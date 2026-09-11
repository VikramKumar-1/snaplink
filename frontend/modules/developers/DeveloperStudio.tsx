"use client";

import React, { useState } from "react";
import { Code2, Key, Webhook, BookOpen } from "lucide-react";
import { ApiKeyManager } from "./parts/ApiKeyManager";
import { WebhookManager } from "./parts/WebhookManager";
import { ApiQuickstartDocs } from "./parts/ApiQuickstartDocs";

type DevTab = "keys" | "webhooks" | "docs";

export const DeveloperStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DevTab>("keys");

  return (
    <div className="space-y-4">
      {/* Studio Banner */}
      <div className="p-5 rounded-[22px] bento-card-light flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#2c35af]/10 border border-[#2c35af]/20 text-[#2c35af] flex items-center justify-center shrink-0 shadow-xs">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-[16px] font-black text-[#121316] uppercase tracking-tight flex items-center gap-2">
              Developer Platform & Webhooks
            </h2>
            <p className="text-xs text-zinc-500 font-medium mt-0.5 max-w-xl leading-relaxed">
              Integrate SnapLink programmatically with secret API keys, real-time HTTP webhooks, and the REST API.
            </p>
          </div>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#f5f4ef] border border-[#e7e5dc] self-start sm:self-auto shrink-0">
          <button
            onClick={() => setActiveTab("keys")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
              activeTab === "keys" ? "bg-white text-[#121316] shadow-xs border border-[#e7e5dc]" : "text-zinc-500 hover:text-[#121316]"
            }`}
          >
            <Key className="h-3.5 w-3.5" />
            <span>API Keys</span>
          </button>

          <button
            onClick={() => setActiveTab("webhooks")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
              activeTab === "webhooks" ? "bg-white text-[#121316] shadow-xs border border-[#e7e5dc]" : "text-zinc-500 hover:text-[#121316]"
            }`}
          >
            <Webhook className="h-3.5 w-3.5" />
            <span>Webhooks</span>
          </button>

          <button
            onClick={() => setActiveTab("docs")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
              activeTab === "docs" ? "bg-white text-[#121316] shadow-xs border border-[#e7e5dc]" : "text-zinc-500 hover:text-[#121316]"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Docs</span>
          </button>
        </div>
      </div>

      {/* Active Tab View */}
      {activeTab === "keys" && <ApiKeyManager />}
      {activeTab === "webhooks" && <WebhookManager />}
      {activeTab === "docs" && <ApiQuickstartDocs />}
    </div>
  );
};

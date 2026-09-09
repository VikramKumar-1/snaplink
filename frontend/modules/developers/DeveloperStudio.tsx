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
    <div className="space-y-6">
      {/* Studio Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Code2 className="h-5 w-5 text-violet-400" />
            Developer Platform & Webhooks
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Integrate SnapLink programmatically with your stack using secret API keys, real-time HTTP webhooks, and the v1 REST API.
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-800 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setActiveTab("keys")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === "keys" ? "bg-zinc-800 text-white shadow-xs" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Key className="h-3.5 w-3.5" />
            <span>API Keys</span>
          </button>

          <button
            onClick={() => setActiveTab("webhooks")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === "webhooks" ? "bg-zinc-800 text-white shadow-xs" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Webhook className="h-3.5 w-3.5" />
            <span>Webhooks</span>
          </button>

          <button
            onClick={() => setActiveTab("docs")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === "docs" ? "bg-zinc-800 text-white shadow-xs" : "text-zinc-400 hover:text-white"
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

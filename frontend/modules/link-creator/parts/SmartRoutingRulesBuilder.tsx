"use client";

import React, { useState } from "react";
import { Compass, ChevronDown, ChevronUp, Plus, Trash2, Globe, Smartphone, Languages } from "lucide-react";

export interface SmartRuleItem {
  id: string;
  type: "geo" | "device" | "language";
  condition: string;
  destinationUrl: string;
}

interface SmartRoutingRulesBuilderProps {
  showRules: boolean;
  setShowRules: React.Dispatch<React.SetStateAction<boolean>>;
  rules: SmartRuleItem[];
  setRules: React.Dispatch<React.SetStateAction<SmartRuleItem[]>>;
}

const GEO_PRESETS = [
  { code: "IN", label: "India (IN)" },
  { code: "US", label: "United States (US)" },
  { code: "GB", label: "United Kingdom (GB)" },
  { code: "CA", label: "Canada (CA)" },
  { code: "AE", label: "UAE (AE)" },
  { code: "DE", label: "Germany (DE)" },
  { code: "FR", label: "France (FR)" },
  { code: "AU", label: "Australia (AU)" },
  { code: "JP", label: "Japan (JP)" },
];

const DEVICE_PRESETS = [
  { code: "ios", label: "Apple iOS (iPhone/iPad)" },
  { code: "android", label: "Google Android" },
  { code: "windows", label: "Microsoft Windows" },
  { code: "mac", label: "Apple Mac (macOS)" },
];

const LANG_PRESETS = [
  { code: "en", label: "English (en)" },
  { code: "hi", label: "Hindi (hi)" },
  { code: "es", label: "Spanish (es)" },
  { code: "fr", label: "French (fr)" },
  { code: "de", label: "German (de)" },
  { code: "ar", label: "Arabic (ar)" },
];

export const SmartRoutingRulesBuilder: React.FC<SmartRoutingRulesBuilderProps> = ({
  showRules,
  setShowRules,
  rules,
  setRules,
}) => {
  const [ruleType, setRuleType] = useState<"geo" | "device" | "language">("device");
  const [condition, setCondition] = useState("ios");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [inputError, setInputError] = useState("");

  const handleTypeChange = (type: "geo" | "device" | "language") => {
    setRuleType(type);
    if (type === "geo") setCondition("IN");
    if (type === "device") setCondition("ios");
    if (type === "language") setCondition("en");
  };

  const handleAddRule = () => {
    setInputError("");
    if (!destinationUrl.trim()) {
      setInputError("Please enter a destination URL for this rule.");
      return;
    }
    if (!destinationUrl.startsWith("http://") && !destinationUrl.startsWith("https://")) {
      setInputError("URL must start with http:// or https://");
      return;
    }

    const newRule: SmartRuleItem = {
      id: "rule_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      type: ruleType,
      condition: condition.trim(),
      destinationUrl: destinationUrl.trim(),
    };

    setRules([...rules, newRule]);
    setDestinationUrl("");
  };

  const handleRemoveRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id));
  };

  const getRuleIcon = (type: string) => {
    if (type === "geo") return <Globe className="h-3.5 w-3.5 text-blue-600" />;
    if (type === "device") return <Smartphone className="h-3.5 w-3.5 text-emerald-600" />;
    return <Languages className="h-3.5 w-3.5 text-purple-600" />;
  };

  return (
    <div className="border border-[#e7e5dc] rounded-2xl overflow-hidden bg-[#faf9f5]">
      <button
        type="button"
        onClick={() => setShowRules(!showRules)}
        className="w-full px-4 py-3 flex items-center justify-between text-left text-zinc-700 hover:text-black transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4 text-[#2c35af]" />
          <span className="text-[13px] font-bold">Smart Targeting (Geo, Device & Language)</span>
          {rules.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#2c35af]/10 text-[#2c35af] text-[11px] font-bold">
              {rules.length} {rules.length === 1 ? "rule" : "rules"}
            </span>
          )}
        </div>
        {showRules ? (
          <ChevronUp className="h-4 w-4 text-zinc-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        )}
      </button>

      {showRules && (
        <div className="p-4 pt-1 space-y-4 border-t border-[#e7e5dc] bg-white">
          <p className="text-[12px] text-zinc-500">
            Dynamically redirect visitors to different stores, localized pages, or operating systems from a single link.
          </p>

          {/* Add Rule Controls */}
          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-bold text-zinc-600 uppercase mb-1 block">Rule Type</label>
                <div className="grid grid-cols-3 gap-1 bg-zinc-200/60 p-1 rounded-lg">
                  {(["device", "geo", "language"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleTypeChange(t)}
                      className={`py-1 text-[11px] font-bold rounded-md capitalize transition ${
                        ruleType === t ? "bg-white text-[#2c35af] shadow-xs" : "text-zinc-500 hover:text-zinc-800"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-600 uppercase mb-1 block">Target Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bento-input px-3 py-1.5 text-[12px] text-[#121316] font-medium"
                >
                  {ruleType === "device" &&
                    DEVICE_PRESETS.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.label}
                      </option>
                    ))}
                  {ruleType === "geo" &&
                    GEO_PRESETS.map((g) => (
                      <option key={g.code} value={g.code}>
                        {g.label}
                      </option>
                    ))}
                  {ruleType === "language" &&
                    LANG_PRESETS.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-600 uppercase block">Route Destination URL</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={destinationUrl}
                  onChange={(e) => setDestinationUrl(e.target.value)}
                  placeholder={
                    ruleType === "device"
                      ? "https://apps.apple.com/app/id..."
                      : ruleType === "geo"
                      ? "https://in.brand.com/store"
                      : "https://brand.com/es/bienvenido"
                  }
                  className="flex-1 bento-input px-3 py-1.5 text-[12px] text-[#121316] font-mono"
                />
                <button
                  type="button"
                  onClick={handleAddRule}
                  className="px-3.5 py-1.5 bg-[#2c35af] text-white text-[12px] font-bold rounded-xl flex items-center gap-1 hover:bg-[#232b90] transition shrink-0 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>
              {inputError && <p className="text-[11px] text-red-500 font-medium">{inputError}</p>}
            </div>
          </div>

          {/* Active Rules List */}
          {rules.length > 0 && (
            <div className="space-y-2 pt-1">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Active Smart Routes ({rules.length})
              </label>
              <div className="space-y-1.5">
                {rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 transition"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div className="p-1.5 rounded-lg bg-zinc-100 shrink-0">{getRuleIcon(rule.type)}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-black uppercase text-zinc-900 tracking-wider">
                            {rule.type}: {rule.condition}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-500 truncate max-w-xs sm:max-w-md">
                          {rule.destinationUrl}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveRule(rule.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition shrink-0 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

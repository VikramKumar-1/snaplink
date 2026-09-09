"use client";

import React, { useState } from "react";
import { Compass, ChevronDown, ChevronUp, Plus, Trash2, Globe, Smartphone, Languages } from "lucide-react";
import { SmartRuleItem } from "@/frontend/modules/link-creator/parts/SmartRoutingRulesBuilder";

interface EditSmartRulesSectionProps {
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
];

const DEVICE_PRESETS = [
  { code: "ios", label: "Apple iOS" },
  { code: "android", label: "Google Android" },
  { code: "windows", label: "Windows PC" },
  { code: "mac", label: "Apple Mac" },
];

const LANG_PRESETS = [
  { code: "en", label: "English (en)" },
  { code: "hi", label: "Hindi (hi)" },
  { code: "es", label: "Spanish (es)" },
  { code: "fr", label: "French (fr)" },
  { code: "de", label: "German (de)" },
  { code: "ar", label: "Arabic (ar)" },
];

export const EditSmartRulesSection: React.FC<EditSmartRulesSectionProps> = ({
  rules,
  setRules,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ruleType, setRuleType] = useState<"geo" | "device" | "language">("device");
  const [condition, setCondition] = useState("ios");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [error, setError] = useState("");

  const handleTypeChange = (t: "geo" | "device" | "language") => {
    setRuleType(t);
    if (t === "geo") setCondition("IN");
    if (t === "device") setCondition("ios");
    if (t === "language") setCondition("en");
  };

  const handleAdd = () => {
    setError("");
    if (!destinationUrl.trim()) {
      setError("Please specify a target URL.");
      return;
    }
    if (!destinationUrl.startsWith("http://") && !destinationUrl.startsWith("https://")) {
      setError("URL must start with http:// or https://");
      return;
    }

    setRules([
      ...rules,
      {
        id: "rule_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
        type: ruleType,
        condition: condition.trim(),
        destinationUrl: destinationUrl.trim(),
      },
    ]);
    setDestinationUrl("");
  };

  return (
    <div className="border border-[#e7e5dc] rounded-2xl overflow-hidden bg-[#faf9f5]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left text-zinc-700 hover:text-black transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4 text-[#2c35af]" />
          <span className="text-[12px] font-black text-[#121316] uppercase tracking-wider">
            Smart Targeting Rules
          </span>
          {rules.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#2c35af]/10 text-[#2c35af] text-[10px] font-bold">
              {rules.length} active
            </span>
          )}
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4 text-zinc-400" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
      </button>

      {isOpen && (
        <div className="p-4 pt-1 space-y-3 border-t border-[#e7e5dc] bg-white">
          <div className="p-3 bg-zinc-50 border border-zinc-200/80 rounded-xl space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex bg-zinc-200/60 p-0.5 rounded-lg text-[11px] font-bold">
                {(["device", "geo", "language"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleTypeChange(t)}
                    className={`flex-1 py-1 rounded capitalize ${
                      ruleType === t ? "bg-white text-[#2c35af] shadow-xs" : "text-zinc-500"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="bento-input px-2.5 py-1 text-[11px] text-[#121316] font-medium"
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

            <div className="flex gap-2">
              <input
                type="url"
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                placeholder="Target URL (https://...)"
                className="flex-1 bento-input px-2.5 py-1 text-[11px] font-mono text-[#121316]"
              />
              <button
                type="button"
                onClick={handleAdd}
                className="px-3 py-1 bg-[#2c35af] text-white text-[11px] font-bold rounded-lg flex items-center gap-1 hover:bg-[#232b90]"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
            </div>
            {error && <p className="text-[11px] text-red-500">{error}</p>}
          </div>

          {rules.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between p-2 rounded-xl border border-zinc-200 bg-white"
            >
              <div className="min-w-0 pr-2">
                <span className="text-[10px] font-black uppercase text-zinc-900 tracking-wider">
                  {r.type}: {r.condition}
                </span>
                <p className="text-[11px] font-mono text-zinc-500 truncate">{r.destinationUrl}</p>
              </div>
              <button
                type="button"
                onClick={() => setRules(rules.filter((item) => item.id !== r.id))}
                className="p-1 text-zinc-400 hover:text-red-500 rounded"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

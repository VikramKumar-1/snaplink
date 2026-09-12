"use client";

import React, { memo, useState } from "react";
import { Sparkles, Megaphone, Compass, Link2 } from "lucide-react";
import { UrlInputField } from "./UrlInputField";
import { CustomAliasField } from "./CustomAliasField";
import { SocialPreviewOptions } from "./SocialPreviewOptions";
import { CreatorSubmitButton } from "./CreatorSubmitButton";
import { CtaOverlayOptions, CtaState } from "./CtaOverlayOptions";
import { SmartRoutingRulesBuilder, SmartRuleItem } from "./SmartRoutingRulesBuilder";

interface CreatorFormProps {
  url: string;
  setUrl: (v: string) => void;
  customSlug: string;
  setCustomSlug: (v: string) => void;
  showAdvanced: boolean;
  setShowAdvanced: (v: boolean) => void;
  customTitle: string;
  setCustomTitle: (v: string) => void;
  customDescription: string;
  setCustomDescription: (v: string) => void;
  showCta: boolean;
  setShowCta: (v: boolean) => void;
  cta: CtaState;
  setCta: React.Dispatch<React.SetStateAction<CtaState>>;
  showSmartRules: boolean;
  setShowSmartRules: React.Dispatch<React.SetStateAction<boolean>>;
  smartRules: SmartRuleItem[];
  setSmartRules: React.Dispatch<React.SetStateAction<SmartRuleItem[]>>;
  badge: string | null;
  loading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
  isCtaMode?: boolean;
}

export const CreatorForm: React.FC<CreatorFormProps> = memo((props) => {
  const [activePane, setActivePane] = useState<"none" | "social" | "routing">("none");

  // If we switch into CTA Mode, ensure the banner is enabled for preview
  React.useEffect(() => {
    if (props.isCtaMode) {
      props.setShowCta(true);
      props.setCta((prev) => ({ ...prev, enabled: true }));
    }
  }, [props.isCtaMode]);

  const togglePane = (pane: "social" | "routing") => {
    setActivePane((prev) => (prev === pane ? "none" : pane));
    if (pane === "social" && activePane !== "social") props.setShowAdvanced(true);
    if (pane === "routing" && activePane !== "routing") props.setShowSmartRules(true);
  };

  return (
    <form onSubmit={props.onSubmit} className="space-y-4">
      <UrlInputField url={props.url} setUrl={props.setUrl} badge={props.badge} />
      <CustomAliasField customSlug={props.customSlug} setCustomSlug={props.setCustomSlug} />
      
      {/* CTA MODE: Force render CTA Options without pills */}
      {props.isCtaMode ? (
        <div className="animate-fade-in border-t border-zinc-100 pt-2">
          <CtaOverlayOptions
            showCta={props.showCta}
            setShowCta={props.setShowCta}
            cta={props.cta}
            setCta={props.setCta}
          />
        </div>
      ) : (
        <>
          {/* NORMAL SHORTEN MODE: Render other power-ups as pills */}
          <div className="pt-2 animate-fade-in">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">Power-Ups (Optional)</label>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => togglePane("social")}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition ${
                  activePane === "social" ? "bg-indigo-100 text-indigo-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                <Sparkles className="h-3 w-3" /> Social Preview
              </button>
              
              <button
                type="button"
                onClick={() => togglePane("routing")}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition ${
                  activePane === "routing" ? "bg-purple-100 text-purple-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                <Compass className="h-3 w-3" /> Smart Routing
              </button>
            </div>
          </div>

          {/* Dynamic Pane Rendering for Normal Mode */}
          {activePane === "social" && (
            <div className="animate-fade-in border-t border-zinc-100 pt-2">
              <SocialPreviewOptions
                showAdvanced={props.showAdvanced}
                setShowAdvanced={props.setShowAdvanced}
                customTitle={props.customTitle}
                setCustomTitle={props.setCustomTitle}
                customDescription={props.customDescription}
                setCustomDescription={props.setCustomDescription}
              />
            </div>
          )}

          {activePane === "routing" && (
            <div className="animate-fade-in border-t border-zinc-100 pt-2">
              <SmartRoutingRulesBuilder
                showRules={props.showSmartRules}
                setShowRules={props.setShowSmartRules}
                rules={props.smartRules}
                setRules={props.setSmartRules}
              />
            </div>
          )}
        </>
      )}

      {props.error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px] font-bold">
          {props.error}
        </div>
      )}
      <CreatorSubmitButton loading={props.loading} />
    </form>
  );
});

CreatorForm.displayName = "CreatorForm";

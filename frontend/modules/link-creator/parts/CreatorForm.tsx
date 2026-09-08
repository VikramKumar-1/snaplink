"use client";

import React, { memo } from "react";
import { UrlInputField } from "./UrlInputField";
import { CustomAliasField } from "./CustomAliasField";
import { SocialPreviewOptions } from "./SocialPreviewOptions";
import { CreatorSubmitButton } from "./CreatorSubmitButton";

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
  badge: string;
  loading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
}

export const CreatorForm: React.FC<CreatorFormProps> = memo((props) => (
  <form onSubmit={props.onSubmit} className="space-y-4">
    <UrlInputField url={props.url} setUrl={props.setUrl} badge={props.badge} />
    <CustomAliasField customSlug={props.customSlug} setCustomSlug={props.setCustomSlug} />
    <SocialPreviewOptions
      showAdvanced={props.showAdvanced}
      setShowAdvanced={props.setShowAdvanced}
      customTitle={props.customTitle}
      setCustomTitle={props.setCustomTitle}
      customDescription={props.customDescription}
      setCustomDescription={props.setCustomDescription}
    />
    {props.error && (
      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px] font-bold">
        {props.error}
      </div>
    )}
    <CreatorSubmitButton loading={props.loading} />
  </form>
));

CreatorForm.displayName = "CreatorForm";

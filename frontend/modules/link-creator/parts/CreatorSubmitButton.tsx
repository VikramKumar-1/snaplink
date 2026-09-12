"use client";

import React, { memo } from "react";
import { CornerDownLeft } from "lucide-react";

interface CreatorSubmitButtonProps {
  loading: boolean;
}

export const CreatorSubmitButton: React.FC<CreatorSubmitButtonProps> = memo(({ loading }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full py-3.5 px-6 btn-bento-primary text-[14.5px] flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer shadow-md uppercase tracking-wider"
  >
    {loading ? (
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        <span>Generating Native Intent...</span>
      </div>
    ) : (
      <>
        <span>Shorten Link</span>
        <div className="bg-white/20 p-1 rounded-lg">
          <CornerDownLeft className="h-4 w-4" />
        </div>
      </>
    )}
  </button>
));

CreatorSubmitButton.displayName = "CreatorSubmitButton";

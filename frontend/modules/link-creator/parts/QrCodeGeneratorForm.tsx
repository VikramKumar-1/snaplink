"use client";

import React, { useRef, useState, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Download,
  QrCode,
  Image as ImageIcon,
  Trash2,
  Upload,
  ClipboardPaste,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { downloadQrPNG, downloadQrSVG } from "./qrDownload.util";

const BRAND_COLORS = [
  { label: "Classic Black", hex: "#121316" },
  { label: "Royal Blue", hex: "#2c35af" },
  { label: "Emerald", hex: "#059669" },
  { label: "Purple Indigo", hex: "#6366f1" },
  { label: "Crimson Red", hex: "#dc2626" },
];

export const QrCodeGeneratorForm: React.FC = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("#121316");
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isGenerated = Boolean(generatedUrl && generatedUrl.length > 0);
  const isDirty = Boolean(isGenerated && inputUrl.trim() !== generatedUrl);

  const handleGenerate = useCallback(() => {
    const trimmed = inputUrl.trim();
    if (!trimmed) {
      setError("Please paste or enter a link first before generating.");
      return;
    }
    setError(null);
    setGeneratedUrl(trimmed);
  }, [inputUrl]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputUrl(text);
        setError(null);
      }
    } catch {
      /* clipboard permission denied — no-op */
    }
  }, []);

  const handleLogoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        alert("Logo image must be under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => setCustomLogo(ev.target?.result as string);
      reader.readAsDataURL(file);
    },
    []
  );

  const onDownloadPNG = useCallback(() => {
    downloadQrPNG(qrRef.current?.querySelector("svg"));
  }, []);

  const onDownloadSVG = useCallback(() => {
    downloadQrSVG(qrRef.current?.querySelector("svg"));
  }, []);

  return (
    <div className="space-y-2.5">
      {/* 1. URL Input Row with Paste & Manual Generate Trigger */}
      <div>
        <label className="block text-[11px] font-bold uppercase text-zinc-500 tracking-wider mb-1">
          Paste Your Destination Link
        </label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5">
          <div className="flex-1 flex items-center gap-1.5 bg-[#f8f7f4] border border-[#e7e5dc] rounded-xl px-2 focus-within:border-[#2c35af] focus-within:ring-2 focus-within:ring-[#2c35af]/20 transition">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => {
                setInputUrl(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
              placeholder="e.g., https://youtube.com/watch?v=..."
              className="flex-1 py-2 px-1 bg-transparent text-[16px] sm:text-[13px] text-[#121316] placeholder:text-zinc-400 focus:outline-none font-medium"
            />
            <button
              type="button"
              onClick={handlePaste}
              className="p-1 rounded-lg text-zinc-400 hover:text-[#2c35af] hover:bg-zinc-200/60 transition cursor-pointer shrink-0"
              title="Paste from clipboard"
            >
              <ClipboardPaste className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            className="py-2 px-4 rounded-xl bg-[#2c35af] hover:bg-[#232a8f] text-white text-[12px] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs active:scale-95 shrink-0"
          >
            <QrCode className="h-3.5 w-3.5" />
            <span>{isDirty ? "Update QR" : "Generate QR"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {error && (
          <div className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-red-600 animate-fade-in">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* 2. Before Generation: Layman Guidance Placeholder */}
      {!isGenerated ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#faf9f5] border border-dashed border-[#d6d3c7] text-center flex flex-col items-center justify-center transition-all animate-fade-in">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#e7e5dc] flex items-center justify-center text-zinc-400 mb-1.5 shadow-xs">
            <QrCode className="h-5 w-5 stroke-[1.5]" />
          </div>
          <p className="text-[12.5px] font-bold text-slate-800 mb-0.5">
            Your QR Code will appear here
          </p>
          <p className="text-[11px] text-zinc-500 max-w-xs leading-relaxed">
            Paste any link above and tap <span className="font-bold text-[#2c35af]">Generate QR</span> to create your customized code.
          </p>
        </div>
      ) : (
        /* 3. After Generation: Compact Live QR Code + Controls + Downloads */
        <div className="space-y-2 animate-fade-in">
          {/* Active Status Badge */}
          <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[11px] text-emerald-800 font-bold">
            <div className="flex items-center gap-1.5 truncate">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">
                QR for: <span className="font-mono text-[10.5px]">{generatedUrl}</span>
              </span>
            </div>
            <span className="text-[9px] font-mono uppercase bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded-full shrink-0">
              Ready
            </span>
          </div>

          {/* Compact QR Graphic + Live Controls Row */}
          <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] flex items-center justify-between gap-3">
            {/* QR Code */}
            <div
              ref={qrRef}
              className="p-1.5 bg-white border border-[#e7e5dc] rounded-xl shadow-xs shrink-0"
            >
              <QRCodeSVG
                value={generatedUrl!}
                size={105}
                level="H"
                fgColor={selectedColor}
                bgColor="#ffffff"
                includeMargin={true}
                imageSettings={
                  customLogo
                    ? {
                        src: customLogo,
                        height: 24,
                        width: 24,
                        excavate: true,
                      }
                    : undefined
                }
              />
            </div>

            {/* Colors & Logo Controls */}
            <div className="flex-1 space-y-2">
              {/* Color Swatches */}
              <div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                  QR Color
                </span>
                <div className="flex items-center gap-1.5">
                  {BRAND_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setSelectedColor(c.hex)}
                      className={`w-5 h-5 rounded-full border-2 transition-all cursor-pointer ${
                        selectedColor === c.hex
                          ? "scale-110 border-black ring-1.5 ring-black/10"
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                  Center Logo
                </span>
                <div className="flex items-center gap-1.5">
                  {customLogo ? (
                    <button
                      type="button"
                      onClick={() => setCustomLogo(null)}
                      className="px-2 py-0.5 rounded-md text-red-600 hover:bg-red-50 text-[10.5px] font-bold transition flex items-center gap-1 cursor-pointer border border-red-200"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 rounded-md bg-white border border-[#e7e5dc] hover:border-[#2c35af] text-[10.5px] font-bold text-[#121316] transition cursor-pointer flex items-center gap-1 shadow-xs"
                    >
                      <Upload className="w-3 h-3 text-[#2c35af]" />
                      <span>Upload Logo</span>
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Layman Download Options */}
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            {/* PNG Download */}
            <button
              type="button"
              onClick={onDownloadPNG}
              className="py-2 px-3 rounded-xl bg-[#121316] hover:bg-[#2c35af] text-white flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs active:scale-95 group"
            >
              <Download className="h-3.5 w-3.5" />
              <div className="text-left">
                <span className="text-[11.5px] font-bold block leading-tight">Download PNG</span>
                <span className="text-[9px] text-zinc-400 group-hover:text-white/80 block leading-tight">Image format</span>
              </div>
            </button>

            {/* SVG Download */}
            <button
              type="button"
              onClick={onDownloadSVG}
              className="py-2 px-3 rounded-xl bg-white border border-[#e7e5dc] hover:border-[#2c35af] text-[#121316] flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs active:scale-95 group"
            >
              <Download className="h-3.5 w-3.5 text-[#2c35af]" />
              <div className="text-left">
                <span className="text-[11.5px] font-bold block leading-tight text-slate-800">Download SVG</span>
                <span className="text-[9px] text-zinc-400 group-hover:text-[#2c35af] block leading-tight">Vector format</span>
              </div>
            </button>
          </div>

          {/* Layman Tip */}
          <div className="text-center text-[10.5px] text-zinc-500 pt-0.5">
            💡 <strong className="text-slate-700">How to use:</strong> Point any phone camera at this QR code to test-scan it before printing.
          </div>
        </div>
      )}
    </div>
  );
};

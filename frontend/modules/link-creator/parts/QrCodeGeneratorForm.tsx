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
} from "lucide-react";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

const BRAND_COLORS = [
  { label: "Classic Black", hex: "#121316" },
  { label: "Royal Blue", hex: "#2c35af" },
  { label: "Emerald", hex: "#059669" },
  { label: "Purple Indigo", hex: "#6366f1" },
  { label: "Crimson Red", hex: "#dc2626" },
];

const DEFAULT_QR_VALUE = "https://snaplink.to";

export const QrCodeGeneratorForm: React.FC = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [selectedColor, setSelectedColor] = useState("#121316");
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const qrValue = inputUrl.trim() || DEFAULT_QR_VALUE;
  const hasInput = inputUrl.trim().length > 0;

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setInputUrl(text);
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

  const downloadPNG = useCallback(() => {
    const svgElement = qrRef.current?.querySelector("svg");
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    canvas.width = 1200;
    canvas.height = 1200;
    img.onload = () => {
      if (!ctx) return;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 1200, 1200);
      ctx.drawImage(img, 100, 100, 1000, 1000);
      const link = document.createElement("a");
      link.download = `${BRAND_CONFIG.name.toLowerCase()}-qr-code.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  }, []);

  const downloadSVG = useCallback(() => {
    const svgElement = qrRef.current?.querySelector("svg");
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${BRAND_CONFIG.name.toLowerCase()}-qr-vector.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="space-y-4">
      {/* URL/Text Input */}
      <div>
        <label className="block text-[11px] font-black uppercase text-zinc-500 tracking-wider mb-1.5">
          Enter URL or Text
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#f8f7f4] border border-[#e7e5dc] text-[16px] sm:text-[13px] text-[#121316] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#2c35af]/30 focus:border-[#2c35af] transition font-medium"
          />
          <button
            onClick={handlePaste}
            className="p-2.5 rounded-xl bg-[#f8f7f4] border border-[#e7e5dc] hover:border-[#2c35af] text-zinc-500 hover:text-[#2c35af] transition cursor-pointer"
            title="Paste from clipboard"
          >
            <ClipboardPaste className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Live QR Preview */}
      <div
        ref={qrRef}
        className="flex justify-center p-5 bg-[#f8f7f4] border border-[#e7e5dc] rounded-2xl mx-auto w-fit shadow-inner"
      >
        <QRCodeSVG
          value={qrValue}
          size={160}
          level="H"
          fgColor={selectedColor}
          bgColor="#ffffff"
          includeMargin={true}
          imageSettings={
            customLogo
              ? {
                  src: customLogo,
                  height: 36,
                  width: 36,
                  excavate: true,
                }
              : undefined
          }
        />
      </div>

      {/* Color Picker */}
      <div>
        <label className="block text-[11px] font-black uppercase text-zinc-500 tracking-wider mb-2">
          QR Color
        </label>
        <div className="flex items-center gap-2.5">
          {BRAND_COLORS.map((c) => (
            <button
              key={c.hex}
              onClick={() => setSelectedColor(c.hex)}
              className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                selectedColor === c.hex
                  ? "scale-110 border-black ring-2 ring-black/10"
                  : "border-transparent hover:scale-105"
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.label}
            />
          ))}
        </div>
      </div>

      {/* Logo Upload */}
      <div className="p-3 rounded-xl bg-[#f8f7f4] border border-[#e7e5dc] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white border border-[#e7e5dc] flex items-center justify-center text-zinc-600">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-[#121316]">
              Center Logo
            </div>
            <div className="text-[10.5px] text-zinc-500">
              Auto-centered with excavation
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {customLogo ? (
            <button
              onClick={() => setCustomLogo(null)}
              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 text-[12px] font-bold transition flex items-center gap-1 cursor-pointer"
              title="Remove Logo"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#e7e5dc] hover:border-[#2c35af] text-[11.5px] font-bold text-[#121316] transition cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Upload className="w-3 h-3 text-[#2c35af]" />
              <span>Upload</span>
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

      {/* Download Buttons */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={downloadPNG}
          disabled={!hasInput}
          className="w-full py-3 rounded-xl bg-[#121316] hover:bg-[#2c35af] disabled:opacity-40 disabled:cursor-not-allowed text-white text-[12.5px] font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
        >
          <Download className="h-4 w-4" />
          <span>1200px PNG</span>
        </button>
        <button
          onClick={downloadSVG}
          disabled={!hasInput}
          className="w-full py-3 rounded-xl bg-white border border-[#e7e5dc] hover:border-[#2c35af] disabled:opacity-40 disabled:cursor-not-allowed text-[#121316] text-[12.5px] font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
        >
          <Download className="h-4 w-4" />
          <span>Vector SVG</span>
        </button>
      </div>

      {/* Info Badge */}
      <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-zinc-400">
        <QrCode className="h-3 w-3" />
        <span>Client-side generation · No data stored · Error Correction H (30%)</span>
      </div>
    </div>
  );
};

"use client";

import React, { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useLinkStore } from "@/frontend/shared/store/useLinkStore";
import { X, Download, Copy, Check, QrCode, Image as ImageIcon, Trash2, Upload } from "lucide-react";
import { getBaseUrl } from "@/frontend/shared/lib/utils";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

const BRAND_COLORS = [
  { label: "Classic Black", hex: "#121316" },
  { label: "Royal Blue", hex: "#2c35af" },
  { label: "Emerald", hex: "#059669" },
  { label: "Purple Indigo", hex: "#6366f1" },
  { label: "Crimson Red", hex: "#dc2626" },
];

export const QRCodeModal: React.FC = () => {
  const { activeQrLink, closeQrModal } = useLinkStore();
  const [copied, setCopied] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#121316");
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!activeQrLink) return null;

  const fullUrl = activeQrLink.customDomain
    ? `https://${activeQrLink.customDomain}/${activeQrLink.shortCode}`
    : `${getBaseUrl()}/${activeQrLink.shortCode}`;

  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit to 2MB images
    if (file.size > 2 * 1024 * 1024) {
      alert("Logo image must be under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setCustomLogo(uploadEvent.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const downloadPNG = () => {
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
      link.download = `${BRAND_CONFIG.name.toLowerCase()}-${activeQrLink.shortCode}-qr.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const downloadSVG = () => {
    const svgElement = qrRef.current?.querySelector("svg");
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${BRAND_CONFIG.name.toLowerCase()}-${activeQrLink.shortCode}-vector.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-[28px] p-6 relative bg-white border border-[#e7e5dc] shadow-2xl overflow-hidden">
        <button
          onClick={closeQrModal}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition p-1 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-xl bg-[#2c35af] flex items-center justify-center text-white">
            <QrCode className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-[#121316] tracking-tight">
              Branded QR Code Studio
            </h3>
            <p className="text-[11px] text-zinc-500 font-mono">
              /{activeQrLink.shortCode} &middot; Error Correction Level H (30%)
            </p>
          </div>
        </div>

        {/* Dynamic QR Code Canvas */}
        <div
          ref={qrRef}
          className="flex justify-center p-6 bg-[#f8f7f4] border border-[#e7e5dc] rounded-2xl my-4 mx-auto w-fit shadow-inner"
        >
          <QRCodeSVG
            value={fullUrl}
            size={180}
            level="H"
            fgColor={selectedColor}
            bgColor="#ffffff"
            includeMargin={true}
            imageSettings={
              customLogo
                ? {
                    src: customLogo,
                    height: 40,
                    width: 40,
                    excavate: true,
                  }
                : undefined
            }
          />
        </div>

        {isLocalhost && (
          <div className="mb-3 px-3 py-1.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-[10.5px] text-amber-800 leading-snug">
            <span className="font-bold">📱 Local Wi-Fi Scan:</span> Connect phone to same Wi-Fi and open SnapLink via your local IP (e.g. <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[9.5px]">http://192.168.x.x:3000</code>) so your phone can reach this server.
          </div>
        )}

        {/* Color Customizer */}
        <div className="mb-4">
          <label className="block text-[11px] font-black uppercase text-zinc-500 tracking-wider mb-2">
            Brand Accent Color
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

        {/* Custom Logo Upload Section */}
        <div className="mb-4 p-3 rounded-xl bg-[#f8f7f4] border border-[#e7e5dc] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#e7e5dc] flex items-center justify-center text-zinc-600">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[12px] font-bold text-[#121316]">Center Brand Logo</div>
              <div className="text-[10.5px] text-zinc-500">Auto-centered with dot excavation</div>
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

        {/* Short URL Copy Bar */}
        <div className="flex items-center gap-2 p-1.5 pl-3 mb-4 rounded-xl bg-[#f8f7f4] border border-[#e7e5dc]">
          <input
            type="text"
            readOnly
            value={fullUrl}
            className="bg-transparent text-[12.5px] text-[#121316] w-full focus:outline-none font-mono font-medium"
          />
          <button
            onClick={copyLink}
            className="p-2 rounded-lg bg-white border border-[#e7e5dc] text-zinc-700 hover:text-[#2c35af] transition cursor-pointer"
            title="Copy Link"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        {/* Dual Download Buttons (PNG & Vector SVG) */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={downloadPNG}
            className="w-full py-3 rounded-xl bg-[#121316] hover:bg-[#2c35af] text-white text-[12.5px] font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
          >
            <Download className="h-4 w-4" />
            <span>1200px PNG</span>
          </button>
          <button
            onClick={downloadSVG}
            className="w-full py-3 rounded-xl bg-white border border-[#e7e5dc] hover:border-[#2c35af] text-[#121316] text-[12.5px] font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
          >
            <Download className="h-4 w-4" />
            <span>Vector SVG</span>
          </button>
        </div>
      </div>
    </div>
  );
};

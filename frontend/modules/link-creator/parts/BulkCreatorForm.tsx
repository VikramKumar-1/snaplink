"use client";

import React, { useState } from "react";
import { Copy, Check, Loader2, Link2, FileText } from "lucide-react";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

export const BulkCreatorForm: React.FC = () => {
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ original: string; short: string; error?: string }[] | null>(null);
  const [processedText, setProcessedText] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Extract URLs from unstructured text using regex
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = urls.match(urlRegex) || [];
    
    // Clean and deduplicate URLs
    const urlList = Array.from(new Set(matches.map((u) => u.trim())));

    if (urlList.length === 0) {
      alert("Koi valid URL nahi mila! Please ensure links start with http:// or https://");
      return;
    }
    if (urlList.length > 20) {
      alert("Please limit to 20 URLs at once for the free plan.");
      return;
    }

    setLoading(true);
    setResults(null);
    setCopiedText(false);

    try {
      const res = await fetch("/api/links/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: urlList }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to bulk shorten");

      if (data.links) {
        let finalOutput = urls; // Start with the user's original raw text
        
        const newResults = data.links.map((item: any) => {
          const shortUrl = `${BRAND_CONFIG.shortDomain}/${item.shortCode}`;
          const fullShortUrl = `https://${shortUrl}`;
          
          // Enterprise magic: Find and replace the long URL with the short URL in the original text
          finalOutput = finalOutput.split(item.originalUrl).join(fullShortUrl);
          
          return {
            original: item.originalUrl,
            short: shortUrl,
          };
        });
        
        setResults(newResults);
        setProcessedText(finalOutput);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to bulk shorten");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyProcessedText = () => {
    navigator.clipboard.writeText(processedText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="w-full">
      {!results ? (
        <form onSubmit={handleBulkSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-black text-[#121316] uppercase tracking-wider block">
                Paste Text with Links
              </label>
              <span className="text-[10px] font-mono text-zinc-400 font-bold bg-zinc-100 px-2 py-0.5 rounded">MAX 20</span>
            </div>
            <textarea
              required
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder="Paste unstructured text here! Hum automatic URLs extract kar lenge... &#10;&#10;For example:&#10;Check out this cool phone: https://amazon.com/product &#10;And this video https://youtube.com/video"
              rows={5}
              className="w-full bento-input px-3.5 py-3 text-[13px] text-[#121316] font-mono placeholder-zinc-400 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={loading || urls.trim() === ""}
            className="w-full py-3.5 rounded-xl btn-bento-primary text-[13px] font-black uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-md active:scale-[0.98]"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4" />}
            {loading ? "Processing Bulk..." : "Shorten & Format Text"}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
              <Check className="h-4 w-4" /> Ready to Post!
            </h3>
            <button
              onClick={() => {
                setUrls("");
                setResults(null);
                setProcessedText("");
              }}
              className="text-[10px] font-bold text-zinc-500 hover:text-black underline"
            >
              Shorten New Text
            </button>
          </div>

          {/* Enterprise Output: The Replaced Text */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 overflow-hidden shadow-xs">
            <div className="px-3 py-2 border-b border-emerald-100 flex items-center justify-between bg-emerald-100/50">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 flex items-center gap-1.5">
                <FileText className="h-3 w-3" /> Auto-Formatted Text
              </span>
              <button
                onClick={copyProcessedText}
                className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-md bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition"
              >
                {copiedText ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copiedText ? "COPIED" : "COPY TEXT"}
              </button>
            </div>
            <textarea
              readOnly
              value={processedText}
              rows={4}
              className="w-full px-3 py-2.5 text-[12px] font-medium text-emerald-950 bg-transparent focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="pt-2 border-t border-zinc-100">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Individual Links Generated</p>
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {results.map((res, i) => (
                <div key={i} className="p-2.5 rounded-xl border border-[#e7e5dc] bg-zinc-50 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-mono text-zinc-400 truncate mb-0.5">
                      {res.original}
                    </p>
                    <a href={`https://${res.short}`} target="_blank" rel="noreferrer" className="text-[11px] font-bold text-[#2c35af] truncate block hover:underline">
                      {res.short}
                    </a>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`https://${res.short}`, i)}
                    className="p-1.5 bg-white border border-[#e7e5dc] rounded-md text-zinc-600 hover:text-black hover:border-[#2c35af] transition shrink-0 shadow-xs"
                  >
                    {copiedIndex === i ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

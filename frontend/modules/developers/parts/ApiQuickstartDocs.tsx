"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, ShieldCheck, Code2 } from "lucide-react";

export const ApiQuickstartDocs: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyCode = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const curlExample = `curl -X POST https://snaplink.to/api/v1/links \\
  -H "Authorization: Bearer snk_live_your_secret_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "originalUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "customSlug": "summer-deals",
    "customTitle": "Exclusive Summer Drop"
  }'`;

  const webhookVerifyNode = `import crypto from "crypto";

function verifySnaplinkWebhook(rawBody, signatureHeader, secret) {
  // Header format: t=1690000000,v1=abcdef123456...
  const parts = Object.fromEntries(
    signatureHeader.split(",").map((p) => p.split("="))
  );
  const timestamp = parts.t;
  const signature = parts.v1;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(\`\${timestamp}.\${rawBody}\`)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}`;

  return (
    <div className="space-y-4">
      {/* Overview Card */}
      <div className="rounded-2xl bento-card-light p-5 space-y-2">
        <div className="flex items-center gap-2 text-[#121316] font-bold text-sm">
          <Terminal className="h-4 w-4 text-[#2c35af]" />
          <span>REST API Authentication</span>
        </div>
        <p className="text-xs text-zinc-600 leading-relaxed">
          Authenticate programmatic requests by including your secret API key in the <code className="px-1.5 py-0.5 rounded bg-[#f5f4ef] border border-[#e7e5dc] text-[#2c35af] font-bold font-mono">Authorization</code> header:
        </p>
        <div className="p-3 bg-[#121316] rounded-xl font-mono text-xs text-[#ccff00] border border-zinc-800 shadow-inner">
          Authorization: Bearer snk_live_your_secret_key
        </div>
      </div>

      {/* Code Snippet: Create Link */}
      <div className="rounded-2xl border border-[#e7e5dc] bg-[#121316] overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-xs">
          <div className="flex items-center gap-2 font-mono text-zinc-300">
            <Code2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>POST /api/v1/links (Create Smart Link)</span>
          </div>
          <button
            onClick={() => copyCode(curlExample, "curl")}
            className="flex items-center gap-1 text-[11px] font-bold text-[#ccff00] hover:underline transition cursor-pointer"
          >
            {copiedKey === "curl" ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            <span>{copiedKey === "curl" ? "Copied" : "Copy cURL"}</span>
          </button>
        </div>
        <pre className="p-4 font-mono text-xs text-zinc-200 overflow-x-auto bg-[#121316] leading-relaxed">
          {curlExample}
        </pre>
      </div>

      {/* Code Snippet: Verify Webhook */}
      <div className="rounded-2xl border border-[#e7e5dc] bg-[#121316] overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-xs">
          <div className="flex items-center gap-2 font-mono text-zinc-300">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
            <span>Verify Webhook Signature (Node.js HMAC-SHA256)</span>
          </div>
          <button
            onClick={() => copyCode(webhookVerifyNode, "node")}
            className="flex items-center gap-1 text-[11px] font-bold text-[#ccff00] hover:underline transition cursor-pointer"
          >
            {copiedKey === "node" ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            <span>{copiedKey === "node" ? "Copied" : "Copy Code"}</span>
          </button>
        </div>
        <pre className="p-4 font-mono text-xs text-zinc-200 overflow-x-auto bg-[#121316] leading-relaxed">
          {webhookVerifyNode}
        </pre>
      </div>
    </div>
  );
};

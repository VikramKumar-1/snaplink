"use client";

import React, { useState, useEffect } from "react";
import { Webhook as WebhookIcon, Plus, Copy, Check, Trash2, Send, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

interface WebhookItem {
  _id: string;
  url: string;
  events: string[];
  secret: string;
  status: "active" | "failing" | "disabled";
  failureCount: number;
  lastDeliveryStatus?: number;
  lastDeliveryAt?: string;
  createdAt: string;
}

export const WebhookManager: React.FC = () => {
  const [webhooks, setWebhooks] = useState<WebhookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [events, setEvents] = useState<string[]>(["link.clicked"]);
  const [creating, setCreating] = useState(false);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; success: boolean; status: number; latency: number } | null>(null);
  const [copiedSecretId, setCopiedSecretId] = useState<string | null>(null);

  const fetchWebhooks = async () => {
    try {
      const res = await fetch("/api/developers/webhooks");
      if (res.ok) {
        const data = await res.json();
        setWebhooks(data.webhooks || []);
      }
    } catch (err) {
      console.error("Failed to load webhooks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebhooks();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || events.length === 0) return;
    setCreating(true);

    try {
      const res = await fetch("/api/developers/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), events }),
      });

      if (res.ok) {
        setUrl("");
        setEvents(["link.clicked"]);
        setIsModalOpen(false);
        fetchWebhooks();
      }
    } catch (err) {
      console.error("Failed to register webhook:", err);
    } finally {
      setCreating(false);
    }
  };

  const handleTest = async (webhookId: string) => {
    setTestingId(webhookId);
    setTestResult(null);
    try {
      const res = await fetch("/api/developers/webhooks/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookId }),
      });
      const data = await res.json();
      setTestResult({
        id: webhookId,
        success: data.success,
        status: data.statusCode,
        latency: data.latencyMs,
      });
      fetchWebhooks();
    } catch {
      setTestResult({ id: webhookId, success: false, status: 504, latency: 0 });
    } finally {
      setTestingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this webhook subscription?")) return;
    try {
      const res = await fetch(`/api/developers/webhooks?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setWebhooks((prev) => prev.filter((w) => w._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete webhook:", err);
    }
  };

  const copySecret = (secret: string, id: string) => {
    navigator.clipboard.writeText(secret);
    setCopiedSecretId(id);
    setTimeout(() => setCopiedSecretId(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <WebhookIcon className="h-4 w-4 text-violet-400" />
            Real-Time Webhook Endpoints
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">Receive instant HTTP POST payloads with HMAC-SHA256 signatures whenever your links are clicked or created.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-violet-500 transition cursor-pointer self-start sm:self-auto shrink-0 shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Webhook</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center text-zinc-500">
          <RefreshCw className="h-5 w-5 animate-spin text-violet-500" />
        </div>
      ) : webhooks.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40">
          <WebhookIcon className="h-8 w-8 text-zinc-600 mx-auto mb-2" />
          <p className="text-xs text-zinc-400">No webhooks configured. Add your server endpoint to receive real-time click streams.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {webhooks.map((w) => (
            <div key={w._id} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-sm font-bold text-white break-all">{w.url}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                      w.status === "active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    }`}>
                      {w.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {w.events.map((ev) => (
                      <span key={ev} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800">
                        {ev}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleTest(w._id)}
                    disabled={testingId === w._id}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 text-xs font-semibold text-white hover:bg-zinc-700 disabled:opacity-50 transition cursor-pointer"
                  >
                    <Send className={`h-3 w-3 ${testingId === w._id ? "animate-spin" : ""}`} />
                    <span>{testingId === w._id ? "Testing..." : "Send Test Ping"}</span>
                  </button>
                  <button
                    onClick={() => handleDelete(w._id)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {testResult && testResult.id === w._id && (
                <div className={`p-2.5 rounded-lg text-xs flex items-center justify-between border ${
                  testResult.success ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : "bg-rose-500/10 border-rose-500/20 text-rose-300"
                }`}>
                  <span className="flex items-center gap-1.5">
                    {testResult.success ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <AlertCircle className="h-3.5 w-3.5 text-rose-400" />}
                    HTTP {testResult.status} {testResult.success ? "Delivered" : "Delivery Failed"}
                  </span>
                  <span className="font-mono text-[11px] text-zinc-400">{testResult.latency}ms</span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-zinc-400 pt-0.5 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">Signing Secret:</span>
                  <span className="font-mono text-zinc-300">{w.secret.slice(0, 10)}...</span>
                  <button
                    onClick={() => copySecret(w.secret, w._id)}
                    className="text-violet-400 hover:text-violet-300 flex items-center gap-1 font-sans text-[11px]"
                  >
                    {copiedSecretId === w._id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedSecretId === w._id ? "Copied" : "Copy Secret"}</span>
                  </button>
                </div>
                {w.lastDeliveryStatus && (
                  <span className="text-[11px] text-zinc-500">Last HTTP {w.lastDeliveryStatus}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Webhook Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
            <form onSubmit={handleCreate} className="space-y-4">
              <h3 className="text-base font-bold text-white">Register Webhook Endpoint</h3>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Destination URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://api.yourdomain.com/webhooks/snaplink"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Subscribed Events</label>
                <div className="space-y-2">
                  {[
                    { id: "link.clicked", label: "link.clicked (Dispatches on every mobile/desktop link redirect)" },
                    { id: "link.created", label: "link.created (Dispatches when a new smart link is generated)" },
                  ].map((ev) => (
                    <label key={ev.id} className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={events.includes(ev.id)}
                        onChange={(e) => {
                          if (e.target.checked) setEvents([...events, ev.id]);
                          else setEvents(events.filter((x) => x !== ev.id));
                        }}
                        className="rounded border-zinc-800 text-violet-600 focus:ring-violet-500"
                      />
                      <span>{ev.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl px-4 py-2 text-xs text-zinc-400 hover:text-white">Cancel</button>
                <button
                  type="submit"
                  disabled={creating || !url.trim() || events.length === 0}
                  className="rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500 disabled:opacity-50"
                >
                  {creating ? "Adding..." : "Add Endpoint"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

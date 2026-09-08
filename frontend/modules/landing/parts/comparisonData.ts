export interface ComparisonRow {
  feature: string;
  bitly: { type: "success" | "danger" | "warning" | "badge"; text: string };
  openinapp: { type: "success" | "danger" | "warning" | "badge"; text: string };
  ours: { type: "success" | "danger" | "warning" | "badge"; text: string };
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Native Mobile App Opener",
    bitly: { type: "danger", text: "Opens in Webview" },
    openinapp: { type: "warning", text: "With 5-Sec Ads" },
    ours: { type: "success", text: "Instant 0-Sec Launch" },
  },
  {
    feature: "Countdown & Video Ads",
    bitly: { type: "danger", text: "Interstitial Ads" },
    openinapp: { type: "danger", text: "Forced 5s Video Ads" },
    ours: { type: "success", text: "100% Clean & Zero Ads" },
  },
  {
    feature: "Custom WhatsApp & Twitter Previews",
    bitly: { type: "danger", text: "Paid Tier ($35/mo)" },
    openinapp: { type: "danger", text: "Not Available" },
    ours: { type: "success", text: "Included Free" },
  },
  {
    feature: "1200px High-Res Dynamic QR Codes",
    bitly: { type: "danger", text: "Paid Plan Only" },
    openinapp: { type: "warning", text: "Watermarked" },
    ours: { type: "success", text: "Unbranded & High-Res" },
  },
  {
    feature: "Real-Time Android vs iOS Analytics",
    bitly: { type: "warning", text: "Basic Clicks Only" },
    openinapp: { type: "success", text: "Full Breakdown" },
    ours: { type: "success", text: "Live OS & Referrer Stats" },
  },
  {
    feature: "Pricing & Usage Limits",
    bitly: { type: "danger", text: "$35 / month ($420/yr)" },
    openinapp: { type: "warning", text: "₹999 / month Pro" },
    ours: { type: "badge", text: "100% Free Forever" },
  },
];

export interface ComparisonCellData {
  type: "success" | "danger" | "warning" | "badge";
  text: string;
  mobileText?: string;
}

export interface ComparisonRow {
  feature: string;
  mobileFeature?: string;
  bitly: ComparisonCellData;
  openinapp: ComparisonCellData;
  ours: ComparisonCellData;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Native Mobile App Opener",
    mobileFeature: "Native App Intent",
    bitly: { type: "danger", text: "Opens in Webview", mobileText: "Webview" },
    openinapp: { type: "warning", text: "With 5-Sec Ads", mobileText: "5s Ads" },
    ours: { type: "success", text: "Instant 0-Sec Launch", mobileText: "0s Instant" },
  },
  {
    feature: "Countdown & Video Ads",
    mobileFeature: "Ad Interruptions",
    bitly: { type: "danger", text: "Interstitial Ads", mobileText: "Ads" },
    openinapp: { type: "danger", text: "Forced 5s Video Ads", mobileText: "5s Video" },
    ours: { type: "success", text: "100% Clean & Zero Ads", mobileText: "Zero Ads" },
  },
  {
    feature: "Custom WhatsApp & Twitter Previews",
    mobileFeature: "Rich Link Cards",
    bitly: { type: "danger", text: "Paid Tier ($35/mo)", mobileText: "Paid" },
    openinapp: { type: "danger", text: "Not Available", mobileText: "None" },
    ours: { type: "success", text: "Included Free", mobileText: "Free" },
  },
  {
    feature: "1200px High-Res Dynamic QR Codes",
    mobileFeature: "Dynamic QR Codes",
    bitly: { type: "danger", text: "Paid Plan Only", mobileText: "Paid" },
    openinapp: { type: "warning", text: "Watermarked", mobileText: "Watermark" },
    ours: { type: "success", text: "Unbranded & High-Res", mobileText: "HD Free" },
  },
  {
    feature: "Real-Time Android vs iOS Analytics",
    mobileFeature: "OS Analytics",
    bitly: { type: "warning", text: "Basic Clicks Only", mobileText: "Basic" },
    openinapp: { type: "success", text: "Full Breakdown", mobileText: "Full" },
    ours: { type: "success", text: "Live OS & Referrer Stats", mobileText: "Live OS" },
  },
  {
    feature: "Pricing & Usage Limits",
    mobileFeature: "Pricing",
    bitly: { type: "danger", text: "$35 / month ($420/yr)", mobileText: "$35/mo" },
    openinapp: { type: "warning", text: "₹999 / month Pro", mobileText: "₹999/mo" },
    ours: { type: "badge", text: "100% Free Forever", mobileText: "100% Free" },
  },
];

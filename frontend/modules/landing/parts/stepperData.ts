import { Link2, Layers, Smartphone, TrendingUp, LucideIcon } from "lucide-react";

export interface StepItem {
  num: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accentColor: string;
}

export const stepperSteps: StepItem[] = [
  {
    num: "01",
    title: "Paste Destination Link",
    subtitle: "Input any product, channel, or post URL from Amazon, YouTube, Instagram, or Myntra.",
    icon: Link2,
    accentColor: "text-[#2c35af]",
  },
  {
    num: "02",
    title: "OS Deep-Link Routing",
    subtitle: "Compiles official Android App Intents and iOS Universal Schemes with safe web fallback.",
    icon: Layers,
    accentColor: "text-[#2c35af]",
  },
  {
    num: "03",
    title: "Direct Native App Open",
    subtitle: "Launches the official installed mobile app instantly, bypassing in-app webview login walls.",
    icon: Smartphone,
    accentColor: "text-[#2c35af]",
  },
  {
    num: "04",
    title: "1-Click Native Conversion",
    subtitle: "Retains active sessions, affiliate attribution cookies, and saved UPI payment methods.",
    icon: TrendingUp,
    accentColor: "text-emerald-600",
  },
];

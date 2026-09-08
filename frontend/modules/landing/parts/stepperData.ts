import { Link2, Cpu, Zap, TrendingUp, LucideIcon } from "lucide-react";

export interface StepItem {
  num: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  cardBg: string;
  borderTint: string;
  badgeBg: string;
}

export const stepperSteps: StepItem[] = [
  {
    num: "01",
    badge: "INPUT",
    title: "Paste Any Link",
    subtitle: "Drop any Amazon, Instagram, YouTube, Flipkart, or custom web link.",
    icon: Link2,
    cardBg: "bg-[#f5f7fc]",
    borderTint: "border-blue-200/80 hover:border-blue-400",
    badgeBg: "bg-blue-100/90 text-blue-900 border-blue-200",
  },
  {
    num: "02",
    badge: "ROUTING",
    title: "Smart Intent Engine",
    subtitle: "Detects client OS (iOS / Android) and compiles official native deep link schemes.",
    icon: Cpu,
    cardBg: "bg-[#fcf8f0]",
    borderTint: "border-amber-200/80 hover:border-amber-400",
    badgeBg: "bg-amber-100/90 text-amber-900 border-amber-200",
  },
  {
    num: "03",
    badge: "INSTANT",
    title: "Direct 0s App Open",
    subtitle: "Bypasses slow in-app webview login traps to open official native apps directly.",
    icon: Zap,
    cardBg: "bg-[#f8f5fc]",
    borderTint: "border-purple-200/80 hover:border-purple-400",
    badgeBg: "bg-purple-100/90 text-purple-900 border-purple-200",
  },
  {
    num: "04",
    badge: "SUCCESS",
    title: "3x More Conversions",
    subtitle: "Users stay logged in with active carts, Prime status, and 1-click checkout ready.",
    icon: TrendingUp,
    cardBg: "bg-[#f2f8f4]",
    borderTint: "border-emerald-200/80 hover:border-emerald-400",
    badgeBg: "bg-emerald-100/90 text-emerald-900 border-emerald-200",
  },
];

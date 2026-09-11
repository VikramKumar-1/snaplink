import { LucideIcon } from "lucide-react";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export type MockupType =
  | "app-intent"
  | "qr-code"
  | "bio-card"
  | "analytics-chart"
  | "smart-routing"
  | "domain-cname"
  | "security-lock"
  | "cta-banner"
  | "utm-pixel"
  | "api-code";

export interface ServiceStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface RealWorldExample {
  scenario: string;
  before: string;
  after: string;
}

export interface ServiceDetail {
  slug: string;
  name: string;
  category: string;
  badge: string;
  shortDesc: string;
  longDesc: string;
  whatIsIt: string;
  realWorldExample: RealWorldExample;
  icon: LucideIcon;
  accentColor: string;
  highlights: string[];
  whyItMatters: string;
  howToUseSteps: ServiceStep[];
  actionUrl: string;
  actionLabel: string;
  mockupType: MockupType;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  faqs: ServiceFaq[];
}

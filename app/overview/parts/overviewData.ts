import { FeatureCardProps } from "./FeatureCard";
import {
  Zap,
  BarChart3,
  UserCheck,
  QrCode,
  Globe2,
  Lock,
  Compass,
  Code2,
  Building2,
  Megaphone,
  Target,
  FileSearch,
} from "lucide-react";

export const OVERVIEW_FEATURES: FeatureCardProps[] = [
  {
    title: "Instant Mobile App Intent Engine",
    category: "Core Engine",
    badge: "0ms App Intent",
    icon: Zap,
    description:
      "Converts standard URLs into high-converting deep links that open official apps (YouTube, Instagram, Amazon, Flipkart, Spotify, Telegram) directly, bypassing the in-app browser.",
    highlights: [
      "Sub-15ms server-side HTTP 307 redirect",
      "Bypasses Instagram/TikTok webview trap",
      "Native intent support for 25+ major platforms",
    ],
    howToAccess: "Homepage (/) creator box or /services/app-openers",
    actionUrl: "/services/app-openers",
    actionLabel: "View App Opener",
  },
  {
    title: "Real-time Creator Analytics Studio",
    category: "Analytics & Attribution",
    badge: "Live KPIs",
    icon: BarChart3,
    description:
      "High-speed analytics dashboard tracking total clicks, device breakdown (iOS/Android/Desktop), hourly timeline charts, geo countries, and referrer attribution.",
    highlights: [
      "Sub-10ms single round-trip MongoDB aggregation",
      "Referrer attribution (Instagram, WhatsApp, Direct)",
      "Instant CSV & Excel raw click data export",
    ],
    howToAccess: "Navigate to /dashboard or /services/analytics",
    actionUrl: "/services/analytics",
    actionLabel: "Explore Analytics",
  },
  {
    title: "Creator Link-in-Bio Platform",
    category: "Creator Profiles",
    badge: "Bio Tree",
    icon: UserCheck,
    description:
      "A personalized public micro-site hosting your links, socials, bio, avatar, and verified badge with interactive live phone preview editing in the dashboard.",
    highlights: [
      "Clean /@username or /bio/[username] URLs",
      "Live phone preview editor in Dashboard",
      "Social buttons & individual click tracking",
    ],
    howToAccess: "Visit /@username or /services/link-in-bio",
    actionUrl: "/services/link-in-bio",
    actionLabel: "Customize Bio Page",
  },
  {
    title: "Branded QR Code Studio",
    category: "Print & Packaging",
    badge: "Vector SVG & PNG",
    icon: QrCode,
    description:
      "High-resolution QR code generator with Error Correction Level H (30% damage resistance), brand accent colors, and center brand logo embedding.",
    highlights: [
      "1200px PNG & Infinite-scale Vector SVG",
      "Brand color palette customizer",
      "Center logo upload with automated dot excavation",
    ],
    howToAccess: "Dashboard ➔ 'Generate QR' or /services/qr-codes",
    actionUrl: "/services/qr-codes",
    actionLabel: "Launch QR Studio",
  },
  {
    title: "Dynamic Smart Traffic Routing",
    category: "Traffic Optimization",
    badge: "Conditional Rules",
    icon: Compass,
    description:
      "Conditionally routes visitors to different URLs based on their Country (Geo), Device Operating System (iOS vs Android), or Browser Language.",
    highlights: [
      "Geo-targeting (India, USA, UK, Global)",
      "App Store vs Google Play Store device routing",
      "Sub-1ms in-memory rule engine",
    ],
    howToAccess: "Dashboard ➔ Edit Link ➔ 'Smart Rules' or /services/smart-routing",
    actionUrl: "/services/smart-routing",
    actionLabel: "Configure Routing",
  },
  {
    title: "VIP Password & Link Expiration",
    category: "Security & Control",
    badge: "Zero-Leak",
    icon: Lock,
    description:
      "Protect sensitive creator links with passcodes or automatically expire links based on max click counts or date deadlines with custom fallback URLs.",
    highlights: [
      "Bcrypt password protection with PIN modal",
      "Max clicks and date expiration limits",
      "Zero-leak: original URL never exposed to crawlers",
    ],
    howToAccess: "Dashboard ➔ Edit Link ➔ 'Routing & Limits' or /services/link-security",
    actionUrl: "/services/link-security",
    actionLabel: "Set Passwords & Limits",
  },
  {
    title: "Custom Domain White-Labeling",
    category: "Enterprise Branding",
    badge: "White-Label",
    icon: Globe2,
    description:
      "Connect your custom domain (e.g. go.yourbrand.com) with automated DNS CNAME verification, SSL termination, and fallback redirection.",
    highlights: [
      "Automated DNS CNAME validation",
      "Full custom domain short link support",
      "Root domain fallback URL",
    ],
    howToAccess: "API: /api/domains or /services/custom-domains",
    actionUrl: "/services/custom-domains",
    actionLabel: "Manage Domains",
  },
  {
    title: "Marketing CTA Floating Overlays",
    category: "Lead Generation",
    badge: "Lead Magnets",
    icon: Megaphone,
    description:
      "Attach custom floating call-to-action banners, discount coupons, and newsletter prompts on top of any destination link you share.",
    highlights: [
      "Floating non-intrusive bottom banner design",
      "Custom coupon codes and conversion buttons",
      "Monetize shared external articles and media",
    ],
    howToAccess: "Link Creator ➔ 'CTA Banner' or /services/cta-overlays",
    actionUrl: "/services/cta-overlays",
    actionLabel: "Create CTA Link",
  },
  {
    title: "Campaign UTM & Pixel Retargeting",
    category: "Digital Marketing",
    badge: "Ad Tracking",
    icon: Target,
    description:
      "Built-in Google Analytics UTM campaign builder with automated Meta (Facebook) Pixel PageView event injection to build high-converting custom ad audiences.",
    highlights: [
      "Automated UTM parameter builder",
      "Meta Pixel PageView tracking tag firing",
      "Build Facebook & Instagram custom audiences",
    ],
    howToAccess: "Link Creator ➔ 'Campaign UTM' or /services/utm-retargeting",
    actionUrl: "/services/utm-retargeting",
    actionLabel: "Build UTM Campaign",
  },
  {
    title: "Developer REST API & Webhooks",
    category: "Developers & Automation",
    badge: "v1 REST API",
    icon: Code2,
    description:
      "Programmatic API keys (snap_live_...), public v1 REST endpoints for automated link generation, and real-time HMAC-SHA256 signed webhooks.",
    highlights: [
      "Public REST API: /api/v1/links",
      "HMAC-SHA256 signed events (link.clicked, link.created)",
      "Webhook test ping and delivery latency tracking",
    ],
    howToAccess: "Dashboard ➔ Developer Tab or /services/developer-api",
    actionUrl: "/services/developer-api",
    actionLabel: "Developer Studio",
  },
  {
    title: "Multi-Tenant Workspaces & SSO",
    category: "Teams & Enterprise",
    badge: "RBAC & SSO",
    icon: Building2,
    description:
      "Team collaboration with multi-tenant workspaces, role-based access control (Admin, Member, Viewer), immutable audit logs, and SAML/OIDC SSO.",
    highlights: [
      "Role-based access control (Admin, Member, Viewer)",
      "Immutable audit log trail with IP & user agent",
      "Enterprise SAML / OIDC Single Sign-On",
    ],
    howToAccess: "API: /api/workspaces or Dashboard Workspace Switcher",
    actionUrl: "/dashboard",
    actionLabel: "Explore Workspaces",
  },
  {
    title: "Centralized SEO & Metadata Engine",
    category: "SEO & Search Engine Ranking",
    badge: "Admin Controlled",
    icon: FileSearch,
    description:
      "Configurable SEO schema architecture allowing administrators to dynamically manage meta titles, search descriptions, focus keywords, OpenGraph cards, and Google rich snippets.",
    highlights: [
      "Schema.org BreadcrumbList & FAQPage rich snippets",
      "Admin-controlled metadata schema and fallback presets",
      "Automated XML sitemap with dynamic priority weights",
    ],
    howToAccess: "Built into all routes & upcoming Admin SEO Control Panel",
    actionUrl: "/services",
    actionLabel: "View SEO Services",
  },
];

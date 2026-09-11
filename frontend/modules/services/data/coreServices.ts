import { Zap, QrCode, UserCheck, BarChart3, Compass } from "lucide-react";
import { ServiceDetail } from "../types";

export const CORE_SERVICES: ServiceDetail[] = [
  {
    slug: "app-openers",
    name: "Instant Mobile App Openers",
    category: "Traffic Optimization",
    badge: "0ms App Launch",
    icon: Zap,
    accentColor: "#2c35af",
    shortDesc: "Bypass in-app webviews and launch official apps (YouTube, Instagram, Amazon, Flipkart) directly in <15ms.",
    longDesc: "When users tap links inside Instagram, WhatsApp, or Facebook, apps open an inferior in-app webview where users are logged out. SnapLink issues an immediate server-side HTTP 307 redirect that triggers Android App Links and iOS Universal Links, opening the native app directly.",
    whatIsIt: "A smart link technology that forces social media apps (like Instagram, TikTok, and WhatsApp) to open links directly inside official mobile apps (like YouTube, Amazon, and Spotify) where visitors are already logged in.",
    realWorldExample: {
      scenario: "Sharing a YouTube video or Amazon deal on an Instagram Story or Bio",
      before: "Viewer taps link ➔ Trapped inside Instagram browser ➔ Forced to type password to subscribe or buy ➔ 85% drop-off.",
      after: "Viewer taps link ➔ Official YouTube or Amazon app launches in 0.01s ➔ 1-tap subscribe or buy with active login.",
    },
    highlights: [
      "Sub-15ms server-side HTTP 307 instant redirection",
      "Bypasses trapped Instagram & TikTok webview sandbox",
      "Native intent engine for 25+ major shopping and social platforms",
      "Zero-latency memory caching for instant RAM resolution",
    ],
    whyItMatters: "Increases conversions by over 300% for creators, affiliate marketers, and e-commerce stores by ensuring visitors land inside the app where their payment details and login sessions are active.",
    howToUseSteps: [
      {
        stepNumber: 1,
        title: "Paste Your Link",
        description: "Copy any YouTube, Instagram, Amazon, or store link and paste it into SnapLink.",
      },
      {
        stepNumber: 2,
        title: "Click Generate",
        description: "SnapLink automatically configures native mobile deep linking in under 1 second.",
      },
      {
        stepNumber: 3,
        title: "Share & Convert",
        description: "Post the link in your bio or story. Clicks open directly inside the official app.",
      },
    ],
    actionUrl: "/",
    actionLabel: "Create App Opener Link",
    mockupType: "app-intent",
    seoTitle: "Free App Opener Link Generator | Open YouTube, Instagram & Amazon in App",
    seoDescription: "Generate free app opener deep links that bypass Instagram and TikTok in-app browsers. Force links to open directly in native Android and iOS apps for 3x conversions.",
    keywords: [
      "app opener link generator",
      "open youtube in app directly",
      "bypass instagram in app browser",
      "deep link generator for instagram",
      "amazon affiliate app opener",
      "openinapp alternative free",
      "smart url redirect to native app",
      "ios universal links android intent"
    ],
    faqs: [
      {
        question: "How does the App Opener link bypass Instagram's in-app browser?",
        answer: "SnapLink uses server-side HTTP 307 redirects combined with platform-specific custom URI schemes (intent:// on Android and Universal Links on iOS) to immediately hand over execution to the operating system's native application."
      },
      {
        question: "Will my affiliate tracking IDs still work with App Opener links?",
        answer: "Yes, 100%. SnapLink preserves all URL query parameters, UTM tags, and affiliate tracking tokens (such as Amazon Associates tags or Flipkart affiliate IDs) during redirection."
      }
    ]
  },
  {
    slug: "qr-codes",
    name: "Branded QR Code Studio",
    category: "Print & Packaging",
    badge: "Vector SVG & PNG",
    icon: QrCode,
    accentColor: "#121316",
    shortDesc: "Generate high-resolution vector QR codes with custom brand colors, center logo embedding, and 30% error correction.",
    longDesc: "Transform digital links into physical marketing assets. Our QR studio creates dynamic, production-grade QR codes with Error Correction Level H (resisting up to 30% surface damage) suitable for billboards, restaurant tables, flyers, and retail product packaging.",
    whatIsIt: "A high-resolution QR generator that converts your web links into scannable vector QR codes featuring your brand colors, center logo, and damage-resistant scanning.",
    realWorldExample: {
      scenario: "Printing QR codes on product packaging, flyers, or restaurant menus",
      before: "Ugly generic black-and-white QR code that looks untrustworthy and fails to scan when scratched.",
      after: "Custom branded QR code with your logo and colors, download in infinite-scale SVG with 30% damage tolerance.",
    },
    highlights: [
      "1200px High-Resolution PNG for digital print",
      "Infinite-scale Vector SVG for physical billboards",
      "Custom brand color palettes (Royal Blue, Emerald, Crimson, Black)",
      "Center brand logo upload with automated dot excavation",
    ],
    whyItMatters: "Bridges offline foot traffic directly into digital conversions with branded, scannable QR codes that never expire.",
    howToUseSteps: [
      {
        stepNumber: 1,
        title: "Create Short Link",
        description: "Paste your destination URL on SnapLink or select any link in your dashboard.",
      },
      {
        stepNumber: 2,
        title: "Customize QR Style",
        description: "Click 'Generate QR', choose your brand color, and optionally upload a center logo.",
      },
      {
        stepNumber: 3,
        title: "Download Print Asset",
        description: "Download in crystal-clear 1200px PNG for social or infinite vector SVG for print.",
      },
    ],
    actionUrl: "/dashboard",
    actionLabel: "Launch QR Studio",
    mockupType: "qr-code",
    seoTitle: "Custom Branded QR Code Generator with Logo | Free Vector SVG & High-Res PNG",
    seoDescription: "Create custom QR codes with your brand logo, custom color palettes, and Level H error correction. Download in infinite-scale SVG or print-ready 1200px PNG.",
    keywords: [
      "branded qr code generator with logo",
      "free dynamic qr code generator",
      "vector svg qr code download",
      "custom color qr code",
      "high resolution qr code for print",
      "qr code with custom center image"
    ],
    faqs: [
      {
        question: "Do SnapLink dynamic QR codes expire?",
        answer: "No, SnapLink QR codes do not expire. Dynamic QR codes point to your short URL, meaning you can update the destination link anytime without reprinting physical collateral."
      },
      {
        question: "Can I download print-ready vector formats for billboards?",
        answer: "Yes, you can export your QR codes as infinite-resolution SVG vectors or ultra-high-resolution 1200px PNG files suitable for professional CMYK printing."
      }
    ]
  },
  {
    slug: "link-in-bio",
    name: "Creator Link-in-Bio Hub",
    category: "Creator Profiles",
    badge: "Custom Bio Tree",
    icon: UserCheck,
    accentColor: "#6366f1",
    shortDesc: "Personalized, mobile-optimized micro-site hosting your links, socials, bio, avatar, and verified badge at /@username.",
    longDesc: "Instagram, TikTok, and X only allow one link in your bio. SnapLink's Link-in-Bio platform provides creators with a clean, lightning-fast landing page showcasing all their content, product drops, social handles, and affiliate links in one unified profile.",
    whatIsIt: "A sleek personal micro-site (snaplink.to/@yourname) that houses all your content, social handles, sponsor deals, and product drops in one single mobile bio page.",
    realWorldExample: {
      scenario: "Instagram only allows 1 link in your profile bio",
      before: "Forced to constantly change your bio link between your latest video, shop, and podcast, confusing fans.",
      after: "One clean profile link with your verified badge, avatar, and all your top links with live click tracking.",
    },
    highlights: [
      "Clean personalized URLs (/@username and /bio/[username])",
      "Live interactive smartphone preview editor in Dashboard",
      "Custom avatar, verified creator badge, and rich bio description",
      "Comprehensive click tracking on every individual bio link",
    ],
    whyItMatters: "Maximizes the value of your social media bio by letting followers discover all your content and brand partnerships from a single link.",
    howToUseSteps: [
      {
        stepNumber: 1,
        title: "Claim Your Handle",
        description: "Open the Link-in-Bio tab in your dashboard and claim your unique username.",
      },
      {
        stepNumber: 2,
        title: "Add Profile & Links",
        description: "Upload your avatar, write a punchy bio, and add your social links and shop cards.",
      },
      {
        stepNumber: 3,
        title: "Paste in Social Bio",
        description: "Copy your custom URL (snaplink.to/@you) and paste it into Instagram and TikTok.",
      },
    ],
    actionUrl: "/dashboard",
    actionLabel: "Customize Bio Page",
    mockupType: "bio-card",
    seoTitle: "Free Link in Bio Tool for Creators & Influencers | One Link Bio Profile",
    seoDescription: "Build a sleek, high-converting Link in Bio micro-site for Instagram, TikTok, and YouTube. Showcase affiliate products, social links, and track every click for free.",
    keywords: [
      "link in bio tool free",
      "instagram bio link tree alternative",
      "creator bio link page",
      "one link for all social media",
      "linktree alternative free india",
      "custom url link in bio"
    ],
    faqs: [
      {
        question: "Is the Link-in-Bio feature completely free to use?",
        answer: "Yes, creators get their own custom username slug (e.g. /@yourbrand) with unlimited links, analytics, and social icons completely free."
      },
      {
        question: "Can I track which links in my bio get the most clicks?",
        answer: "Yes, every link on your profile tracks real-time click volume, device breakdown, and referrer channels inside your dashboard."
      }
    ]
  },
  {
    slug: "analytics",
    name: "Real-time Click Analytics",
    category: "Analytics & Attribution",
    badge: "Sub-10ms Queries",
    icon: BarChart3,
    accentColor: "#059669",
    shortDesc: "Deep click attribution tracking device OS, referrer sources, geo countries, hourly timelines, and instant CSV exports.",
    longDesc: "Make data-driven marketing decisions with real-time click tracking. Powered by an optimized single round-trip MongoDB $facet aggregation pipeline, our analytics engine visualizes exactly who is clicking, what device they are on, and where they came from.",
    whatIsIt: "A live analytics dashboard that reveals who is clicking your links, what country they are in, whether they use iPhone or Android, and which social app sent them.",
    realWorldExample: {
      scenario: "Running a marketing campaign across Instagram, WhatsApp, and Telegram",
      before: "Blindly guessing which post generated sales or which platform actually delivered genuine buyers.",
      after: "Live visual charts showing 70% iPhone users from Instagram, top cities, and instant 1-click CSV export.",
    },
    highlights: [
      "Sub-10ms aggregation speed with zero database lagging",
      "Referrer attribution (Instagram bio, WhatsApp, YouTube, Direct)",
      "Device and OS distribution (iOS, Android, Windows, macOS)",
      "Instant raw data export to CSV and Excel for reporting",
    ],
    whyItMatters: "Gives creators and marketing agencies transparent proof of traffic, campaign ROI, and conversion channels.",
    howToUseSteps: [
      {
        stepNumber: 1,
        title: "Open Dashboard",
        description: "Log in to your dashboard to view live click counters across all your active links.",
      },
      {
        stepNumber: 2,
        title: "Inspect Deep Metrics",
        description: "Click 'View Clicks' on any link to inspect country flags, OS breakdown, and hourly heatmaps.",
      },
      {
        stepNumber: 3,
        title: "Export Clean Reports",
        description: "Download full CSV spreadsheets anytime to share proof with sponsors or brand partners.",
      },
    ],
    actionUrl: "/dashboard",
    actionLabel: "Explore Analytics",
    mockupType: "analytics-chart",
    seoTitle: "Real-Time URL Click Tracker & Analytics | Link Attribution & Geo Reports",
    seoDescription: "Monitor link performance with sub-10ms real-time click attribution. Track visitor countries, operating systems, referrer channels, and export raw CSV data.",
    keywords: [
      "real time link click tracker",
      "url analytics dashboard",
      "track clicks by country and device",
      "free link tracking software",
      "bitly analytics alternative",
      "click attribution for creators"
    ],
    faqs: [
      {
        question: "How fast do clicks reflect on my analytics dashboard?",
        answer: "Clicks are recorded asynchronously in real-time. Your dashboard queries reflect new clicks within milliseconds without page refreshes."
      },
      {
        question: "Can I export my link analytics for client reporting?",
        answer: "Yes, you can export full click logs to CSV format containing timestamps, referrers, country codes, and device details with one click."
      }
    ]
  },
  {
    slug: "smart-routing",
    name: "Dynamic Smart Traffic Routing",
    category: "Conversion Optimization",
    badge: "Conditional Rules",
    icon: Compass,
    accentColor: "#2563eb",
    shortDesc: "Direct visitors to different URLs based on their Country (Geo), Device (iOS vs Android), and Browser Language.",
    longDesc: "Never lose a customer due to incompatible links. With dynamic smart routing, a single link sends iPhone users to the Apple App Store, Android users to Google Play, and international visitors to localized regional landing pages automatically.",
    whatIsIt: "An intelligent traffic router that automatically delivers visitors to the right destination based on their phone (iPhone vs Android), country, or language using one single link.",
    realWorldExample: {
      scenario: "Promoting a mobile app available on both Apple App Store and Google Play",
      before: "Sharing two separate links or confusing users who accidentally tap the wrong platform store link.",
      after: "One single universal link that detects the phone: iOS users open App Store, Android users open Google Play.",
    },
    highlights: [
      "Geo-targeting rules (India, USA, UK, Europe, Global)",
      "Device-level routing (iOS App Store vs Android Play Store)",
      "Language-based content redirection",
      "Sub-1ms in-memory rule evaluation engine",
    ],
    whyItMatters: "Delivers a localized, platform-tailored experience for global app launches, international e-commerce, and multi-region marketing.",
    howToUseSteps: [
      {
        stepNumber: 1,
        title: "Create Universal Link",
        description: "Shorten your primary app website or product landing page.",
      },
      {
        stepNumber: 2,
        title: "Add Smart Rules",
        description: "Switch to 'Smart Rules' and configure iOS ➔ App Store and Android ➔ Google Play.",
      },
      {
        stepNumber: 3,
        title: "Share One Link",
        description: "Promote one universal link everywhere; SnapLink handles routing automatically in 0.8ms.",
      },
    ],
    actionUrl: "/dashboard",
    actionLabel: "Set Smart Rules",
    mockupType: "smart-routing",
    seoTitle: "Smart Dynamic URL Redirect Routing by Device, Country & OS",
    seoDescription: "Send users to different destination URLs based on their device (iOS vs Android), geolocation, or browser language from a single smart short link.",
    keywords: [
      "smart url routing",
      "redirect ios to app store android to play store",
      "geo targeted link redirect",
      "conditional url forwarding",
      "dynamic link shortener rules"
    ],
    faqs: [
      {
        question: "Can I use one link for both iOS App Store and Google Play?",
        answer: "Yes, smart routing detects the visitor's User-Agent on the server and redirects iOS users to the App Store and Android users to Google Play automatically."
      },
      {
        question: "Does smart routing slow down the redirection speed?",
        answer: "No. Rule evaluation is performed in-memory during request processing, taking less than 1 millisecond."
      }
    ]
  }
];

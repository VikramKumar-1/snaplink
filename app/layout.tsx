import type { Metadata, Viewport } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  preload: true,
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: false,
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://smartdeeplink.to";

export const viewport: Viewport = {
  themeColor: "#2c35af",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "SmartDeepLink | 1-Click Native App Deep Links & Creator Analytics",
    template: "%s | SmartDeepLink",
  },
  description:
    "Bypass slow in-app webview traps on Instagram, TikTok, and YouTube. Launch official apps directly on YouTube, Myntra, Amazon, and Spotify with real-time attribution and 100% free creator tools.",
  keywords: [
    "deep link generator",
    "smart url shortener",
    "instagram in-app browser bypass",
    "myntra affiliate deep link",
    "wishlink alternative",
    "open in youtube app",
    "amazon associate link bypass",
    "branded qr code generator",
    "creator link attribution",
    "free deep link service"
  ],
  authors: [{ name: "SmartDeepLink Team", url: baseUrl }],
  creator: "SmartDeepLink",
  publisher: "SmartDeepLink",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "SmartDeepLink | Level Up Your Creator Links Directly into Native Apps",
    description:
      "Bypass in-app browser traps on Instagram, TikTok, and YouTube. Launch official apps directly with zero ads and track clicks in real-time.",
    url: baseUrl,
    siteName: "SmartDeepLink",
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: "SmartDeepLink — 1-Click Native Mobile App Intent Engine",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartDeepLink | Direct App Launch & Creator Analytics",
    description:
      "Force-open native mobile apps directly from Instagram & YouTube. Boost affiliate commissions and conversions.",
    images: ["/og-preview.png"],
    creator: "@smartdeeplink",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "dev-client-id";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SmartDeepLink",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Android, iOS, Windows, macOS, Linux",
    url: baseUrl,
    description:
      "A free, high-performance deep link generator that bypasses in-app browser traps on Instagram and YouTube to launch official mobile apps directly.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "0-Second In-App Browser Bypass",
      "Myntra & Ajio Native App Intent",
      "Amazon Affiliate Tag Auto-Injection",
      "Sub-10ms Real-Time Geo & Referrer Analytics",
      "Branded QR Code Studio with Center Logo",
      "100% Free Open Protocol",
    ],
  };

  return (
    <html lang="en" className={`${poppins.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-[#f5f4ef] text-[#121316] selection:bg-[#ccff00] selection:text-black">
        <GoogleOAuthProvider clientId={googleClientId}>
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

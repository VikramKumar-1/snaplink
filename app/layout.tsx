import type { Metadata, Viewport } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

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

const baseUrl = BRAND_CONFIG.baseUrl;

export const viewport: Viewport = {
  themeColor: "#2c35af",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${BRAND_CONFIG.name} | 1-Click Native App Deep Links & Creator Analytics`,
    template: `%s | ${BRAND_CONFIG.name}`,
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
  authors: [{ name: `${BRAND_CONFIG.name} Team`, url: baseUrl }],
  creator: BRAND_CONFIG.name,
  publisher: BRAND_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: `${BRAND_CONFIG.name} | Level Up Your Creator Links Directly into Native Apps`,
    description:
      "Bypass in-app browser traps on Instagram, TikTok, and YouTube. Launch official apps directly with zero ads and track clicks in real-time.",
    url: baseUrl,
    siteName: BRAND_CONFIG.name,
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: `${BRAND_CONFIG.name} — 1-Click Native Mobile App Intent Engine`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_CONFIG.name} | Direct App Launch & Creator Analytics`,
    description:
      "Force-open native mobile apps directly from Instagram & YouTube. Boost affiliate commissions and conversions.",
    images: ["/og-preview.png"],
    creator: `@${BRAND_CONFIG.name.toLowerCase()}`,
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
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: BRAND_CONFIG.name,
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
    name: BRAND_CONFIG.name,
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
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

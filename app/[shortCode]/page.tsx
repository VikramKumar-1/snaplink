import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { LinkRepository } from "@/backend/modules/links/link.repository";
import { RedirectController } from "@/backend/modules/redirect/redirect.controller";
import { SmartRedirectCard } from "@/frontend/modules/redirect/SmartRedirectCard";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

interface Props {
  params: Promise<{ shortCode: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shortCode } = await params;
  const link = await LinkRepository.findByShortCode(shortCode);

  if (!link) {
    return {
      title: `Link Not Found | ${BRAND_CONFIG.name}`,
    };
  }

  const title = link.customTitle || link.title || "Opening in App...";
  const description =
    link.customDescription || "Tap to open directly in the official mobile app.";
  const image = link.customImage || "/og-preview.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function RedirectPage({ params }: Props) {
  const { shortCode } = await params;
  const headerList = await headers();
  const userAgent = headerList.get("user-agent") || "";
  const referer = headerList.get("referer") || "";
  const country =
    headerList.get("cf-ipcountry") ||
    headerList.get("x-vercel-ip-country") ||
    headerList.get("x-country") ||
    "IN";
  const city =
    headerList.get("x-vercel-ip-city") ||
    headerList.get("cf-ipcity") ||
    "Unknown";

  const result = await RedirectController.handleRedirect(shortCode, userAgent, referer, {
    country,
    city,
  });

  if (result.notFound || !result.link || !result.deepLinkInfo) {
    notFound();
  }

  // 1. FAST DESKTOP REDIRECT: Zero delay on PC / Laptop!
  // If not mobile, immediately redirect server-side without rendering any intermediate page.
  if (result.device === "windows" || result.device === "mac" || result.device === "linux") {
    redirect(result.link.originalUrl);
  }

  // 2. MOBILE REDIRECT: Render SmartRedirectCard which fires app intent immediately at 0.0s
  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <SmartRedirectCard
        link={result.link}
        deepLinkInfo={result.deepLinkInfo}
        device={result.device}
        inAppBrowser={result.inAppBrowser}
      />
    </main>
  );
}

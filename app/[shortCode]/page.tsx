import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { LinkRepository } from "@/backend/modules/links/link.repository";
import { RedirectController } from "@/backend/modules/redirect/redirect.controller";
import { SmartRedirectCard } from "@/frontend/modules/redirect/SmartRedirectCard";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";
import { BioService } from "@/backend/modules/bio/bio.service";
import { PublicBioPage } from "@/frontend/modules/bio/PublicBioPage";
import { LinkPasswordModal } from "@/frontend/modules/redirect/parts/LinkPasswordModal";
import { LinkExpiredCard } from "@/frontend/modules/redirect/parts/LinkExpiredCard";
import { RetargetingPixelBridge } from "@/frontend/modules/redirect/parts/RetargetingPixelBridge";
import { DomainRepository } from "@/backend/modules/domains/domain.repository";

interface Props {
  params: Promise<{ shortCode: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shortCode } = await params;

  if (shortCode.startsWith("@") || shortCode.startsWith("%40")) {
    const cleanUsername = decodeURIComponent(shortCode).slice(1);
    try {
      const bio = await BioService.getPublicBio(cleanUsername);
      const title = `${bio.displayName} (@${bio.username}) | ${BRAND_CONFIG.name}`;
      return {
        title,
        description: bio.bio || `Official links and social profiles of ${bio.displayName}.`,
        openGraph: {
          title,
          description: bio.bio,
          images: bio.avatarUrl ? [bio.avatarUrl] : ["/og-preview.png"],
        },
      };
    } catch {
      return { title: `Creator Not Found | ${BRAND_CONFIG.name}` };
    }
  }

  const headerList = await headers();
  const host = (headerList.get("host") || "").toLowerCase().split(":")[0];
  const isDefaultHost = ["localhost", "127.0.0.1", "snaplink.to", "vercel.app"].some((dh) => host.includes(dh));
  const customDomain = isDefaultHost ? undefined : host;

  const link = await LinkRepository.findByShortCode(shortCode, customDomain);

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

  // Handle @username Link-in-Bio routing
  if (shortCode.startsWith("@") || shortCode.startsWith("%40")) {
    const cleanUsername = decodeURIComponent(shortCode).slice(1);
    try {
      const bio = await BioService.getPublicBio(cleanUsername);
      return <PublicBioPage bio={bio} />;
    } catch {
      notFound();
    }
  }

  const headerList = await headers();
  const host = (headerList.get("host") || "").toLowerCase().split(":")[0];
  const isDefaultHost = ["localhost", "127.0.0.1", "snaplink.to", "vercel.app"].some((dh) => host.includes(dh));
  const customDomain = isDefaultHost ? undefined : host;

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
  const language =
    (headerList.get("accept-language") || "").split(",")[0].split("-")[0].toLowerCase() || "en";

  const result = await RedirectController.handleRedirect(
    shortCode,
    userAgent,
    referer,
    { country, city },
    customDomain,
    language
  );

  if (result.notFound) {
    if (customDomain) {
      const domainRec = await DomainRepository.findByDomain(customDomain);
      if (domainRec?.defaultRedirectUrl) {
        redirect(domainRec.defaultRedirectUrl);
      }
    }
    notFound();
  }

  // 1. Expired Link Handling (with Fallback URL support)
  if (result.isExpired) {
    if (result.fallbackUrl) {
      redirect(result.fallbackUrl);
    }
    return (
      <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <LinkExpiredCard title={result.title} reason={result.reason as "click_limit" | "date_expired" | undefined} />
      </main>
    );
  }

  // 2. Password Protected Link Handling
  if (result.isPasswordProtected) {
    return (
      <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <LinkPasswordModal
          shortCode={result.shortCode!}
          title={result.title}
          customTitle={result.customTitle}
          platform={result.platform}
        />
      </main>
    );
  }

  if (!result.link || !result.deepLinkInfo) {
    notFound();
  }

  // 3. ZERO-DELAY INSTANT REDIRECT: Immediate HTTP 307 for all standard traffic (Desktop, Mobile, QR Scanners)
  const effectiveUrl = result.effectiveUrl || result.link.originalUrl;
  const hasCtaOverlay = Boolean(result.link.ctaOverlay?.enabled && result.link.ctaOverlay?.headline);
  const hasRetargeting = Boolean(result.link?.retargeting?.metaPixelId || result.link?.retargeting?.googleAnalyticsId);

  // If there is NO promotional CTA banner, NO retargeting pixel to fire,
  // and the user is NOT trapped inside an in-app browser webview (Instagram, TikTok, etc.):
  // REDIRECT IMMEDIATELY (<15ms) via HTTP 307!
  // On iOS (Universal Links) & Android (App Links), the mobile OS directly launches YouTube, Instagram, Amazon, etc.!
  if (!hasCtaOverlay && !hasRetargeting && !result.inAppBrowser) {
    redirect(effectiveUrl);
  }

  // 4. INTERACTIVE BRIDGE: For In-App Browsers (Instagram/TikTok), CTA Banners, or Retargeting Pixels
  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      {result.link?.retargeting && (
        <RetargetingPixelBridge
          metaPixelId={result.link.retargeting.metaPixelId}
          googleAnalyticsId={result.link.retargeting.googleAnalyticsId}
        />
      )}
      <SmartRedirectCard
        link={result.link}
        deepLinkInfo={result.deepLinkInfo}
        device={result.device}
        inAppBrowser={result.inAppBrowser}
      />
    </main>
  );
}

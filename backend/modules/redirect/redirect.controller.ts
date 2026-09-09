import { LinkRepository } from "@/backend/modules/links/link.repository";
import { AnalyticsRepository } from "@/backend/modules/analytics/analytics.repository";
import { generateDeepLink, parseDevice } from "./deepLink.service";
import { WebhookService } from "@/backend/modules/webhooks/webhook.service";
import { resolveSmartDestination } from "./smartRouting.service";

export class RedirectController {
  static async handleRedirect(
    shortCode: string,
    userAgent: string,
    referer: string = "",
    geo: { country?: string; city?: string } = {},
    customDomain?: string,
    language?: string
  ) {
    const link = await LinkRepository.findByShortCode(shortCode, customDomain);

    if (!link) {
      return { notFound: true };
    }

    // 1. Expiration Checks (Time & Click Cap)
    const now = new Date();
    const isExpiredByTime = link.routing?.expiresAt ? now > new Date(link.routing.expiresAt) : false;
    const isExpiredByClicks = link.routing?.maxClicks ? (link.clicks || 0) >= link.routing.maxClicks : false;
    const isExpired = isExpiredByTime || isExpiredByClicks;

    if (isExpired) {
      if (link.routing?.expiredFallbackUrl && link.routing.expiredFallbackUrl.trim() !== "") {
        return {
          notFound: false,
          isExpired: true,
          fallbackUrl: link.routing.expiredFallbackUrl.trim(),
        };
      }
      return {
        notFound: false,
        isExpired: true,
        fallbackUrl: null,
        title: link.title || "Smart Link",
        reason: (isExpiredByClicks ? "click_limit" : "date_expired") as "click_limit" | "date_expired",
      };
    }

    // 2. Password Protection (Zero-Leak: Original URL never sent to client)
    if (link.routing?.passwordProtected) {
      return {
        notFound: false,
        isPasswordProtected: true,
        shortCode: link.shortCode,
        title: link.title || "Protected Smart Link",
        customTitle: link.customTitle,
        platform: link.platform,
      };
    }

    LinkRepository.incrementClicks(shortCode).catch(console.error);

    const parsed = parseDevice(userAgent, referer, geo);
    AnalyticsRepository.logClick({
      shortCode,
      linkId: link._id,
      device: parsed.device,
      inAppBrowser: parsed.inAppBrowser,
      referrerSource: parsed.referrerSource,
      country: parsed.country,
      city: parsed.city,
      browser: parsed.browser,
      os: parsed.os,
      userAgent,
      timestamp: new Date(),
    }).catch(console.error);

    WebhookService.dispatch(
      "link.clicked",
      {
        shortCode,
        linkId: link._id,
        platform: link.platform,
        originalUrl: link.originalUrl,
        device: parsed.device,
        inAppBrowser: parsed.inAppBrowser,
        referrerSource: parsed.referrerSource,
        country: parsed.country,
        city: parsed.city,
        clicks: (link.clicks || 0) + 1,
      },
      link.userId ? String(link.userId) : undefined
    ).catch(console.error);

    const smartResult = resolveSmartDestination(link, {
      country: parsed.country,
      device: parsed.device,
      language,
    });
    const effectiveUrl = smartResult.destinationUrl;

    const deepLinkInfo = generateDeepLink(effectiveUrl);

    const linkData = link.toObject ? link.toObject() : { ...link };
    linkData.originalUrl = effectiveUrl;

    return {
      notFound: false,
      link: linkData,
      deepLinkInfo,
      effectiveUrl,
      isSmartRouted: smartResult.isRouted,
      device: parsed.device,
      inAppBrowser: parsed.inAppBrowser,
      country: parsed.country,
      referrerSource: parsed.referrerSource,
    };
  }
}

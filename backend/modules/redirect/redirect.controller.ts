import { LinkRepository } from "@/backend/modules/links/link.repository";
import { AnalyticsRepository } from "@/backend/modules/analytics/analytics.repository";
import { generateDeepLink, parseDevice } from "./deepLink.service";

export class RedirectController {
  static async handleRedirect(
    shortCode: string,
    userAgent: string,
    referer: string = "",
    geo: { country?: string; city?: string } = {}
  ) {
    const link = await LinkRepository.findByShortCode(shortCode);

    if (!link) {
      return { notFound: true };
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

    const deepLinkInfo = generateDeepLink(link.originalUrl);

    return {
      notFound: false,
      link,
      deepLinkInfo,
      device: parsed.device,
      inAppBrowser: parsed.inAppBrowser,
      country: parsed.country,
      referrerSource: parsed.referrerSource,
    };
  }
}

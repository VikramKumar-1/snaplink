/**
 * Robust URL Attribution & Affiliate Tag Injection Engine
 * Safely parses URLs and merges UTM parameters and affiliate tags without breaking queries.
 */

export interface UtmInput {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface RetargetingInput {
  affiliateTag?: string;
  metaPixelId?: string;
  googleAnalyticsId?: string;
}

export function buildAttributedUrl(
  rawUrl: string,
  utm?: UtmInput,
  retargeting?: RetargetingInput
): string {
  if (!rawUrl || !rawUrl.trim()) return rawUrl;

  try {
    const urlObj = new URL(rawUrl.trim());

    // 1. Merge UTM parameters
    if (utm?.source?.trim()) urlObj.searchParams.set("utm_source", utm.source.trim());
    if (utm?.medium?.trim()) urlObj.searchParams.set("utm_medium", utm.medium.trim());
    if (utm?.campaign?.trim()) urlObj.searchParams.set("utm_campaign", utm.campaign.trim());
    if (utm?.term?.trim()) urlObj.searchParams.set("utm_term", utm.term.trim());
    if (utm?.content?.trim()) urlObj.searchParams.set("utm_content", utm.content.trim());

    // 2. Auto-Inject Affiliate Tag
    if (retargeting?.affiliateTag?.trim()) {
      const tag = retargeting.affiliateTag.trim();
      const host = urlObj.hostname.toLowerCase();

      if (host.includes("amazon.") || host.includes("amzn.")) {
        urlObj.searchParams.set("tag", tag);
      } else if (host.includes("flipkart.") || host.includes("fkrt.")) {
        urlObj.searchParams.set("affid", tag);
      } else {
        urlObj.searchParams.set("ref", tag);
      }
    }

    return urlObj.toString();
  } catch {
    return rawUrl;
  }
}

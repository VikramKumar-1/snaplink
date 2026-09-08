import { AnalyticsRepository } from "./analytics.repository";
import { LinkRepository } from "@/backend/modules/links/link.repository";

export class AnalyticsService {
  /**
   * Retrieves enriched, real-time aggregated metrics for a short link.
   */
  static async getStats(shortCode: string) {
    const link = await LinkRepository.findByShortCode(shortCode);
    if (!link) return null;

    const metrics = await AnalyticsRepository.getAggregatedMetrics(shortCode);

    return {
      link,
      totalClicks: metrics.totalClicks || link.clicks || 0,
      deviceBreakdown: metrics.deviceBreakdown,
      referrerBreakdown: metrics.referrerBreakdown,
      countryBreakdown: metrics.countryBreakdown,
      browserBreakdown: metrics.browserBreakdown,
      hourlyTimeline: metrics.hourlyTimeline,
      recentClicks: metrics.recentClicks,
    };
  }

  /**
   * Generates a clean CSV file string for client & sponsor reporting.
   */
  static async generateExportCsv(shortCode: string): Promise<string | null> {
    const link = await LinkRepository.findByShortCode(shortCode);
    if (!link) return null;

    const rawClicks = await AnalyticsRepository.getClicksForExport(shortCode);

    const headers = ["Timestamp", "Device", "InAppBrowser", "ReferrerSource", "Country", "City", "Browser", "OS"];
    const rows = rawClicks.map((c) => {
      const ts = c.timestamp ? new Date(c.timestamp).toISOString() : "";
      const dev = c.device || "other";
      const iab = c.inAppBrowser ? "Yes" : "No";
      const ref = c.referrerSource || "direct";
      const country = c.country || "Unknown";
      const city = (c.city || "Unknown").replace(/,/g, " ");
      const browser = (c.browser || "Other").replace(/,/g, " ");
      const os = (c.os || "Other").replace(/,/g, " ");

      return [ts, dev, iab, ref, country, city, browser, os].join(",");
    });

    return [headers.join(","), ...rows].join("\n");
  }
}

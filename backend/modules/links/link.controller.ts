import { NextRequest, NextResponse } from "next/server";
import { LinkService } from "./link.service";
import { apiHandler } from "@/backend/shared/utils/apiHandler";

/**
 * Pure Laravel-Style Skinny LinkController
 * Handles Link operations strictly. Analytics has its own dedicated AnalyticsController!
 */
export class LinkController {
  static handleCreateLink = apiHandler(async (req: NextRequest, userId?: string | null) => {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const body = await req.json();

    const { link, remaining } = await LinkService.processCreateLink(ip, body, userId);

    return NextResponse.json(
      { success: true, link },
      {
        status: 201,
        headers: { "X-RateLimit-Remaining": String(remaining) },
      }
    );
  });

  static handleGetRecent = apiHandler(async (_req: NextRequest, userId?: string | null) => {
    const links = await LinkService.getRecentLinks(50, userId);
    return NextResponse.json({ links });
  });

  static handleUpdateLink = apiHandler(async (req: NextRequest, userId?: string | null) => {
    const body = await req.json();
    const { shortCode } = body;
    if (!shortCode) {
      return NextResponse.json({ error: "Short code is required." }, { status: 400 });
    }

    const updated = await LinkService.updateLink(shortCode, body, userId);
    return NextResponse.json({ success: true, link: updated });
  });

  static handleDeleteLink = apiHandler(async (req: NextRequest, userId?: string | null) => {
    const { searchParams } = new URL(req.url);
    const shortCode = searchParams.get("code");
    if (!shortCode) {
      return NextResponse.json({ error: "Short code is required." }, { status: 400 });
    }

    await LinkService.deleteLink(shortCode, userId);
    return NextResponse.json({ success: true, message: "Link deleted successfully." });
  });

  static handleGetDashboardStats = apiHandler(async (_req: NextRequest) => {
    const stats = await LinkService.getDashboardStats();
    return NextResponse.json({ success: true, stats });
  });
}

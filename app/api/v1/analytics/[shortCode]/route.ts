import { NextRequest, NextResponse } from "next/server";
import { authenticateApiKey } from "@/backend/shared/guards/apiKeyAuth";
import { AnalyticsService } from "@/backend/modules/analytics/analytics.service";
import { LinkRepository } from "@/backend/modules/links/link.repository";

interface Props {
  params: Promise<{ shortCode: string }>;
}

export async function GET(req: NextRequest, { params }: Props) {
  const { auth, errorResponse } = await authenticateApiKey(req, "analytics:read");
  if (errorResponse) return errorResponse;

  const { shortCode } = await params;
  if (!shortCode) {
    return NextResponse.json({ error: "shortCode parameter is required." }, { status: 400 });
  }

  const link = await LinkRepository.findByShortCode(shortCode);
  if (!link) {
    return NextResponse.json({ error: "LinkNotFound", message: "Short link not found." }, { status: 404 });
  }

  // Verify ownership if link has userId
  if (link.userId && String(link.userId) !== String(auth!.userId)) {
    return NextResponse.json(
      { error: "Forbidden", message: "You do not have permission to view analytics for this link." },
      { status: 403 }
    );
  }

  const stats = await AnalyticsService.getStats(shortCode);
  return NextResponse.json({
    success: true,
    shortCode,
    analytics: stats,
  });
}

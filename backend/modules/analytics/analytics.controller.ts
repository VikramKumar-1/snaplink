import { NextRequest, NextResponse } from "next/server";
import { AnalyticsService } from "./analytics.service";
import { apiHandler } from "@/backend/shared/utils/apiHandler";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

/**
 * Pure Laravel-Style Skinny AnalyticsController
 * Wrapped in apiHandler with zero manual try/catch.
 */
export class AnalyticsController {
  static handleGetStats = apiHandler(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Query parameter 'code' is required." },
        { status: 400 }
      );
    }

    const stats = await AnalyticsService.getStats(code);

    if (!stats) {
      return NextResponse.json(
        { error: `No analytics found for link '${code}'.` },
        { status: 404 }
      );
    }

    return NextResponse.json(stats);
  });

  static handleExportCsv = apiHandler(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Query parameter 'code' is required." },
        { status: 400 }
      );
    }

    const csvData = await AnalyticsService.generateExportCsv(code);

    if (!csvData) {
      return NextResponse.json(
        { error: `Link '${code}' not found for export.` },
        { status: 404 }
      );
    }

    return new NextResponse(csvData, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${BRAND_CONFIG.name.toLowerCase()}-${code}-analytics.csv"`,
      },
    });
  });
}

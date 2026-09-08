import { NextRequest } from "next/server";
import { AnalyticsController } from "@/backend/modules/analytics/analytics.controller";

/**
 * Next.js Route Handler - Router Glue Layer
 */
export async function GET(req: NextRequest) {
  return AnalyticsController.handleExportCsv(req);
}

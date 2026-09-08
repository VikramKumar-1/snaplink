import { NextRequest } from "next/server";
import { AnalyticsController } from "@/backend/modules/analytics/analytics.controller";

/**
 * Next.js Route Handler - Router Glue Layer
 * Business logic resides strictly in backend/modules/analytics/
 */

export async function GET(req: NextRequest) {
  return AnalyticsController.handleGetStats(req);
}

import { NextRequest } from "next/server";
import { LinkController } from "@/backend/modules/links/link.controller";

export async function GET(req: NextRequest) {
  return LinkController.handleGetDashboardStats(req);
}

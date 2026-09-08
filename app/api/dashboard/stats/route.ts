import { LinkController } from "@/backend/modules/links/link.controller";

export async function GET() {
  return LinkController.handleGetDashboardStats();
}

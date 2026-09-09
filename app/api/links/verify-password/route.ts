import { NextRequest } from "next/server";
import { LinkController } from "@/backend/modules/links/link.controller";

/**
 * Router Glue Layer: Verifies password for protected smart links.
 */
export async function POST(req: NextRequest) {
  return LinkController.handleVerifyPassword(req);
}

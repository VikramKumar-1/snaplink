import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { LinkController } from "@/backend/modules/links/link.controller";
import { verifyAccessToken } from "@/backend/shared/utils/jwt.util";

/**
 * Next.js Route Handler - Router Glue Layer
 * Business logic resides strictly in backend/modules/links/
 */

async function getUserIdFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) return null;
  const decoded = verifyAccessToken(token);
  return decoded?.userId || null;
}

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromCookies();
  return LinkController.handleCreateLink(req, userId);
}

export async function GET(req: NextRequest) {
  const userId = await getUserIdFromCookies();
  return LinkController.handleGetRecent(req, userId);
}

export async function PATCH(req: NextRequest) {
  const userId = await getUserIdFromCookies();
  return LinkController.handleUpdateLink(req, userId);
}

export async function DELETE(req: NextRequest) {
  const userId = await getUserIdFromCookies();
  return LinkController.handleDeleteLink(req, userId);
}

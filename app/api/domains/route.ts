import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { DomainController } from "@/backend/modules/domains/domain.controller";
import { verifyAccessToken } from "@/backend/shared/utils/jwt.util";

async function getUserIdFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) return null;
  const decoded = verifyAccessToken(token);
  return decoded?.userId || null;
}

export async function GET(req: NextRequest) {
  const userId = await getUserIdFromCookies();
  return DomainController.handleGetDomains(req, userId);
}

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromCookies();
  return DomainController.handleCreateDomain(req, userId);
}

export async function DELETE(req: NextRequest) {
  const userId = await getUserIdFromCookies();
  return DomainController.handleDeleteDomain(req, userId);
}

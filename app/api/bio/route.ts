import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { BioController } from "@/backend/modules/bio/bio.controller";
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
  return BioController.handleGetMyBio(req, userId);
}

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromCookies();
  return BioController.handleSaveBio(req, userId);
}

export async function PUT(req: NextRequest) {
  const userId = await getUserIdFromCookies();
  return BioController.handleSaveBio(req, userId);
}

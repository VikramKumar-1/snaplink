import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { BillingController } from "@/backend/modules/billing/billing.controller";
import { verifyAccessToken } from "@/backend/shared/utils/jwt.util";

async function getUserIdFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) return null;
  const decoded = verifyAccessToken(token);
  return decoded?.userId || null;
}

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromCookies();
  return BillingController.handleCreateCheckout(req, userId);
}

import { NextRequest } from "next/server";
import { AuthController } from "@/backend/modules/auth/auth.controller";

export async function GET(req: NextRequest) {
  return AuthController.handleGetMe(req);
}

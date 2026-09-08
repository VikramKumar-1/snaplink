import { AuthController } from "@/backend/modules/auth/auth.controller";

export async function GET() {
  return AuthController.handleGetMe();
}

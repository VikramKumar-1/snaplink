import { AuthController } from "@/backend/modules/auth/auth.controller";

export async function POST() {
  return AuthController.handleRefreshToken();
}

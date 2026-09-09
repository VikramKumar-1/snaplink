import { NextRequest } from "next/server";
import { ApiKeyController } from "@/backend/modules/api-keys/api-key.controller";

export async function GET(req: NextRequest) {
  return ApiKeyController.handleListKeys(req);
}

export async function POST(req: NextRequest) {
  return ApiKeyController.handleCreateKey(req);
}

export async function DELETE(req: NextRequest) {
  return ApiKeyController.handleRevokeKey(req);
}

import { NextRequest, NextResponse } from "next/server";
import { ApiKeyService } from "./api-key.service";
import { apiHandler } from "@/backend/shared/utils/apiHandler";

export class ApiKeyController {
  static handleListKeys = apiHandler(async (_req: NextRequest, userId?: string | null) => {
    const uid = userId || "creator_default";
    const keys = await ApiKeyService.listKeys(uid);
    return NextResponse.json({ success: true, keys });
  });

  static handleCreateKey = apiHandler(async (req: NextRequest, userId?: string | null) => {
    const uid = userId || "creator_default";
    const body = await req.json();
    const result = await ApiKeyService.generateKey(uid, body);
    return NextResponse.json({ success: true, ...result }, { status: 201 });
  });

  static handleRevokeKey = apiHandler(async (req: NextRequest, userId?: string | null) => {
    const uid = userId || "creator_default";
    let keyId: string | null = null;

    if (req.method === "DELETE") {
      const { searchParams } = new URL(req.url);
      keyId = searchParams.get("keyId");
      if (!keyId) {
        try {
          const body = await req.json();
          keyId = body.keyId;
        } catch {
          // ignore
        }
      }
    }

    if (!keyId) {
      return NextResponse.json({ error: "keyId is required." }, { status: 400 });
    }

    const success = await ApiKeyService.revokeKey(uid, keyId);
    if (!success) {
      return NextResponse.json({ error: "Key not found or unauthorized." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "API key revoked successfully." });
  });
}

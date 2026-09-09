import { NextRequest, NextResponse } from "next/server";
import { ApiKeyService } from "@/backend/modules/api-keys/api-key.service";
import { IApiKey } from "@/backend/modules/api-keys/api-key.model";

export interface ApiKeyAuthResult {
  apiKey: IApiKey;
  userId: string;
}

export async function authenticateApiKey(
  req: NextRequest,
  requiredPermission?: "links:read" | "links:write" | "analytics:read"
): Promise<{ auth?: ApiKeyAuthResult; errorResponse?: NextResponse }> {
  const authHeader = req.headers.get("authorization") || "";
  let plaintextKey = "";

  if (authHeader.startsWith("Bearer ")) {
    plaintextKey = authHeader.slice(7).trim();
  } else {
    plaintextKey = req.headers.get("x-api-key")?.trim() || "";
  }

  if (!plaintextKey) {
    return {
      errorResponse: NextResponse.json(
        {
          error: "Unauthorized",
          message: "Missing API key. Provide 'Authorization: Bearer snk_live_...' or 'x-api-key' header.",
        },
        { status: 401 }
      ),
    };
  }

  const apiKey = await ApiKeyService.verifyKey(plaintextKey);
  if (!apiKey) {
    return {
      errorResponse: NextResponse.json(
        {
          error: "Unauthorized",
          message: "Invalid or revoked API key.",
        },
        { status: 401 }
      ),
    };
  }

  if (requiredPermission && !apiKey.permissions.includes(requiredPermission)) {
    return {
      errorResponse: NextResponse.json(
        {
          error: "Forbidden",
          message: `This API key does not have the required permission: '${requiredPermission}'.`,
        },
        { status: 403 }
      ),
    };
  }

  return {
    auth: {
      apiKey,
      userId: apiKey.userId,
    },
  };
}

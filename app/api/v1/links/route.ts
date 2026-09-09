import { NextRequest, NextResponse } from "next/server";
import { authenticateApiKey } from "@/backend/shared/guards/apiKeyAuth";
import { LinkService } from "@/backend/modules/links/link.service";
import { LinkRepository } from "@/backend/modules/links/link.repository";
import { getClientIp } from "@/backend/shared/middlewares/rateLimiter";

export async function GET(req: NextRequest) {
  const { auth, errorResponse } = await authenticateApiKey(req, "links:read");
  if (errorResponse) return errorResponse;

  try {
    const links = await LinkRepository.findByUserId(auth!.userId);
    return NextResponse.json({
      success: true,
      count: links.length,
      links,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "InternalServerError", message: err.message || "Failed to fetch links." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { auth, errorResponse } = await authenticateApiKey(req, "links:write");
  if (errorResponse) return errorResponse;

  const ip = getClientIp(req);
  try {
    const body = await req.json();
    const { link, remaining } = await LinkService.processCreateLink(ip, body, auth!.userId);
    if (!link) {
      throw new Error("Failed to allocate or create link.");
    }

    const baseUrl = req.nextUrl.origin;
    const shortUrl = link.customDomain
      ? `https://${link.customDomain}/${link.shortCode}`
      : `${baseUrl}/${link.shortCode}`;

    return NextResponse.json(
      {
        success: true,
        shortUrl,
        link,
      },
      {
        status: 201,
        headers: { "X-RateLimit-Remaining": String(remaining) },
      }
    );
  } catch (err: any) {
    const status = err.statusCode || (err.name === "ZodError" ? 400 : 500);
    return NextResponse.json(
      {
        error: err.name || "Error",
        message: err.message || "Failed to create link.",
        details: err.issues || undefined,
      },
      { status }
    );
  }
}

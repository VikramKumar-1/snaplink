import { NextRequest, NextResponse } from "next/server";
import { DomainService } from "./domain.service";
import { apiHandler } from "@/backend/shared/utils/apiHandler";
import { getClientIp } from "@/backend/shared/middlewares/rateLimiter";

export class DomainController {
  static handleCreateDomain = apiHandler(async (req: NextRequest, userId?: string | null) => {
    const ip = getClientIp(req);
    const body = await req.json();
    const domain = await DomainService.createDomain(body, userId, ip);
    return NextResponse.json({ success: true, domain }, { status: 201 });
  });

  static handleGetDomains = apiHandler(async (_req: NextRequest, userId?: string | null) => {
    const domains = await DomainService.getUserDomains(userId);
    return NextResponse.json({ success: true, domains });
  });

  static handleVerifyDomain = apiHandler(async (req: NextRequest, userId?: string | null) => {
    const ip = getClientIp(req);
    const body = await req.json();
    const { domainId } = body;
    if (!domainId) {
      return NextResponse.json({ error: "Domain ID is required." }, { status: 400 });
    }

    const result = await DomainService.verifyDomain(domainId, userId, ip);
    return NextResponse.json(result);
  });

  static handleDeleteDomain = apiHandler(async (req: NextRequest, userId?: string | null) => {
    const { searchParams } = new URL(req.url);
    const domainId = searchParams.get("id");
    if (!domainId) {
      return NextResponse.json({ error: "Domain ID is required." }, { status: 400 });
    }

    await DomainService.deleteDomain(domainId, userId);
    return NextResponse.json({ success: true, message: "Domain deleted successfully." });
  });
}

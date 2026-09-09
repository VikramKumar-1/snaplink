import { NextRequest, NextResponse } from "next/server";
import { BioService } from "./bio.service";
import { apiHandler } from "@/backend/shared/utils/apiHandler";

/**
 * Pure Skinny BioController
 * Wrapped in apiHandler with zero manual try/catch.
 */
export class BioController {
  static handleGetPublicBio = apiHandler(async (_req: NextRequest, username: string) => {
    const bioPage = await BioService.getPublicBio(username);
    return NextResponse.json({ success: true, bioPage });
  });

  static handleGetMyBio = apiHandler(async (_req: NextRequest, userId?: string | null) => {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const bioPage = await BioService.getMyBio(userId);
    return NextResponse.json({ success: true, bioPage });
  });

  static handleSaveBio = apiHandler(async (req: NextRequest, userId?: string | null) => {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const saved = await BioService.saveBio(userId, body);
    return NextResponse.json({ success: true, bioPage: saved });
  });

  static handleRecordClick = apiHandler(async (req: NextRequest, username: string) => {
    const { linkId } = await req.json();
    if (!linkId) {
      return NextResponse.json({ error: "linkId is required" }, { status: 400 });
    }
    await BioService.recordLinkClick(username, linkId);
    return NextResponse.json({ success: true });
  });
}

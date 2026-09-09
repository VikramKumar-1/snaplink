import { NextRequest, NextResponse } from "next/server";
import { WorkspaceService } from "./workspace.service";
import { apiHandler } from "@/backend/shared/utils/apiHandler";
import { getClientIp } from "@/backend/shared/middlewares/rateLimiter";

export class WorkspaceController {
  static handleGetWorkspaces = apiHandler(async (_req: NextRequest, userId?: string | null) => {
    const uid = userId || "creator_default";
    const workspaces = await WorkspaceService.getUserWorkspaces(uid);
    return NextResponse.json({ success: true, workspaces });
  });

  static handleCreateWorkspace = apiHandler(async (req: NextRequest, userId?: string | null) => {
    const uid = userId || "creator_default";
    const ip = getClientIp(req);
    const body = await req.json();
    const workspace = await WorkspaceService.createWorkspace(uid, body, undefined, ip);
    return NextResponse.json({ success: true, workspace }, { status: 201 });
  });

  static handleInviteMember = apiHandler(async (req: NextRequest, userId?: string | null) => {
    const uid = userId || "creator_default";
    const ip = getClientIp(req);
    const body = await req.json();
    await WorkspaceService.inviteMember(uid, body, undefined, ip);
    return NextResponse.json({ success: true, message: "Member invited successfully." }, { status: 201 });
  });

  static handleUpdateMemberRole = apiHandler(async (req: NextRequest, userId?: string | null) => {
    const uid = userId || "creator_default";
    const ip = getClientIp(req);
    const body = await req.json();
    await WorkspaceService.updateMemberRole(uid, body, undefined, ip);
    return NextResponse.json({ success: true, message: "Member role updated successfully." });
  });

  static handleRemoveMember = apiHandler(async (req: NextRequest, userId?: string | null) => {
    const uid = userId || "creator_default";
    const ip = getClientIp(req);
    const body = await req.json();
    await WorkspaceService.removeMember(uid, body, undefined, ip);
    return NextResponse.json({ success: true, message: "Member removed from workspace." });
  });

  static handleUpdateSso = apiHandler(async (req: NextRequest, userId?: string | null) => {
    const uid = userId || "creator_default";
    const ip = getClientIp(req);
    const body = await req.json();
    await WorkspaceService.updateSso(uid, body, undefined, ip);
    return NextResponse.json({ success: true, message: "SSO configuration updated." });
  });
}

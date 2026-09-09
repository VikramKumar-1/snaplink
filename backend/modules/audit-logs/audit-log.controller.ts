import { NextRequest, NextResponse } from "next/server";
import { AuditLogService } from "./audit-log.service";
import { apiHandler } from "@/backend/shared/utils/apiHandler";

export class AuditLogController {
  static handleGetLogs = apiHandler(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    if (!workspaceId) {
      return NextResponse.json({ error: "workspaceId query parameter is required" }, { status: 400 });
    }

    const action = searchParams.get("action") || undefined;
    const limit = Number(searchParams.get("limit")) || 100;

    const logs = await AuditLogService.getLogs(workspaceId, limit, action);
    return NextResponse.json({ success: true, logs });
  });
}

import { NextRequest } from "next/server";
import { AuditLogController } from "@/backend/modules/audit-logs/audit-log.controller";

export async function GET(req: NextRequest) {
  return AuditLogController.handleGetLogs(req);
}

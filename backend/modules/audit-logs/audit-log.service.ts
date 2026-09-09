import { AuditLogRepository } from "./audit-log.repository";
import { IAuditLog } from "./audit-log.model";

export class AuditLogService {
  static async recordLog(params: {
    workspaceId: string;
    actorId: string;
    actorEmail: string;
    action: string;
    resourceId: string;
    details?: Record<string, any>;
    ip?: string;
  }): Promise<void> {
    try {
      await AuditLogRepository.create({
        workspaceId: params.workspaceId,
        actorId: params.actorId,
        actorEmail: params.actorEmail,
        action: params.action,
        resourceId: params.resourceId,
        details: params.details || {},
        ip: params.ip || "127.0.0.1",
      });
    } catch (err: any) {
      console.warn("Non-blocking audit log record failed:", err.message);
    }
  }

  static async getLogs(
    workspaceId: string,
    limit: number = 100,
    action?: string
  ): Promise<IAuditLog[]> {
    return await AuditLogRepository.findByWorkspaceId(workspaceId, limit, action);
  }
}

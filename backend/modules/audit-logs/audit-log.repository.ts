import { connectToDatabase } from "@/backend/config/db";
import { AuditLog, IAuditLog } from "./audit-log.model";

const memoryLogs: any[] = [];

export class AuditLogRepository {
  static async create(data: Partial<IAuditLog>): Promise<IAuditLog | any> {
    try {
      await connectToDatabase();
      return await AuditLog.create(data);
    } catch (err: any) {
      console.warn("MongoDB offline, storing audit log in memory cache:", err.message);
      const fallback = {
        ...data,
        _id: "mem_log_" + Date.now(),
        createdAt: new Date(),
      };
      memoryLogs.unshift(fallback);
      if (memoryLogs.length > 500) memoryLogs.pop();
      return fallback;
    }
  }

  static async findByWorkspaceId(
    workspaceId: string,
    limit: number = 100,
    action?: string
  ): Promise<any[]> {
    try {
      await connectToDatabase();
      const query: any = { workspaceId };
      if (action && action !== "all") query.action = action;
      return await AuditLog.find(query).sort({ createdAt: -1 }).limit(limit);
    } catch {
      return memoryLogs
        .filter(
          (l) => l.workspaceId === workspaceId && (!action || action === "all" || l.action === action)
        )
        .slice(0, limit);
    }
  }
}

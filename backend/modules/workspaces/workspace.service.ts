import {
  CreateWorkspaceSchema,
  InviteMemberSchema,
  UpdateMemberRoleSchema,
  RemoveMemberSchema,
  UpdateSsoSchema,
} from "./workspace.validator";
import { WorkspaceRepository } from "./workspace.repository";
import { IWorkspace, WorkspaceRole } from "./workspace.model";
import { AuditLogService } from "@/backend/modules/audit-logs/audit-log.service";

export class WorkspaceService {
  private static async verifyPermission(
    workspaceId: string,
    userId: string,
    allowedRoles: WorkspaceRole[]
  ): Promise<IWorkspace> {
    const ws = await WorkspaceRepository.findById(workspaceId);
    if (!ws) {
      const err: any = new Error("Workspace not found.");
      err.statusCode = 404;
      throw err;
    }

    if (ws.ownerId === userId) return ws;

    const member = ws.members?.find((m: any) => m.userId === userId);
    if (!member || !allowedRoles.includes(member.role)) {
      const err: any = new Error("Forbidden: You do not have permission for this workspace action.");
      err.statusCode = 403;
      throw err;
    }
    return ws;
  }

  static async getUserWorkspaces(userId: string, email?: string): Promise<IWorkspace[]> {
    const list = await WorkspaceRepository.findByUserId(userId, email);
    if (list.length > 0) return list;

    // Auto-provision initial personal/team workspace for creator
    const defaultWs = await WorkspaceRepository.create({
      name: "My Creator Team",
      slug: `team-${userId.slice(-6).toLowerCase()}`,
      ownerId: userId,
      members: [
        {
          userId,
          email: email || "creator@snaplink.to",
          role: "owner",
          status: "active",
          invitedAt: new Date(),
        },
      ],
      plan: "team",
    });
    return [defaultWs];
  }

  static async createWorkspace(
    userId: string,
    rawInput: unknown,
    userEmail?: string,
    ip?: string
  ): Promise<IWorkspace> {
    const data = CreateWorkspaceSchema.parse(rawInput);
    let baseSlug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]/g, "-");

    const existingSlug = await WorkspaceRepository.findBySlug(baseSlug);
    if (existingSlug) {
      baseSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;
    }

    const ws = await WorkspaceRepository.create({
      name: data.name,
      slug: baseSlug,
      ownerId: userId,
      members: [
        {
          userId,
          email: userEmail || "owner@snaplink.to",
          role: "owner",
          status: "active",
          invitedAt: new Date(),
        },
      ],
      plan: "team",
    });

    AuditLogService.recordLog({
      workspaceId: String(ws._id),
      actorId: userId,
      actorEmail: userEmail || "owner@snaplink.to",
      action: "workspace.created",
      resourceId: String(ws._id),
      details: { name: ws.name, slug: ws.slug },
      ip,
    });

    return ws;
  }

  static async inviteMember(
    userId: string,
    rawInput: unknown,
    userEmail?: string,
    ip?: string
  ): Promise<boolean> {
    const data = InviteMemberSchema.parse(rawInput);
    await this.verifyPermission(data.workspaceId, userId, ["owner", "admin"]);

    const ws = await WorkspaceRepository.findById(data.workspaceId);
    if (ws.members?.some((m: any) => m.email === data.email)) {
      const err: any = new Error("This email is already a member or has a pending invite.");
      err.statusCode = 409;
      throw err;
    }

    const success = await WorkspaceRepository.addMember(data.workspaceId, {
      email: data.email,
      role: data.role,
      status: "invited",
      invitedAt: new Date(),
    });

    if (success) {
      AuditLogService.recordLog({
        workspaceId: data.workspaceId,
        actorId: userId,
        actorEmail: userEmail || "admin@snaplink.to",
        action: "member.invited",
        resourceId: data.email,
        details: { role: data.role },
        ip,
      });
    }
    return success;
  }

  static async updateMemberRole(
    userId: string,
    rawInput: unknown,
    userEmail?: string,
    ip?: string
  ): Promise<boolean> {
    const data = UpdateMemberRoleSchema.parse(rawInput);
    const ws = await this.verifyPermission(data.workspaceId, userId, ["owner", "admin"]);

    if (data.email === ws.members?.find((m: any) => m.role === "owner")?.email) {
      const err: any = new Error("Cannot modify the role of the workspace owner.");
      err.statusCode = 400;
      throw err;
    }

    const success = await WorkspaceRepository.updateMemberRole(
      data.workspaceId,
      data.email,
      data.role
    );
    if (success) {
      AuditLogService.recordLog({
        workspaceId: data.workspaceId,
        actorId: userId,
        actorEmail: userEmail || "admin@snaplink.to",
        action: "role.updated",
        resourceId: data.email,
        details: { newRole: data.role },
        ip,
      });
    }
    return success;
  }

  static async removeMember(
    userId: string,
    rawInput: unknown,
    userEmail?: string,
    ip?: string
  ): Promise<boolean> {
    const data = RemoveMemberSchema.parse(rawInput);
    const ws = await this.verifyPermission(data.workspaceId, userId, ["owner", "admin"]);

    if (data.email === ws.members?.find((m: any) => m.role === "owner")?.email) {
      const err: any = new Error("Cannot remove the workspace owner.");
      err.statusCode = 400;
      throw err;
    }

    const success = await WorkspaceRepository.removeMember(data.workspaceId, data.email);
    if (success) {
      AuditLogService.recordLog({
        workspaceId: data.workspaceId,
        actorId: userId,
        actorEmail: userEmail || "admin@snaplink.to",
        action: "member.removed",
        resourceId: data.email,
        details: {},
        ip,
      });
    }
    return success;
  }

  static async updateSso(
    userId: string,
    rawInput: unknown,
    userEmail?: string,
    ip?: string
  ): Promise<boolean> {
    const data = UpdateSsoSchema.parse(rawInput);
    await this.verifyPermission(data.workspaceId, userId, ["owner"]);

    const success = await WorkspaceRepository.updateSsoConfig(data.workspaceId, {
      provider: data.provider,
      domain: data.domain,
      enabled: data.enabled,
    });

    if (success) {
      AuditLogService.recordLog({
        workspaceId: data.workspaceId,
        actorId: userId,
        actorEmail: userEmail || "owner@snaplink.to",
        action: "sso.configured",
        resourceId: data.domain,
        details: { provider: data.provider, enabled: data.enabled },
        ip,
      });
    }
    return success;
  }
}

import { connectToDatabase } from "@/backend/config/db";
import { Workspace, IWorkspace, IWorkspaceMember, WorkspaceRole } from "./workspace.model";

const memoryWorkspaces = new Map<string, any>();

export class WorkspaceRepository {
  static async findByUserId(userId: string, email?: string): Promise<any[]> {
    try {
      await connectToDatabase();
      const conditions: any[] = [{ ownerId: userId }, { "members.userId": userId }];
      if (email) conditions.push({ "members.email": email.toLowerCase() });
      return await Workspace.find({ $or: conditions }).sort({ createdAt: -1 });
    } catch {
      return Array.from(memoryWorkspaces.values()).filter(
        (w) =>
          w.ownerId === userId ||
          w.members?.some(
            (m: any) => m.userId === userId || (email && m.email === email.toLowerCase())
          )
      );
    }
  }

  static async findById(id: string): Promise<IWorkspace | any | null> {
    try {
      await connectToDatabase();
      return await Workspace.findById(id);
    } catch {
      return memoryWorkspaces.get(id) || null;
    }
  }

  static async findBySlug(slug: string): Promise<IWorkspace | any | null> {
    try {
      await connectToDatabase();
      return await Workspace.findOne({ slug: slug.toLowerCase() });
    } catch {
      return (
        Array.from(memoryWorkspaces.values()).find((w) => w.slug === slug.toLowerCase()) || null
      );
    }
  }

  static async create(data: Partial<IWorkspace>): Promise<IWorkspace | any> {
    try {
      await connectToDatabase();
      return await Workspace.create(data);
    } catch (err: any) {
      console.warn("MongoDB offline, storing workspace in memory cache:", err.message);
      const fallback = {
        ...data,
        _id: "mem_ws_" + Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryWorkspaces.set(fallback._id, fallback);
      return fallback;
    }
  }

  static async addMember(workspaceId: string, member: IWorkspaceMember): Promise<boolean> {
    try {
      await connectToDatabase();
      const res = await Workspace.updateOne(
        { _id: workspaceId },
        { $push: { members: member } }
      );
      return res.modifiedCount > 0;
    } catch {
      const ws = memoryWorkspaces.get(workspaceId);
      if (ws) {
        ws.members = ws.members || [];
        ws.members.push(member);
        memoryWorkspaces.set(workspaceId, ws);
        return true;
      }
      return false;
    }
  }

  static async updateMemberRole(
    workspaceId: string,
    email: string,
    role: WorkspaceRole
  ): Promise<boolean> {
    try {
      await connectToDatabase();
      const res = await Workspace.updateOne(
        { _id: workspaceId, "members.email": email.toLowerCase() },
        { $set: { "members.$.role": role } }
      );
      return res.modifiedCount > 0;
    } catch {
      const ws = memoryWorkspaces.get(workspaceId);
      if (ws?.members) {
        const mem = ws.members.find((m: any) => m.email === email.toLowerCase());
        if (mem) {
          mem.role = role;
          memoryWorkspaces.set(workspaceId, ws);
          return true;
        }
      }
      return false;
    }
  }

  static async removeMember(workspaceId: string, email: string): Promise<boolean> {
    try {
      await connectToDatabase();
      const res = await Workspace.updateOne(
        { _id: workspaceId },
        { $pull: { members: { email: email.toLowerCase() } } }
      );
      return res.modifiedCount > 0;
    } catch {
      const ws = memoryWorkspaces.get(workspaceId);
      if (ws?.members) {
        ws.members = ws.members.filter((m: any) => m.email !== email.toLowerCase());
        memoryWorkspaces.set(workspaceId, ws);
        return true;
      }
      return false;
    }
  }

  static async updateSsoConfig(workspaceId: string, ssoConfig: any): Promise<boolean> {
    try {
      await connectToDatabase();
      const res = await Workspace.updateOne({ _id: workspaceId }, { $set: { ssoConfig } });
      return res.modifiedCount > 0;
    } catch {
      const ws = memoryWorkspaces.get(workspaceId);
      if (ws) {
        ws.ssoConfig = ssoConfig;
        memoryWorkspaces.set(workspaceId, ws);
        return true;
      }
      return false;
    }
  }
}

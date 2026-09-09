import { NextRequest } from "next/server";
import { WorkspaceController } from "@/backend/modules/workspaces/workspace.controller";

export async function GET(req: NextRequest) {
  return WorkspaceController.handleGetWorkspaces(req);
}

export async function POST(req: NextRequest) {
  return WorkspaceController.handleCreateWorkspace(req);
}

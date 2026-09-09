import { NextRequest } from "next/server";
import { WorkspaceController } from "@/backend/modules/workspaces/workspace.controller";

export async function POST(req: NextRequest) {
  return WorkspaceController.handleUpdateSso(req);
}

import { NextRequest } from "next/server";
import { WorkspaceController } from "@/backend/modules/workspaces/workspace.controller";

export async function POST(req: NextRequest) {
  return WorkspaceController.handleInviteMember(req);
}

export async function PATCH(req: NextRequest) {
  return WorkspaceController.handleUpdateMemberRole(req);
}

export async function DELETE(req: NextRequest) {
  return WorkspaceController.handleRemoveMember(req);
}

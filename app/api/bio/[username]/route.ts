import { NextRequest } from "next/server";
import { BioController } from "@/backend/modules/bio/bio.controller";

interface Props {
  params: Promise<{ username: string }>;
}

export async function GET(req: NextRequest, { params }: Props) {
  const { username } = await params;
  return BioController.handleGetPublicBio(req, username);
}

export async function POST(req: NextRequest, { params }: Props) {
  const { username } = await params;
  return BioController.handleRecordClick(req, username);
}

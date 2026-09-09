import { NextRequest } from "next/server";
import { WebhookController } from "@/backend/modules/webhooks/webhook.controller";

export async function GET(req: NextRequest) {
  return WebhookController.handleListWebhooks(req);
}

export async function POST(req: NextRequest) {
  return WebhookController.handleCreateWebhook(req);
}

export async function DELETE(req: NextRequest) {
  return WebhookController.handleDeleteWebhook(req);
}

import { NextRequest } from "next/server";
import { WebhookController } from "@/backend/modules/webhooks/webhook.controller";

export async function POST(req: NextRequest) {
  return WebhookController.handleTestWebhook(req);
}

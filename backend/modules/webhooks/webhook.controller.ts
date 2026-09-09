import { NextRequest, NextResponse } from "next/server";
import { WebhookService } from "./webhook.service";
import { apiHandler } from "@/backend/shared/utils/apiHandler";

export class WebhookController {
  static handleListWebhooks = apiHandler(async (_req: NextRequest, userId?: string | null) => {
    const uid = userId || "creator_default";
    const webhooks = await WebhookService.listWebhooks(uid);
    return NextResponse.json({ success: true, webhooks });
  });

  static handleCreateWebhook = apiHandler(async (req: NextRequest, userId?: string | null) => {
    const uid = userId || "creator_default";
    const body = await req.json();
    const webhook = await WebhookService.createWebhook(uid, body);
    return NextResponse.json({ success: true, webhook }, { status: 201 });
  });

  static handleDeleteWebhook = apiHandler(async (req: NextRequest, userId?: string | null) => {
    const uid = userId || "creator_default";
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await req.json();
        id = body.id;
      } catch {
        // ignore
      }
    }

    if (!id) {
      return NextResponse.json({ error: "Webhook ID is required." }, { status: 400 });
    }

    const success = await WebhookService.deleteWebhook(uid, id);
    return NextResponse.json({ success, message: "Webhook deleted successfully." });
  });

  static handleTestWebhook = apiHandler(async (req: NextRequest, userId?: string | null) => {
    const uid = userId || "creator_default";
    const body = await req.json();
    const { webhookId } = body;

    if (!webhookId) {
      return NextResponse.json({ error: "webhookId is required." }, { status: 400 });
    }

    const result = await WebhookService.sendTestPing(uid, webhookId);
    return NextResponse.json(result);
  });
}

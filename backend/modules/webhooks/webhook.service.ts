import crypto from "crypto";
import { CreateWebhookSchema, CreateWebhookInput } from "./webhook.validator";
import { WebhookRepository } from "./webhook.repository";
import { IWebhook, WebhookEvent } from "./webhook.model";

export class WebhookService {
  static async createWebhook(userId: string, rawInput: unknown): Promise<IWebhook> {
    const data: CreateWebhookInput = CreateWebhookSchema.parse(rawInput);
    const secret = `whsec_${crypto.randomBytes(24).toString("hex")}`;

    return await WebhookRepository.create({
      userId,
      url: data.url,
      events: data.events,
      secret,
      status: "active",
      failureCount: 0,
    });
  }

  static async listWebhooks(userId: string): Promise<any[]> {
    return await WebhookRepository.findByUserId(userId);
  }

  static async deleteWebhook(userId: string, id: string): Promise<boolean> {
    return await WebhookRepository.deleteById(id, userId);
  }

  static generateSignature(payloadString: string, secret: string, timestamp: number): string {
    const signaturePayload = `${timestamp}.${payloadString}`;
    const hash = crypto.createHmac("sha256", secret).update(signaturePayload).digest("hex");
    return `t=${timestamp},v1=${hash}`;
  }

  static async dispatch(event: WebhookEvent, payload: Record<string, any>, userId?: string): Promise<void> {
    try {
      const activeHooks = await WebhookRepository.findActiveByEvent(event, userId);
      if (!activeHooks || activeHooks.length === 0) return;

      const timestamp = Math.floor(Date.now() / 1000);
      const envelope = {
        event,
        timestamp,
        data: payload,
      };
      const payloadString = JSON.stringify(envelope);

      // Non-blocking parallel delivery across registered hooks
      activeHooks.forEach(async (hook) => {
        try {
          const signature = this.generateSignature(payloadString, hook.secret, timestamp);
          const response = await fetch(hook.url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-snaplink-signature": signature,
              "x-snaplink-event": event,
              "User-Agent": "SnapLink-Webhooks/1.0",
            },
            body: payloadString,
            signal: AbortSignal.timeout(6000),
          });

          const isSuccess = response.ok;
          await WebhookRepository.recordDelivery(String(hook._id), response.status, isSuccess);
        } catch (err: any) {
          console.warn(`Webhook delivery failed to ${hook.url}:`, err.message);
          await WebhookRepository.recordDelivery(String(hook._id), 504, false);
        }
      });
    } catch (err) {
      console.error("Webhook dispatch orchestrator error:", err);
    }
  }

  static async sendTestPing(
    userId: string,
    webhookId: string
  ): Promise<{ success: boolean; statusCode: number; latencyMs: number; error?: string }> {
    const hook = await WebhookRepository.findById(webhookId);
    if (!hook || String(hook.userId) !== String(userId)) {
      throw new Error("Webhook not found or unauthorized.");
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const testPayload = {
      event: "link.clicked",
      timestamp,
      data: {
        test: true,
        shortCode: "test_demo",
        platform: "youtube",
        originalUrl: "https://youtube.com/watch?v=demo",
        device: "iphone",
        inAppBrowser: false,
        referrerSource: "instagram",
        country: "IN",
        city: "Bengaluru",
      },
    };

    const payloadString = JSON.stringify(testPayload);
    const signature = this.generateSignature(payloadString, hook.secret, timestamp);
    const startTime = Date.now();

    try {
      const response = await fetch(hook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-snaplink-signature": signature,
          "x-snaplink-event": "link.clicked",
          "User-Agent": "SnapLink-Webhooks/1.0",
        },
        body: payloadString,
        signal: AbortSignal.timeout(7000),
      });

      const latencyMs = Date.now() - startTime;
      await WebhookRepository.recordDelivery(webhookId, response.status, response.ok);

      return {
        success: response.ok,
        statusCode: response.status,
        latencyMs,
      };
    } catch (err: any) {
      const latencyMs = Date.now() - startTime;
      await WebhookRepository.recordDelivery(webhookId, 504, false);
      return {
        success: false,
        statusCode: 504,
        latencyMs,
        error: err.message || "Connection timed out",
      };
    }
  }
}

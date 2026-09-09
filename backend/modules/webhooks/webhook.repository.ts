import { connectToDatabase } from "@/backend/config/db";
import { Webhook, IWebhook } from "./webhook.model";

const memoryWebhooks = new Map<string, any>();

export class WebhookRepository {
  static async findByUserId(userId: string): Promise<any[]> {
    try {
      await connectToDatabase();
      return await Webhook.find({ userId }).sort({ createdAt: -1 });
    } catch {
      return Array.from(memoryWebhooks.values()).filter((w) => String(w.userId) === String(userId));
    }
  }

  static async findById(id: string): Promise<IWebhook | any | null> {
    try {
      await connectToDatabase();
      return await Webhook.findById(id);
    } catch {
      return memoryWebhooks.get(id) || null;
    }
  }

  static async findActiveByEvent(event: string, userId?: string): Promise<any[]> {
    try {
      await connectToDatabase();
      const query: any = {
        events: event,
        status: { $ne: "disabled" },
      };
      if (userId) query.userId = userId;
      return await Webhook.find(query);
    } catch {
      return Array.from(memoryWebhooks.values()).filter((w) => {
        const matchesEvent = Array.isArray(w.events) && w.events.includes(event);
        const matchesStatus = w.status !== "disabled";
        const matchesUser = !userId || String(w.userId) === String(userId);
        return matchesEvent && matchesStatus && matchesUser;
      });
    }
  }

  static async create(webhookData: Partial<IWebhook>): Promise<IWebhook | any> {
    try {
      await connectToDatabase();
      return await Webhook.create(webhookData);
    } catch (err: any) {
      console.warn("MongoDB offline, storing webhook in memory cache:", err.message);
      const fallback = {
        ...webhookData,
        _id: "mem_hook_" + Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryWebhooks.set(fallback._id, fallback);
      return fallback;
    }
  }

  static async recordDelivery(id: string, statusCode: number, success: boolean): Promise<void> {
    const update: any = {
      $set: {
        lastDeliveryStatus: statusCode,
        lastDeliveryAt: new Date(),
        status: success ? "active" : "failing",
        ...(success ? { failureCount: 0 } : {}),
      },
      ...(!success ? { $inc: { failureCount: 1 } } : {}),
    };

    try {
      await connectToDatabase();
      await Webhook.findByIdAndUpdate(id, update);
    } catch {
      const item = memoryWebhooks.get(id);
      if (item) {
        item.lastDeliveryStatus = statusCode;
        item.lastDeliveryAt = new Date();
        item.status = success ? "active" : "failing";
        item.failureCount = success ? 0 : (item.failureCount || 0) + 1;
        memoryWebhooks.set(id, item);
      }
    }
  }

  static async deleteById(id: string, userId?: string): Promise<boolean> {
    try {
      await connectToDatabase();
      const filter: any = { _id: id };
      if (userId) filter.userId = userId;
      const res = await Webhook.deleteOne(filter);
      return res.deletedCount > 0;
    } catch {
      const item = memoryWebhooks.get(id);
      if (item && (!userId || String(item.userId) === String(userId))) {
        return memoryWebhooks.delete(id);
      }
      return false;
    }
  }
}

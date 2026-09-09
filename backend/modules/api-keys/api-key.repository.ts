import { connectToDatabase } from "@/backend/config/db";
import { ApiKey, IApiKey } from "./api-key.model";

const memoryApiKeys = new Map<string, any>();

export class ApiKeyRepository {
  static async findByUserId(userId: string): Promise<any[]> {
    try {
      await connectToDatabase();
      return await ApiKey.find({ userId }).sort({ createdAt: -1 });
    } catch {
      return Array.from(memoryApiKeys.values()).filter((k) => String(k.userId) === String(userId));
    }
  }

  static async findByKeyId(keyId: string): Promise<IApiKey | any | null> {
    try {
      await connectToDatabase();
      return await ApiKey.findOne({ keyId });
    } catch {
      return memoryApiKeys.get(keyId) || null;
    }
  }

  static async findByHashedSecret(hashedSecret: string): Promise<IApiKey | any | null> {
    try {
      await connectToDatabase();
      return await ApiKey.findOne({ hashedSecret, status: "active" });
    } catch {
      return (
        Array.from(memoryApiKeys.values()).find(
          (k) => k.hashedSecret === hashedSecret && k.status === "active"
        ) || null
      );
    }
  }

  static async create(apiKeyData: Partial<IApiKey>): Promise<IApiKey | any> {
    try {
      await connectToDatabase();
      return await ApiKey.create(apiKeyData);
    } catch (err: any) {
      console.warn("MongoDB offline, storing API key in memory cache:", err.message);
      const fallback = {
        ...apiKeyData,
        _id: "mem_key_" + Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryApiKeys.set(apiKeyData.keyId!, fallback);
      return fallback;
    }
  }

  static async updateLastUsed(keyId: string): Promise<void> {
    try {
      await connectToDatabase();
      await ApiKey.updateOne({ keyId }, { $set: { lastUsedAt: new Date() } });
    } catch {
      const item = memoryApiKeys.get(keyId);
      if (item) {
        item.lastUsedAt = new Date();
        memoryApiKeys.set(keyId, item);
      }
    }
  }

  static async revoke(keyId: string, userId?: string): Promise<boolean> {
    try {
      await connectToDatabase();
      const filter: any = { keyId };
      if (userId) filter.userId = userId;
      const res = await ApiKey.updateOne(filter, { $set: { status: "revoked", updatedAt: new Date() } });
      return res.modifiedCount > 0;
    } catch {
      const item = memoryApiKeys.get(keyId);
      if (item && (!userId || String(item.userId) === String(userId))) {
        item.status = "revoked";
        item.updatedAt = new Date();
        memoryApiKeys.set(keyId, item);
        return true;
      }
      return false;
    }
  }
}

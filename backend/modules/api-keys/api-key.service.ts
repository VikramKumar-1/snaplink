import crypto from "crypto";
import { CreateApiKeySchema, CreateApiKeyInput } from "./api-key.validator";
import { ApiKeyRepository } from "./api-key.repository";
import { IApiKey } from "./api-key.model";

export class ApiKeyService {
  static hashSecret(secret: string): string {
    return crypto.createHash("sha256").update(secret).digest("hex");
  }

  static async generateKey(
    userId: string,
    rawInput: unknown
  ): Promise<{ key: Omit<IApiKey, "hashedSecret">; plaintextKey: string }> {
    const data: CreateApiKeyInput = CreateApiKeySchema.parse(rawInput);

    const randomSecret = crypto.randomBytes(32).toString("hex");
    const plaintextKey = `snk_live_${randomSecret}`;
    const hashedSecret = this.hashSecret(plaintextKey);
    const keyId = `key_${crypto.randomBytes(8).toString("hex")}`;
    const prefix = plaintextKey.slice(0, 14) + "...";

    const created = await ApiKeyRepository.create({
      keyId,
      userId,
      name: data.name,
      hashedSecret,
      prefix,
      permissions: data.permissions,
      rateLimitPerMinute: data.rateLimitPerMinute,
      status: "active",
    });

    return {
      key: {
        _id: created._id,
        keyId: created.keyId,
        userId: created.userId,
        name: created.name,
        prefix: created.prefix,
        permissions: created.permissions,
        rateLimitPerMinute: created.rateLimitPerMinute,
        status: created.status,
        createdAt: created.createdAt,
        updatedAt: created.updatedAt,
      },
      plaintextKey,
    };
  }

  static async listKeys(userId: string): Promise<any[]> {
    const keys = await ApiKeyRepository.findByUserId(userId);
    return keys.map((k) => ({
      _id: k._id,
      keyId: k.keyId,
      name: k.name,
      prefix: k.prefix,
      permissions: k.permissions,
      rateLimitPerMinute: k.rateLimitPerMinute,
      status: k.status,
      lastUsedAt: k.lastUsedAt,
      createdAt: k.createdAt,
    }));
  }

  static async revokeKey(userId: string, keyId: string): Promise<boolean> {
    return await ApiKeyRepository.revoke(keyId, userId);
  }

  static async verifyKey(plaintextKey: string): Promise<IApiKey | null> {
    if (!plaintextKey || !plaintextKey.startsWith("snk_live_")) {
      return null;
    }
    const hash = this.hashSecret(plaintextKey);
    const apiKey = await ApiKeyRepository.findByHashedSecret(hash);
    if (!apiKey || apiKey.status !== "active") {
      return null;
    }
    // Update last used time asynchronously
    ApiKeyRepository.updateLastUsed(apiKey.keyId).catch(console.error);
    return apiKey;
  }
}

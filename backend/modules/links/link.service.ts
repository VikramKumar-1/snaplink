import { LinkRepository } from "./link.repository";
import { detectPlatform } from "@/backend/modules/redirect/deepLink.service";
import { generateShortCode } from "@/backend/shared/utils/codeGenerator";
import { checkRateLimit } from "@/backend/shared/middlewares/rateLimiter";
import { CreateLinkSchema } from "./link.validator";
import { ILink } from "./link.model";

export class LinkService {
  /**
   * Orchestrates rate-limiting, Zod validation, platform detection, and persistence.
   */
  static async processCreateLink(ip: string, rawBody: any, userId?: string | null) {
    // 1. Rate Limit Check
    const rateCheck = checkRateLimit(ip, "CREATE_LINK");
    if (!rateCheck.allowed) {
      const error: any = new Error(rateCheck.message);
      error.statusCode = 429;
      throw error;
    }

    // 2. Strict Zod Validation (Throws ZodError automatically if invalid)
    const sanitizedData = CreateLinkSchema.parse(rawBody);

    const { originalUrl, customSlug, title, customTitle, customDescription, customImage } =
      sanitizedData;

    // 3. Platform Detection
    const platform = detectPlatform(originalUrl);
    const linkTitle = title || `${platform.toUpperCase()} Smart Link`;

    // 4. Persistence with Atomic Collision Handling
    let newLink: ILink | null = null;

    if (customSlug) {
      // Custom alias check
      const exists = await LinkRepository.existsByShortCode(customSlug);
      if (exists) {
        const error: any = new Error("This custom alias is already taken. Please pick another one.");
        error.statusCode = 409;
        throw error;
      }

      try {
        newLink = await LinkRepository.create({
          shortCode: customSlug,
          originalUrl,
          platform,
          title: linkTitle,
          customTitle,
          customDescription,
          customImage,
          clicks: 0,
          ...(userId && { userId }),
        });
      } catch (err: any) {
        if (err.code === 11000) {
          const error: any = new Error("This custom alias was just taken by another request.");
          error.statusCode = 409;
          throw error;
        }
        throw err;
      }
    } else {
      // Auto-generated 7-character Base62 code (3.52 Trillion pool)
      let inserted = false;
      let attempts = 0;

      while (!inserted && attempts < 3) {
        // Start with ultra-compact 6 chars (56.8 Billion pool), step to 7 if repeated collision
        const codeLength = attempts < 2 ? 6 : 7;
        const shortCode = generateShortCode(codeLength);
        try {
          newLink = await LinkRepository.create({
            shortCode,
            originalUrl,
            platform,
            title: linkTitle,
            customTitle,
            customDescription,
            customImage,
            clicks: 0,
            ...(userId && { userId }),
          });
          inserted = true;
        } catch (err: any) {
          if (err.code === 11000) {
            // In the hyper-rare event of collision, retry with a fresh code
            attempts++;
            continue;
          }
          throw err;
        }
      }

      if (!newLink) {
        const error: any = new Error("Failed to allocate a unique short code after retries.");
        error.statusCode = 500;
        throw error;
      }
    }

    return {
      link: newLink,
      remaining: rateCheck.remaining,
    };
  }

  static async getRecentLinks(limit: number = 50, userId?: string | null) {
    if (userId) {
      return await LinkRepository.findByUserId(userId, limit);
    }
    return await LinkRepository.findRecent(limit);
  }

  static async getByShortCode(shortCode: string): Promise<ILink | any | null> {
    return await LinkRepository.findByShortCode(shortCode);
  }

  static async updateLink(shortCode: string, body: any, userId?: string | null) {
    const existing = await LinkRepository.findByShortCode(shortCode);
    if (!existing) {
      const error: any = new Error("Link not found.");
      error.statusCode = 404;
      throw error;
    }

    // IDOR Security Protection: If link belongs to a user, enforce ownership
    if (existing.userId && existing.userId.toString() !== userId) {
      const error: any = new Error("Forbidden: You do not have permission to modify this link.");
      error.statusCode = 403;
      throw error;
    }

    const updates: any = {};
    if (body.originalUrl && body.originalUrl.trim() !== "") {
      updates.originalUrl = body.originalUrl.trim();
      updates.platform = detectPlatform(updates.originalUrl);
    }
    if (body.title !== undefined) updates.title = body.title;
    if (body.customTitle !== undefined) updates.customTitle = body.customTitle;
    if (body.customDescription !== undefined) updates.customDescription = body.customDescription;

    const updated = await LinkRepository.updateByShortCode(shortCode, updates);
    return updated;
  }

  static async deleteLink(shortCode: string, userId?: string | null) {
    const existing = await LinkRepository.findByShortCode(shortCode);
    if (!existing) {
      const error: any = new Error("Link not found.");
      error.statusCode = 404;
      throw error;
    }

    // IDOR Security Protection: If link belongs to a user, enforce ownership
    if (existing.userId && existing.userId.toString() !== userId) {
      const error: any = new Error("Forbidden: You do not have permission to delete this link.");
      error.statusCode = 403;
      throw error;
    }

    return await LinkRepository.deleteByShortCode(shortCode);
  }

  static async getDashboardStats() {
    return await LinkRepository.getDashboardMetrics();
  }
}

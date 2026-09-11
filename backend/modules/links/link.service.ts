import bcrypt from "bcryptjs";
import { LinkRepository } from "./link.repository";
import { detectPlatform, generateDeepLink } from "@/backend/modules/redirect/deepLink.service";
import { generateShortCode } from "@/backend/shared/utils/codeGenerator";
import { checkRateLimit } from "@/backend/shared/middlewares/rateLimiter";
import { CreateLinkSchema, VerifyPasswordSchema, BulkCreateLinkSchema } from "./link.validator";
import { ILink } from "./link.model";
import { buildAttributedUrl } from "@/backend/shared/utils/urlAttribution";
import { WebhookService } from "@/backend/modules/webhooks/webhook.service";

export class LinkService {
  /**
   * Orchestrates rate-limiting, Zod validation, platform detection, and persistence.
   */
  static async processCreateLink(ip: string, rawBody: any, userId?: string | null) {
    const rateCheck = checkRateLimit(ip, "CREATE_LINK");
    if (!rateCheck.allowed) {
      const error: any = new Error(rateCheck.message);
      error.statusCode = 429;
      throw error;
    }

    const sanitizedData = CreateLinkSchema.parse(rawBody);

    const {
      originalUrl,
      customSlug,
      customDomain,
      smartRules,
      title,
      customTitle,
      customDescription,
      customImage,
      ctaOverlay,
      routing,
      utm,
      retargeting,
    } = sanitizedData;

    // Process routing parameters & password hashing
    let routingPayload: any = undefined;
    if (routing) {
      const passwordHash =
        routing.passwordProtected && routing.password
          ? await bcrypt.hash(routing.password, await bcrypt.genSalt(10))
          : null;
      routingPayload = {
        expiresAt: routing.expiresAt || null,
        maxClicks: routing.maxClicks || null,
        expiredFallbackUrl: routing.expiredFallbackUrl || "",
        passwordProtected: Boolean(routing.passwordProtected),
        passwordHash,
      };
    }

    // Build attributed destination URL with UTM & Affiliate tags
    const finalUrl = buildAttributedUrl(originalUrl, utm, retargeting);

    // 3. Platform Detection
    const platform = detectPlatform(finalUrl);
    const linkTitle = title || `${platform.toUpperCase()} Smart Link`;

    // 4. Persistence with Atomic Collision Handling
    const baseLinkData = {
      originalUrl: finalUrl,
      customDomain: customDomain ? customDomain.toLowerCase().trim() : undefined,
      smartRules,
      platform,
      title: linkTitle,
      customTitle,
      customDescription,
      customImage,
      ctaOverlay,
      routing: routingPayload,
      utm,
      retargeting,
      clicks: 0,
      ...(userId && { userId: userId as any }),
    };

    let newLink: ILink | null = null;

    if (customSlug) {
      if (await LinkRepository.existsByShortCode(customSlug)) {
        const error: any = new Error("This custom alias is already taken. Please pick another one.");
        error.statusCode = 409;
        throw error;
      }
      try {
        newLink = await LinkRepository.create({ shortCode: customSlug, ...baseLinkData });
      } catch (err: any) {
        if (err.code === 11000) {
          const error: any = new Error("This custom alias was just taken by another request.");
          error.statusCode = 409;
          throw error;
        }
        throw err;
      }
    } else {
      let inserted = false;
      let attempts = 0;
      while (!inserted && attempts < 3) {
        const codeLength = attempts < 2 ? 6 : 7;
        const shortCode = generateShortCode(codeLength);
        try {
          newLink = await LinkRepository.create({ shortCode, ...baseLinkData });
          inserted = true;
        } catch (err: any) {
          if (err.code === 11000) { attempts++; continue; }
          throw err;
        }
      }
    }

    if (!newLink) {
      const error: any = new Error("Failed to allocate a unique short code after retries.");
      error.statusCode = 500;
      throw error;
    }

    WebhookService.dispatch(
      "link.created",
      {
        shortCode: newLink.shortCode,
        originalUrl: newLink.originalUrl,
        platform: newLink.platform,
        title: newLink.title,
        customDomain: newLink.customDomain,
        createdAt: newLink.createdAt,
      },
      userId ? String(userId) : undefined
    ).catch(console.error);

    return {
      link: newLink as ILink,
      remaining: rateCheck.remaining,
    };
  }

  static async processBulkCreateLinks(ip: string, rawBody: any, userId?: string | null) {
    const rateCheck = checkRateLimit(ip, "BULK_CREATE_LINK");
    if (!rateCheck.allowed) {
      const error: any = new Error(rateCheck.message);
      error.statusCode = 429;
      throw error;
    }

    const sanitizedData = BulkCreateLinkSchema.parse(rawBody);
    const { urls } = sanitizedData;

    if (!userId && urls.length > 5) {
      const error: any = new Error("Guest users can only shorten up to 5 URLs at once. Please register for free to shorten up to 20 URLs.");
      error.statusCode = 403;
      throw error;
    }

    const docsToInsert = urls.map((originalUrl) => {
      const platform = detectPlatform(originalUrl);
      const linkTitle = `${platform.toUpperCase()} Smart Link`;
      return {
        shortCode: generateShortCode(6),
        originalUrl,
        platform,
        title: linkTitle,
        clicks: 0,
        ...(userId && { userId: userId as any }),
      };
    });

    const links = await LinkRepository.insertMany(docsToInsert);

    // Provide a neat message if requested
    const message = `Successfully shortened ${links.length} URLs.`;

    return {
      links,
      remaining: rateCheck.remaining,
      message,
    };
  }

  static async getRecentLinks(limit: number = 50, userId?: string | null) {
    return userId ? await LinkRepository.findByUserId(userId, limit) : await LinkRepository.findRecent(limit);
  }

  static async getByShortCode(shortCode: string): Promise<ILink | any | null> {
    return await LinkRepository.findByShortCode(shortCode);
  }

  static async verifyLinkPassword(rawBody: any) {
    const { shortCode, password } = VerifyPasswordSchema.parse(rawBody);
    const link = await LinkRepository.findByShortCode(shortCode);
    if (!link) {
      const error: any = new Error("Link not found.");
      error.statusCode = 404;
      throw error;
    }

    if (!link.routing?.passwordProtected) {
      return {
        success: true,
        originalUrl: link.originalUrl,
        deepLinkInfo: generateDeepLink(link.originalUrl),
      };
    }

    if (!link.routing?.passwordHash) {
      const error: any = new Error("Password protection is misconfigured for this link.");
      error.statusCode = 500;
      throw error;
    }

    if (!(await bcrypt.compare(password, link.routing.passwordHash))) {
      const error: any = new Error("Incorrect password. Please try again.");
      error.statusCode = 401;
      throw error;
    }

    LinkRepository.incrementClicks(shortCode).catch(console.error);
    return {
      success: true,
      originalUrl: link.originalUrl,
      deepLinkInfo: generateDeepLink(link.originalUrl),
    };
  }

  private static async assertLinkOwnership(shortCode: string, userId?: string | null) {
    const link = await LinkRepository.findByShortCode(shortCode);
    if (!link) {
      const err: any = new Error("Link not found.");
      err.statusCode = 404;
      throw err;
    }
    if (link.userId && String(link.userId) !== String(userId)) {
      const err: any = new Error("Forbidden: You do not have permission for this link.");
      err.statusCode = 403;
      throw err;
    }
    return link;
  }

  static async updateLink(shortCode: string, body: any, userId?: string | null) {
    const existing = await this.assertLinkOwnership(shortCode, userId);

    const updates: any = {};
    if (body.utm !== undefined) updates.utm = body.utm;
    if (body.retargeting !== undefined) updates.retargeting = body.retargeting;

    if (body.originalUrl && body.originalUrl.trim() !== "") {
      const baseDest = body.originalUrl.trim();
      const targetUtm = body.utm !== undefined ? body.utm : existing.utm;
      const targetRetargeting = body.retargeting !== undefined ? body.retargeting : existing.retargeting;
      updates.originalUrl = buildAttributedUrl(baseDest, targetUtm, targetRetargeting);
      updates.platform = detectPlatform(updates.originalUrl);
    }
    ["title", "customTitle", "customDescription", "ctaOverlay", "smartRules"].forEach((f) => {
      if (body[f] !== undefined) updates[f] = body[f];
    });

    if (body.routing !== undefined) {
      const ex = existing.routing || {};
      let passwordHash = ex.passwordHash || null;
      if (body.routing.password) {
        const salt = await bcrypt.genSalt(10);
        passwordHash = await bcrypt.hash(body.routing.password, salt);
      } else if (body.routing.passwordProtected === false) {
        passwordHash = null;
      }

      const r = body.routing;
      updates.routing = {
        expiresAt: r.expiresAt !== undefined ? (r.expiresAt ? new Date(r.expiresAt) : null) : (ex.expiresAt || null),
        maxClicks: r.maxClicks !== undefined ? (r.maxClicks ? Number(r.maxClicks) : null) : (ex.maxClicks || null),
        expiredFallbackUrl: r.expiredFallbackUrl ?? ex.expiredFallbackUrl ?? "",
        passwordProtected: r.passwordProtected !== undefined ? Boolean(r.passwordProtected) : Boolean(ex.passwordProtected),
        passwordHash,
      };
    }

    return await LinkRepository.updateByShortCode(shortCode, updates);
  }

  static async deleteLink(shortCode: string, userId?: string | null) {
    await this.assertLinkOwnership(shortCode, userId);
    return await LinkRepository.deleteByShortCode(shortCode);
  }

  static async getDashboardStats() {
    return await LinkRepository.getDashboardMetrics();
  }
}

import { connectToDatabase } from "@/backend/config/db";
import { Link, ILink } from "./link.model";

const memoryLinks = new Map<string, any>();

export class LinkRepository {
  static async findByShortCode(shortCode: string, customDomain?: string): Promise<ILink | any | null> {
    const cacheKey = customDomain ? `${customDomain}:${shortCode}` : shortCode;
    const cached = memoryLinks.get(cacheKey);
    if (cached && Date.now() - (cached._cachedAt || 0) < 60000) {
      return cached;
    }

    try {
      await connectToDatabase();
      let doc = null;
      if (customDomain) {
        doc = await Link.findOne({ shortCode, customDomain: customDomain.toLowerCase() });
      }
      if (!doc) {
        doc = await Link.findOne({ shortCode });
      }
      if (doc) {
        const plain: any = doc.toObject ? doc.toObject() : doc;
        plain._cachedAt = Date.now();
        memoryLinks.set(cacheKey, plain);
        memoryLinks.set(shortCode, plain);
      }
      return doc;
    } catch {
      return memoryLinks.get(cacheKey) || memoryLinks.get(shortCode) || null;
    }
  }

  static async existsByShortCode(shortCode: string): Promise<boolean> {
    try {
      await connectToDatabase();
      const count = await Link.countDocuments({ shortCode });
      return count > 0;
    } catch {
      return memoryLinks.has(shortCode);
    }
  }

  static async create(linkData: Partial<ILink>): Promise<ILink | any> {
    try {
      await connectToDatabase();
      const created = await Link.create(linkData);
      const plain: any = created.toObject ? created.toObject() : created;
      plain._cachedAt = Date.now();
      if (linkData.customDomain) {
        memoryLinks.set(`${linkData.customDomain.toLowerCase()}:${linkData.shortCode}`, plain);
      }
      memoryLinks.set(linkData.shortCode!, plain);
      return created;
    } catch (err: any) {
      // Re-throw duplicate key collision error so service layer can handle retry
      if (err.code === 11000) {
        throw err;
      }

      console.warn("MongoDB connection not active, persisting to memory cache:", err.message);
      const fallbackId = String(linkData._id || "mem_" + Date.now());
      const fallback = {
        ...linkData,
        _id: fallbackId,
        clicks: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        _cachedAt: Date.now(),
      };
      if (linkData.customDomain) {
        memoryLinks.set(`${linkData.customDomain.toLowerCase()}:${linkData.shortCode}`, fallback);
      }
      memoryLinks.set(linkData.shortCode!, fallback);
      return fallback;
    }
  }

  static async insertMany(linksData: Partial<ILink>[]): Promise<ILink[] | any[]> {
    try {
      await connectToDatabase();
      // ordered: false ensures that if one insertion fails (e.g., duplicate slug collision),
      // the rest will still succeed.
      const result = await Link.insertMany(linksData, { ordered: false });
      
      // Update memory cache
      result.forEach((doc: any) => {
        const plain: any = doc.toObject ? doc.toObject() : doc;
        plain._cachedAt = Date.now();
        memoryLinks.set(plain.shortCode, plain);
      });
      return result;
    } catch (err: any) {
      // In case of ordered:false, Mongoose throws a BulkWriteError but err.insertedDocs contains the successful ones.
      if (err.insertedDocs && err.insertedDocs.length > 0) {
        err.insertedDocs.forEach((doc: any) => {
          const plain: any = doc.toObject ? doc.toObject() : doc;
          plain._cachedAt = Date.now();
          memoryLinks.set(plain.shortCode, plain);
        });
        return err.insertedDocs;
      }
      
      console.warn("MongoDB connection not active or bulk failed entirely, persisting to memory cache.");
      const fallbacks = linksData.map((data) => {
        const fallbackId = String(data._id || "mem_" + Date.now() + Math.random());
        const fallback = {
          ...data,
          _id: fallbackId,
          clicks: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          _cachedAt: Date.now(),
        };
        memoryLinks.set(data.shortCode!, fallback);
        return fallback;
      });
      return fallbacks;
    }
  }

  static async incrementClicks(
    shortCode: string,
    analytics?: {
      device?: "desktop" | "mobile" | "tablet";
      os?: string;
      browser?: string;
      referrer?: string;
      country?: string;
    }
  ): Promise<ILink | any | null> {
    try {
      await connectToDatabase();
      
      const incPayload: Record<string, number> = { clicks: 1 };
      
      if (analytics) {
        if (analytics.device) incPayload[`deviceStats.${analytics.device}`] = 1;
        if (analytics.os) incPayload[`osStats.${analytics.os}`] = 1;
        if (analytics.browser) incPayload[`browserStats.${analytics.browser}`] = 1;
        if (analytics.referrer) incPayload[`referrerStats.${analytics.referrer}`] = 1;
        if (analytics.country) incPayload[`countryStats.${analytics.country}`] = 1;
      }

      return await Link.findOneAndUpdate(
        { shortCode },
        { $inc: incPayload },
        { new: true }
      );
    } catch {
      const item = memoryLinks.get(shortCode);
      if (item) {
        item.clicks += 1;
        // Basic memory increment for analytics (not required for persistent memory, but good for local dev)
        if (analytics) {
          if (analytics.device) {
            item.deviceStats = item.deviceStats || { desktop: 0, mobile: 0, tablet: 0 };
            item.deviceStats[analytics.device] += 1;
          }
        }
      }
      return item;
    }
  }

  static async findRecent(limit: number = 50): Promise<any[]> {
    try {
      await connectToDatabase();
      return await Link.find().sort({ createdAt: -1 }).limit(limit);
    } catch {
      return Array.from(memoryLinks.values()).slice(0, limit);
    }
  }

  static async findByUserId(userId: string, limit: number = 100): Promise<any[]> {
    try {
      await connectToDatabase();
      return await Link.find({ userId }).sort({ createdAt: -1 }).limit(limit);
    } catch {
      return [];
    }
  }

  static async updateByShortCode(shortCode: string, updateData: Partial<ILink>): Promise<ILink | any | null> {
    try {
      await connectToDatabase();
      const updated = await Link.findOneAndUpdate(
        { shortCode },
        { $set: { ...updateData, updatedAt: new Date() } },
        { new: true }
      );
      if (updated) {
        const plain: any = updated.toObject ? updated.toObject() : updated;
        plain._cachedAt = Date.now();
        if (plain.customDomain) {
          memoryLinks.set(`${plain.customDomain.toLowerCase()}:${shortCode}`, plain);
        }
        memoryLinks.set(shortCode, plain);
      }
      return updated;
    } catch {
      const item = memoryLinks.get(shortCode);
      if (item) {
        const updated = { ...item, ...updateData, updatedAt: new Date(), _cachedAt: Date.now() };
        if (item.customDomain) {
          memoryLinks.set(`${item.customDomain.toLowerCase()}:${shortCode}`, updated);
        }
        memoryLinks.set(shortCode, updated);
        return updated;
      }
      return null;
    }
  }

  static async deleteByShortCode(shortCode: string): Promise<boolean> {
    const item = memoryLinks.get(shortCode);
    if (item?.customDomain) {
      memoryLinks.delete(`${item.customDomain.toLowerCase()}:${shortCode}`);
    }
    memoryLinks.delete(shortCode);
    try {
      await connectToDatabase();
      const res = await Link.deleteOne({ shortCode });
      return res.deletedCount > 0;
    } catch {
      return true;
    }
  }

  static async getDashboardMetrics(): Promise<{
    totalLinks: number;
    totalClicks: number;
    platformStats: Record<string, number>;
  }> {
    try {
      await connectToDatabase();
      const allLinks = await Link.find();
      let totalClicks = 0;
      const platformStats: Record<string, number> = {};

      allLinks.forEach((l) => {
        totalClicks += l.clicks || 0;
        platformStats[l.platform] = (platformStats[l.platform] || 0) + 1;
      });

      return {
        totalLinks: allLinks.length,
        totalClicks,
        platformStats,
      };
    } catch {
      const all = Array.from(memoryLinks.values());
      let totalClicks = 0;
      const platformStats: Record<string, number> = {};

      all.forEach((l) => {
        totalClicks += l.clicks || 0;
        platformStats[l.platform] = (platformStats[l.platform] || 0) + 1;
      });

      return {
        totalLinks: all.length,
        totalClicks,
        platformStats,
      };
    }
  }
}

import { connectToDatabase } from "@/backend/config/db";
import { Link, ILink } from "./link.model";

const memoryLinks = new Map<string, any>();

export class LinkRepository {
  static async findByShortCode(shortCode: string): Promise<ILink | any | null> {
    try {
      await connectToDatabase();
      return await Link.findOne({ shortCode });
    } catch {
      return memoryLinks.get(shortCode) || null;
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
      return await Link.create(linkData);
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
      };
      memoryLinks.set(linkData.shortCode!, fallback);
      return fallback;
    }
  }

  static async incrementClicks(shortCode: string): Promise<ILink | any | null> {
    try {
      await connectToDatabase();
      return await Link.findOneAndUpdate(
        { shortCode },
        { $inc: { clicks: 1 } },
        { new: true }
      );
    } catch {
      const item = memoryLinks.get(shortCode);
      if (item) item.clicks += 1;
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
      return await Link.findOneAndUpdate(
        { shortCode },
        { $set: { ...updateData, updatedAt: new Date() } },
        { new: true }
      );
    } catch {
      const item = memoryLinks.get(shortCode);
      if (item) {
        const updated = { ...item, ...updateData, updatedAt: new Date() };
        memoryLinks.set(shortCode, updated);
        return updated;
      }
      return null;
    }
  }

  static async deleteByShortCode(shortCode: string): Promise<boolean> {
    try {
      await connectToDatabase();
      const res = await Link.deleteOne({ shortCode });
      return res.deletedCount > 0;
    } catch {
      return memoryLinks.delete(shortCode);
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

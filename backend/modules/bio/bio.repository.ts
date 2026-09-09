import { connectToDatabase } from "@/backend/config/db";
import { BioPage, IBioPage } from "./bio.model";

const memoryBioPages = new Map<string, any>();

export class BioRepository {
  static async findByUsername(username: string): Promise<IBioPage | any | null> {
    const cleanUsername = username.toLowerCase().trim();
    try {
      await connectToDatabase();
      return await BioPage.findOne({ username: cleanUsername, isActive: true });
    } catch {
      return memoryBioPages.get(cleanUsername) || null;
    }
  }

  static async findByUserId(userId: string): Promise<IBioPage | any | null> {
    try {
      await connectToDatabase();
      return await BioPage.findOne({ userId });
    } catch {
      for (const page of memoryBioPages.values()) {
        if (page.userId?.toString() === userId) return page;
      }
      return null;
    }
  }

  static async existsByUsername(username: string, excludeUserId?: string): Promise<boolean> {
    const cleanUsername = username.toLowerCase().trim();
    try {
      await connectToDatabase();
      const query: any = { username: cleanUsername };
      if (excludeUserId) {
        query.userId = { $ne: excludeUserId };
      }
      const count = await BioPage.countDocuments(query);
      return count > 0;
    } catch {
      const existing = memoryBioPages.get(cleanUsername);
      if (!existing) return false;
      if (excludeUserId && existing.userId?.toString() === excludeUserId) return false;
      return true;
    }
  }

  static async upsertByUserId(
    userId: string,
    data: Partial<IBioPage>
  ): Promise<IBioPage | any> {
    try {
      await connectToDatabase();
      return await BioPage.findOneAndUpdate(
        { userId },
        {
          $set: {
            ...data,
            userId,
            updatedAt: new Date(),
          },
          $setOnInsert: {
            views: 0,
            createdAt: new Date(),
          },
        },
        { new: true, upsert: true, runValidators: true }
      );
    } catch (err: any) {
      console.warn("MongoDB unavailable, persisting BioPage to memory fallback:", err.message);
      const username = data.username!.toLowerCase().trim();
      const existing = memoryBioPages.get(username) || {
        _id: "mem_bio_" + Date.now(),
        userId,
        views: 0,
        createdAt: new Date(),
      };
      const updated = {
        ...existing,
        ...data,
        updatedAt: new Date(),
      };
      memoryBioPages.set(username, updated);
      return updated;
    }
  }

  static async incrementViews(username: string): Promise<void> {
    const cleanUsername = username.toLowerCase().trim();
    try {
      await connectToDatabase();
      await BioPage.updateOne({ username: cleanUsername }, { $inc: { views: 1 } });
    } catch {
      const item = memoryBioPages.get(cleanUsername);
      if (item) item.views = (item.views || 0) + 1;
    }
  }

  static async incrementLinkClick(username: string, linkId: string): Promise<void> {
    const cleanUsername = username.toLowerCase().trim();
    try {
      await connectToDatabase();
      await BioPage.updateOne(
        { username: cleanUsername, "customLinks.id": linkId },
        { $inc: { "customLinks.$.clicks": 1 } }
      );
    } catch {
      const item = memoryBioPages.get(cleanUsername);
      if (item?.customLinks) {
        const link = item.customLinks.find((l: any) => l.id === linkId);
        if (link) link.clicks = (link.clicks || 0) + 1;
      }
    }
  }
}

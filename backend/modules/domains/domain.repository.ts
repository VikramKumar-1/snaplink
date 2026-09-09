import { connectToDatabase } from "@/backend/config/db";
import { Domain, IDomain, DomainStatus } from "./domain.model";

const memoryDomains = new Map<string, any>();

export class DomainRepository {
  static async findByDomain(domain: string): Promise<IDomain | any | null> {
    try {
      await connectToDatabase();
      return await Domain.findOne({ domain: domain.toLowerCase() });
    } catch {
      return memoryDomains.get(domain.toLowerCase()) || null;
    }
  }

  static async findByUserId(userId: string): Promise<any[]> {
    try {
      await connectToDatabase();
      return await Domain.find({ userId }).sort({ createdAt: -1 });
    } catch {
      return Array.from(memoryDomains.values()).filter((d) => String(d.userId) === String(userId));
    }
  }

  static async findById(id: string): Promise<IDomain | any | null> {
    try {
      await connectToDatabase();
      return await Domain.findById(id);
    } catch {
      return Array.from(memoryDomains.values()).find((d) => String(d._id) === String(id)) || null;
    }
  }

  static async create(domainData: Partial<IDomain>): Promise<IDomain | any> {
    try {
      await connectToDatabase();
      return await Domain.create(domainData);
    } catch (err: any) {
      if (err.code === 11000) {
        throw err;
      }
      console.warn("MongoDB offline, storing domain in memory cache:", err.message);
      const fallbackId = String(domainData._id || "mem_dom_" + Date.now());
      const fallback = {
        ...domainData,
        _id: fallbackId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryDomains.set(domainData.domain!.toLowerCase(), fallback);
      return fallback;
    }
  }

  static async updateStatus(
    id: string,
    status: DomainStatus,
    lastCheckedAt: Date = new Date()
  ): Promise<IDomain | any | null> {
    try {
      await connectToDatabase();
      return await Domain.findByIdAndUpdate(
        id,
        { $set: { status, lastCheckedAt, updatedAt: new Date() } },
        { new: true }
      );
    } catch {
      const item = Array.from(memoryDomains.values()).find((d) => String(d._id) === String(id));
      if (item) {
        item.status = status;
        item.lastCheckedAt = lastCheckedAt;
        item.updatedAt = new Date();
        memoryDomains.set(item.domain, item);
        return item;
      }
      return null;
    }
  }

  static async deleteById(id: string, userId?: string | null): Promise<boolean> {
    try {
      await connectToDatabase();
      const filter: any = { _id: id };
      if (userId) filter.userId = userId;
      const res = await Domain.deleteOne(filter);
      return res.deletedCount > 0;
    } catch {
      const item = Array.from(memoryDomains.values()).find((d) => String(d._id) === String(id));
      if (item) {
        if (userId && String(item.userId) !== String(userId)) return false;
        return memoryDomains.delete(item.domain);
      }
      return false;
    }
  }
}

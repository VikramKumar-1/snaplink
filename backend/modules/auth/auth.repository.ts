import { connectToDatabase } from "@/backend/config/db";
import { User, IUser } from "./user.model";
import { Link } from "@/backend/modules/links/link.model";

const memoryUsers = new Map<string, any>();

export class AuthRepository {
  static async findByEmail(email: string): Promise<IUser | any | null> {
    try {
      await connectToDatabase();
      return await User.findOne({ email });
    } catch {
      return Array.from(memoryUsers.values()).find((u: any) => u.email === email) || null;
    }
  }

  static async findById(id: string): Promise<IUser | any | null> {
    try {
      await connectToDatabase();
      return await User.findById(id).select("-password -refreshToken");
    } catch {
      const user = memoryUsers.get(id);
      if (!user) return null;
      const { password, refreshToken, ...safeUser } = user;
      return safeUser;
    }
  }

  static async findByIdWithSecrets(id: string): Promise<IUser | any | null> {
    try {
      await connectToDatabase();
      return await User.findById(id);
    } catch {
      return memoryUsers.get(id) || null;
    }
  }

  static async create(userData: Partial<IUser>): Promise<IUser | any> {
    try {
      await connectToDatabase();
      return await User.create(userData);
    } catch (err: any) {
      console.warn("MongoDB not active, persisting user to memory cache:", err.message);
      const fallbackId = String(userData._id || "usr_" + Date.now());
      const fallback = {
        ...userData,
        _id: fallbackId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryUsers.set(fallbackId, fallback);
      return fallback;
    }
  }

  static async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    try {
      await connectToDatabase();
      await User.findByIdAndUpdate(userId, { refreshToken });
    } catch {
      const user = memoryUsers.get(userId);
      if (user) user.refreshToken = refreshToken;
    }
  }

  static async clearRefreshToken(userId: string): Promise<void> {
    try {
      await connectToDatabase();
      await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
    } catch {
      const user = memoryUsers.get(userId);
      if (user) delete user.refreshToken;
    }
  }

  static async updateAvatar(userId: string, avatar: string): Promise<void> {
    try {
      await connectToDatabase();
      await User.findByIdAndUpdate(userId, { avatar });
    } catch {
      const user = memoryUsers.get(userId);
      if (user) user.avatar = avatar;
    }
  }

  static async claimAnonymousLinks(userId: string, shortCodes: string[]): Promise<number> {
    try {
      await connectToDatabase();
      const result = await Link.updateMany(
        {
          shortCode: { $in: shortCodes },
          $or: [{ userId: { $exists: false } }, { userId: null }],
        },
        {
          $set: { userId },
        }
      );
      return result.modifiedCount;
    } catch {
      return 0;
    }
  }
}

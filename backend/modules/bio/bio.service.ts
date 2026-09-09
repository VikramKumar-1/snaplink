import { BioRepository } from "./bio.repository";
import { SaveBioPageSchema } from "./bio.validator";

export class BioService {
  /**
   * Retrieves public bio page by username and asynchronously increments view count.
   */
  static async getPublicBio(rawUsername: string) {
    const cleanUsername = rawUsername.startsWith("@")
      ? rawUsername.slice(1).toLowerCase().trim()
      : rawUsername.toLowerCase().trim();

    if (!cleanUsername) {
      const error: any = new Error("Username parameter is required.");
      error.statusCode = 400;
      throw error;
    }

    const bioPage = await BioRepository.findByUsername(cleanUsername);
    if (!bioPage) {
      const error: any = new Error(`Creator bio page @${cleanUsername} not found.`);
      error.statusCode = 404;
      throw error;
    }

    // Non-blocking view counter increment
    BioRepository.incrementViews(cleanUsername).catch((err) => {
      console.error("Failed to increment bio view count:", err);
    });

    return bioPage;
  }

  /**
   * Retrieves current logged-in user's bio page or returns null if not yet created.
   */
  static async getMyBio(userId: string) {
    if (!userId) {
      const error: any = new Error("Unauthorized: Please log in to manage your bio page.");
      error.statusCode = 401;
      throw error;
    }

    const bio = await BioRepository.findByUserId(userId);
    return bio || null;
  }

  /**
   * Validates and saves or updates the creator's link-in-bio page.
   */
  static async saveBio(userId: string, rawBody: any) {
    if (!userId) {
      const error: any = new Error("Unauthorized: Please log in to create or edit your bio page.");
      error.statusCode = 401;
      throw error;
    }

    // 1. Strict Zod Validation
    const sanitizedData = SaveBioPageSchema.parse(rawBody);

    // 2. Check username collision with other users
    const isTaken = await BioRepository.existsByUsername(sanitizedData.username, userId);
    if (isTaken) {
      const error: any = new Error(
        `The username @${sanitizedData.username} is already claimed by another creator. Please pick another one.`
      );
      error.statusCode = 409;
      throw error;
    }

    // 3. Persist atomically
    const saved = await BioRepository.upsertByUserId(userId, sanitizedData);
    return saved;
  }

  /**
   * Records click on a specific custom link in a bio page.
   */
  static async recordLinkClick(username: string, linkId: string) {
    const cleanUsername = username.startsWith("@") ? username.slice(1) : username;
    await BioRepository.incrementLinkClick(cleanUsername, linkId);
  }
}

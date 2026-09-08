import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import { AuthRepository } from "./auth.repository";
import { RegisterSchema, LoginSchema, GoogleAuthSchema, SyncLinksSchema } from "./auth.validator";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "@/backend/shared/utils/jwt.util";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "dev-client-id";
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

export class AuthService {
  /**
   * Registers a new user with password hashing and issues tokens.
   */
  static async register(rawBody: any) {
    const validated = RegisterSchema.parse(rawBody);
    const { name, email, password } = validated;

    const existingUser = await AuthRepository.findByEmail(email);
    if (existingUser) {
      const err: any = new Error("Email is already registered.");
      err.statusCode = 409;
      throw err;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await AuthRepository.create({
      name,
      email,
      password: hashedPassword,
      authProvider: "local",
    });

    const userId = newUser._id.toString();
    const accessToken = generateAccessToken({ userId });
    const refreshToken = generateRefreshToken({ userId });

    await AuthRepository.updateRefreshToken(userId, refreshToken);

    return {
      user: {
        id: userId,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        plan: newUser.plan || "free",
        role: newUser.role || "user",
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Logs in a user with password verification and issues fresh tokens.
   */
  static async login(rawBody: any) {
    const validated = LoginSchema.parse(rawBody);
    const { email, password } = validated;

    const user = await AuthRepository.findByEmail(email);
    if (!user) {
      const err: any = new Error("Invalid email or password.");
      err.statusCode = 401;
      throw err;
    }

    if (user.authProvider !== "local" || !user.password) {
      const err: any = new Error("Account registered via Google. Please sign in with Google.");
      err.statusCode = 401;
      throw err;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err: any = new Error("Invalid email or password.");
      err.statusCode = 401;
      throw err;
    }

    const userId = user._id.toString();
    const accessToken = generateAccessToken({ userId });
    const refreshToken = generateRefreshToken({ userId });

    await AuthRepository.updateRefreshToken(userId, refreshToken);

    return {
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan || "free",
        role: user.role || "user",
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Authenticates user using Google ID Token and issues platform tokens.
   */
  static async googleAuth(rawBody: any) {
    const validated = GoogleAuthSchema.parse(rawBody);
    const { credential } = validated;

    let payload: any = null;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch {
      // In dev fallback or token failure
      const err: any = new Error("Google verification failed. Invalid credential.");
      err.statusCode = 401;
      throw err;
    }

    if (!payload || !payload.email) {
      const err: any = new Error("Invalid Google token payload.");
      err.statusCode = 400;
      throw err;
    }

    let user = await AuthRepository.findByEmail(payload.email);

    if (!user) {
      user = await AuthRepository.create({
        name: payload.name || "User",
        email: payload.email,
        avatar: payload.picture,
        authProvider: "google",
        plan: "free",
        role: "user",
      });
    } else if (payload.picture && user.avatar !== payload.picture) {
      await AuthRepository.updateAvatar(user._id.toString(), payload.picture);
    }

    const userId = user._id.toString();
    const accessToken = generateAccessToken({ userId });
    const refreshToken = generateRefreshToken({ userId });

    await AuthRepository.updateRefreshToken(userId, refreshToken);

    return {
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        avatar: payload.picture || user.avatar,
        plan: user.plan || "free",
        role: user.role || "user",
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Rotates access token using a valid refresh token.
   */
  static async refreshAccessToken(refreshToken?: string) {
    if (!refreshToken) {
      const err: any = new Error("No refresh token provided.");
      err.statusCode = 401;
      throw err;
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded || !decoded.userId) {
      const err: any = new Error("Invalid or expired refresh token.");
      err.statusCode = 401;
      throw err;
    }

    const user = await AuthRepository.findByIdWithSecrets(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      const err: any = new Error("Revoked or mismatched refresh token.");
      err.statusCode = 401;
      throw err;
    }

    const newAccessToken = generateAccessToken({ userId: user._id.toString() });
    return { accessToken: newAccessToken };
  }

  /**
   * Logs out user and revokes stored refresh token.
   */
  static async logout(refreshToken?: string) {
    if (refreshToken) {
      const decoded = verifyRefreshToken(refreshToken);
      if (decoded && decoded.userId) {
        await AuthRepository.clearRefreshToken(decoded.userId);
      }
    }
    return { success: true };
  }

  /**
   * Gets current authenticated user info.
   */
  static async getCurrentUser(accessToken?: string) {
    if (!accessToken) {
      const err: any = new Error("Unauthorized.");
      err.statusCode = 401;
      throw err;
    }

    const decoded = verifyAccessToken(accessToken);
    if (!decoded || !decoded.userId) {
      const err: any = new Error("Token expired or invalid.");
      err.statusCode = 401;
      throw err;
    }

    const user = await AuthRepository.findById(decoded.userId);
    if (!user) {
      const err: any = new Error("User not found.");
      err.statusCode = 404;
      throw err;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      plan: user.plan || "free",
      role: user.role || "user",
    };
  }

  /**
   * Syncs unclaimed links to the authenticated user.
   */
  static async syncAnonymousLinks(userId: string, rawBody: any) {
    const validated = SyncLinksSchema.parse(rawBody);
    const modifiedCount = await AuthRepository.claimAnonymousLinks(userId, validated.shortCodes);
    return { modifiedCount };
  }
}

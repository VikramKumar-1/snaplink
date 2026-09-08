import jwt from "jsonwebtoken";

// Load secrets from env, fallback for development only
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "smart-deeplink-access-secret-dev";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "smart-deeplink-refresh-secret-dev";

export const ACCESS_TOKEN_EXPIRY = "15m";
export const REFRESH_TOKEN_EXPIRY = "7d";

export interface TokenPayload {
  userId: string;
  role?: string;
}

/**
 * Generate a short-lived Access Token
 */
export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

/**
 * Generate a long-lived Refresh Token
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

/**
 * Verify an Access Token
 */
export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
};

/**
 * Verify a Refresh Token
 */
export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
};

import { RATE_LIMIT_CONFIG } from "@/backend/config/rateLimit.config";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipHits = new Map<string, RateLimitRecord>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
  message?: string;
}

/**
 * Utility to extract normalized client IP from NextRequest or Request headers.
 */
export function getClientIp(req: Request | any): string {
  if (!req) return "127.0.0.1";

  if (req.headers) {
    const forwarded = typeof req.headers.get === "function"
      ? req.headers.get("x-forwarded-for")
      : req.headers["x-forwarded-for"];
    if (forwarded) {
      const first = typeof forwarded === "string" ? forwarded : forwarded[0];
      return first.split(",")[0].trim();
    }

    const realIp = typeof req.headers.get === "function"
      ? req.headers.get("x-real-ip")
      : req.headers["x-real-ip"];
    if (realIp) {
      return typeof realIp === "string" ? realIp.trim() : realIp[0].trim();
    }
  }

  return "127.0.0.1";
}

export function checkRateLimit(
  ip: string,
  type: keyof typeof RATE_LIMIT_CONFIG = "CREATE_LINK"
): RateLimitResult {
  const config = RATE_LIMIT_CONFIG[type];
  const now = Date.now();
  const key = `${type}:${ip}`;

  const record = ipHits.get(key);

  if (!record || now > record.resetTime) {
    ipHits.set(key, {
      count: 1,
      resetTime: now + config.WINDOW_SECONDS * 1000,
    });
    return {
      allowed: true,
      remaining: config.MAX_ATTEMPTS - 1,
      resetSeconds: config.WINDOW_SECONDS,
    };
  }

  if (record.count >= config.MAX_ATTEMPTS) {
    const resetSeconds = Math.ceil((record.resetTime - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetSeconds,
      message: config.MESSAGE,
    };
  }

  record.count += 1;
  const remaining = config.MAX_ATTEMPTS - record.count;
  const resetSeconds = Math.ceil((record.resetTime - now) / 1000);

  return {
    allowed: true,
    remaining,
    resetSeconds,
  };
}

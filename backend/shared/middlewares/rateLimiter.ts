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

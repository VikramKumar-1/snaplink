import { Redis } from "@upstash/redis";

let redisClient: Redis | null = null;

export const getRedisClient = (): Redis | null => {
  if (redisClient) return redisClient;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      redisClient = new Redis({ url, token });
      console.log("Upstash Redis initialized successfully.");
    } catch (err) {
      console.error("Failed to initialize Upstash Redis:", err);
    }
  } else {
    console.warn("Upstash Redis credentials missing. Falling back to MongoDB/Memory cache.");
  }

  return redisClient;
};

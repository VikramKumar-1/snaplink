import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

/**
 * Serverless-Optimized MongoDB Connection Manager
 * Designed specifically to prevent connection leaks and execution timeouts on Vercel Free Tier + MongoDB Atlas M0.
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes("username:password")) {
    throw new Error(
      "MONGODB_URI is not properly configured. Please update .env.local with your MongoDB Atlas connection string."
    );
  }

  // 1. If connection exists and is healthy (readyState 1 = connected), reuse it instantly (0ms latency)
  if (cached!.conn && mongoose.connection.readyState === 1) {
    return cached!.conn;
  }

  // 2. If disconnected or stale, reset cached promise
  if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
    cached!.promise = null;
    cached!.conn = null;
  }

  // 3. Establish pooled connection with serverless fail-fast timeouts
  if (!cached!.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,             // Safe limit for Atlas M0 (500 max connections)
      minPoolSize: 1,              // Keep warm connection ready
      serverSelectionTimeoutMS: 5000, // Fail fast in 5s instead of hanging Vercel serverless function
      socketTimeoutMS: 45000,      // Close inactive sockets cleanly
      connectTimeoutMS: 10000,
    };

    cached!.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    cached!.conn = null;
    throw e;
  }

  return cached!.conn;
}

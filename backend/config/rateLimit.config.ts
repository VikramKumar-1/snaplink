export const RATE_LIMIT_CONFIG = {
  CREATE_LINK: {
    MAX_ATTEMPTS: 20,
    WINDOW_SECONDS: 60 * 15, // 15 minutes
    MESSAGE: "Too many links created from this IP. Please try again in 15 minutes.",
  },
  REDIRECT_LOOKUP: {
    MAX_ATTEMPTS: 120,
    WINDOW_SECONDS: 60, // 1 minute
    MESSAGE: "High traffic detected. Please slow down.",
  },
};

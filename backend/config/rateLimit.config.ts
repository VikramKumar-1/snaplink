export const RATE_LIMIT_CONFIG = {
  CREATE_LINK: {
    MAX_ATTEMPTS: 20,
    WINDOW_SECONDS: 60 * 15, // 15 minutes
    MESSAGE: "Too many links created from this IP. Please try again in 15 minutes.",
  },
  BULK_CREATE_LINK: {
    MAX_ATTEMPTS: 5,
    WINDOW_SECONDS: 60 * 15, // 15 minutes
    MESSAGE: "Too many bulk operations from this IP. Please try again in 15 minutes.",
  },
  REDIRECT_LOOKUP: {
    MAX_ATTEMPTS: 120,
    WINDOW_SECONDS: 60, // 1 minute
    MESSAGE: "High traffic detected. Please slow down.",
  },
  CREATE_DOMAIN: {
    MAX_ATTEMPTS: 10,
    WINDOW_SECONDS: 60 * 60, // 1 hour
    MESSAGE: "Domain registration limit reached. Please try again later.",
  },
  VERIFY_DOMAIN: {
    MAX_ATTEMPTS: 15,
    WINDOW_SECONDS: 60 * 60, // 1 hour
    MESSAGE: "Too many DNS verification attempts. Please wait for DNS propagation.",
  },
  WORKSPACE_INVITE: {
    MAX_ATTEMPTS: 20,
    WINDOW_SECONDS: 60 * 60, // 1 hour
    MESSAGE: "Too many invites sent from this IP. Please try again later.",
  },
};

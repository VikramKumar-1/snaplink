"use client";

import { useAuth } from "../store/useAuth";

export function useCloudSync() {
  const syncLocalLinks = async () => {
    // Read fresh auth state directly from Zustand
    const isAuth = useAuth.getState().isAuthenticated;
    if (!isAuth) return;

    try {
      // 1. Get recent links from localStorage (supports both keys)
      const stored = localStorage.getItem("recent_smart_links") || localStorage.getItem("recent_links");
      if (!stored) return; // Nothing to sync

      const localLinks: any[] = JSON.parse(stored);
      if (!Array.isArray(localLinks) || localLinks.length === 0) return;

      const shortCodes = localLinks.map((link) => link.shortCode);

      // 2. Send to backend to merge
      const res = await fetch("/api/auth/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortCodes }),
      });

      if (res.ok) {
        console.log("Local links successfully synced to cloud.");
        // We can optionally clear local storage or leave it as a local cache
        // localStorage.removeItem("recent_links");
      }
    } catch (error) {
      console.error("Failed to sync local links to cloud:", error);
    }
  };

  return { syncLocalLinks };
}

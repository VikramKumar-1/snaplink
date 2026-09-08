import { create } from "zustand";

export interface CreatedLink {
  shortCode: string;
  originalUrl: string;
  platform: string;
  title?: string;
  clicks: number;
  createdAt: string;
}

interface LinkState {
  recentLinks: CreatedLink[];
  activeQrLink: CreatedLink | null;
  activeAnalyticsCode: string | null;
  isLoading: boolean;
  error: string | null;

  addLink: (link: CreatedLink) => void;
  setRecentLinks: (links: CreatedLink[]) => void;
  openQrModal: (link: CreatedLink) => void;
  closeQrModal: () => void;
  openAnalyticsModal: (shortCode: string) => void;
  closeAnalyticsModal: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useLinkStore = create<LinkState>((set) => ({
  recentLinks: [],
  activeQrLink: null,
  activeAnalyticsCode: null,
  isLoading: false,
  error: null,

  addLink: (link) =>
    set((state) => {
      const updated = [link, ...state.recentLinks.filter((l) => l.shortCode !== link.shortCode)];
      if (typeof window !== "undefined") {
        localStorage.setItem("recent_smart_links", JSON.stringify(updated.slice(0, 20)));
      }
      return { recentLinks: updated };
    }),

  setRecentLinks: (links) => set({ recentLinks: links }),

  openQrModal: (link) => set({ activeQrLink: link }),
  closeQrModal: () => set({ activeQrLink: null }),

  openAnalyticsModal: (shortCode) => set({ activeAnalyticsCode: shortCode }),
  closeAnalyticsModal: () => set({ activeAnalyticsCode: null }),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

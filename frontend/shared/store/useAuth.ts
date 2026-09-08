import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan?: "free" | "creator" | "enterprise";
  role?: "user" | "admin";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Initially loading while we check session
  
  login: (user) => set({ user, isAuthenticated: true, isLoading: false }),
  
  logout: async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout failed", e);
    }
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          set({ user: data.user, isAuthenticated: true, isLoading: false });
          return;
        }
      }
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

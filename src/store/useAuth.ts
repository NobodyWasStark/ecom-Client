import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../lib/api";
import type { User } from "../types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true, // Initial load

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post("/auth/login", { email, password });
          // Backend returns { data: { user, token } }
          const result = data.data || data;
          set({ user: result.user, isAuthenticated: true });
          return result.user;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post("/auth/register", {
            name,
            email,
            password,
          });
          const result = data.data || data;
          set({ user: result.user, isAuthenticated: true });
          return result.user;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
        // Also call backend logout to clear cookie
        api.post("/auth/logout").catch(() => {});
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const { data } = await api.get("/auth/profile");
          // API returns { data: user }
          set({ user: data.data, isAuthenticated: true });
        } catch {
          set({ user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

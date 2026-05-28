import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Role } from "@/types";

interface AuthState {
  user: User | null;
  role: Role | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setRole: (role: Role | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isLoading: true,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          role: user?.role ?? null,
          isAuthenticated: !!user,
        }),

      setRole: (role) => set({ role }),

      setLoading: (isLoading) => set({ isLoading }),

      signOut: () =>
        set({
          user: null,
          role: null,
          isAuthenticated: false,
          isLoading: false,
        }),
    }),
    {
      name: "campus-os-auth",
      partialize: (state) => ({ user: state.user, role: state.role }),
    }
  )
);

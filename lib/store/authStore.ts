'use client';

// Zustand store
import { create } from 'zustand';

// Types
import { User } from '@/types/user';

type AuthStore = {
  user: User | null;
  hydrated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setHydrated: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  hydrated: false,

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setHydrated: () => set({ hydrated: true }),
}));

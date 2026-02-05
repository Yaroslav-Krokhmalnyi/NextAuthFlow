'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import type { User } from '@/types/user';

type AuthProviderProps = {
  children: React.ReactNode;
  initialUser: User | null;
};

export default function AuthProvider({
  children,
  initialUser,
}: AuthProviderProps) {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);
  const setHydrated = useAuthStore((s) => s.setHydrated);

  useEffect(() => {
    if (initialUser) setUser(initialUser);
    else clearUser();

    setHydrated();
  }, [initialUser, setUser, clearUser, setHydrated]);

  return <>{children}</>;
}

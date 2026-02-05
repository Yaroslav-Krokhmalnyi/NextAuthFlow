'use client';

import { useEffect } from 'react';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

type AuthProviderProps = { children: React.ReactNode };

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  useEffect(() => {
    const init = async () => {
      const ok = await checkSession();

      if (!ok) {
        clearUser();
        return;
      }

      try {
        const me = await getMe();
        setUser(me);
      } catch {
        clearUser();
      }
    };

    init();
  }, [setUser, clearUser]);

  return <>{children}</>;
}

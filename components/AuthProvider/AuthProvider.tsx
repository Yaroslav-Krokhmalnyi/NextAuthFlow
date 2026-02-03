'use client';

import { useEffect, useState } from 'react';
import { checkSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);

  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const initAuth = async () => {
      const user = await checkSession();

      if (user) {
        setUser(user);
      } else {
        clearIsAuthenticated();
      }

      setLoading(false);
    };

    initAuth();
  }, [setUser, clearIsAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;

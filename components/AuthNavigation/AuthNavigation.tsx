'use client';

// Liberis
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Components
import { useAuthStore } from '@/lib/store/authStore';

// API
import { logout } from '@/lib/api/clientApi';

// Toast
import { toastInfo, toastError } from '@/lib/toast';

// Styles
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);
  const hydrated = useAuthStore((s) => s.hydrated);
  const [isLoading, setIsLoading] = useState(false);

  if (!hydrated) {
    return null;
  }

  const handleLogout = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await logout();
      clearUser();
      await toastInfo({ message: 'You have been logged out' });
      router.push('/sign-in');
    } catch (error) {
      await toastError({
        message:
          error instanceof Error
            ? error.message
            : 'Logout failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href='/sign-in' className={css.navigationLink}>
            Login
          </Link>
        </li>

        <li className={css.navigationItem}>
          <Link href='/sign-up' className={css.navigationLink}>
            Sign up
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <Link href='/profile' className={css.navigationLink}>
          Profile
        </Link>
      </li>

      <li className={css.navigationItem}>
        <span className={css.userEmail}>Signed in as {user?.username}</span>
        <button
          type='button'
          className={css.logoutButton}
          onClick={handleLogout}
          aria-label='Log out of your account'
        >
          Logout
        </button>
      </li>
    </>
  );
}

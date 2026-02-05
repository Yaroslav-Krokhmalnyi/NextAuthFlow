'use client';

// Liberis
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Components
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';

// Styles
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);
  const hydrated = useAuthStore((s) => s.hydrated);

  if (!hydrated) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearUser();
      router.push('/sign-in');
    }
  };
  console.log(user);
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

  // return isAuthenticated ? (
  //   <>
  //     <li className={css.navigationItem}>
  //       <Link href='/profile' className={css.navigationLink}>
  //         Profile
  //       </Link>
  //     </li>

  //     <li className={css.navigationItem}>
  //       <span className={css.userEmail}>Signed in as {user?.username}</span>
  //       <button
  //         type='button'
  //         className={css.logoutButton}
  //         onClick={handleLogout}
  //         aria-label='Log out of your account'
  //       >
  //         Logout
  //       </button>
  //     </li>
  //   </>
  // ) : (
  //   <>
  //     <li className={css.navigationItem}>
  //       <Link href='/sign-in' className={css.navigationLink}>
  //         Login
  //       </Link>
  //     </li>

  //     <li className={css.navigationItem}>
  //       <Link href='/sign-up' className={css.navigationLink}>
  //         Sign up
  //       </Link>
  //     </li>
  //   </>
  // );
}

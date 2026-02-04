'use client';

// Styles
import css from './Header.module.css';

// Next.js components
import Link from 'next/link';

// Components
import AuthNavigation from '@/components/AuthNavigation/AuthNavigation';

export default function Header() {
  return (
    <header className={css.header}>
      <Link href='/' aria-label='NextAuthFlow home' className={css.headerLink}>
        NextAuthFlow
      </Link>

      <nav aria-label='Main Navigation'>
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href='/' aria-label='Home' className={css.navigationLink}>
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href='/notes/filter/all'
              aria-label='Notes (Demo)'
              className={css.navigationLink}
            >
              Notes (Demo)
            </Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}

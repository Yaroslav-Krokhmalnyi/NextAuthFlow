import Link from 'next/link';
import css from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.wrap}>
        <p>© {year} NextAuthFlow. All rights reserved.</p>

        <address className={(css.meta, css.wrap)}>
          <p>Developer: Yaroslav Krokhmalnyi</p>
          <p>
            Contact:{' '}
            <Link className={css.link} href='mailto:krokhmalniy.code@gmail.com'>
              krokhmalniy.code@gmail.com
            </Link>
          </p>
        </address>
      </div>
    </footer>
  );
}

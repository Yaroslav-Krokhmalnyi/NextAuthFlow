// Styles
import css from './Home.module.css';

export default function HomePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>NextAuthFlow</h1>

        <p className={css.description}>
          NextAuthFlow is a modern authentication system built with Next.js App
          Router.
        </p>

        <p className={css.description}>
          This project demonstrates a complete authentication flow including
          registration, login, logout, session validation, and protected routes.
          It focuses on real-world authentication patterns such as cookie-based
          sessions, SSR/CSR interaction, and scalable state management.
        </p>

        <p className={css.description}>
          Tech stack: Next.js (App Router), TypeScript, TanStack Query, Zustand,
          REST API, cookie-based authentication.
        </p>
      </div>
    </main>
  );
}

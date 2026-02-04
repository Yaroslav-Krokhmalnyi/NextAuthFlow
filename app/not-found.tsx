import css from './Home.module.css';

export default function NotFound() {
  return (
    <main className={css.main} role='alert' aria-live='assertive'>
      <div className={css.container}>
        <h1 className={css.title}>404</h1>
        <p className={css.description}>
          The page you are looking for does not exist.
        </p>
      </div>
    </main>
  );
}

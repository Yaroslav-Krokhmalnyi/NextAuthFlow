'use client';

// Libraries
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginRequest } from '@/lib/api/clientApi';

// Components
import { useAuthStore } from '@/lib/store/authStore';
import { toastSuccess, toastError } from '@/lib/toast';

// Styles
import css from './SignInPage.module.css';

const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);

    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const res = await login(formValues);

      if (!res) {
        toastError({ message: 'Invalid email or password' });
        return;
      }

      setUser(res);
      toastSuccess({ message: 'Welcome back!' });

      router.push('/profile');
    } catch (error) {
      toastError({
        message:
          error instanceof Error
            ? error.message
            : 'Server error. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <form
        className={css.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(new FormData(e.currentTarget));
        }}
      >
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type='submit'
            className={css.submitButton}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? 'Logging in…' : 'Log in'}
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignIn;

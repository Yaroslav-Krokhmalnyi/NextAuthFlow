'use client';

// Libraries
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/lib/api/clientApi';

// Components
import { useAuthStore } from '@/lib/store/authStore';

// Styles
import css from './SignUpPage.module.css';

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    setError('');
    setIsLoading(true);

    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValues);

      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form
        className={css.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(new FormData(e.currentTarget));
        }}
      >
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
            {isLoading ? 'Registering…' : 'Register'}
          </button>
        </div>

        {error && (
          <p className={css.error} role='alert' aria-live='assertive'>
            {error}
          </p>
        )}
      </form>
    </main>
  );
}

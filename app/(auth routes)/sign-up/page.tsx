'use client';

// Libraries
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/lib/api/clientApi';

// Components
import { useAuthStore } from '@/lib/store/authStore';

// Toast
import { toastSuccess, toastError } from '@/lib/toast';

// Styles
import css from './SignUpPage.module.css';

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValues);

      if (!res) {
        await toastError({ message: 'Registration failed. Please try again.' });
        return;
      }

      await toastSuccess({
        message: 'Account created successfully. You can sign in now.',
      });

      router.push('/sign-in');
    } catch (error) {
      await toastError({
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
      </form>
    </main>
  );
}

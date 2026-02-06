'use client';

// Library
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Components
import { useAuthStore } from '@/lib/store/authStore';

// API
import { getMe, updateMe } from '@/lib/api/clientApi';

// Styles
import css from './EditProfilePage.module.css';

// Types
import type { User } from '@/types/user';

// Toast
import { toastSuccess, toastError } from '@/lib/toast';

const EditProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const setAuthUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
        setUsername(data.username);
      } catch (error: any) {
        if (error?.response?.status === 401) {
          router.replace('/sign-in');
          return;
        }

        await toastError({ message: 'Could not load profile' });
      }
    };

    fetchUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const updatedUser = await updateMe({ username });
      setAuthUser(updatedUser);
      await toastSuccess({ message: 'Profile updated successfully' });
      router.push('/profile');
    } catch (error: any) {
      if (error?.response?.status === 401) {
        router.replace('/sign-in');
        return;
      }

      await toastError({
        message:
          error instanceof Error ? error.message : 'Failed to update profile',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <p role='status' aria-live='polite'>
        Loading profile…
      </p>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user.avatar}
          alt={`Avatar of ${user.username}`}
          width={120}
          height={120}
          className={css.avatar}
        />
        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor='username'>Username:</label>
            <input
              id='username'
              type='text'
              required
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type='submit' className={css.saveButton}>
              Save
            </button>
            <button
              type='button'
              className={css.cancelButton}
              onClick={() => router.push('/profile')}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;

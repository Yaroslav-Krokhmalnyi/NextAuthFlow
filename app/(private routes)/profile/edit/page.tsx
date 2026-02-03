'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useAuthStore } from '@/lib/store/authStore';

// API
import { getMe, updateMe } from '@/lib/api/clientApi';

// Styles
import css from './EditProfilePage.module.css';

// Types
import type { User } from '@/types/user';

const EditProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const setAuthUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getMe();
      setUser(data);
      setUsername(data.username);
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser = await updateMe({ username });

    setAuthUser(updatedUser);

    router.push('/profile');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user.avatar}
          alt='User Avatar'
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

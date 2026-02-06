'use client';

// Styles
import css from './NoteList.module.css';

// React components
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

// Next.js components
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// API
import { deleteNote } from '@/lib/api/clientApi';

// Types
import type { Note } from '@/types/note';

// Toast
import { toastSuccess, toastError } from '@/lib/toast';

// Components
import Loader from '@/components/Loader/Loader';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: async () => {
      await toastSuccess({ message: 'Note deleted successfully' });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },

    onError: async (error: any) => {
      if (error?.response?.status === 401) {
        router.replace('/sign-in');
        return;
      }
      await toastError({
        message:
          error instanceof Error ? error.message : 'Failed to delete note',
      });
    },
  });

  const handleDelete = (id: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(id);

    mutation.mutate(id, {
      onSettled: () => setDeletingId(null),
    });
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <div>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
          </div>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link
              className={css.link}
              href={`/notes/${note.id}`}
              aria-label={`View details of note "${note.title}"`}
              aria-disabled={mutation.isPending}
            >
              View details
            </Link>

            <button
              className={css.button}
              type='button'
              onClick={() => handleDelete(note.id, note.title)}
              disabled={mutation.isPending && deletingId === note.id}
              aria-busy={mutation.isPending && deletingId === note.id}
              aria-label={`Delete note "${note.title}"`}
            >
              {mutation.isPending && deletingId === note.id ? (
                <Loader size={16} />
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

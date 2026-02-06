'use client';

// Libraries
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

// API
import { fetchNoteById } from '@/lib/api/clientApi';

// Styles
import css from './NoteDetails.module.css';

// Components
import Loader from '@/components/Loader/Loader';

export default function NoteDetailsClient() {
  const router = useRouter();
  const handleClose = () => router.push('/notes/filter/all');

  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Loader center label='Loading note' />;
  }

  if (isError || !note) {
    return <p role='alert'>Could not load note.</p>;
  }

  const formattedDate = note.updatedAt
    ? `Updated at: ${new Date(note.updatedAt).toLocaleDateString('uk-UA')}`
    : `Created at: ${new Date(note.createdAt).toLocaleDateString('uk-UA')}`;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h1>{note.title}</h1>
            <p className={css.tag}>{note.tag}</p>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
        </div>
        <button type='button' className={css.backBtn} onClick={handleClose}>
          Back
        </button>
      </div>
    </main>
  );
}

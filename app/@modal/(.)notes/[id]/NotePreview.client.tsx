'use client';

// Liberis
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

// Styles
import css from './NotePreview.module.css';

// API
import { fetchNoteById } from '@/lib/api/clientApi';

//Components
import Modal from '@/components/Modal/Modal';
import Loader from '@/components/Loader/Loader';

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const handleClose = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const formattedDate = note?.updatedAt
    ? `Updated at: ${new Date(note.updatedAt).toLocaleDateString('uk-UA')}`
    : note
      ? `Created at: ${new Date(note.createdAt).toLocaleDateString('uk-UA')}`
      : null;

  return (
    <Modal closeModal={handleClose}>
      <div className={css.container}>
        {isLoading && <Loader label='Loading note preview' />}

        {!isLoading && error instanceof Error && (
          <p role='alert'>Could not load note.</p>
        )}

        {!isLoading && note && (
          <>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{note.title}</h2>
                <p className={css.tag}>{note.tag}</p>
              </div>
              <p className={css.content}>{note.content}</p>
              {formattedDate && <p className={css.date}>{formattedDate}</p>}
            </div>
            <button type='button' className={css.backBtn} onClick={handleClose}>
              Back
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default NotePreviewClient;

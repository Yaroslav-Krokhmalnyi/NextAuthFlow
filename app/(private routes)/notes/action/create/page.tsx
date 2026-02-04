// Meta
import { Metadata } from 'next';

// Components
import NoteForm from '@/components/NoteForm/NoteForm';

// Constants
import TAGS from '@/constants/noteTags';

// Styles
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'Create note',
  description: 'Create a new note in the demo notes section.',
  openGraph: {
    title: 'Create note',
    description: 'Create a new note in the demo notes section.',
    url: 'https://next-auth-flow-zeta.vercel.app/notes/action/create',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'NextAuthFlow — demo notes section',
      },
    ],
    type: 'website',
  },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm categories={TAGS} />
      </div>
    </main>
  );
};

export default CreateNote;

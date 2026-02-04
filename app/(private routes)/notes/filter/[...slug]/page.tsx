// Meta
import { Metadata } from 'next';

// Constants
import TAGS from '@/constants/noteTags';

// Next.js
import { notFound } from 'next/navigation';

// Components
import NotesPageClient from './Notes.client';

// Types
import type { NoteTag } from '@/types/note';

type NotesByCategoryProps = {
  params: Promise<{
    slug: string[];
  }>;
};

const BASE_URL = 'https://next-auth-flow-zeta.vercel.app';

export async function generateMetadata({
  params,
}: NotesByCategoryProps): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.[0] ?? 'all';

  if (filter === 'all') {
    return {
      title: 'All notes',
      description: 'All notes available in the demo notes section.',
      openGraph: {
        title: 'All notes',
        description: 'All notes available in the demo notes section.',
        url: `${BASE_URL}/notes/filter/all`,
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
  }

  if (TAGS.includes(filter as NoteTag)) {
    return {
      title: `Notes: ${filter}`,
      description: `Notes filtered by "${filter}".`,
      openGraph: {
        title: `Notes: ${filter}`,
        description: `Notes filtered by "${filter}".`,
        url: `${BASE_URL}/notes/filter/${filter}`,
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
  }

  return { title: 'Notes' };
}

export default async function NotesByCategory({
  params,
}: NotesByCategoryProps) {
  const { slug } = await params;
  const filter = slug?.[0] ?? 'all';

  const isNoteTag = (value: string): value is NoteTag =>
    TAGS.includes(value as NoteTag);

  if (filter === 'all') {
    return <NotesPageClient />;
  }

  if (isNoteTag(filter)) {
    return <NotesPageClient tag={filter} />;
  }

  notFound();
}

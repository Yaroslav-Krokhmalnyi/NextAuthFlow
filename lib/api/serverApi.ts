// Cookies
import { cookies } from 'next/headers';

// API
import { nextServer } from './api';

// Types
import type { User } from '@/types/user';
import type { Note, NoteTag, CreateNoteParams } from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesProps {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
  sortBy?: 'created' | 'updated';
}

export async function fetchNotes({
  page,
  perPage,
  search,
  tag,
  sortBy = 'created',
}: FetchNotesProps): Promise<FetchNotesResponse> {
  const params = {
    page,
    perPage,
    ...(search && search.trim() ? { search: search.trim() } : {}),
    ...(tag ? { tag } : {}),
    ...(sortBy ? { sortBy } : {}),
  };

  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params,
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();

  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export async function getServerUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  if (!cookieHeader) return null;

  try {
    const { data } = await nextServer.get('/auth/session', {
      headers: { Cookie: cookieHeader },
    });

    if (!data || data.success !== true) return null;

    const me = await nextServer.get<User>('/users/me', {
      headers: { Cookie: cookieHeader },
    });

    return me.data;
  } catch {
    return null;
  }
}

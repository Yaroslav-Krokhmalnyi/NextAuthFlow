// fetchNotes;
// fetchNoteById;
// createNote;
// deleteNote;
// register;
// login;
// logout;
// checkSession;
// getMe;
// updateMe;

// API
import { nextServer } from '@/lib/api/api';

import type { User } from '@/types/user';
import type { Note, NoteTag, CreateNoteParams } from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
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
}: FetchNotesParams): Promise<FetchNotesResponse> {
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
  const response = await nextServer.get<Note>(`/notes/${id}`, {});

  return response.data;
}

export async function createNote(payload: CreateNoteParams): Promise<Note> {
  const response = await nextServer.post<Note>('/notes', payload, {});

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`, {});

  return response.data;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const { data } = await nextServer.get<User>('/auth/session');
    return data ?? null;
  } catch {
    return null;
  }
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export type UpdateMeProps = {
  username?: string;
};

export const updateMe = async (payload: UpdateMeProps): Promise<User> => {
  const { data } = await nextServer.patch<User>('/users/me', payload);
  return data;
};

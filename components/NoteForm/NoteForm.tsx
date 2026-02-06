'use client';

// Liberys
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';

// Toasts
import { toastSuccess, toastError } from '@/lib/toast';

// API
import { createNote } from '@/lib/api/clientApi';

// Zustand store
import useDraftStore from '@/lib/store/noteStore';

// Styles
import css from './NoteForm.module.css';

// Types
import type { CreateNoteParams, NoteTag } from '@/types/note';

// Components
import Loader from '@/components/Loader/Loader';

interface NoteFormProps {
  categories: NoteTag[];
}

export default function NoteForm({ categories }: NoteFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  // Yup schema
  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .trim()
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title must be at most 50 characters')
      .required('Title is required'),

    content: Yup.string()
      .trim()
      .max(500, 'Content must be at most 500 characters')
      .required('Content is required'),

    tag: Yup.mixed<NoteTag>()
      .oneOf(categories, 'Invalid category')
      .required('Category is required'),
  });

  // Zustand store
  const {
    draft: { title, content, tag },
    setDraft,
    clearDraft,
  } = useDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...{ title, content, tag },
      [event.target.name]: event.target.value,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,

    onSuccess: async () => {
      await toastSuccess({ message: 'Note created successfully' });

      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });

      clearDraft();
      router.push('/notes/filter/all');
    },

    onError: async (error: any) => {
      if (error?.response?.status === 401) {
        router.replace('/sign-in');
        return;
      }

      await toastError({
        message:
          error instanceof Error ? error.message : 'Failed to create note',
      });
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const payload: CreateNoteParams = {
      title: String(formData.get('title') ?? ''),
      content: String(formData.get('content') ?? ''),
      tag: formData.get('tag') as NoteTag,
    };

    try {
      await NoteFormSchema.validate(payload, {
        abortEarly: false,
      });

      setErrors({});
      mutate(payload);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {};

        error.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });

        setErrors(validationErrors);
      }
    }
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          name='title'
          type='text'
          className={css.input}
          defaultValue={title}
          onChange={handleChange}
          required
        />
        {errors.title && (
          <span className={css.error} role='alert'>
            {errors.title}
          </span>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor='content'>Content</label>
        <textarea
          id='content'
          name='content'
          rows={8}
          className={css.textarea}
          defaultValue={content}
          onChange={handleChange}
          required
        />
        {errors.content && (
          <span className={css.error} role='alert'>
            {errors.content}
          </span>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor='tag'>Tag</label>
        <select
          id='tag'
          name='tag'
          className={css.select}
          defaultValue={tag}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.tag && (
          <span className={css.error} role='alert'>
            {errors.tag}
          </span>
        )}
      </div>

      <div className={css.actions}>
        <button
          type='button'
          className={css.cancelButton}
          onClick={() => {
            router.push('/notes/filter/all');
          }}
        >
          Cancel
        </button>

        <button
          type='submit'
          className={css.submitButton}
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? <Loader size={20} /> : 'Create note'}
        </button>
      </div>
    </form>
  );
}

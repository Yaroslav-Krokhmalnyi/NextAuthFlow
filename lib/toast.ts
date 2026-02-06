'use client';

import 'izitoast/dist/css/iziToast.min.css';

type ToastOptions = {
  title?: string;
  message: string;
};

const getIziToast = async () => {
  const module = await import('izitoast');
  return module.default;
};

export const toastSuccess = async ({
  title = 'Success',
  message,
}: ToastOptions) => {
  const iziToast = await getIziToast();
  iziToast.success({
    title,
    message,
    position: 'topRight',
  });
};

export const toastError = async ({
  title = 'Error',
  message,
}: ToastOptions) => {
  const iziToast = await getIziToast();
  iziToast.error({
    title,
    message,
    position: 'topRight',
  });
};

export const toastInfo = async ({ title = 'Info', message }: ToastOptions) => {
  const iziToast = await getIziToast();
  iziToast.info({
    title,
    message,
    position: 'topRight',
  });
};

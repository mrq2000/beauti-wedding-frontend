import { enqueueSnackbar } from 'notistack';

export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  const message = error?.response?.data?.message;
  return typeof message === 'string' ? message : 'Something went wrong';
};

export const handleErrorMessage = (error: any): void => {
  enqueueSnackbar({
    variant: 'error',
    message: getErrorMessage(error),
  });
};

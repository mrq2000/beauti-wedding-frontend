import { toast } from './notify';

export const getErrorMessage = (error: any): string => {
  const message = error?.response?.data?.message;
  return typeof message === 'string' ? message : 'Something went wrong';
};

export const handleErrorMessage = (error: any): void => {
  if (typeof error === 'string') {
    toast.error(error);
  } else {
    toast.error(getErrorMessage(error));
  }
};

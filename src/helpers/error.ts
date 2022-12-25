import { toast } from './notify';

const getErrorMessage = (error: any): string => {
  return error?.response?.data?.message || 'Something went wrong';
};

export const handleErrorMessage = (error: any): void => {
  if (typeof error === 'string') {
    toast.error(error);
  } else {
    toast.error(getErrorMessage(error));
  }
};

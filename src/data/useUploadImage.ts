import { api } from '@/helpers/api';
import { useMutation } from 'react-query';

interface Response {
  url: string;
}

const useUploadImage = () => {
  return useMutation(async (data: FormData) => {
    const response = await api.post('/upload/img', data);
    return response.data as Response;
  });
};

export default useUploadImage;

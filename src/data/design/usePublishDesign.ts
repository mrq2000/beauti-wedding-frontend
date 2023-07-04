import { api } from '@/helpers/api';
import { useMutation } from 'react-query';

interface Result {
  success: boolean;
}

const usePublishDesign = () => {
  return useMutation(async (designId: number) => {
    const response = await api.post(`/designs/${designId}/publish`);
    return response.data as Result;
  });
};

export default usePublishDesign;

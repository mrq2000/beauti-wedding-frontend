import { api } from '@/helpers/api';
import { useMutation } from 'react-query';

interface CreateDesignResult {
  id: number;
}

interface CreateDesignParams {
  domain: string;
  templateId?: number;
  groomName: string;
  groomMotherName?: string;
  groomFatherName?: string;
  brideName: string;
  brideMotherName?: string;
  brideFatherName?: string;
  location?: string;
  time: string;
}
const useCreateDesign = () => {
  return useMutation(async (data: CreateDesignParams) => {
    const response = await api.post('/designs', {
      ...data,
    });
    return response.data as CreateDesignResult;
  });
};

export default useCreateDesign;

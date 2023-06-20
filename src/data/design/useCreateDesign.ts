import { Info } from '@/editor/interface/info';
import { api } from '@/helpers/api';
import { useMutation } from 'react-query';

interface CreateDesignResult {
  id: number;
}

interface CreateDesignParams extends Info {
  domain: string;
  templateId?: number;
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

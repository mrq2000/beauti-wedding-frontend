import { api } from '@/helpers/api';
import { useMutation } from 'react-query';

interface UpdateDesignDataParams {
  data: string;
  designId: number;
}
const useUpdateDraftData = () => {
  return useMutation(async ({ data, designId }: UpdateDesignDataParams) => {
    const response = await api.post(`/designs/${designId}/draft/data`, {
      data,
    });
    return response.data;
  });
};

export default useUpdateDraftData;

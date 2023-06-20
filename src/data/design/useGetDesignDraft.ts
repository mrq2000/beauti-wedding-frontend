import { useQuery } from 'react-query';
import { api } from '@/helpers/api';
import { DesignDraft } from '../../interface/design';

const useGetDesignDraft = (id: number) => {
  return useQuery(
    ['design', 'draft', id],
    async () => {
      const response = await api.get(`/designs/${id}/draft`);

      return response.data as DesignDraft;
    },
    {
      staleTime: 600000,
      cacheTime: 600000,
    },
  );
};

export default useGetDesignDraft;

import { useQuery } from 'react-query';
import { api } from '@/helpers/api';
import { DesignInfo } from '../../interface/design';

const useGetDesignInfo = (designId: number) => {
  return useQuery(
    ['design', 'info', designId],
    async () => {
      const response = await api.get(`/designs/${designId}/info`);

      return response.data as DesignInfo;
    },
    {
      staleTime: 600000,
      cacheTime: 600000,
    },
  );
};

export default useGetDesignInfo;

import { useQuery } from 'react-query';
import { api } from '@/helpers/api';
import { DesignInfo } from '../../interface/design';

interface Response extends DesignInfo {
  designPublic: boolean;
}

const useGetDesignInfo = (designId: number) => {
  return useQuery(
    ['design', 'info', designId],
    async () => {
      const response = await api.get(`/designs/${designId}/info`);

      return response.data as Response;
    },
    {
      staleTime: 600000,
      cacheTime: 600000,
    },
  );
};

export default useGetDesignInfo;

import { api } from '@/helpers/api';
import { useQuery } from 'react-query';

const useGetDesign = () => {
  return useQuery(
    'get design',
    async () => {
      const response = await api.get(`/design`);

      return response.data;
    },
    {
      staleTime: 600000,
      cacheTime: 600000,
    },
  );
};

export default useGetDesign;

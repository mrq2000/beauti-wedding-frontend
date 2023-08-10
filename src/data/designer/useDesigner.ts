import { api } from '@/helpers/api';
import { useQuery } from 'react-query';

const useDesigner = () => {
  return useQuery(
    'designer',
    async () => {
      const response = await api.get('/designers/me');

      return response.data as {
        id: number;
        username: string;
      };
    },
    {
      staleTime: 600000,
      cacheTime: 600000,
    },
  );
};

export default useDesigner;

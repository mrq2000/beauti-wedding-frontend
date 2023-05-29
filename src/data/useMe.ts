import { api } from '@/helpers/api';
import { useQuery } from 'react-query';

const useMe = () => {
  return useQuery(
    'get me',
    async () => {
      const response = await api.get('/auth/me');

      return response.data;
    },
    {
      staleTime: 600000,
      cacheTime: 600000,
    },
  );
};

export default useMe;
